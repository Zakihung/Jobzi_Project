from fastapi import FastAPI, UploadFile, File, HTTPException
from services.extraction_service import ExtractionService
from services.classification_service import ClassificationService
from services.analysis_service import AnalysisService
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class CVText(BaseModel):
    text: str

@app.post("/cv/extract/")
async def extract_cv(file: UploadFile = File(...)):
    try:
        result = await ExtractionService.extract_cv(file)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/cv/classify/{cv_id}")
async def classify_cv(cv_id: str, cv_text: CVText):
    try:
        result = await ClassificationService.classify_cv(cv_id, cv_text.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/cv/analyze/{cv_id}/{job_post_id}")
async def analyze_cv(cv_id: str, job_post_id: str, cv_text: CVText):
    try:
        result = await AnalysisService.analyze_cv(cv_id, cv_text.text, job_post_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=1213)