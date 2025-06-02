const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const industrySchema = new mongoose.Schema(
  {
    general_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneralCategory",
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "open",
      enum: ["open", "closed", "under_review"],
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
industrySchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const Industry = mongoose.model("Industry", industrySchema);

module.exports = Industry;
