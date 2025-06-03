const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const employerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    full_name: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    avatar: {
      type: String,
      default: "",
    },
    date_of_birth: {
      type: Date,
    },
    position: {
      type: String,
      default: "",
    },
    phone_number: {
      type: String,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
employerSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
