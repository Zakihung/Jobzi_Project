const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const jobPostSkillsRequirementSchema = new mongoose.Schema(
  {
    skills_requirement_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillsRequirement",
      required: true,
    },
    job_post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      required: true,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
jobPostSkillsRequirementSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const JobPostSkillsRequirement = mongoose.model(
  "JobPostSkillsRequirement",
  jobPostSkillsRequirementSchema,
  "JobPostSkillsRequirement"
);

module.exports = JobPostSkillsRequirement;
