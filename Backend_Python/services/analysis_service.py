import re
from pymongo import MongoClient
from dotenv import load_dotenv
from typing import Dict, List
import os
from bson import ObjectId
from services.classification_service import ClassificationService
from datetime import datetime
from pymongo.errors import ConnectionFailure

# Load environment variables from .env file
load_dotenv()

class AnalysisService:
    @staticmethod
    async def analyze_cv(cv_id: str, text: str, job_post_id: str) -> Dict:
        try:
            if not text:
                raise ValueError("Text input cannot be empty")
            if not ObjectId.is_valid(job_post_id):
                raise ValueError("job_post_id is not a valid ObjectId")

            # Get MongoDB URL from environment variables
            mongo_url = os.getenv("MONGO_DB_URL")
            if not mongo_url:
                raise ValueError("MONGO_DB_URL not found in environment variables. Ensure .env file is configured correctly.")

            # Connect to MongoDB
            try:
                client = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
                # Test connection
                client.admin.command('ping')
                db = client["LuanVanDB"]
            except ConnectionFailure as e:
                raise Exception(f"Failed to connect to MongoDB: {str(e)}")

            # Get job post details
            job_post = db["JobPost"].find_one({"_id": ObjectId(job_post_id)})
            if not job_post:
                raise Exception("Không tìm thấy tin tuyển dụng")

            # Get required skills from JobPostSkillsRequirement
            job_post_skills = db["JobPostSkillsRequirement"].find({"job_post_id": ObjectId(job_post_id)})
            required_skill_ids = [skill["skills_requirement_id"] for skill in job_post_skills]
            required_skills = []
            if required_skill_ids:
                skills_data = db["SkillsRequirement"].find({"_id": {"$in": required_skill_ids}})
                required_skills = [skill["name"].lower() for skill in skills_data]

            # Get experience and education requirements
            min_years_experience = job_post.get("min_years_experience", 0)
            education_level = job_post.get("education_level", "").lower()

            # Classify CV to extract details
            classified_data = await ClassificationService.classify_cv(cv_id, text)
            skills_found = classified_data["skills"]
            education_found = classified_data["education"]
            work_experiences = classified_data["work_experience"]
            total_experience = classified_data["total_experience"]

            # Load skills from dataset/skills.csv
            skills_csv = ClassificationService.load_skills_csv()
            for skill in skills_csv:
                if skill not in [s["name"] for s in skills_found] and re.search(rf"\b{re.escape(skill)}\b", text.lower()):
                    proficiency = "Trung bình"
                    if any(keyword in text.lower() for keyword in ["nâng cao", "chuyên gia", "expert", "advanced"]):
                        proficiency = "Nâng cao"
                    elif any(keyword in text.lower() for keyword in ["cơ bản", "beginner", "basic"]):
                        proficiency = "Cơ bản"
                    skills_found.append({"name": skill, "proficiency": proficiency})

            # Identify strengths
            strengths = []
            for skill in skills_found:
                if skill["name"] in required_skills:
                    strengths.append({
                        "description": f"Sở hữu kỹ năng {skill['name']} phù hợp với yêu cầu công việc",
                        "related_to": "skills"
                    })
            if total_experience >= min_years_experience:
                strengths.append({
                    "description": f"Có {total_experience} năm kinh nghiệm, đáp ứng yêu cầu {min_years_experience} năm",
                    "related_to": "work_experience"
                })
            if education_level and any(education_level in ed["degree"].lower() for ed in education_found):
                strengths.append({
                    "description": f"Trình độ học vấn phù hợp với yêu cầu ({education_level})",
                    "related_to": "education"
                })

            # Identify weaknesses
            weaknesses = []
            for skill in required_skills:
                if not any(s["name"] == skill for s in skills_found):
                    weaknesses.append({
                        "description": f"Thiếu kỹ năng {skill} theo yêu cầu công việc",
                        "related_to": "skills"
                    })
            if total_experience < min_years_experience:
                weaknesses.append({
                    "description": f"Chỉ có {total_experience} năm kinh nghiệm, không đạt yêu cầu {min_years_experience} năm",
                    "related_to": "work_experience"
                })
            if education_level and not any(education_level in ed["degree"].lower() for ed in education_found):
                weaknesses.append({
                    "description": f"Trình độ học vấn không đáp ứng yêu cầu ({education_level})",
                    "related_to": "education"
                })

            # Identify job match and mismatch
            job_match = []
            job_mismatch = []
            for skill in skills_found:
                if skill["name"] in required_skills:
                    job_match.append({
                        "criteria": f"Kỹ năng {skill['name']}",
                        "description": f"Kỹ năng {skill['name']} phù hợp với yêu cầu công việc"
                    })
                else:
                    job_mismatch.append({
                        "criteria": f"Kỹ năng {skill['name']}",
                        "description": f"Kỹ năng {skill['name']} không được yêu cầu trong công việc"
                    })
            if total_experience >= min_years_experience:
                job_match.append({
                    "criteria": "Kinh nghiệm làm việc",
                    "description": f"Kinh nghiệm {total_experience} năm đáp ứng yêu cầu"
                })
            else:
                job_mismatch.append({
                    "criteria": "Kinh nghiệm làm việc",
                    "description": f"Kinh nghiệm {total_experience} năm không đạt yêu cầu {min_years_experience} năm"
                })
            if education_level and any(education_level in ed["degree"].lower() for ed in education_found):
                job_match.append({
                    "criteria": "Trình độ học vấn",
                    "description": f"Trình độ học vấn phù hợp với yêu cầu ({education_level})"
                })
            else:
                job_mismatch.append({
                    "criteria": "Trình độ học vấn",
                    "description": f"Trình độ học vấn không đáp ứng yêu cầu ({education_level})"
                })

            # Calculate match score (out of 100)
            match_score = 0
            if required_skills:
                matched_skills = len([s for s in skills_found if s["name"] in required_skills])
                match_score += (matched_skills / len(required_skills)) * 60  # Skills: 60%
            if min_years_experience > 0:
                experience_score = min((total_experience / min_years_experience) * 30, 30)  # Experience: 30%
                match_score += experience_score
            if education_level and any(education_level in ed["degree"].lower() for ed in education_found):
                match_score += 10  # Education: 10%
            match_score = min(round(match_score), 100)

            # Generate suggestions
            suggestions = []
            for weakness in weaknesses:
                if weakness["related_to"] == "skills":
                    suggestions.append({
                        "section": "skills",
                        "suggestion": f"Bổ sung kỹ năng {weakness['description'].split(' ')[2]} vào CV hoặc tham gia khóa học để cải thiện"
                    })
                elif weakness["related_to"] == "work_experience":
                    suggestions.append({
                        "section": "work_experience",
                        "suggestion": "Tích lũy thêm kinh nghiệm làm việc hoặc bổ sung các dự án liên quan"
                    })
                elif weakness["related_to"] == "education":
                    suggestions.append({
                        "section": "education",
                        "suggestion": f"Bổ sung trình độ học vấn ({education_level}) hoặc các chứng chỉ tương đương"
                    })
            if not education_found:
                suggestions.append({
                    "section": "education",
                    "suggestion": "Thêm thông tin về trình độ học vấn vào CV"
                })
            if not skills_found:
                suggestions.append({
                    "section": "skills",
                    "suggestion": "Thêm các kỹ năng liên quan đến công việc vào CV, ví dụ: python, javascript"
                })
            if not work_experiences:
                suggestions.append({
                    "section": "work_experience",
                    "suggestion": "Thêm thông tin về kinh nghiệm làm việc hoặc các dự án đã tham gia"
                })

            # Close MongoDB connection
            client.close()

            return {
                "strengths": strengths,
                "weaknesses": weaknesses,
                "job_match": job_match,
                "job_mismatch": job_mismatch,
                "match_score": match_score,
                "suggestions": suggestions,
                "analyzed_at": datetime.now().isoformat()
            }
        except Exception as e:
            return {
                "strengths": [],
                "weaknesses": [],
                "job_match": [],
                "job_mismatch": [],
                "match_score": 0,
                "suggestions": [],
                "analyzed_at": None,
                "status": "failed",
                "error_message": str(e)
            }