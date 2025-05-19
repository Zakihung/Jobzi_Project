const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);
