from nlp.skills_list import ALL_SKILLS

def suggest_improvements(extracted_fields, jd_matching):
    """
    Đưa ra gợi ý cải thiện CV dựa trên thông tin trích xuất và kết quả so sánh JD.
    """
    suggestions = []

    # Gợi ý về kỹ năng còn thiếu
    missing_skills = jd_matching.get("missing_skills", [])
    if missing_skills:
        skill_suggestion = (
            f"Bổ sung các kỹ năng sau để đáp ứng tốt hơn yêu cầu công việc: {', '.join(missing_skills)}. "
            "Bạn có thể nâng cao những kỹ năng này thông qua các khóa đào tạo chuyên môn, hội thảo hoặc học trực tuyến trên các nền tảng uy tín. "
            f"Ví dụ, hãy bắt đầu với việc trau dồi kỹ năng '{missing_skills[0]}'."
        )
        suggestions.append({
            "section": "skills",
            "suggestion": skill_suggestion
        })

    # Gợi ý về từ khóa kỹ thuật trong JD (phổ quát hơn)
    missing_keywords = jd_matching.get("missing_keywords", [])
    technical_keywords = [kw for kw in missing_keywords if kw in ALL_SKILLS]
    if technical_keywords:
        keyword_suggestion = (
            f"Xem xét bổ sung kinh nghiệm, hoạt động hoặc chứng chỉ liên quan đến: {', '.join(technical_keywords)}. "
            "Hãy thể hiện rõ những kỹ năng này qua mô tả công việc, dự án hoặc thành tích cụ thể trong CV."
        )
        suggestions.append({
            "section": "skills",
            "suggestion": keyword_suggestion
        })

    # Gợi ý về dự án
    projects = extracted_fields.get("projects", [])
    if not projects:
        suggestions.append({
            "section": "projects",
            "suggestion": (
                "Cân nhắc bổ sung các dự án bạn từng thực hiện trong công việc, học tập hoặc hoạt động ngoại khóa. "
                f"Các dự án liên quan đến kỹ năng như {', '.join(missing_skills[:2]) if missing_skills else 'yêu cầu công việc'} sẽ giúp CV nổi bật hơn."
            )
        })
    elif len(projects) < 2:
        suggestions.append({
            "section": "projects",
            "suggestion": (
                "Thêm ít nhất một dự án khác vào CV để thể hiện khả năng thực hành. "
                "Nên mô tả rõ mục tiêu, vai trò của bạn và kết quả đạt được trong từng dự án."
            )
        })

    # Gợi ý về kinh nghiệm làm việc
    work_experience = extracted_fields.get("work_experience", [])
    if not work_experience:
        suggestions.append({
            "section": "work_experience",
            "suggestion": (
                "Bổ sung kinh nghiệm làm việc, thực tập hoặc tham gia hoạt động liên quan đến lĩnh vực bạn ứng tuyển. "
                "Nếu chưa có, hãy nêu các công việc tình nguyện, cộng tác hoặc dự án có liên quan."
            )
        })
    elif len(work_experience) < 2:
        suggestions.append({
            "section": "work_experience",
            "suggestion": (
                "Hãy trình bày chi tiết hơn về kinh nghiệm làm việc của bạn, nhấn mạnh các nhiệm vụ đã thực hiện, kết quả đạt được "
                f"và các kỹ năng như {', '.join(missing_skills[:2]) if missing_skills else 'liên quan đến công việc'} đã áp dụng."
            )
        })

    # Gợi ý về chứng chỉ
    certifications = extracted_fields.get("certifications", [])
    if not certifications and missing_skills:
        suggestions.append({
            "section": "certifications",
            "suggestion": (
                f"Xem xét lấy chứng chỉ liên quan đến các kỹ năng như {', '.join(missing_skills[:2]) if missing_skills else 'kỹ năng chuyên môn cần thiết'}. "
                "Bạn có thể tìm các khóa học từ các tổ chức đào tạo hoặc trung tâm giáo dục uy tín trong lĩnh vực của mình."
            )
        })

    # Gợi ý về cách trình bày CV
    if extracted_fields.get("formatting_needs_improvement", False):
        suggestions.append({
            "section": "formatting",
            "suggestion": (
                "Hãy đảm bảo CV trình bày rõ ràng, dễ đọc và có cấu trúc hợp lý. Sử dụng các tiêu đề nổi bật, trình bày nhất quán, "
                "kiểm tra lỗi chính tả và đảm bảo thông tin quan trọng được nhấn mạnh."
            )
        })

    # Gợi ý chung nếu không có đề xuất cụ thể
    if not suggestions:
        suggestions.append({
            "section": "general",
            "suggestion": (
                "Hãy chắc chắn rằng CV của bạn thể hiện rõ những điểm mạnh, kỹ năng và kinh nghiệm phù hợp với vị trí ứng tuyển. "
                "Nên tùy chỉnh CV để phù hợp với từng mô tả công việc cụ thể."
            )
        })

    return suggestions
