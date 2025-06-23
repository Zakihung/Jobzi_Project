const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const educationLevelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
educationLevelSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const EducationLevel = mongoose.model("EducationLevel", educationLevelSchema);

module.exports = EducationLevel;
