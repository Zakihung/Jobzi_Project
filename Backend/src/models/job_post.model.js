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
    title: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      default: "",
    },
    number: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: "",
    },
    requirements: {
      type: String,
      default: "",
    },
    benefits: {
      type: String,
      default: "",
    },
    min_years_experience: {
      type: Number,
      default: 0,
    },
    education_level: {
      type: String,
      default: "",
    },
    experience_level: {
      type: String,
      default: "",
    },
    role_organization: {
      type: String,
      default: "",
    },
    work_type: {
      type: String,
      default: "",
    },
    salary_type: {
      type: String,
      default: "negotiable",
      enum: ["negotiable", "range"],
    },
    min_salary_range: {
      type: Number,
      default: 0,
      min: 0,
    },
    max_salary_range: {
      type: Number,
      default: 0,
      min: 0,
    },
    recipient_email: {
      type: String,
      default: "",
    },
    recipient_name: {
      type: String,
      default: "",
    },
    recipient_phone_number: {
      type: String,
      default: "",
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

const JobPost = mongoose.model("JobPost", job_postSchema, "JobPost");

module.exports = JobPost;
