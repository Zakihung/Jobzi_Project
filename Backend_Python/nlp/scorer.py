from nlp.comparator import normalize_and_flatten_skills


def compute_match_score(cv_skills, jd_skills, cosine_similarity):
    """Tính điểm khớp giữa kỹ năng CV và JD theo tỷ lệ phần trăm."""
    try:
        cv_skills_flat = normalize_and_flatten_skills(cv_skills)
        jd_skills_flat = normalize_and_flatten_skills(jd_skills)
        cv_skills_set = set(cv_skills_flat)
        jd_skills_set = set(jd_skills_flat)

        matched = list(cv_skills_set.intersection(jd_skills_set))

        # Thêm match theo substring để giống comparator.py
        for cv_skill in cv_skills_flat:
            for jd_skill in jd_skills_flat:
                if cv_skill in jd_skill or jd_skill in cv_skill:
                    if cv_skill not in matched and jd_skill not in matched:
                        matched.append(jd_skill)

        total_jd_skills = len(jd_skills_set)
        print(f"Matched skills: {matched}")
        print(f"Total JD skills: {total_jd_skills}")

        if total_jd_skills == 0:
            return 0

        match_score = (len(matched) / total_jd_skills) * 80 + cosine_similarity * 20
        return int(round(match_score, 0))
    except Exception as e:
        print(f"Lỗi khi tính điểm khớp: {e}")
        return 0