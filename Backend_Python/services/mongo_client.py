from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Load MongoDB URL từ .env
MONGO_URI = os.getenv("MONGO_DB_URL", "mongodb://localhost:27017")

client = MongoClient(MONGO_URI)
db = client["LuanVanDB"]
resume_analysis = db["ResumeAnalysis"]
