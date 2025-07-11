const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const ResumeFile = require("../models/resume_file.model");
const cloudinary = require("../configs/cloudinary");

const createResumeFileService = async (candidate_id, name, file) => {
  if (!candidate_id || !name) {
    throw new AppError(
      "Thiếu các trường bắt buộc: candidate_id và name là bắt buộc",
      400
    );
  }
  if (!file) {
    throw new AppError("Không có file resume được cung cấp", 400);
  }

  let result = await ResumeFile.create({
    candidate_id,
    name,
    path: file.path, // Lưu URL từ Cloudinary
  });

  return result;
};

const getListResumeFileService = async () => {
  let result = await ResumeFile.find().populate("candidate_id");
  return result;
};

const getResumeFileByCandidateIdService = async (candidate_id) => {
  if (!mongoose.Types.ObjectId.isValid(candidate_id)) {
    throw new AppError("ID ứng viên không hợp lệ", 400);
  }
  let result = await ResumeFile.find({ candidate_id }).populate("candidate_id");
  return result;
};

const getResumeFileByIdService = async (resume_file_id) => {
  let resumeFile = await ResumeFile.findById(resume_file_id).populate(
    "candidate_id"
  );
  if (!resumeFile) {
    throw new AppError("Không tìm thấy resume", 404);
  }
  return resumeFile;
};

const updateResumeFileService = async (resume_file_id, updateData, file) => {
  const { name } = updateData;
  let resumeFile = await ResumeFile.findById(resume_file_id);
  if (!resumeFile) {
    throw new AppError("Không tìm thấy resume", 404);
  }

  if (name !== undefined && !name) {
    throw new AppError("Tên resume không được để trống", 400);
  }

  if (file) {
    // Xóa file cũ trên Cloudinary nếu tồn tại
    if (resumeFile.path) {
      const publicId = resumeFile.path.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`resumes/${publicId}`, {
        resource_type: resumeFile.path.match(/\.(jpg|png|jpeg)$/i)
          ? "image"
          : "raw",
      });
    }
    resumeFile.path = file.path; // Cập nhật URL file mới từ Cloudinary
  }

  resumeFile.name = name !== undefined ? name : resumeFile.name;

  let result = await resumeFile.save();
  return result;
};

const deleteResumeFileService = async (resume_file_id) => {
  let resumeFile = await ResumeFile.findById(resume_file_id);
  if (!resumeFile) {
    throw new AppError("Không tìm thấy resume", 404);
  }
  if (resumeFile.path) {
    const publicId = resumeFile.path.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`resumes/${publicId}`, {
      resource_type: resumeFile.path.match(/\.(jpg|png|jpeg)$/i)
        ? "image"
        : "raw",
    });
  }
  let result = await ResumeFile.deleteOne({ _id: resume_file_id }); // Xóa cứng khỏi database
  return result;
};

module.exports = {
  createResumeFileService,
  getListResumeFileService,
  getResumeFileByCandidateIdService,
  getResumeFileByIdService,
  updateResumeFileService,
  deleteResumeFileService,
};
