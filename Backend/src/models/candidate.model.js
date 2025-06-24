const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const candidateSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "ready",
      enum: ["ready", "not_available", "available_this_month"],
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
candidateSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const Candidate = mongoose.model("Candidate", candidateSchema, "Candidate");

module.exports = Candidate;
