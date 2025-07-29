def compute_match_score(cv_skills, jd_skills):
    matched = set(cv_skills).intersection(set(jd_skills))
    return int(len(matched) / max(len(jd_skills), 1) * 100)