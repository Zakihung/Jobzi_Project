💼 Jobzi – Recruitment Web Application with AI Integration

Jobzi is a modern recruitment web application built on the MERN stack, integrating Machine Learning (Python) to analyze candidate resumes. The system connects employers and candidates through an intuitive, responsive platform while leveraging AI to enhance recruitment efficiency.

🚀 Features

👩‍💼 For Candidates
Create online profiles and upload CVs (PDF/online editor).
Search jobs by title and filter jobs by work address, work type, experience, education and salary.
Apply to jobs, track application status, and save favorite jobs.
Receive AI-powered resume analysis with feedback on strengths, weaknesses, and job fit.

🏢 For Employers
Create and manage company profiles.
Post, edit, and manage job listings.
Review candidate applications.

🛠️ For Administrators
Manage users, job posts, industries, and job positions.
Access statistics and system-wide reports.

🖥️ Tech Stack
Frontend: ReactJS, Ant Design, Chart.js
Backend: Node.js, Express.js (REST API, JWT Authentication)
Database: MongoDB
Machine Learning Backend: Python (scikit-learn, NLP models for resume parsing and scoring)
Other Tools: Git, Postman, VS Code

📊 Machine Learning Integration
Resume Parsing: Extracts structured data from PDF resumes.
CV Information Classification Models:
Random Forest & Decision Tree for structured features (skills, experience, education).
NLP/Deep Learning models (BERT-based) for textual data analysis.
Results: Provides candidate scoring, strengths/weaknesses, and job-fit percentage.

⚙️ Installation & Usage
1. Clone repository
git clone https://github.com/Zakihung/Jobzi_Project.git
cd Jobzi_Project
3. Setup backend (Node.js)
cd Backend
npm install
npm run dev
5. Setup ML backend (Python)
cd ../Backend_Python
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
.\venv\Scripts\activate    # Windows
pip install -r requirements.txt
python main.py
7. Setup frontend
cd ../Frontend
npm install
npm run dev

✅ Testing
20+ test cases across 6 major features (signup, login, job posting, job search, job application, resume analysis).
All test cases passed successfully during evaluation

📌 Future Development
Enhance AI models with larger training datasets.
Deploy full system to cloud.
Integrate chat-based interview assistant.
Expand support for multiple resume formats (DOCX, LinkedIn import).

👨‍💻 Author
Nguyen Phuoc Hung
Software Engineering, Can Tho University
Email: zakizika1590623847@gmail.com
GitHub: Zakihung
