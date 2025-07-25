const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const industry_groupSchema = new mongoose.Schema(
  {
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
industry_groupSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const IndustryGroup = mongoose.model(
  "IndustryGroup",
  industry_groupSchema,
  "IndustryGroup"
);

module.exports = IndustryGroup;
