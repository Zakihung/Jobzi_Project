const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const ResumeAnalysis = require("../models/resume_analysis.model");

const createResumeAnalysisService = async (analysisData) => {
  const {
    job_post_id,
    online_resume_id,
    resume_file_id,
    strengths,
    weaknesses,
    match_score,
    suggestions,
  } = analysisData;
  if (!job_post_id) {
    throw new AppError("Thiếu trường bắt buộc: job_post_id là bắt buộc", 400);
  }

  let result = await ResumeAnalysis.create({
    job_post_id,
    online_resume_id: online_resume_id || null,
    resume_file_id: resume_file_id || null,
    strengths: strengths || "",
    weaknesses: weaknesses || "",
    match_score: match_score || null,
    suggestions: suggestions || "",
  });

  return result;
};

const getListResumeAnalysisService = async () => {
  let result = await ResumeAnalysis.find()
    .populate("job_post_id")
    .populate("online_resume_id")
    .populate("resume_file_id");
  return result;
};

const getResumeAnalysisByIdService = async (analysis_id) => {
  let analysis = await ResumeAnalysis.findById(analysis_id)
    .populate("job_post_id")
    .populate("online_resume_id")
    .populate("resume_file_id");
  if (!analysis) {
    throw new AppError("Không tìm thấy phân tích hồ sơ", 404);
  }
  return analysis;
};

const getResumeAnalysisByOnlineResumeIdService = async (online_resume_id) => {
  if (!mongoose.Types.ObjectId.isValid(online_resume_id)) {
    throw new AppError("ID hồ sơ online không hợp lệ", 400);
  }
  let result = await ResumeAnalysis.find({ online_resume_id })
    .populate("job_post_id")
    .populate("online_resume_id")
    .populate("resume_file_id");
  return result;
};

const getResumeAnalysisByResumeFileIdService = async (resume_file_id) => {
  if (!mongoose.Types.ObjectId.isValid(resume_file_id)) {
    throw new AppError("ID file hồ sơ không hợp lệ", 400);
  }
  let result = await ResumeAnalysis.find({ resume_file_id })
    .populate("job_post_id")
    .populate("online_resume_id")
    .populate("resume_file_id");
  return result;
};

const deleteResumeAnalysisService = async (analysis_id) => {
  let analysis = await ResumeAnalysis.findById(analysis_id);
  if (!analysis) {
    throw new AppError("Không tìm thấy phân tích hồ sơ", 404);
  }
  let result = await ResumeAnalysis.deleteOne({ _id: analysis_id }); // Xóa cứng khỏi database
  return result;
};

const deleteAllResumeAnalysisService = async () => {
  let result = await ResumeAnalysis.deleteMany({}); // Xóa cứng toàn bộ khỏi database
  return result;
};

module.exports = {
  createResumeAnalysisService,
  getListResumeAnalysisService,
  getResumeAnalysisByIdService,
  getResumeAnalysisByOnlineResumeIdService,
  getResumeAnalysisByResumeFileIdService,
  deleteResumeAnalysisService,
  deleteAllResumeAnalysisService,
};
