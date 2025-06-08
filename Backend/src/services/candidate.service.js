const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Candidate = require("../models/candidate.model");
const cloudinary = require("../configs/cloudinary");

const getListCandidateService = async () => {
  let result = await Candidate.find().populate("user_id");
  return result;
};

const getCandidateByIdService = async (candidate_id) => {
  let candidate = await Candidate.findById(candidate_id).populate("user_id");
  if (!candidate) {
    throw new AppError("Không tìm thấy ứng viên", 404);
  }
  return candidate;
};

const updateCandidateService = async (candidate_id, updateData, file) => {
  const { full_name, gender, date_of_birth, phone_number } = updateData;
  let candidate = await Candidate.findById(candidate_id);
  if (!candidate) {
    throw new AppError("Không tìm thấy ứng viên", 404);
  }

  if (full_name !== undefined && !full_name) {
    throw new AppError("Tên đầy đủ không được để trống", 400);
  }
  if (gender !== undefined && gender && !["male", "female"].includes(gender)) {
    throw new AppError(
      "Giới tính không hợp lệ: chỉ chấp nhận 'male' hoặc 'female'",
      400
    );
  }

  if (file) {
    // Xóa avatar cũ trên Cloudinary nếu tồn tại
    if (candidate.avatar) {
      const publicId = candidate.avatar.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`candidate_avatars/${publicId}`);
    }
    candidate.avatar = file.path; // Cập nhật URL avatar mới từ Cloudinary
  }

  candidate.full_name =
    full_name !== undefined ? full_name : candidate.full_name;
  candidate.gender = gender !== undefined ? gender : candidate.gender;
  candidate.date_of_birth =
    date_of_birth !== undefined ? date_of_birth : candidate.date_of_birth;
  candidate.phone_number =
    phone_number !== undefined ? phone_number : candidate.phone_number;

  let result = await candidate.save();
  return result;
};

const deleteCandidateService = async (candidate_id) => {
  let candidate = await Candidate.findById(candidate_id);
  if (!candidate) {
    throw new AppError("Không tìm thấy ứng viên", 404);
  }
  if (candidate.avatar) {
    const publicId = candidate.avatar.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`candidate_avatars/${publicId}`);
  }
  let result = await candidate.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

const uploadAvatarCandidateService = async (candidate_id, file) => {
  if (!file) {
    throw new AppError("Không có file ảnh được cung cấp", 400);
  }

  let candidate = await Candidate.findById(candidate_id);
  if (!candidate) {
    throw new AppError("Không tìm thấy ứng viên", 404);
  }

  // Xóa avatar cũ trên Cloudinary nếu tồn tại
  if (candidate.avatar) {
    const publicId = candidate.avatar.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`candidate_avatars/${publicId}`);
  }

  // Lưu URL của ảnh mới từ Cloudinary
  candidate.avatar = file.path; // file.path chứa URL từ Cloudinary sau khi upload
  let result = await candidate.save();
  return result;
};

module.exports = {
  getListCandidateService,
  getCandidateByIdService,
  updateCandidateService,
  deleteCandidateService,
  uploadAvatarCandidateService,
};
