const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const salary_rangeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
      default: "negotiable",
      enum: ["negotiable", "range"],
    },
    min: {
      type: Number,
      default: 0,
      min: 0,
    },
    max: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
salary_rangeSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const SalaryRange = mongoose.model("SalaryRange", salary_rangeSchema);

module.exports = SalaryRange;
