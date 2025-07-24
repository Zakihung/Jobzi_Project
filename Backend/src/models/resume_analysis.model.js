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
          type: String, // Sửa từ {name: String, description: String} thành mảng chuỗi
        },
      ],
      personal_info: {
        name: String,
        email: String,
        phone: String,
        address: String,
        dob: String, // Thêm trường dob để khớp với classification_service.py
        gender: String, // Thêm trường gender
        other: String,
      },
      total_experience: {
        type: Number,
        default: 0.0, // Thêm trường total_experience
      },
      classification_error: { type: String, default: null },
    },
    analysis: {
      strengths: [
        {
          description: String,
          related_to: String,
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
          criteria: String,
          description: String,
        },
      ],
      job_mismatch: [
        {
          criteria: String,
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
          section: String,
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
