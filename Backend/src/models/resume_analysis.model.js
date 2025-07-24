const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const resume_analysisSchema = new mongoose.Schema(
  {
    job_post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      required: true,
    },
    online_resume_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OnlineResume",
      default: null,
    },
    resume_file_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResumeFile",
      default: null,
    },
    extraction: {
      raw_text: {
        type: String,
        default: "",
      },
      extracted_at: {
        type: Date,
        default: null,
      },
      extraction_error: { type: String, default: null },
    },
    classification: {
      education: [
        {
          institution: String,
          degree: String,
          major: String,
          duration: String,
          description: String,
        },
      ],
      career_objective: {
        type: String,
        default: "",
      },
      skills: [
        {
          name: String,
          proficiency: String,
        },
      ],
      projects: [
        {
          name: String,
          description: String,
          role: String,
          duration: String,
        },
      ],
      work_experience: [
        {
          company: String,
          position: String,
          duration: String,
          responsibilities: String,
        },
      ],
      hobbies: [
        {
          name: String,
          description: String,
        },
      ],
      personal_info: {
        name: String,
        email: String,
        phone: String,
        address: String,
        other: String,
      },
      classification_error: { type: String, default: null },
    },
    analysis: {
      strengths: [
        {
          description: String,
          related_to: String, // Liên quan đến kỹ năng, kinh nghiệm, học vấn, v.v.
        },
      ],
      weaknesses: [
        {
          description: String,
          related_to: String,
        },
      ],
      job_match: [
        {
          criteria: String, // Tiêu chí phù hợp với tin tuyển dụng
          description: String,
        },
      ],
      job_mismatch: [
        {
          criteria: String, // Tiêu chí chưa phù hợp với tin tuyển dụng
          description: String,
        },
      ],
      match_score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      suggestions: [
        {
          section: String, // Phần cần chỉnh sửa: education, skills, work_experience, v.v.
          suggestion: String,
        },
      ],
      analyzed_at: {
        type: Date,
        default: null,
      },
      analysis_error: { type: String, default: null },
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
resume_analysisSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  deleted: true,
});

const ResumeAnalysis = mongoose.model(
  "ResumeAnalysis",
  resume_analysisSchema,
  "ResumeAnalysis"
);

module.exports = ResumeAnalysis;
