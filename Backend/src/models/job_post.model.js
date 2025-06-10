const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const job_postSchema = new mongoose.Schema(
  {
    employer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    job_position_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPosition",
      required: true,
    },
    salary_range_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalaryRange",
      required: true,
    },
    work_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkType",
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      default: "",
    },
    requirement: {
      type: String,
      default: "",
    },
    work_address: {
      type: String,
      default: "",
    },
    income: {
      type: String,
      default: "",
    },
    working_time: {
      type: String,
      default: "",
    },
    benefit: {
      type: String,
      default: "",
    },
    expire_time: {
      type: Number,
    },
    expired_date: {
      type: Date,
    },
    status: {
      type: String,
      default: "open",
      enum: ["open", "closed", "expired"],
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
job_postSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const JobPost = mongoose.model("JobPost", job_postSchema);

module.exports = JobPost;
