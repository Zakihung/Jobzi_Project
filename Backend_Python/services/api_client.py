import requests
import os

NODE_API_URL = os.getenv("NODE_API_URL", "http://localhost:1212")

def update_analysis_document(analysis_id, data):
    try:
        res = requests.patch(f"{NODE_API_URL}/api/resume-analysis/{analysis_id}", json=data)
        return res.status_code, res.json()
    except Exception as e:
        return 500, {"error": str(e)}