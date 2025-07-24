import re
from typing import Dict, List
from functools import lru_cache
from underthesea import ner, word_tokenize, text_normalize
import csv
import os
from datetime import datetime


class ClassificationService:
    @staticmethod
    @lru_cache(maxsize=100)
    def normalize_text(text: str) -> str:
        """Chuẩn hóa văn bản tiếng Việt."""
        text = text_normalize(text)  # Chuẩn hóa với underthesea
        return re.sub(r'\s+', ' ', text.replace('\n', ' ')).strip()

    @staticmethod
    def load_skills_csv(skills_file: str = os.path.join("dataset", "skills.csv")) -> List[str]:
        """Tải danh sách kỹ năng từ file dataset/skills.csv."""
        skills = []
        try:
            with open(skills_file, mode='r', encoding='utf-8') as file:
                reader = csv.reader(file)
                next(reader, None)  # Bỏ qua header
                for row in reader:
                    if row and row[0]:
                        skills.append(row[0].lower().strip())
        except FileNotFoundError:
            print(f"Warning: File {skills_file} not found. Using empty skills list.")
        return skills

    @staticmethod
    def extract_personal_info(text: str) -> Dict:
        """Trích xuất thông tin cá nhân."""
        personal_info = {}
        email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        phone_pattern = r'(?:\d{10}|\d{4}\s+\d{3}\s+\d{3}|\+\d{2}\s*\d{9})'
        dob_pattern = r'\d{2}/\d{2}/\d{4}'

        # Nhận diện thực thể với underthesea
        entities = ner(text)
        name_parts = []
        for entity in entities:
            word, _, _, label = entity
            if label in ('B-PER', 'I-PER') and not personal_info.get("name"):
                name_parts.append(word.strip())
            elif label in ('B-LOC', 'I-LOC'):
                if any(loc in word.lower() for loc in ["đông đa", "hà nội", "ha noi"]):
                    personal_info["address"] = "Đông Đa, Hà Nội"

        if name_parts:
            personal_info["name"] = " ".join(name_parts)

        # Trích xuất email, phone, dob bằng regex
        email_match = re.search(email_pattern, text, re.IGNORECASE)
        if email_match:
            personal_info["email"] = email_match.group(0).strip()

        phone_match = re.search(phone_pattern, text)
        if phone_match:
            personal_info["phone"] = phone_match.group(0).strip().replace(" ", "")

        dob_match = re.search(dob_pattern, text)
        if dob_match:
            personal_info["dob"] = dob_match.group(0).strip()

        personal_info["gender"] = "Nam" if "Nam" in text else "Nữ" if "Nữ" in text else ""
        personal_info["other"] = ""
        return personal_info

    @staticmethod
    def extract_sections(text: str) -> Dict[str, str]:
        """Tách các section dựa trên tiêu đề."""
        sections = {
            "Mục tiêu nghề nghiệp": "",
            "Kỹ năng": "",
            "Sở thích": "",
            "Học vấn": "",
            "Kinh nghiệm làm việc": "",
            "Dự án": ""
        }
        section_pattern = r'(Mục tiêu nghề nghiệp|Kỹ năng|Sở thích|Học vấn|Kinh nghiệm làm việc|Dự án)\s*'
        section_matches = list(re.finditer(section_pattern, text, re.IGNORECASE))

        for i, match in enumerate(section_matches):
            start = match.start()
            end = section_matches[i + 1].start() if i + 1 < len(section_matches) else len(text)
            sections[match.group(1)] = text[start + len(match.group(0)):end].strip()

        return sections

    @staticmethod
    def extract_education(education_text: str) -> List[Dict]:
        """Trích xuất thông tin học vấn."""
        education = []
        education_matches = re.finditer(
            r'((?:Đại học|Trường|Academy|Institute)\s+[^\d\n]+?)\s+(\d{4}(?:-\d{4}|-Hiện tại)?)\s*.*?((?:Tốt nghiệp\s+loại\s+\w+|Học bổng\s+\d{4}\s*(?:và\s+\d{4})?|Giải\s+\w+\s+nghiên cứu\s+khoa học)?)?',
            education_text, re.IGNORECASE
        )
        for match in education_matches:
            institution = match.group(1).strip()
            duration = match.group(2).strip()
            description = match.group(3).strip() if match.group(3) else ""
            major_match = re.search(
                r'(Công nghệ thông tin|Khoa học máy tính|Quản trị kinh doanh|Kỹ thuật phần mềm|[^\d\n]+)', institution)
            major = major_match.group(1).strip() if major_match else "Không xác định"
            education.append({
                "institution": text_normalize(institution),
                "degree": "bachelor" if "đại học" in institution.lower() else "master" if "thạc sĩ" in institution.lower() else "",
                "major": text_normalize(major),
                "duration": duration,
                "description": text_normalize(description)
            })
        return education

    @staticmethod
    def extract_skills(skills_text: str, skills_csv: List[str] = None) -> List[Dict]:
        """Trích xuất kỹ năng từ skills.csv và văn bản."""
        skills = []
        skills_csv = skills_csv or ClassificationService.load_skills_csv()
        skill_entries = re.split(r'\s*[-•]\s*|\n', skills_text)

        for skill in skill_entries:
            skill = skill.strip()
            if skill:
                skill_normalized = text_normalize(skill).lower()
                proficiency = "Trung bình"
                if any(keyword in skill_normalized for keyword in ["nâng cao", "chuyên gia", "expert", "advanced"]):
                    proficiency = "Nâng cao"
                elif any(keyword in skill_normalized for keyword in ["cơ bản", "beginner", "basic"]):
                    proficiency = "Cơ bản"
                # So khớp với skills.csv
                if skill_normalized in skills_csv or any(skill_normalized in s for s in skills_csv):
                    skills.append({
                        "name": skill_normalized,
                        "proficiency": proficiency
                    })
        return skills

    @staticmethod
    def extract_hobbies(hobbies_text: str) -> List[str]:
        """Trích xuất sở thích."""
        hobbies = [text_normalize(h.strip()) for h in re.split(r'\s*[-•]\s*|\n', hobbies_text) if h.strip()]
        return hobbies

    @staticmethod
    def extract_projects(projects_text: str) -> List[Dict]:
        """Trích xuất dự án."""
        projects = []
        project_entries = re.split(r'\s*[-•]\s*|\n', projects_text)
        for project in project_entries:
            project = project.strip()
            if project:
                projects.append({
                    "name": text_normalize(project[:50].strip()),
                    "description": text_normalize(project),
                    "role": "Phát triển cả frontend và backend" if "phát triển" in project.lower() else "Thành viên dự án",
                    "duration": ""
                })
        return projects

    @staticmethod
    def extract_work_experience(work_text: str) -> List[Dict]:
        """Trích xuất kinh nghiệm làm việc."""
        work_experiences = []
        work_entries = re.finditer(
            r'((?:Front End|Flutter|Web|.*?)\s*Developer|Nhân viên\s*[^\d\n]+?|Quản lý\s*[^\d\n]+?|Kỹ sư\s*[^\d\n]+?)\s+(\d{4}(?:-\d{4}|-Hiện tại)?)\s+.*?((?:Công ty|Company)\s+[^\d\n]+?)(?:\s*[-•]?\s*(.*?))?(?=(?:(?:Front End|Flutter|Web|.*?)\s*Developer|Nhân viên|Quản lý|Kỹ sư|$|\n\s*\n))',
            work_text, re.IGNORECASE
        )
        for match in work_entries:
            position = match.group(1).strip()
            duration = match.group(2).strip()
            company = match.group(3).strip()
            responsibilities = match.group(4).strip() if match.group(4) else ""
            work_experiences.append({
                "company": text_normalize(company),
                "position": text_normalize(position),
                "duration": duration,
                "responsibilities": text_normalize(responsibilities)
            })
        return work_experiences

    @staticmethod
    def calculate_total_experience(work_experiences: List[Dict]) -> float:
        """Tính tổng số năm kinh nghiệm."""
        total_years = 0.0
        current_year = datetime.now().year
        for exp in work_experiences:
            try:
                duration = exp["duration"]
                start_year, end_year = duration.split("-")
                start_year = int(start_year)
                end_year = current_year if end_year == "Hiện tại" else int(end_year)
                total_years += end_year - start_year
            except (ValueError, KeyError):
                continue
        return total_years

    @staticmethod
    async def classify_cv(cv_id: str, text: str) -> Dict:
        """Phân loại CV."""
        try:
            if not text:
                raise ValueError("Text input cannot be empty")

            normalized_text = ClassificationService.normalize_text(text)
            result = {
                "education": [],
                "career_objective": "",
                "skills": [],
                "projects": [],
                "work_experience": [],
                "hobbies": [],
                "personal_info": {},
                "total_experience": 0.0
            }

            result["personal_info"] = ClassificationService.extract_personal_info(normalized_text)
            sections = ClassificationService.extract_sections(normalized_text)
            result["career_objective"] = text_normalize(sections["Mục tiêu nghề nghiệp"])
            result["education"] = ClassificationService.extract_education(sections["Học vấn"])
            result["skills"] = ClassificationService.extract_skills(sections["Kỹ năng"])
            result["hobbies"] = ClassificationService.extract_hobbies(sections["Sở thích"])
            result["projects"] = ClassificationService.extract_projects(sections["Dự án"])
            result["work_experience"] = ClassificationService.extract_work_experience(sections["Kinh nghiệm làm việc"])
            result["total_experience"] = ClassificationService.calculate_total_experience(result["work_experience"])

            return result
        except Exception as e:
            return {
                "education": [],
                "career_objective": "",
                "skills": [],
                "projects": [],
                "work_experience": [],
                "hobbies": [],
                "personal_info": {},
                "total_experience": 0.0,
                "error": str(e)
            }