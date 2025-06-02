const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const candidateSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    full_name: {
      type: String,
      require: true,
    },
    date_of_birth: {
      type: Date,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone_number: {
      type: String,
      require: true,
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

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
