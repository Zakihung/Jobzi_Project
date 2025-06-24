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
    strengths: {
      type: String,
    },
    weaknesses: {
      type: String,
    },
    match_score: {
      type: Number,
    },
    suggestions: {
      type: String,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
resume_analysisSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const ResumeAnalysis = mongoose.model(
  "ResumeAnalysis",
  resume_analysisSchema,
  "ResumeAnalysis"
);

module.exports = ResumeAnalysis;
