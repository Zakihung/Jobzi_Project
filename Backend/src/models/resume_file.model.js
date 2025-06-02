const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const resume_fileSchema = new mongoose.Schema(
  {
    candidate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    file_name: {
      type: String,
      require: true,
    },
    file_path: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
resume_fileSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const ResumeFile = mongoose.model("ResumeFile", resume_fileSchema);

module.exports = ResumeFile;
