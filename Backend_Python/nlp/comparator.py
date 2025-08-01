import os
from pymongo import MongoClient
from bson import ObjectId
from underthesea import word_tokenize, text_normalize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import unicodedata
from nlp.skills_list import ALL_SKILLS
from datetime import datetime
import html
import nltk

nltk.download('punkt')

MONGO_URI = os.getenv("MONGO_DB_URL", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["LuanVanDB"]
job_post_col = db["JobPost"]
job_post_skill_col = db["JobPostSkillsRequirement"]
skill_col = db["SkillsRequirement"]

def clean_html_text(text):
    """Loại bỏ các thẻ HTML và trả về văn bản thuần túy."""
    try:
        text = html.unescape(text)
        text = re.sub(r'<[^>]+>', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    except Exception as e:
        print(f"Lỗi khi làm sạch HTML: {e}")
        return text

def normalize_text(text, preserve_technical_terms=True):
    """Chuẩn hóa văn bản tiếng Việt: loại bỏ dấu câu, chuyển về chữ thường, chuẩn hóa unicode."""
    try:
        if isinstance(text, list):
            text = " ".join(str(item) for item in text)
        text = str(text)
        text = unicodedata.normalize('NFKC', text)
        text = text.lower()
        if preserve_technical_terms:
            for term in ALL_SKILLS:
                placeholder = term.replace(" ", "_")
                text = text.replace(term.lower(), placeholder)
        text = re.sub(r'[^\w\s]', '', text)
        text = text_normalize(text)
        tokens = word_tokenize(text)
        if preserve_technical_terms:
            tokens = [token.replace("_", " ") for token in tokens]
        return " ".join(tokens)
    except Exception as e:
        print(f"Lỗi khi chuẩn hóa văn bản: {e}")
        return ""

def extract_ngrams(text, n=3):
    """Trích xuất n-grams (cụm từ) từ văn bản để tạo từ khóa có ngữ nghĩa."""
    tokens = word_tokenize(text)
    ngrams = []
    for i in range(1, n + 1):
        for j in range(len(tokens) - i + 1):
            ngram = " ".join(tokens[j:j+i])
            if len(ngram) > 1:
                ngrams.append(ngram)
    return ngrams

def get_jd_text_and_skills(job_id):
    """Lấy mô tả công việc, danh sách kỹ năng, kinh nghiệm và trình độ học vấn từ database."""
    try:
        job_post = job_post_col.find_one({"_id": ObjectId(job_id), "deleted": False})
        if not job_post:
            return "", [], 0, ""

        jd_text = (clean_html_text(job_post.get("description", "")) + "\n" +
                   clean_html_text(job_post.get("requirements", "")))
        min_years_experience = job_post.get("min_years_experience", 0)
        education_level = job_post.get("education_level", "").lower()

        skill_links = job_post_skill_col.find({"job_post_id": ObjectId(job_id), "deleted": False})
        skill_ids = [link["skills_requirement_id"] for link in skill_links]
        skills = [s["name"].lower() for s in skill_col.find({"_id": {"$in": skill_ids}, "deleted": False})]

        jd_text = normalize_text(jd_text, preserve_technical_terms=True)
        skills = [normalize_text(skill, preserve_technical_terms=True) for skill in skills]
        return jd_text, skills, min_years_experience, education_level
    except Exception as e:
        print(f"Lỗi khi lấy JD và kỹ năng từ database: {e}")
        return "", [], 0, ""

def compare_cv_with_jd(cv_text, jd_text, cv_skills=None, jd_skills=None, cv_experience=0, cv_education=None, extracted_fields=None):
    """
    So sánh CV với JD sử dụng TF-IDF và kiểm tra kỹ năng, kinh nghiệm, học vấn.
    Trả về thông tin về từ khóa, kỹ năng, điểm mạnh, điểm yếu, và độ tương đồng.
    """
    try:
        # Chuẩn hóa văn bản
        cv_text_normalized = normalize_text(cv_text, preserve_technical_terms=True)
        jd_text_normalized = normalize_text(jd_text, preserve_technical_terms=True)

        # Tạo vector TF-IDF
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform([cv_text_normalized, jd_text_normalized])
        cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

        # Trích xuất n-grams (cụm từ) để làm từ khóa
        cv_ngrams = set(extract_ngrams(cv_text_normalized))
        jd_ngrams = set(extract_ngrams(jd_text_normalized))
        matched_keywords = list(cv_ngrams.intersection(jd_ngrams))
        missing_keywords = list(jd_ngrams - cv_ngrams)

        # So sánh kỹ năng
        matched_skills = []
        missing_skills = []
        if cv_skills and jd_skills:
            cv_skills_flat = []
            jd_skills_flat = []
            for skill in cv_skills:
                if isinstance(skill, list):
                    cv_skills_flat.extend(normalize_text(item, preserve_technical_terms=True) for item in skill)
                else:
                    cv_skills_flat.append(normalize_text(skill, preserve_technical_terms=True))
            for skill in jd_skills:
                if isinstance(skill, list):
                    jd_skills_flat.extend(normalize_text(item, preserve_technical_terms=True) for item in skill)
                else:
                    jd_skills_flat.append(normalize_text(skill, preserve_technical_terms=True))

            cv_skills_set = set(cv_skills_flat)
            jd_skills_set = set(jd_skills_flat)
            matched_skills = list(cv_skills_set.intersection(jd_skills_set))
            missing_skills = list(jd_skills_set - cv_skills_set)

            for cv_skill in cv_skills_flat:
                for jd_skill in jd_skills_flat:
                    if cv_skill in jd_skill or jd_skill in cv_skill:
                        if cv_skill not in matched_skills and jd_skill not in matched_skills:
                            matched_skills.append(jd_skill)
                            if jd_skill in missing_skills:
                                missing_skills.remove(jd_skill)

        # Xác định điểm mạnh và điểm yếu
        strengths = []
        weaknesses = []
        job_match = []
        job_mismatch = []

        # Kiểm tra các mục thông tin trong CV
        required_sections = [
            "personal_info", "career_objective", "education", "experience", "skills",
            "projects", "certificates", "activities"
        ]
        if extracted_fields:
            present_sections = [key for key in extracted_fields if extracted_fields.get(key)]
            missing_sections = [section for section in required_sections if section not in present_sections]

            for section in present_sections:
                if section == "personal_info" and extracted_fields.get(section):
                    if all(extracted_fields[section].get(key) for key in ["name", "email", "phone"]):
                        strengths.append({
                            "description": "Thông tin cá nhân đầy đủ, bao gồm tên, email và số điện thoại, giúp nhà tuyển dụng dễ dàng liên hệ.",
                            "related_to": "personal_info"
                        })
                        job_match.append({
                            "criteria": "Thông tin cá nhân",
                            "description": "Thông tin cá nhân được cung cấp đầy đủ."
                        })
                    else:
                        weaknesses.append({
                            "description": "Thông tin cá nhân thiếu một số chi tiết quan trọng như tên, email hoặc số điện thoại.",
                            "related_to": "personal_info"
                        })
                        job_mismatch.append({
                            "criteria": "Thông tin cá nhân",
                            "description": "Thông tin cá nhân chưa đầy đủ."
                        })
                elif section == "career_objective" and extracted_fields.get(section):
                    strengths.append({
                        "description": "Mục tiêu nghề nghiệp được trình bày rõ ràng, thể hiện định hướng phát triển phù hợp với công việc.",
                        "related_to": "career_objective"
                    })
                    job_match.append({
                        "criteria": "Mục tiêu nghề nghiệp",
                        "description": "Mục tiêu nghề nghiệp được trình bày rõ ràng."
                    })
                elif section == "education" and extracted_fields.get(section):
                    strengths.append({
                        "description": "Học vấn được liệt kê đầy đủ, cung cấp thông tin về trình độ và thành tích học tập.",
                        "related_to": "education"
                    })
                    job_match.append({
                        "criteria": "Học vấn",
                        "description": "Học vấn được trình bày đầy đủ."
                    })
                elif section == "experience" and extracted_fields.get(section):
                    strengths.append({
                        "description": "Kinh nghiệm làm việc được mô tả chi tiết, giúp nhà tuyển dụng đánh giá năng lực ứng viên.",
                        "related_to": "experience"
                    })
                    job_match.append({
                        "criteria": "Kinh nghiệm làm việc",
                        "description": "Kinh nghiệm làm việc được trình bày chi tiết."
                    })
                elif section == "skills" and extracted_fields.get(section):
                    strengths.append({
                        "description": "Danh sách kỹ năng được liệt kê rõ ràng, thể hiện năng lực chuyên môn của ứng viên.",
                        "related_to": "skills"
                    })
                    job_match.append({
                        "criteria": "Kỹ năng",
                        "description": "Kỹ năng được trình bày rõ ràng."
                    })
                elif section == "projects" and extracted_fields.get(section):
                    strengths.append({
                        "description": "Các dự án đã thực hiện được liệt kê, thể hiện kinh nghiệm thực tế và khả năng ứng dụng kiến thức.",
                        "related_to": "projects"
                    })
                    job_match.append({
                        "criteria": "Dự án",
                        "description": "Dự án được trình bày rõ ràng."
                    })
                elif section == "certificates" and extracted_fields.get(section):
                    strengths.append({
                        "description": "Chứng chỉ được liệt kê, chứng minh năng lực và sự đầu tư vào phát triển chuyên môn.",
                        "related_to": "certificates"
                    })
                    job_match.append({
                        "criteria": "Chứng chỉ",
                        "description": "Chứng chỉ được trình bày rõ ràng."
                    })
                elif section == "activities" and extracted_fields.get(section):
                    strengths.append({
                        "description": "Hoạt động ngoại khóa được liệt kê, thể hiện tinh thần tích cực và kỹ năng mềm của ứng viên.",
                        "related_to": "activities"
                    })
                    job_match.append({
                        "criteria": "Hoạt động",
                        "description": "Hoạt động được trình bày rõ ràng."
                    })

            for section in missing_sections:
                weaknesses.append({
                    "description": f"Thiếu mục {section.replace('_', ' ')}, có thể ảnh hưởng đến đánh giá toàn diện của nhà tuyển dụng.",
                    "related_to": section
                })
                job_mismatch.append({
                    "criteria": section.replace('_', ' '),
                    "description": f"Thiếu mục {section.replace('_', ' ')} trong CV."
                })

        # Kiểm tra kỹ năng
        for skill in cv_skills or []:
            skill_name = skill["name"] if isinstance(skill, dict) and "name" in skill else skill
            if skill_name in jd_skills or any(skill_name in jd_skill for jd_skill in jd_skills):
                strengths.append({
                    "description": f"Sở hữu kỹ năng {skill_name}, đáp ứng tốt yêu cầu của công việc.",
                    "related_to": "skills"
                })
                job_match.append({
                    "criteria": f"Kỹ năng {skill_name}",
                    "description": f"Kỹ năng {skill_name} phù hợp với yêu cầu công việc."
                })
            else:
                job_mismatch.append({
                    "criteria": f"Kỹ năng {skill_name}",
                    "description": f"Kỹ năng {skill_name} không được yêu cầu trong công việc."
                })
        for skill in jd_skills or []:
            if skill not in [s["name"] if isinstance(s, dict) and "name" in s else s for s in cv_skills or []] and skill not in matched_skills:
                weaknesses.append({
                    "description": f"Thiếu kỹ năng {skill} theo yêu cầu của công việc",
                    "related_to": "skills"
                })

        # Kiểm tra kinh nghiệm
        min_years_experience = cv_experience.get("min_years_experience", 0) if isinstance(cv_experience, dict) else cv_experience
        total_experience = cv_experience.get("total_experience", 0) if isinstance(cv_experience, dict) else cv_experience
        if total_experience >= min_years_experience:
            strengths.append({
                "description": f"Có {total_experience} năm kinh nghiệm làm việc, đáp ứng tốt yêu cầu tối thiểu {min_years_experience} năm của công việc.",
                "related_to": "work_experience"
            })
            job_match.append({
                "criteria": "Kinh nghiệm làm việc",
                "description": f"Kinh nghiệm {total_experience} năm đáp ứng yêu cầu."
            })
        else:
            weaknesses.append({
                "description": f"Chỉ có {total_experience} năm kinh nghiệm, chưa đáp ứng yêu cầu tối thiểu {min_years_experience} năm của công việc.",
                "related_to": "work_experience"
            })
            job_mismatch.append({
                "criteria": "Kinh nghiệm làm việc",
                "description": f"Kinh nghiệm {total_experience} năm không đạt yêu cầu {min_years_experience} năm."
            })

        # Kiểm tra trình độ học vấn
        education_level = cv_experience.get("education_level", "") if isinstance(cv_experience, dict) else ""
        education_found = cv_education or []
        if education_level and any(education_level in ed.get("degree", "").lower() for ed in education_found):
            strengths.append({
                "description": f"Trình độ học vấn ({education_level}) phù hợp với yêu cầu của công việc, thể hiện nền tảng kiến thức vững chắc.",
                "related_to": "education"
            })
            job_match.append({
                "criteria": "Trình độ học vấn",
                "description": f"Trình độ học vấn phù hợp với yêu cầu ({education_level})."
            })
        elif education_level:
            weaknesses.append({
                "description": f"Trình độ học vấn chưa đáp ứng yêu cầu ({education_level}), có thể cần bổ sung bằng cấp hoặc chứng chỉ phù hợp.",
                "related_to": "education"
            })
            job_mismatch.append({
                "criteria": "Trình độ học vấn",
                "description": f"Trình độ học vấn không đáp ứng yêu cầu ({education_level})."
            })

        return {
            "cosine_similarity": round(cosine_sim, 3),
            "matched_keywords": matched_keywords,
            "missing_keywords": missing_keywords,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "strengths": strengths,
            "weaknesses": weaknesses,
            "job_match": job_match,
            "job_mismatch": job_mismatch,
            "analyzed_at": datetime.now().isoformat()
        }
    except Exception as e:
        print(f"Lỗi khi so sánh CV với JD: {e}")
        return {
            "cosine_similarity": 0.0,
            "matched_keywords": [],
            "missing_keywords": [],
            "matched_skills": [],
            "missing_skills": [],
            "strengths": [],
            "weaknesses": [],
            "job_match": [],
            "job_mismatch": [],
            "analyzed_at": None,
            "status": "failed",
            "error_message": str(e)
        }