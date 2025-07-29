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
      hobbies: [String],
      personal_info: {
        name: String,
        email: String,
        phone: String,
        address: String,
        dob: String,
        gender: String,
        other: String,
      },
      total_experience: {
        type: Number,
        default: 0.0,
      },
    },
    jd_matching: {
      matched_keywords: [String],
      missing_keywords: [String],
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
