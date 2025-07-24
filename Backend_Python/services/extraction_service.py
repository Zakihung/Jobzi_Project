import io
import PyPDF2
import pdfplumber
from fastapi import UploadFile, HTTPException
from datetime import datetime

class ExtractionService:
    @staticmethod
    async def extract_cv(file: UploadFile) -> dict:
        try:
            # Kiểm tra định dạng file
            if not file.filename.lower().endswith('.pdf'):
                raise HTTPException(status_code=400, detail="File phải là định dạng PDF")

            # Đọc nội dung file
            content = await file.read()
            file_stream = io.BytesIO(content)

            # Kiểm tra xem file có phải PDF hợp lệ không
            try:
                PyPDF2.PdfReader(file_stream)
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"File PDF không hợp lệ: {str(e)}")

            # Reset con trỏ file
            file_stream.seek(0)

            # Trích xuất văn bản bằng pdfplumber
            text = ""
            with pdfplumber.open(file_stream) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"

            if not text.strip():
                raise HTTPException(status_code=400, detail="Không thể trích xuất văn bản từ file PDF")

            return {
                "raw_text": text,
                "extracted_at": datetime.now().isoformat(),
                "status": "success"
            }

        except HTTPException as e:
            raise e
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Lỗi trích xuất CV: {str(e)}")