const mongoose = require("mongoose");
const axios = require("axios");
const FormData = require("form-data");
const AppError = require("../utils/AppError");
const ResumeAnalysis = require("../models/resume_analysis.model");
const ResumeFile = require("../models/resume_file.model");
const OnlineResume = require("../models/online_resume.model");
require("dotenv").config();

const createResumeAnalysisService = async (analysisData) => {
  const {
    job_post_id,
    online_resume_id,
    resume_file_id,
    extraction,
    classification,
    analysis,
  } = analysisData;
  if (!job_post_id) {
    throw new AppError("Thiếu trường bắt buộc: job_post_id là bắt buộc", 400);
  }
  if (!mongoose.Types.ObjectId.isValid(job_post_id)) {
    throw new AppError("job_post_id không hợp lệ", 400);
  }
  if (!online_resume_id && !resume_file_id) {
    throw new AppError(
      "Phải cung cấp online_resume_id hoặc resume_file_id",
      400
    );
  }

  try {
    const result = await ResumeAnalysis.create({
      job_post_id,
      online_resume_id: online_resume_id || null,
      resume_file_id: resume_file_id || null,
      extraction: {
        raw_text: extraction?.raw_text || "",
        extracted_at: extraction?.extracted_at || null,
        extraction_error: extraction?.extraction_error || null,
      },
      classification: {
        education: classification?.education || [],
        career_objective: classification?.career_objective || "",
        skills: classification?.skills || [],
        projects: classification?.projects || [],
        work_experience: classification?.work_experience || [],
        hobbies: classification?.hobbies || [],
        personal_info: classification?.personal_info || {},
        total_experience: classification?.total_experience || 0.0,
        classification_error: classification?.classification_error || null,
      },
      analysis: {
        strengths: analysis?.strengths || [],
        weaknesses: analysis?.weaknesses || [],
        job_match: analysis?.job_match || [],
        job_mismatch: analysis?.job_mismatch || [],
        match_score: analysis?.match_score || 0,
        suggestions: analysis?.suggestions || [],
        analyzed_at: analysis?.analyzed_at || null,
        analysis_error: analysis?.analysis_error || null,
      },
    });
    console.log(`Created ResumeAnalysis with ID: ${result._id}`);
    return result;
  } catch (error) {
    console.error(`Error in createResumeAnalysisService: ${error.message}`);
    throw new AppError(
      `Không thể tạo bản ghi ResumeAnalysis: ${error.message}`,
      500
    );
  }
};

const processResumeAnalysisService = async (
  resume_file_id,
  online_resume_id,
  job_post_id
) => {
  const pythonApiUrl = process.env.PYTHON_API_URL || "http://localhost:1213";

  if (!mongoose.Types.ObjectId.isValid(resume_file_id)) {
    throw new AppError("resume_file_id không hợp lệ", 400);
  }
  if (!mongoose.Types.ObjectId.isValid(job_post_id)) {
    throw new AppError("job_post_id không hợp lệ", 400);
  }

  const resumeFile = await ResumeFile.findById(resume_file_id);

  if (!resumeFile) {
    throw new AppError("Không tìm thấy file CV", 404);
  }

  const resumeAnalysis = await ResumeAnalysis.create({
    resume_file_id,
    job_post_id,
    online_resume_id: null,
    extracted_text: "",
    extracted_fields: {},
    jd_matching: {},
    strengths: [],
    weaknesses: [],
    match_score: 0,
    suggestions: [],
  });

  const analysis_id = resumeAnalysis._id;

  // Step 1: Gửi file PDF sang Python để trích xuất text
  try {
    const response = await axios.get(resumeFile.path, {
      responseType: "arraybuffer",
    });

    const fileBuffer = Buffer.from(response.data);
    const formData = new FormData();
    formData.append("file", fileBuffer, {
      filename: resumeFile.name,
      contentType: "application/pdf",
    });

    const extractRes = await axios.post(
      `${pythonApiUrl}/cv/extract`,
      formData,
      { headers: { ...formData.getHeaders() } }
    );

    const raw_text = extractRes.data.raw_text;
    if (!raw_text) throw new Error("Không trích xuất được nội dung CV");

    // Cập nhật extracted_text
    await ResumeAnalysis.findByIdAndUpdate(analysis_id, {
      extracted_text: raw_text,
    });

    // Step 2: Gửi sang Python để phân loại các phần thông tin
    const classifyRes = await axios.post(`${pythonApiUrl}/cv/classify`, {
      text: raw_text,
    });
    if (classifyRes.data.status !== "success" || !classifyRes.data.extracted) {
      throw new Error("Phân loại CV thất bại hoặc không có dữ liệu trích xuất");
    }

    const extracted_fields = classifyRes.data.extracted;
    await ResumeAnalysis.findByIdAndUpdate(analysis_id, {
      extracted_fields,
    });

    // Step 3: Phân tích mức độ phù hợp, điểm mạnh/yếu, đề xuất
    const analyzeRes = await axios.post(
      `${pythonApiUrl}/cv/analyze/${resume_file_id}/${job_post_id}`,
      { text: raw_text, extracted_fields }
    );

    if (analyzeRes.data.status !== "success" || !analyzeRes.data) {
      throw new Error("Phân tích CV thất bại hoặc không có dữ liệu phân tích");
    }

    const {
      jd_matching = {},
      match_score = 0,
      suggestions = [],
    } = analyzeRes.data;

    const finalResult = await ResumeAnalysis.findByIdAndUpdate(
      analysis_id,
      {
        match_score,
        suggestions,
        $set: {
          strengths: jd_matching?.strengths || [],
          weaknesses: jd_matching?.weaknesses || [],
          "jd_matching.job_match": jd_matching?.job_match || [],
          "jd_matching.job_mismatch": jd_matching?.job_mismatch || [],
          "jd_matching.matched_skills": jd_matching?.matched_skills || [],
          "jd_matching.missing_skills": jd_matching?.missing_skills || [],
        },
      },
      { new: true }
    )
      .populate("job_post_id")
      .populate("resume_file_id")
      .populate("online_resume_id");

    return finalResult;
  } catch (error) {
    console.error("Lỗi phân tích CV:", error.message);
    throw new AppError(`Lỗi phân tích CV: ${error.message}`, 500);
  }
};

const updateResumeAnalysisService = async (analysis_id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(analysis_id)) {
    throw new AppError("ID phân tích không hợp lệ", 400);
  }

  const updated = await ResumeAnalysis.findByIdAndUpdate(
    analysis_id,
    updateData,
    { new: true }
  )
    .populate("job_post_id")
    .populate("online_resume_id")
    .populate("resume_file_id");

  if (!updated) {
    throw new AppError("Không tìm thấy phân tích để cập nhật", 404);
  }

  return updated;
};

const getListResumeAnalysisService = async () => {
  const result = await ResumeAnalysis.find()
    .populate("job_post_id")
    .populate("online_resume_id")
    .populate("resume_file_id");
  return result;
};

const getResumeAnalysisByIdService = async (analysis_id) => {
  if (!mongoose.Types.ObjectId.isValid(analysis_id)) {
    throw new AppError("ID phân tích không hợp lệ", 400);
  }
  const analysis = await ResumeAnalysis.findById(analysis_id)
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
  const result = await ResumeAnalysis.find({ online_resume_id })
    .populate("job_post_id")
    .populate("online_resume_id")
    .populate("resume_file_id");
  return result;
};

const getResumeAnalysisByResumeFileIdService = async (resume_file_id) => {
  if (!mongoose.Types.ObjectId.isValid(resume_file_id)) {
    throw new AppError("ID file hồ sơ không hợp lệ", 400);
  }
  const result = await ResumeAnalysis.find({ resume_file_id })
    .populate("job_post_id")
    .populate("online_resume_id")
    .populate("resume_file_id");
  return result;
};

const getLatestResumeAnalysisService = async (
  job_post_id,
  resume_file_id,
  online_resume_id
) => {
  if (!mongoose.Types.ObjectId.isValid(job_post_id)) {
    throw new AppError("ID bài đăng công việc không hợp lệ", 400);
  }
  if (!resume_file_id && !online_resume_id) {
    throw new AppError(
      "Phải cung cấp resume_file_id hoặc online_resume_id",
      400
    );
  }
  // Chỉ kiểm tra ObjectId nếu resume_file_id hoặc online_resume_id không phải null hoặc "null"
  if (
    resume_file_id &&
    resume_file_id !== "null" &&
    !mongoose.Types.ObjectId.isValid(resume_file_id)
  ) {
    throw new AppError("ID file hồ sơ không hợp lệ", 400);
  }
  if (
    online_resume_id &&
    online_resume_id !== "null" &&
    !mongoose.Types.ObjectId.isValid(online_resume_id)
  ) {
    throw new AppError("ID hồ sơ online không hợp lệ", 400);
  }

  const query = {
    job_post_id,
    $or: [
      resume_file_id && resume_file_id !== "null" ? { resume_file_id } : null,
      online_resume_id && online_resume_id !== "null"
        ? { online_resume_id }
        : null,
    ].filter(Boolean),
  };

  const analysis = await ResumeAnalysis.findOne(query)
    .sort({ createdAt: -1 })
    .populate("job_post_id")
    .populate("online_resume_id")
    .populate("resume_file_id");

  if (!analysis) {
    throw new AppError("Không tìm thấy phân tích hồ sơ phù hợp", 404);
  }

  return analysis;
};

const getListResumeAnalysisByCandidateIdService = async (candidate_id) => {
  if (!mongoose.Types.ObjectId.isValid(candidate_id)) {
    throw new AppError("ID ứng viên không hợp lệ", 400);
  }

  // Tìm tất cả resume_file_id của candidate
  const resumeFiles = await ResumeFile.find({ candidate_id }).select("_id");
  const resumeFileIds = resumeFiles.map((file) => file._id);

  // Lấy tất cả phân tích có resume_file_id thuộc danh sách trên
  const result = await ResumeAnalysis.find({
    resume_file_id: { $in: resumeFileIds },
  })
    .populate("job_post_id")
    .populate("online_resume_id")
    .populate("resume_file_id");

  return result;
};

const deleteResumeAnalysisService = async (analysis_id) => {
  if (!mongoose.Types.ObjectId.isValid(analysis_id)) {
    throw new AppError("ID phân tích không hợp lệ", 400);
  }
  const analysis = await ResumeAnalysis.findById(analysis_id);
  if (!analysis) {
    throw new AppError("Không tìm thấy phân tích hồ sơ", 404);
  }
  const result = await ResumeAnalysis.deleteOne({ _id: analysis_id });
  return result;
};

const deleteAllResumeAnalysisService = async () => {
  const result = await ResumeAnalysis.deleteMany({});
  return result;
};

module.exports = {
  createResumeAnalysisService,
  processResumeAnalysisService,
  updateResumeAnalysisService,
  getListResumeAnalysisService,
  getListResumeAnalysisByCandidateIdService,
  getResumeAnalysisByIdService,
  getLatestResumeAnalysisService,
  getResumeAnalysisByOnlineResumeIdService,
  getResumeAnalysisByResumeFileIdService,
  deleteResumeAnalysisService,
  deleteAllResumeAnalysisService,
};
