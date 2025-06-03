const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["candidate", "employer", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

// Tạo index cho trường role
userSchema.index({ role: 1 });

// Thêm plugin xóa mềm
userSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
});

const User = mongoose.model("User", userSchema);

module.exports = User;
