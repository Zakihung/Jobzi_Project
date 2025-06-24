const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const work_typeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
work_typeSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const WorkType = mongoose.model("WorkType", work_typeSchema, "WorkType");

module.exports = WorkType;
