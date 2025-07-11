const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const experienceLevelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
experienceLevelSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const ExperienceLevel = mongoose.model(
  "ExperienceLevel",
  experienceLevelSchema,
  "ExperienceLevel"
);

module.exports = ExperienceLevel;
