const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const general_categorySchema = new mongoose.Schema(
  {
    industry_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry",
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
general_categorySchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const GeneralCategory = mongoose.model(
  "GeneralCategory",
  general_categorySchema
);

module.exports = GeneralCategory;
