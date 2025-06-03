const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Employer = require("../models/employer.model");
const cloudinary = require("../configs/cloudinary");

const createEmployerService = async (employerData, file) => {
  const {
    user_id,
    company_id,
    full_name,
    gender,
    date_of_birth,
    position,
    phone_number,
  } = employerData;
  if (!user_id || !full_name) {
    throw new AppError(
      "Thiếu các trường bắt buộc: user_id và full_name là bắt buộc",
      400
    );
  }
  if (gender && !["male", "female"].includes(gender)) {
    throw new AppError(
      "Giới tính không hợp lệ: chỉ chấp nhận 'male' hoặc 'female'",
      400
    );
  }

  let avatarUrl = "";
  if (file) {
    avatarUrl = file.path; // Lấy URL từ Cloudinary sau khi upload
  }

  let result = await Employer.create({
    user_id,
    company_id: company_id || null,
    full_name,
    gender: gender || "",
    date_of_birth: date_of_birth || null,
    position: position || "",
    phone_number: phone_number || "",
    avatar: avatarUrl,
  });

  return result;
};

const getListEmployerService = async () => {
  let result = await Employer.find().populate("user_id").populate("company_id");
  return result;
};

const getEmployerByIdService = async (employer_id) => {
  let employer = await Employer.findById(employer_id)
    .populate("user_id")
    .populate("company_id");
  if (!employer) {
    throw new AppError("Không tìm thấy nhà tuyển dụng", 404);
  }
  return employer;
};

const updateEmployerService = async (employer_id, updateData, file) => {
  const {
    full_name,
    company_id,
    gender,
    date_of_birth,
    position,
    phone_number,
  } = updateData;
  let employer = await Employer.findById(employer_id);
  if (!employer) {
    throw new AppError("Không tìm thấy nhà tuyển dụng", 404);
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
    if (employer.avatar) {
      const publicId = employer.avatar.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`employer_avatars/${publicId}`);
    }
    employer.avatar = file.path; // Cập nhật URL avatar mới từ Cloudinary
  }

  employer.full_name = full_name !== undefined ? full_name : employer.full_name;
  employer.company_id =
    company_id !== undefined ? company_id : employer.company_id;
  employer.gender = gender !== undefined ? gender : employer.gender;
  employer.date_of_birth =
    date_of_birth !== undefined ? date_of_birth : employer.date_of_birth;
  employer.position = position !== undefined ? position : employer.position;
  employer.phone_number =
    phone_number !== undefined ? phone_number : employer.phone_number;

  let result = await employer.save();
  return result;
};

const deleteEmployerService = async (employer_id) => {
  let employer = await Employer.findById(employer_id);
  if (!employer) {
    throw new AppError("Không tìm thấy nhà tuyển dụng", 404);
  }
  if (employer.avatar) {
    const publicId = employer.avatar.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`employer_avatars/${publicId}`);
  }
  let result = await employer.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

const uploadAvatarEmployerService = async (employer_id, file) => {
  if (!file) {
    throw new AppError("Không có file ảnh được cung cấp", 400);
  }

  let employer = await Employer.findById(employer_id);
  if (!employer) {
    throw new AppError("Không tìm thấy nhà tuyển dụng", 404);
  }

  // Xóa avatar cũ trên Cloudinary nếu tồn tại
  if (employer.avatar) {
    const publicId = employer.avatar.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`employer_avatars/${publicId}`);
  }

  // Lưu URL của ảnh mới từ Cloudinary
  employer.avatar = file.path; // file.path chứa URL từ Cloudinary sau khi upload
  let result = await employer.save();
  return result;
};

module.exports = {
  createEmployerService,
  getListEmployerService,
  getEmployerByIdService,
  updateEmployerService,
  deleteEmployerService,
  uploadAvatarEmployerService,
};
