const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const ResumeFile = require("../models/resume_file.model");
const cloudinary = require("../configs/cloudinary");
const ResumeAnalysis = require("../models/resume_analysis.model");

const createResumeFileService = async (candidate_id, name, file) => {
  if (!candidate_id || !name) {
    throw new AppError(
      "Thiếu các trường bắt buộc: candidate_id và name là bắt buộc",
      400
    );
  }
  if (typeof name !== "string" || name.trim() === "") {
    throw new AppError("Tên file resume phải là chuỗi hợp lệ", 400);
  }
  if (!file) {
    throw new AppError("Không có file resume được cung cấp", 400);
  }
  if (!file.mimetype.includes("pdf")) {
    throw new AppError("File phải là định dạng PDF", 400);
  }

  // Đảm bảo tên file có đuôi .pdf
  const sanitizedName = name.toLowerCase().endsWith(".pdf")
    ? name
    : `${name}.pdf`;

  // Upload file lên Cloudinary
  const cloudinaryResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "raw",
          folder: "resumes",
          public_id: `resume_${Date.now()}.pdf`,
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
    name: sanitizedName,
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

  if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
    throw new AppError("Tên file resume phải là chuỗi hợp lệ", 400);
  }

  if (file) {
    if (!file.mimetype.includes("pdf")) {
      throw new AppError("File phải là định dạng PDF", 400);
    }
    if (resumeFile.path) {
      const publicId = resumeFile.path.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`resumes/${publicId}`, {
        resource_type: "raw",
      });
    }

    const cloudinaryResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            folder: "resumes",
            public_id: `resume_${Date.now()}.pdf`,
          },
          (error, result) => {
            if (error) reject(new AppError("Cloudinary upload failed", 500));
            resolve(result);
          }
        )
        .end(file.buffer);
    });
    resumeFile.path = cloudinaryResult.secure_url;
  }

  resumeFile.name =
    name !== undefined
      ? name.toLowerCase().endsWith(".pdf")
        ? name
        : `${name}.pdf`
      : resumeFile.name;
  const result = await resumeFile.save();
  return result;
};

const deleteResumeFileService = async (resume_file_id) => {
  const resumeFile = await ResumeFile.findById(resume_file_id);
  if (!resumeFile) {
    throw new AppError("Không tìm thấy resume", 404);
  }

  // Xóa file trên Cloudinary nếu có
  if (resumeFile.path) {
    const publicId = resumeFile.path.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`resumes/${publicId}`, {
      resource_type: "raw",
    });
  }

  // Xóa các bản ghi ResumeAnalysis liên quan
  await ResumeAnalysis.deleteMany({ resume_file_id });

  // Xóa ResumeFile
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
