const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const provinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
provinceSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const Province = mongoose.model("Province", provinceSchema);

module.exports = Province;
