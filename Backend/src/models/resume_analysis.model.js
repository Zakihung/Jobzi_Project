const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const resumeAnalysisSchema = new mongoose.Schema(
  {
    resume_file_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResumeFile",
      required: true,
    },
    job_post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      required: true,
    },
    online_resume_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OnlineResume",
      required: false,
    },
    extracted_text: {
      type: String,
      default: "",
    },
    extracted_fields: {
      activities: [
        {
          duration: { type: String, default: "" },
          name: { type: String, default: "" },
        },
      ],
      awards: [
        {
          name: { type: String, default: "" },
          year: { type: String, default: "" },
        },
      ],
      career_objective: {
        type: [String],
        default: [],
      },
      certificates: [
        {
          name: { type: String, default: "" },
          year: { type: String, default: "" },
        },
      ],
      education: [
        {
          institution: { type: String, default: "" },
          degree: { type: String, default: "" },
          major: { type: String, default: "" },
          duration: { type: String, default: "" },
          description: { type: String, default: "" },
          year: { type: String, default: "" },
        },
      ],
      experience: [
        {
          company: { type: String, default: "" },
          position: { type: String, default: "" },
          duration: { type: String, default: "" },
          responsibilities: { type: String, default: "" },
          description: { type: String, default: "" },
        },
      ],
      hobbies: {
        type: [String],
        default: [],
      },
      personal_info: {
        name: { type: [String], default: [] },
        email: { type: [String], default: [] },
        phone: { type: [String], default: [] },
        address: { type: [String], default: [] },
        birth_date: { type: [String], default: [] },
        gender: { type: [String], default: [] },
        other: { type: [String], default: [] },
      },
      projects: [
        {
          name: { type: String, default: "" },
          description: { type: String, default: "" },
          role: { type: String, default: "" },
          duration: { type: String, default: "" },
        },
      ],
      references: [
        {
          name: { type: String, default: "" },
        },
      ],
      skills: [
        {
          name: { type: String, default: "" },
          proficiency: { type: String, default: "" },
          category: { type: String, default: "" },
        },
      ],
    },
    jd_matching: {
      matched_skills: [String],
      missing_skills: [String],
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
    },
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
  },
  { timestamps: true }
);

// Plugin xóa mềm
resumeAnalysisSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  deleted: true,
});

const ResumeAnalysis = mongoose.model(
  "ResumeAnalysis",
  resumeAnalysisSchema,
  "ResumeAnalysis"
);

module.exports = ResumeAnalysis;
