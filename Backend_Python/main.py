from flask import Flask, request, jsonify
from nlp.extractor import extract_fields_from_text
from nlp.comparator import compare_cv_with_jd, get_jd_text_and_skills
from nlp.scorer import compute_match_score
from nlp.improver import suggest_improvements
from dotenv import load_dotenv
from services.pdf_reader import extract_text_from_pdf
import os

load_dotenv()

app = Flask(__name__)

@app.route("/cv/extract", methods=["POST"])
def extract_cv_text():

    if 'file' not in request.files:
        return jsonify({"status": "failed", "error_message": "Missing file"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"status": "failed", "error_message": "Empty filename"}), 400

    try:
        text = extract_text_from_pdf(file)
        return jsonify({"status": "success", "raw_text": text})
    except Exception as e:
        return jsonify({"status": "failed", "error_message": str(e)}), 500

@app.route("/cv/classify/<cv_id>", methods=["POST"])
def classify(cv_id):
    text = request.json.get("text", "")
    extracted = extract_fields_from_text(text)
    return jsonify(extracted)

@app.route("/cv/analyze/<cv_id>/<job_id>", methods=["POST"])
def analyze(cv_id, job_id):
    text = request.json.get("text", "")

    # Truy xuất JD text và danh sách kỹ năng từ database
    jd_text, jd_skills = get_jd_text_and_skills(job_id)

    jd_matching = compare_cv_with_jd(text, jd_text)
    extracted = extract_fields_from_text(text)

    # So khớp kỹ năng CV với kỹ năng JD
    cv_skill_names = [s['name'] for s in extracted["skills"]]
    score = compute_match_score(cv_skill_names, jd_skills)
    suggestions = suggest_improvements(extracted, jd_matching)

    return jsonify({
        "jd_matching": jd_matching,
        "strengths": [{"description": "Có kỹ năng phù hợp", "related_to": "skills"}],
        "weaknesses": [{"description": "Thiếu kỹ năng JD yêu cầu", "related_to": "skills"}],
        "match_score": score,
        "suggestions": suggestions
    })

if __name__ == "__main__":
    port = int(os.getenv("PORT", 1213))
    app.run(host="0.0.0.0", port=port, debug=True)