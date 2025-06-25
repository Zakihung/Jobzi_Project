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
    experience_level_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExperienceLevel",
      required: true,
    },
    education_level_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EducationLevel",
      required: true,
    },
    role_organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoleOrganization",
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
      type: String,
      default: "",
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
