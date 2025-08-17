from flask import Flask, request, jsonify
from nlp.extractor import extract_fields_from_text
from nlp.comparator import compare_cv_with_jd, get_jd_text_and_skills
from nlp.scorer import compute_match_score
from nlp.improver import suggest_improvements
from dotenv import load_dotenv
from services.pdf_reader import extract_text_from_pdf
import os
from bson import ObjectId
from datetime import datetime

load_dotenv()

app = Flask(__name__)


@app.route("/health", methods=["GET"])
def health_check():
    """Kiểm tra trạng thái server."""
    return jsonify({"status": "success", "message": "Server is running", "timestamp": datetime.now().isoformat()})


@app.route("/cv/extract", methods=["POST"])
def extract_cv_text():
    """Trích xuất văn bản từ file PDF."""
    if 'file' not in request.files:
        return jsonify({"status": "failed", "error_message": "Missing file in request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"status": "failed", "error_message": "Empty filename"}), 400

    try:
        text = extract_text_from_pdf(file)
        return jsonify({"status": "success", "raw_text": text})
    except Exception as e:
        return jsonify({"status": "failed", "error_message": str(e)}), 500


@app.route("/cv/classify", methods=["POST"])
def classify_cv():
    """Phân loại thông tin từ văn bản CV."""
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"status": "failed", "error_message": "Missing 'text' in request body"}), 400

    try:
        extracted = extract_fields_from_text(data["text"])
        return jsonify(extracted)
    except Exception as e:
        return jsonify({"status": "failed", "error_message": str(e)}), 500


@app.route("/cv/analyze/<cv_id>/<job_id>", methods=["POST"])
def analyze(cv_id, job_id):
    try:
        # Kiểm tra định dạng job_id
        if not ObjectId.is_valid(job_id):
            return jsonify({"status": "failed", "error_message": "Định dạng job_id không hợp lệ"}), 400

        text = request.json.get("text", "")
        extracted_fields = request.json.get("extracted_fields", None)
        if not text:
            return jsonify({"status": "failed", "error_message": "Thiếu văn bản CV trong yêu cầu"}), 400
        if not extracted_fields:
            extracted = extract_fields_from_text(text)
            if not extracted or extracted.get("status") != "success":
                return jsonify({"status": "failed", "error_message": "Không thể trích xuất thông tin từ CV"}), 500
            extracted_fields = extracted.get("extracted", {})

        # Truy xuất JD text, kỹ năng, kinh nghiệm và học vấn từ database
        jd_text, jd_skills, min_years_experience, education_level = get_jd_text_and_skills(job_id)
        if not jd_text:
            return jsonify({"status": "failed", "error_message": "Không tìm thấy hoặc bài đăng công việc đã bị xóa"}), 404

        # Lấy danh sách kỹ năng từ CV
        cv_skill_names = []
        skills = extracted_fields.get("skills", [])
        for skill in skills:
            if isinstance(skill, dict) and 'name' in skill:
                if isinstance(skill['name'], list):
                    cv_skill_names.extend(skill['name'])
                else:
                    cv_skill_names.append(skill['name'])
            elif isinstance(skill, str):
                cv_skill_names.append(skill)
            elif isinstance(skill, list):
                cv_skill_names.extend(skill)

        # Tính tổng số năm kinh nghiệm từ work_experience
        total_experience = 0
        for exp in extracted_fields.get("work_experience", []):
            duration = exp.get("duration", "")
            if duration and isinstance(duration, str):
                try:
                    # Xử lý định dạng "YYYY - YYYY" hoặc "YYYY - hiện tại"
                    years = duration.split("-")
                    if len(years) == 2:
                        start_year = int(years[0].strip())
                        end_year_str = years[1].strip()
                        end_year = int(end_year_str) if end_year_str.isdigit() else datetime.now().year
                        total_experience += end_year - start_year
                except (ValueError, TypeError):
                    continue

        # So sánh CV với JD
        jd_matching = compare_cv_with_jd(
            text,
            jd_text,
            cv_skills=cv_skill_names,
            jd_skills=jd_skills,
            cv_experience={
                "total_experience": total_experience,
                "min_years_experience": min_years_experience,
                "education_level": education_level
            },
            cv_education=extracted_fields.get("education", []),
            extracted_fields=extracted_fields  # Truyền thêm extracted_fields
        )

        # Tính điểm khớp
        score = compute_match_score(cv_skill_names, jd_skills, jd_matching.get("cosine_similarity", 0.0))

        # Gợi ý cải thiện
        suggestions = suggest_improvements(extracted_fields, jd_matching)

        return jsonify({
            "jd_matching": jd_matching,
            "match_score": score,
            "suggestions": suggestions,
            "status": "success",
            "analyzed_at": datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            "jd_matching": {
                "cosine_similarity": 0.0,
                "matched_keywords": [],
                "missing_keywords": [],
                "matched_skills": [],
                "missing_skills": [],
                "strengths": [],
                "weaknesses": [],
                "job_match": [],
                "job_mismatch": [],
                "analyzed_at": None
            },
            "match_score": 0,
            "suggestions": [],
            "status": "failed",
            "error_message": f"Lỗi khi phân tích CV: {str(e)}"
        }), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 1213))
    app.run(host="0.0.0.0", port=port, debug=True)