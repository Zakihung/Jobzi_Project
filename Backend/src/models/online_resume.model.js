const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const online_resumeSchema = new mongoose.Schema(
  {
    candidate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    email: {
      type: String,
    },
    full_name: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    date_of_birth: {
      type: Date,
    },
    phone_number: {
      type: String,
    },
    strengths: {
      type: String,
    },
    work_exp: {
      type: String,
    },
    project_exp: {
      type: String,
    },
    pro_skills: {
      type: String,
    },
    edu_exp: {
      type: String,
    },
    achievement: {
      type: String,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
online_resumeSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const OnlineResume = mongoose.model(
  "Online_Resume",
  online_resumeSchema,
  "OnlineResume"
);

module.exports = OnlineResume;
