const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const skillsRequirementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
skillsRequirementSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const SkillsRequirement = mongoose.model(
  "SkillsRequirement",
  skillsRequirementSchema,
  "SkillsRequirement"
);

module.exports = SkillsRequirement;
