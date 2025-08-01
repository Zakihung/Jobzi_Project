import pdfplumber
import re
from typing import List


def clean_text(text: str) -> str:
    """
    Làm sạch văn bản: loại bỏ ký tự đặc biệt không cần thiết, giữ lại cấu trúc văn bản.
    """
    # Loại bỏ các ký tự Unicode không mong muốn, nhưng giữ lại các ký tự chữ cái, số, dấu câu
    text = re.sub(r'[^\w\s.,;:!?()\[\]{}\-\'\"/@]', '', text)
    # Chuẩn hóa khoảng trắng và dòng mới
    text = re.sub(r'\s+', ' ', text).strip()
    # Thay thế các bullet points bằng ký tự phân cách rõ ràng
    text = re.sub(r'[\u2022\u25CF]', ' - ', text)
    return text


def extract_text_from_pdf(file_path: str) -> str:
    """
    Trích xuất văn bản từ file PDF, đảm bảo không mất chữ và ngăn cách bằng '\n'.
    """
    try:
        extracted_text: List[str] = []
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                # Trích xuất văn bản chính
                text = page.extract_text()
                if text:
                    # Làm sạch và chia thành các dòng
                    cleaned_lines = [clean_text(line) for line in text.split('\n') if line.strip()]
                    extracted_text.extend(cleaned_lines)

                # Nếu extract_text không đủ, thử extract_words để lấy chi tiết hơn
                if not text or len(text.strip()) < 10:  # Nếu văn bản quá ngắn, thử phương pháp khác
                    words = page.extract_words()
                    if words:
                        # Nhóm các từ theo dòng dựa trên tọa độ y
                        current_line = []
                        last_y = None
                        for word in words:
                            y = word['top']
                            if last_y is None or abs(y - last_y) < 5:  # Ngưỡng để nhóm thành dòng
                                current_line.append(word['text'])
                            else:
                                if current_line:
                                    extracted_text.append(clean_text(' '.join(current_line)))
                                current_line = [word['text']]
                            last_y = y
                        if current_line:  # Thêm dòng cuối cùng
                            extracted_text.append(clean_text(' '.join(current_line)))

        # Loại bỏ các dòng trống và nối bằng '\n'
        return '\n'.join(line for line in extracted_text if line)

    except Exception as e:
        return f"Error extracting PDF: {str(e)}"