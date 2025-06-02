const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const applicationSchema = new mongoose.Schema(
  {
    job_post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      required: true,
    },
    candidate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    resume_file_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResumeFile",
      default: null,
    },
    online_resume_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OnlineResume",
      default: null,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "reviewed", "accepted", "rejected", "withdrawn"],
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
applicationSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
