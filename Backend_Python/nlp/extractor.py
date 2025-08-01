import re
import os
import logging
import pandas as pd
import torch
import nltk
from underthesea import word_tokenize, text_normalize
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from torch.utils.data import Dataset
from sklearn.model_selection import train_test_split
from nlp.comparator import normalize_text
from models.keywords import KEYWORD_CATEGORIES

# Tải tài nguyên NLTK
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

# Thiết lập logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Danh sách stop words tiếng Việt
STOP_WORDS = {
    "và", "của", "cho", "là", "để", "trong", "với", "có", "được", "không", "tại", "từ", "trên",
    "dưới", "giữa", "khi", "nếu", "hoặc", "nhưng", "thì", "mà", "bởi", "vì", "nên", "do",
    "cũng", "đã", "đang", "sẽ", "vẫn", "chưa", "lại", "mới", "vừa", "ngay", "luôn", "thường",
    "hay", "đều", "rất", "quá", "lắm", "hết", "cả", "mọi", "mỗi", "nhiều", "ít", "hơn", "kém"
}

def preprocess_text(text):
    """Chuẩn hóa văn bản tiếng Việt và tách dòng chính xác hơn."""
    try:
        # Tách văn bản thành các dòng cơ bản
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        merged_lines = []
        buffer = ""

        # Danh sách các tiêu đề cần tách riêng
        section_headers = {
            "mục tiêu nghề nghiệp", "kinh nghiệm làm việc", "thông tin cá nhân",
            "học vấn", "kỹ năng", "danh hiệu và giải thưởng", "chứng chỉ",
            "hoạt động", "sở thích", "người giới thiệu", "dự án"
        }

        # Regex cho các trường đặc biệt
        email_regex = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
        phone_regex = r"(0|\+84)\s*[0-9]{9,10}|\(\d{3,4}\)\s*[0-9]{7,8}"
        name_regex = r"^(?:[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲÝỸỶỴ][a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳýỹỷỵ]*\s){1,3}[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲÝỸỶỴ][a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳýỹỷỵ]*$"

        for line in lines:
            normalized_line = text_normalize(line.lower())
            tokens = word_tokenize(normalized_line)
            tokens = [t for t in tokens if t not in STOP_WORDS]

            # Loại bỏ dòng chỉ có 1 chữ không mang ngữ nghĩa
            if len(tokens) <= 1 and (tokens[0] in STOP_WORDS or re.match(r"[\W]+", tokens[0])):
                logger.debug(f"Bỏ qua dòng không mang ngữ nghĩa: {tokens}")
                continue

            # Tách số điện thoại, email hoặc tên riêng nếu xuất hiện trong dòng
            phone_match = re.search(phone_regex, line, re.IGNORECASE)
            email_match = re.search(email_regex, line, re.IGNORECASE)
            name_match = re.match(name_regex, line, re.IGNORECASE)

            # Tách tiêu đề nếu dòng chứa tiêu đề
            found_header = None
            for header in section_headers:
                if header in normalized_line:
                    found_header = header
                    break

            if found_header:
                # Tách tiêu đề và phần còn lại
                header_index = normalized_line.find(found_header)
                before_header = line[:header_index].strip()
                after_header = line[header_index + len(found_header):].strip()

                if before_header:
                    if re.match(name_regex, before_header, re.IGNORECASE):
                        merged_lines.append(before_header)
                    elif re.match(phone_regex, before_header, re.IGNORECASE):
                        merged_lines.append(before_header)
                    elif re.match(email_regex, before_header, re.IGNORECASE):
                        merged_lines.append(before_header)
                    else:
                        buffer += " " + before_header if buffer else before_header
                merged_lines.append(found_header.title())
                if after_header:
                    buffer = after_header
                continue

            # Tách số điện thoại nếu có
            if phone_match:
                phone_number = phone_match.group(0)
                merged_lines.append(phone_number)
                remaining_text = line.replace(phone_number, "").strip()
                if remaining_text:
                    buffer = remaining_text
                continue

            # Tách email nếu có
            if email_match:
                email = email_match.group(0)
                merged_lines.append(email)
                remaining_text = line.replace(email, "").strip()
                if remaining_text:
                    buffer = remaining_text
                continue

            # Tách tên nếu có
            if name_match and len(line.split()) <= 4:
                merged_lines.append(line)
                continue

            # Gộp dòng ngắn hoặc không mang ngữ nghĩa vào buffer
            if buffer and len(buffer.split()) < 4 and not any(keyword in normalized_line for keyword in
                                                              KEYWORD_CATEGORIES["career_objective"] + KEYWORD_CATEGORIES[
                                                                  "experience"] + KEYWORD_CATEGORIES["skills_technology"] +
                                                              KEYWORD_CATEGORIES["skills_soft"] + KEYWORD_CATEGORIES[
                                                                  "awards"]):
                buffer += " " + line
            else:
                if buffer:
                    merged_lines.append(buffer)
                buffer = line

        # Thêm dòng cuối cùng trong buffer nếu có
        if buffer:
            merged_lines.append(buffer)

        # Loại bỏ các dòng chỉ có dấu câu hoặc không mang ngữ nghĩa
        final_lines = []
        for line in merged_lines:
            tokens = word_tokenize(line)
            if len(tokens) <= 1 and re.match(r"[\W]+", tokens[0]):
                logger.debug(f"Bỏ qua dòng không mang ngữ nghĩa: {line}")
                continue
            final_lines.append(line)

        return final_lines
    except Exception as e:
        logger.error(f"Lỗi trong preprocess_text: {str(e)}")
        return []

class CVDataset(Dataset):
    """Dataset tùy chỉnh cho dữ liệu CV."""
    def __init__(self, texts, labels, tokenizer, max_length=64):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = self.texts[idx]
        label = self.labels[idx]
        tokenized_text = word_tokenize(text)
        encoding = self.tokenizer(
            " ".join(tokenized_text),
            padding='max_length',
            truncation=True,
            max_length=self.max_length,
            return_tensors='pt'
        )
        return {
            'input_ids': encoding['input_ids'].squeeze(),
            'attention_mask': encoding['attention_mask'].squeeze(),
            'labels': torch.tensor(label, dtype=torch.long)
        }

def train_phobert_model(df, model_path, tokenizer_path, max_length=64, epochs=3):
    """Huấn luyện mô hình PhoBERT."""
    try:
        logger.info("Bắt đầu huấn luyện mô hình PhoBERT")
        label_set = list(set(df['label']))
        label_to_id = {label: idx for idx, label in enumerate(label_set)}

        texts = df['text'].tolist()
        labels = [label_to_id[label] for label in df['label']]

        train_texts, val_texts, train_labels, val_labels = train_test_split(
            texts, labels, test_size=0.2, random_state=42
        )

        tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base")
        model = AutoModelForSequenceClassification.from_pretrained(
            "vinai/phobert-base",
            num_labels=len(label_set)
        )

        train_dataset = CVDataset(train_texts, train_labels, tokenizer, max_length)
        val_dataset = CVDataset(val_texts, val_labels, tokenizer, max_length)

        from transformers import TrainingArguments, Trainer
        training_args = TrainingArguments(
            output_dir='./results',
            num_train_epochs=epochs,
            per_device_train_batch_size=16,
            per_device_eval_batch_size=16,
            warmup_steps=200,
            weight_decay=0.01,
            logging_dir='./logs',
            logging_steps=50,
            eval_strategy="epoch",
            save_strategy="epoch",
            load_best_model_at_end=True,
            fp16=True if torch.cuda.is_available() else False
        )

        trainer = Trainer(
            model=model,
            args=training_args,
            train_dataset=train_dataset,
            eval_dataset=val_dataset
        )

        trainer.train()

        os.makedirs(model_path, exist_ok=True)
        model.save_pretrained(model_path)
        tokenizer.save_pretrained(tokenizer_path)
        logger.info("Lưu mô hình và tokenizer PhoBERT thành công")

        with open(os.path.join(model_path, 'labels.txt'), 'w') as f:
            for label in label_set:
                f.write(label + '\n')

        return model, tokenizer, label_set
    except Exception as e:
        logger.error(f"Lỗi khi huấn luyện mô hình PhoBERT: {str(e)}")
        raise

def extract_fields_from_text(text):
    """Trích xuất các trường thông tin từ văn bản CV."""
    try:
        logger.info("Bắt đầu quá trình trích xuất CV")

        base_dir = os.path.dirname(os.path.abspath(__file__))
        training_data_path = os.path.join(base_dir, '..', 'models', 'training_data.csv')
        logger.info(f"Thư mục hiện tại: {os.getcwd()}")
        logger.info(f"Đang cố gắng truy cập dữ liệu huấn luyện tại: {os.path.abspath(training_data_path)}")

        if not os.path.exists(training_data_path):
            logger.error(f"Không tìm thấy file dữ liệu huấn luyện: {training_data_path}")
            return {
                "status": "failed",
                "error_message": f"Không tìm thấy file dữ liệu huấn luyện: {training_data_path}"
            }

        model_path = os.path.join(base_dir, 'phobert_cv_classifier')
        tokenizer_path = os.path.join(base_dir, 'phobert_cv_classifier')
        if os.path.exists(model_path) and os.path.exists(tokenizer_path):
            try:
                tokenizer = AutoTokenizer.from_pretrained(tokenizer_path)
                model = AutoModelForSequenceClassification.from_pretrained(model_path)
                with open(os.path.join(model_path, 'labels.txt'), 'r') as f:
                    label_set = [line.strip() for line in f.readlines()]
                logger.info("Tải mô hình và tokenizer PhoBERT đã huấn luyện thành công")
            except Exception as e:
                logger.error(f"Lỗi khi tải mô hình PhoBERT: {str(e)}")
                return {
                    "status": "failed",
                    "error_message": f"Lỗi khi tải mô hình PhoBERT: {str(e)}"
                }
        else:
            logger.info("Huấn luyện mô hình PhoBERT mới")
            try:
                df = pd.read_csv(training_data_path)
                model, tokenizer, label_set = train_phobert_model(df, model_path, tokenizer_path)
            except Exception as e:
                logger.error(f"Lỗi khi huấn luyện mô hình PhoBERT: {str(e)}")
                return {
                    "status": "failed",
                    "error_message": f"Lỗi khi huấn luyện mô hình PhoBERT: {str(e)}"
                }

        # Tiền xử lý văn bản để gộp các dòng bị ngắt
        lines = preprocess_text(text)
        if not lines:
            logger.error("Không thể tiền xử lý văn bản CV")
            return {
                "status": "failed",
                "error_message": "Không thể tiền xử lý văn bản CV"
            }
        logger.info(f"Đang xử lý {len(lines)} dòng")

        predictions = []
        for line in lines:
            try:
                tokenized_text = word_tokenize(line)
                encoding = tokenizer(
                    " ".join(tokenized_text),
                    padding='max_length',
                    truncation=True,
                    max_length=64,
                    return_tensors='pt'
                )
                with torch.no_grad():
                    outputs = model(**encoding)
                    predicted_label_id = torch.argmax(outputs.logits, dim=1).item()
                    predictions.append(label_set[predicted_label_id])
            except Exception as e:
                logger.error(f"Lỗi khi phân loại dòng '{line}': {str(e)}")
                predictions.append("other")  # Gán nhãn mặc định nếu lỗi
        logger.info(f"Hoàn thành phân loại cho {len(predictions)} dòng")

        personal_info = {
            "name": [], "email": [], "phone": [], "address": [], "birth_date": [], "gender": [], "other": []
        }
        education, skills, projects, experience, hobbies, career_objective, certificates, awards, activities, references = [], [], [], [], [], [], [], [], [], []

        email_regex = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
        phone_regex = r"(0|\+84)\s*[0-9]{9,10}|\(\d{3,4}\)\s*[0-9]{7,8}"
        name_regex = r"^(?:[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲÝỸỶỴ][a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳýỹỷỵ]*\s){1,3}[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲÝỸỶỴ][a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳýỹỷỵ]*$"
        address_regex = r"(?:hà nội|sài gòn|đà nẵng|cần thơ|đống đa|an giang|quận \d+|tp\.?|thành phố|phường|ktx|xuân khánh|ninh kiều|cầu giấy|hai bà trưng|ba đình)[\w\s,]*"
        birth_date_regex = r"\d{2}/\d{2}/\d{4}"
        gender_regex = r"^(nam|nữ)$"
        duration_regex = r"(\d{4}\s*-\s*\d{4}|\d{4}\s*-\s*(?:nay|hiện tại)|\d{2}/\d{4}\s*-\s*\d{2}/\d{4}|\d{2}/\d{4}\s*-\s*(?:nay|hiện tại))"
        company_regex = r"(?:công ty|company)\s*(?:tnhh|cp|cổ phần)\s*[\w\s]+"
        year_regex = r"\d{4}"

        # Theo dõi ngữ cảnh và gộp references
        current_section = None
        reference_buffer = []
        previous_line = ""

        for i, (line, pred) in enumerate(zip(lines, predictions)):
            line_lower = line.lower()
            normalized_line = normalize_text(line)
            logger.debug(f"Xử lý dòng: {line}, Dự đoán: {pred}")

            # Kiểm tra tiêu đề để xác định danh mục
            section_headers = {
                "học vấn": "education",
                "kinh nghiệm làm việc": "experience",
                "mục tiêu nghề nghiệp": "career_objective",
                "kỹ năng": "skills",
                "hoạt động": "activities",
                "chứng chỉ": "certificates",
                "sở thích": "hobbies",
                "danh hiệu và giải thưởng": "awards",
                "người giới thiệu": "references",
                "dự án": "projects"
            }
            if normalized_line in section_headers:
                current_section = section_headers[normalized_line]
                logger.debug(f"Phát hiện danh mục: {current_section}")
                continue

            # Ưu tiên kiểm tra từ khóa từ KEYWORD_CATEGORIES
            keyword_match = None
            for category, keywords in KEYWORD_CATEGORIES.items():
                if isinstance(keywords, list):
                    if any(keyword in normalized_line for keyword in keywords):
                        keyword_match = category
                        break
                elif isinstance(keywords, dict):  # Xử lý skills_industry
                    for sub_category, sub_keywords in keywords.items():
                        if any(keyword in normalized_line for keyword in sub_keywords):
                            keyword_match = category
                            break
                    if keyword_match:
                        break

            final_pred = keyword_match if keyword_match else (current_section if current_section else pred)
            logger.debug(
                f"Dòng: {line}, Dự đoán: {pred}, Khớp từ khóa: {keyword_match}, Dự đoán cuối: {final_pred}")

            # Kiểm tra regex cho thông tin cá nhân
            if re.match(email_regex, line, re.IGNORECASE):
                personal_info["email"].append(line)
                logger.debug(f"Khớp email: {line}")
                continue
            if re.match(phone_regex, line, re.IGNORECASE):
                phone_match = re.match(phone_regex, line, re.IGNORECASE)
                if phone_match:
                    phone_number = phone_match.group(0)
                    personal_info["phone"].append(phone_number)
                    logger.debug(f"Khớp số điện thoại: {phone_number}")
                    remaining_text = line.replace(phone_number, "").strip()
                    if remaining_text and not any(keyword in normalize_text(remaining_text) for keyword in
                                                  KEYWORD_CATEGORIES["career_objective"] + KEYWORD_CATEGORIES[
                                                      "experience"]):
                        final_pred = "other"
                    else:
                        continue
                else:
                    continue
            if (re.match(name_regex, line, re.IGNORECASE) and
                    final_pred not in section_headers.values() and
                    not any(keyword in normalized_line for keyword in
                            KEYWORD_CATEGORIES["experience"] +
                            KEYWORD_CATEGORIES["skills_technology"] +
                            KEYWORD_CATEGORIES["skills_soft"] +
                            KEYWORD_CATEGORIES["skills_language"] +
                            sum((sub_keywords for sub_keywords in KEYWORD_CATEGORIES["skills_industry"].values()), []) +
                            KEYWORD_CATEGORIES["awards"] +
                            KEYWORD_CATEGORIES["activities"] +
                            KEYWORD_CATEGORIES["certificates"]) and
                    len(line.split()) >= 2 and len(line.split()) <= 4):
                if previous_line and len(previous_line.split()) < 2 and re.match(
                        r"[a-zA-Z\sàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳýỹỷỵ]+", previous_line):
                    full_name = f"{previous_line} {line}".strip()
                    if re.match(name_regex, full_name, re.IGNORECASE):
                        personal_info["name"].append(full_name)
                        logger.debug(f"Khớp và gộp tên: {full_name}")
                        previous_line = ""
                        continue
                personal_info["name"].append(line)
                logger.debug(f"Khớp tên: {line}")
                continue
            if re.match(address_regex, line, re.IGNORECASE) and not any(keyword in normalized_line for keyword in
                                                                        KEYWORD_CATEGORIES["experience"] +
                                                                        KEYWORD_CATEGORIES["career_objective"]):
                personal_info["address"].append(line)
                logger.debug(f"Khớp địa chỉ: {line}")
                continue
            if re.match(birth_date_regex, line):
                personal_info["birth_date"].append(line)
                logger.debug(f"Khớp ngày sinh: {line}")
                continue
            if re.match(gender_regex, line, re.IGNORECASE):
                personal_info["gender"].append(line)
                logger.debug(f"Khớp giới tính: {line}")
                continue
            if any(keyword in line_lower for keyword in
                   KEYWORD_CATEGORIES["personal_info_name"]) and final_pred not in section_headers.values():
                personal_info["other"].append(line)
                logger.debug(f"Khớp thông tin cá nhân khác: {line}")
                continue

            # Xử lý các danh mục theo final_pred
            if final_pred == "education":
                duration = re.search(duration_regex, line)
                year = re.search(year_regex, line)
                education.append({
                    "institution": line,
                    "duration": duration.group(0) if duration else "",
                    "year": year.group(0) if year else ""
                })
            elif final_pred in ("skills_technology", "skills_soft", "skills_language", "skills_industry"):
                skill_tokens = [token.strip() for token in re.split(r',|\n|:', line) if token.strip()]
                for token in skill_tokens:
                    normalized_token = normalize_text(token)
                    is_skill = False
                    skill_category = None
                    if final_pred == "skills_industry":
                        for sub_category, sub_keywords in KEYWORD_CATEGORIES["skills_industry"].items():
                            if any(keyword in normalized_token for keyword in sub_keywords):
                                is_skill = True
                                skill_category = sub_category
                                break
                    else:
                        if any(keyword in normalized_token for keyword in KEYWORD_CATEGORIES[final_pred]):
                            is_skill = True
                            skill_category = final_pred
                    if is_skill:
                        skills.append({
                            "name": token,
                            "category": skill_category
                        })
                        logger.debug(f"Khớp kỹ năng: {token}, Danh mục: {skill_category}")
            elif final_pred == "projects":
                projects.append({
                    "name": line,
                    "duration": re.search(duration_regex, line).group(0) if re.search(duration_regex, line) else ""
                })
            elif final_pred == "experience":
                duration = re.search(duration_regex, line)
                if re.match(company_regex, line, re.IGNORECASE) or any(
                        word in line_lower for word in KEYWORD_CATEGORIES["experience"]):
                    experience.append({
                        "company": line,
                        "duration": duration.group(0) if duration else ""
                    })
                else:
                    experience.append({
                        "description": line,
                        "duration": duration.group(0) if duration else ""
                    })
            elif final_pred == "hobbies":
                if any(word in line_lower for word in KEYWORD_CATEGORIES["hobbies"]):
                    hobbies.append(line)
            elif final_pred == "career_objective":
                career_objective.append(line)
            elif final_pred == "certificates":
                if any(word in line_lower for word in KEYWORD_CATEGORIES["certificates"]):
                    year = re.search(year_regex, line)
                    certificates.append({
                        "name": line,
                        "year": year.group(0) if year else ""
                    })
            elif final_pred == "awards":
                if any(word in line_lower for word in KEYWORD_CATEGORIES["awards"]):
                    year = re.search(year_regex, line)
                    awards.append({
                        "name": line,
                        "year": year.group(0) if year else ""
                    })
            elif final_pred == "activities":
                duration = re.search(duration_regex, line)
                activities.append({
                    "name": line,
                    "duration": duration.group(0) if duration else ""
                })
            elif final_pred == "references":
                reference_buffer.append(line)

            previous_line = line

        # Gộp references
        if reference_buffer:
            references.append({"name": " ".join(reference_buffer)})

        result = {
            "status": "success",
            "extracted": {
                "personal_info": personal_info,
                "education": education,
                "career_objective": career_objective,
                "skills": skills,
                "projects": projects,
                "experience": experience,
                "hobbies": hobbies,
                "certificates": certificates,
                "awards": awards,
                "activities": activities,
                "references": references
            }
        }
        logger.info(f"Thông tin cá nhân đã trích xuất: {personal_info['name']}")
        logger.info(f"Kỹ năng đã trích xuất: {[skill['name'] for skill in skills]}")
        logger.info("Hoàn thành trích xuất CV")
        return result
    except Exception as e:
        logger.error(f"Lỗi khi trích xuất thông tin từ CV: {str(e)}")
        return {
            "status": "failed",
            "error_message": f"Lỗi khi trích xuất thông tin từ CV: {str(e)}"
        }