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

  // Upload file lên Cloudinary
  const cloudinaryResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: file.mimetype.startsWith("image/") ? "image" : "raw",
          folder: "resumes",
          public_id: `resume_${Date.now()}.${
            file.mimetype === "application/pdf"
              ? "pdf"
              : file.mimetype.split("/")[1]
          }`,
          transformation: file.mimetype.startsWith("image/")
            ? [
                { width: 1000, height: 1000, crop: "limit" },
                { quality: "auto:best" },
              ]
            : null,
        },
        (error, result) => {
          if (error) reject(new AppError("Cloudinary upload failed", 500));
          resolve(result);
        }
      )
      .end(file.buffer);
  });

  // Lưu metadata vào ResumeFile
  const resumeFile = await ResumeFile.create({
    candidate_id,
    name,
    path: cloudinaryResult.secure_url,
  });

  return resumeFile;
};

const getListResumeFileService = async () => {
  const result = await ResumeFile.find().populate("candidate_id");
  return result;
};

const getResumeFileByCandidateIdService = async (candidate_id) => {
  if (!mongoose.Types.ObjectId.isValid(candidate_id)) {
    throw new AppError("ID ứng viên không hợp lệ", 400);
  }
  const result = await ResumeFile.find({ candidate_id }).populate(
    "candidate_id"
  );
  return result;
};

const getResumeFileByIdService = async (resume_file_id) => {
  const resumeFile = await ResumeFile.findById(resume_file_id).populate(
    "candidate_id"
  );
  if (!resumeFile) {
    throw new AppError("Không tìm thấy resume", 404);
  }
  return resumeFile;
};

const updateResumeFileService = async (resume_file_id, updateData, file) => {
  const { name } = updateData;
  const resumeFile = await ResumeFile.findById(resume_file_id);
  if (!resumeFile) {
    throw new AppError("Không tìm thấy resume", 404);
  }

  if (name !== undefined && !name) {
    throw new AppError("Tên resume không được để trống", 400);
  }

  if (file) {
    if (resumeFile.path) {
      const publicId = resumeFile.path.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`resumes/${publicId}`, {
        resource_type: resumeFile.path.match(/\.(jpg|png|jpeg)$/i)
          ? "image"
          : "raw",
      });
    }

    const cloudinaryResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "raw", folder: "resumes" },
          (error, result) => {
            if (error) reject(new AppError("Cloudinary upload failed", 500));
            resolve(result);
          }
        )
        .end(file.buffer);
    });
    resumeFile.path = cloudinaryResult.secure_url;
  }

  resumeFile.name = name !== undefined ? name : resumeFile.name;
  const result = await resumeFile.save();
  return result;
};

const deleteResumeFileService = async (resume_file_id) => {
  const resumeFile = await ResumeFile.findById(resume_file_id);
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
  const result = await ResumeFile.deleteOne({ _id: resume_file_id });
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
