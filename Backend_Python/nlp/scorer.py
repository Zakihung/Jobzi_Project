def compute_match_score(cv_skills, jd_skills):
    """Tính điểm khớp giữa kỹ năng CV và JD."""
    try:
        # Làm phẳng danh sách kỹ năng nếu có danh sách lồng nhau
        cv_skills_flat = []
        jd_skills_flat = []

        for skill in cv_skills:
            if isinstance(skill, list):
                cv_skills_flat.extend(skill)
            else:
                cv_skills_flat.append(skill)

        for skill in jd_skills:
            if isinstance(skill, list):
                jd_skills_flat.extend(skill)
            else:
                jd_skills_flat.append(skill)

        # Chuẩn hóa: chuyển về chữ thường và loại bỏ khoảng trắng thừa
        cv_skills_flat = [str(skill).strip().lower() for skill in cv_skills_flat]
        jd_skills_flat = [str(skill).strip().lower() for skill in jd_skills_flat]

        # Tính tập hợp giao nhau
        matched = set(cv_skills_flat).intersection(set(jd_skills_flat))
        total_jd_skills = len(set(jd_skills_flat))

        if not matched or total_jd_skills == 0:
            match_score = 0.0
        else:
            # Tính điểm: 30 điểm khởi đầu + điểm phân bổ theo từng kỹ năng khớp
            base_score = 30
            per_skill_score = 80 / total_jd_skills
            match_score = base_score + per_skill_score * len(matched)
            match_score = min(match_score, 100)  # Giới hạn tối đa 100

        return {
            "match_score": round(match_score, 2),
            "matched_skills": list(matched),
            "missing_skills": list(set(jd_skills_flat) - set(cv_skills_flat))
        }
    except Exception as e:
        print(f"Lỗi khi tính điểm khớp: {e}")
        return {
            "match_score": 0.0,
            "matched_skills": [],
            "missing_skills": []
        }
