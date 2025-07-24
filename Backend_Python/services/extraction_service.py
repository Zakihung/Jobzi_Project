import pdfplumber
from io import BytesIO, StringIO
from fastapi import HTTPException
from datetime import datetime
from underthesea import text_normalize
from pdfminer.high_level import extract_text_to_fp

class ExtractionService:
    @staticmethod
    async def extract_cv(file):
        try:
            # Kiểm tra định dạng file
            if not file.filename.lower().endswith('.pdf'):
                raise HTTPException(status_code=400, detail="File phải là định dạng PDF")

            # Đọc dữ liệu bytes từ file upload
            file_content = await file.read()

            # Khởi tạo văn bản
            text = ""

            # Sử dụng pdfplumber để trích xuất văn bản
            with pdfplumber.open(BytesIO(file_content)) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + " "

            # Sử dụng pdfminer.six để trích xuất văn bản bổ sung
            output_string = StringIO()
            extract_text_to_fp(BytesIO(file_content), output_string)
            pdfminer_text = output_string.getvalue()
            if pdfminer_text:
                text += " " + pdfminer_text

            # Chuẩn hóa văn bản tiếng Việt
            text = text_normalize(text)  # Chuẩn hóa với underthesea
            text = ' '.join(text.split())  # Loại bỏ khoảng trắng thừa

            # Kiểm tra nếu không trích xuất được văn bản
            if not text:
                raise ValueError("Không thể trích xuất nội dung từ PDF")

            return {
                "raw_text": text,
                "extracted_at": datetime.now().isoformat(),
                "status": "success"
            }

        except ValueError as ve:
            raise HTTPException(status_code=422, detail=str(ve))
        except Exception as e:
            error_message = str(e)
            if "Invalid PDF" in error_message:
                error_message = "File PDF không hợp lệ hoặc bị hỏng"
            elif "encrypted" in error_message:
                error_message = "File PDF bị mã hóa, vui lòng cung cấp PDF không khóa"
            raise HTTPException(status_code=500, detail={
                "status": "failed",
                "error_message": error_message
            })