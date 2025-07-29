def suggest_improvements(extracted_fields, jd_matching):
    suggestions = []
    if len(jd_matching.get("missing_keywords", [])) > 0:
        suggestions.append({
            "section": "skills",
            "suggestion": "Bổ sung kỹ năng còn thiếu trong mô tả công việc."
        })
    if not extracted_fields.get("projects"):
        suggestions.append({"section": "projects", "suggestion": "Nên thêm các dự án cá nhân hoặc học thuật."})
    if not extracted_fields.get("work_experience"):
        suggestions.append({"section": "work_experience", "suggestion": "Kinh nghiệm làm việc nên được làm nổi bật hơn."})
    return suggestions