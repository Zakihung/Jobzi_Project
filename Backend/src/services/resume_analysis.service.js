const mongoose = require("mongoose");
const axios = require("axios");
const FormData = require("form-data");
const AppError = require("../utils/AppError");
const ResumeAnalysis = require("../models/resume_analysis.model");
const ResumeFile = require("../models/resume_file.model");
const OnlineResume = require("../models/online_resume.model");

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
        analysis_error: analysis?.analysis_error || null, // Thêm trường này
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
  let text, cv_id, analysis_id;

  try {
    // Bước 1: Kiểm tra và tạo bản ghi ResumeAnalysis
    console.log(
      `Starting processResumeAnalysisService with resume_file_id: ${resume_file_id}, online_resume_id: ${online_resume_id}, job_post_id: ${job_post_id}`
    );

    if (resume_file_id) {
      if (!mongoose.Types.ObjectId.isValid(resume_file_id)) {
        throw new AppError("resume_file_id không hợp lệ", 400);
      }
      const resumeFile = await ResumeFile.findById(resume_file_id);
      if (!resumeFile) {
        console.error(`ResumeFile not found for ID: ${resume_file_id}`);
        throw new AppError("Không tìm thấy resume file", 404);
      }
      cv_id = resume_file_id;

      // Tạo bản ghi ResumeAnalysis
      const resumeAnalysis = await ResumeAnalysis.create({
        job_post_id,
        resume_file_id,
        online_resume_id: null,
        extraction: {},
        classification: {},
        analysis: {},
      });
      analysis_id = resumeAnalysis._id;
      console.log(`Initial ResumeAnalysis created with ID: ${analysis_id}`);
    } else if (online_resume_id) {
      if (!mongoose.Types.ObjectId.isValid(online_resume_id)) {
        throw new AppError("online_resume_id không hợp lệ", 400);
      }
      const onlineResume = await OnlineResume.findById(online_resume_id);
      if (!onlineResume) {
        console.error(`OnlineResume not found for ID: ${online_resume_id}`);
        throw new AppError("Không tìm thấy online resume", 404);
      }
      cv_id = online_resume_id;

      // Tạo bản ghi ResumeAnalysis
      const resumeAnalysis = await ResumeAnalysis.create({
        job_post_id,
        resume_file_id: null,
        online_resume_id,
        extraction: {},
        classification: {},
        analysis: {},
      });
      analysis_id = resumeAnalysis._id;
      console.log(`Initial ResumeAnalysis created with ID: ${analysis_id}`);
    } else {
      throw new AppError(
        "Phải cung cấp resume_file_id hoặc online_resume_id",
        400
      );
    }

    // Bước 2: Trích xuất văn bản
    let extractionData;
    if (resume_file_id) {
      const resumeFile = await ResumeFile.findById(resume_file_id);
      console.log(`Fetching file from Cloudinary: ${resumeFile.path}`);
      try {
        const response = await axios.get(resumeFile.path, {
          responseType: "arraybuffer",
        });
        const fileBuffer = Buffer.from(response.data);

        const formData = new FormData();
        formData.append("file", fileBuffer, resumeFile.name);
        console.log(
          `Calling /cv/extract for resume_file_id: ${resume_file_id}`
        );
        const extractRes = await axios.post(
          "http://localhost:1213/cv/extract",
          formData,
          {
            headers: { ...formData.getHeaders() },
          }
        );
        extractionData = extractRes.data;
        console.log(`Extraction response: ${JSON.stringify(extractionData)}`);

        text = extractionData.raw_text || "";
        if (!text && !extractionData.status) {
          throw new AppError("Không thể trích xuất văn bản từ file PDF", 400);
        }

        // Cập nhật ResumeAnalysis với extraction
        await ResumeAnalysis.findOneAndUpdate(
          { _id: analysis_id },
          {
            extraction: {
              raw_text: text,
              extracted_at: new Date(),
              extraction_error:
                extractionData.status === "failed"
                  ? extractionData.error_message
                  : null,
            },
          },
          { new: true }
        );
        console.log(
          `Updated ResumeAnalysis with extraction for ID: ${analysis_id}`
        );
      } catch (error) {
        console.error(`Error in extraction step: ${error.message}`);
        await ResumeAnalysis.findOneAndUpdate(
          { _id: analysis_id },
          {
            extraction: {
              raw_text: "",
              extracted_at: new Date(),
              extraction_error: error.message,
            },
          },
          { new: true }
        );
        throw new AppError(
          `Lỗi trích xuất CV: ${error.message}`,
          error.response?.status || 500
        );
      }
    } else if (online_resume_id) {
      const onlineResume = await OnlineResume.findById(online_resume_id);
      const textParts = [
        `Personal Info: ${onlineResume.personalInfo.full_name}, ${onlineResume.personalInfo.email}, ${onlineResume.personalInfo.phone_number}, ${onlineResume.personalInfo.address}`,
        `Job Expectations: ${onlineResume.jobExpectations
          .map(
            (j) =>
              `${j.position}, ${j.jobType}, ${j.min_salary_range}-${j.max_salary_range} triệu, ${j.province}`
          )
          .join("; ")}`,
        `Education: ${onlineResume.education
          .map(
            (e) =>
              `${e.school}, ${e.major}, ${e.education}, ${e.startYear}-${e.endYear}`
          )
          .join("; ")}`,
        `Work Experience: ${onlineResume.workExperience
          .map(
            (w) =>
              `${w.company}, ${w.position}, ${w.industry}, ${w.description}, ${w.startYear}-${w.endYear}`
          )
          .join("; ")}`,
        `Projects: ${onlineResume.projects
          .map(
            (p) =>
              `${p.projectName}, ${p.role}, ${p.description}, ${p.startYear}-${p.endYear}`
          )
          .join("; ")}`,
        `Skills: ${onlineResume.skills
          .map((s) => `${s.skillName}, ${s.experience}, ${s.proficiency}`)
          .join("; ")}`,
        `Highlights: ${onlineResume.highlights
          .map((h) => `${h.title}, ${h.description}`)
          .join("; ")}`,
      ].filter((part) => part.includes(": "));
      text = textParts.join("\n");

      // Cập nhật ResumeAnalysis với extraction
      await ResumeAnalysis.findOneAndUpdate(
        { _id: analysis_id },
        {
          extraction: {
            raw_text: text,
            extracted_at: new Date(),
            extraction_error: null,
          },
        },
        { new: true }
      );
      console.log(
        `Updated ResumeAnalysis with extraction for ID: ${analysis_id}`
      );
    }

    // Bước 3: Phân loại
    console.log(
      `Calling /cv/classify for cv_id: ${cv_id} with body: ${JSON.stringify({
        text,
      })}`
    );
    try {
      const classifyRes = await axios.post(
        `http://localhost:1213/cv/classify/${cv_id}`,
        { text },
        { headers: { "Content-Type": "application/json" } }
      );
      const classificationData = classifyRes.data;
      console.log(
        `Classification response: ${JSON.stringify(classificationData)}`
      );

      await ResumeAnalysis.findOneAndUpdate(
        { _id: analysis_id },
        {
          classification: {
            education: classificationData.education || [],
            career_objective: classificationData.career_objective || "",
            skills: classificationData.skills || [],
            projects: classificationData.projects || [],
            work_experience: classificationData.work_experience || [],
            hobbies: classificationData.hobbies || [],
            personal_info: classificationData.personal_info || {},
            classification_error: null,
          },
        },
        { new: true }
      );
      console.log(
        `Updated ResumeAnalysis with classification for ID: ${analysis_id}`
      );
    } catch (error) {
      console.error(`Error in classification step: ${error.message}`);
      console.error(
        `Classification error response: ${JSON.stringify(error.response?.data)}`
      );
      await ResumeAnalysis.findOneAndUpdate(
        { _id: analysis_id },
        {
          classification: {
            education: [],
            career_objective: "",
            skills: [],
            projects: [],
            work_experience: [],
            hobbies: [],
            personal_info: {},
            classification_error: error.response?.data?.detail || error.message,
          },
        },
        { new: true }
      );
      console.log(
        `Updated ResumeAnalysis with classification error for ID: ${analysis_id}`
      );
      throw new AppError(
        `Lỗi phân loại CV: ${error.message}`,
        error.response?.status || 500
      );
    }

    // Bước 4: Phân tích
    console.log(
      `Calling /cv/analyze for cv_id: ${cv_id} with body: ${JSON.stringify({
        text,
        job_post_id,
      })}`
    );
    try {
      const analyzeRes = await axios.post(
        `http://localhost:1213/cv/analyze/${cv_id}`,
        { text, job_post_id },
        { headers: { "Content-Type": "application/json" } }
      );
      const analysisData = analyzeRes.data;
      console.log(`Analysis response: ${JSON.stringify(analysisData)}`);

      const updatedAnalysis = await ResumeAnalysis.findOneAndUpdate(
        { _id: analysis_id },
        {
          analysis: {
            strengths: analysisData.strengths || [],
            weaknesses: analysisData.weaknesses || [],
            job_match: analysisData.job_match || [],
            job_mismatch: analysisData.job_mismatch || [],
            match_score: analysisData.match_score || 0,
            suggestions: analysisData.suggestions || [],
            analyzed_at: new Date(),
            analysis_error: null,
          },
        },
        { new: true }
      )
        .populate("job_post_id")
        .populate("online_resume_id")
        .populate("resume_file_id");
      console.log(`Final ResumeAnalysis updated for ID: ${analysis_id}`);

      return updatedAnalysis;
    } catch (error) {
      console.error(`Error in analysis step: ${error.message}`);
      console.error(
        `Analysis error response: ${JSON.stringify(error.response?.data)}`
      );
      await ResumeAnalysis.findOneAndUpdate(
        { _id: analysis_id },
        {
          analysis: {
            strengths: [],
            weaknesses: [],
            job_match: [],
            job_mismatch: [],
            match_score: 0,
            suggestions: [],
            analyzed_at: new Date(),
            analysis_error: error.response?.data?.detail || error.message,
          },
        },
        { new: true }
      );
      console.log(
        `Updated ResumeAnalysis with analysis error for ID: ${analysis_id}`
      );
      throw new AppError(
        `Lỗi phân tích CV: ${error.message}`,
        error.response?.status || 500
      );
    }
  } catch (error) {
    console.error(`Error in processResumeAnalysisService: ${error.message}`);
    throw new AppError(
      `Lỗi khi phân tích CV: ${error.message}`,
      error.response?.status || 500
    );
  }
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
  getListResumeAnalysisService,
  getResumeAnalysisByIdService,
  getResumeAnalysisByOnlineResumeIdService,
  getResumeAnalysisByResumeFileIdService,
  deleteResumeAnalysisService,
  deleteAllResumeAnalysisService,
};
