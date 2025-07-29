import os
from pymongo import MongoClient
from bson import ObjectId

MONGO_URI = os.getenv("MONGO_DB_URL", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["LuanVanDB"]
job_post_col = db["JobPost"]
job_post_skill_col = db["JobPostSkillsRequirement"]
skill_col = db["SkillsRequirement"]

def get_jd_text_and_skills(job_id):
    try:
        job_post = job_post_col.find_one({"_id": ObjectId(job_id), "deleted": False})
        if not job_post:
            return "", []

        jd_text = (job_post.get("description", "") + "\n" +
                   job_post.get("requirements", ""))

        skill_links = job_post_skill_col.find({"job_post_id": ObjectId(job_id), "deleted": False})
        skill_ids = [link["skills_requirement_id"] for link in skill_links]

        skills = [s["name"] for s in skill_col.find({"_id": {"$in": skill_ids}, "deleted": False})]

        return jd_text, skills
    except Exception as e:
        print("Lỗi khi lấy JD và kỹ năng từ database:", e)
        return "", []

def compare_cv_with_jd(cv_text, jd_text):
    jd_words = jd_text.lower().split()
    matched = [kw for kw in jd_words if kw in cv_text.lower()]
    missing = [kw for kw in jd_words if kw not in cv_text.lower()]
    return {"matched_keywords": matched, "missing_keywords": missing}