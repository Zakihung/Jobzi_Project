import re

def extract_fields_from_text(text):
    # Giả sử text đã được tiền xử lý thành các đoạn dòng
    lines = text.split('\n')
    education, skills, projects, experience, hobbies = [], [], [], [], []
    personal_info = {"name": "", "email": "", "phone": ""}

    for line in lines:
        lower = line.lower()
        if "university" in lower or "đại học" in lower:
            education.append({"institution": line, "degree": "", "major": "", "duration": "", "description": ""})
        elif re.search(r"\bpython\b|java|sql|react|node", lower):
            skills.append({"name": line.strip(), "proficiency": ""})
        elif "project" in lower or "dự án" in lower:
            projects.append({"name": line.strip(), "description": "", "role": "", "duration": ""})
        elif "company" in lower or "công ty" in lower:
            experience.append({"company": line.strip(), "position": "", "duration": "", "responsibilities": ""})
        elif "teamwork" in lower or "thể thao" in lower:
            hobbies.append(line.strip())
        elif "@" in line:
            personal_info["email"] = line.strip()
        elif re.match(r"(0|\+84)[0-9]{9,10}", line.strip()):
            personal_info["phone"] = line.strip()
        elif personal_info["name"] == "" and len(line.strip().split(" ")) >= 2:
            personal_info["name"] = line.strip()

    return {
        "education": education,
        "career_objective": "",
        "skills": skills,
        "projects": projects,
        "work_experience": experience,
        "hobbies": hobbies,
        "personal_info": personal_info,
        "total_experience": len(experience)
    }