const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Company = require("../models/company.model");
const cloudinary = require("../configs/cloudinary");

const createCompanyService = async (companyData) => {
  const {
    company_industry_id,
    province_id,
    name,
    address,
    min_size,
    max_size,
    introduction,
    businessOperations,
    regulations,
    benefits,
  } = companyData;
  if (!company_industry_id || !province_id || !name || !address) {
    throw new AppError(
      "Thiếu các trường bắt buộc: company_industry_id, province_id, name và address là bắt buộc",
      400
    );
  }

  let result = await Company.create({
    ...companyData,
  });

  return result;
};

const getListCompanyService = async () => {
  let result = await Company.find().populate([
    "company_industry_id",
    "province_id",
  ]);
  return result;
};

const getCompanyByIdService = async (company_id) => {
  let company = await Company.findById(company_id).populate([
    "company_industry_id",
    "province_id",
  ]);
  if (!company) {
    throw new AppError("Không tìm thấy công ty", 404);
  }
  return company;
};

const getCompanyByIndustryIdService = async (company_industry_id) => {
  if (!mongoose.Types.ObjectId.isValid(company_industry_id)) {
    throw new AppError("ID ngành công ty không hợp lệ", 400);
  }
  let result = await Company.find({ company_industry_id }).populate([
    "company_industry_id",
    "province_id",
  ]);
  return result;
};

const getCompanyByProvinceIdService = async (province_id) => {
  if (!mongoose.Types.ObjectId.isValid(province_id)) {
    throw new AppError("ID tỉnh/thành phố không hợp lệ", 400);
  }
  let result = await Company.find({ province_id }).populate([
    "company_industry_id",
    "province_id",
  ]);
  return result;
};

const updateCompanyService = async (company_id, updateData) => {
  const {
    company_industry_id,
    province_id,
    name,
    description,
    min_size,
    max_size,
    website_url,
    address,
    introduction,
    businessOperations,
    regulations,
    benefits,
  } = updateData;
  let company = await Company.findById(company_id);
  if (!company) {
    throw new AppError("Không tìm thấy công ty", 404);
  }

  if (name !== undefined && !name) {
    throw new AppError("Tên công ty không được để trống", 400);
  }

  company.company_industry_id =
    company_industry_id !== undefined
      ? company_industry_id
      : company.company_industry_id;
  company.province_id =
    province_id !== undefined ? province_id : company.province_id;
  company.name = name !== undefined ? name : company.name;
  company.description =
    description !== undefined ? description : company.description;
  company.min_size = min_size !== undefined ? min_size : company.min_size;
  company.max_size = max_size !== undefined ? max_size : company.max_size;
  company.website_url =
    website_url !== undefined ? website_url : company.website_url;
  company.address = address !== undefined ? address : company.address;
  company.introduction =
    introduction !== undefined ? introduction : company.introduction;
  company.businessOperations =
    businessOperations !== undefined
      ? businessOperations
      : company.businessOperations;
  company.regulations =
    regulations !== undefined ? regulations : company.regulations;
  company.benefits = benefits !== undefined ? benefits : company.benefits;

  let result = await company.save();
  return result;
};

const deleteCompanyService = async (company_id) => {
  let company = await Company.findById(company_id);
  if (!company) {
    throw new AppError("Không tìm thấy công ty", 404);
  }
  if (company.logo) {
    const publicId = company.logo.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`company_avatars/${publicId}`);
  }
  let result = await company.delete();
  return result;
};

const uploadLogoCompanyService = async (company_id, file) => {
  if (!file) {
    throw new AppError("Không có file logo được cung cấp", 400);
  }

  let company = await Company.findById(company_id);
  if (!company) {
    throw new AppError("Không tìm thấy công ty", 404);
  }

  // Xóa logo cũ nếu có
  if (company.logo) {
    const publicId = company.logo.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`company_avatars/${publicId}`, {
      resource_type: "image",
    });
  }

  // Upload logo mới lên Cloudinary
  const cloudinaryResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "company_avatars",
          public_id: `logo_${Date.now()}.${file.mimetype.split("/")[1]}`,
          transformation: [
            { width: 500, height: 500, crop: "limit" },
            { quality: "auto:best" },
          ],
        },
        (error, result) => {
          if (error) reject(new AppError("Cloudinary upload failed", 500));
          resolve(result);
        }
      )
      .end(file.buffer);
  });

  // Lưu URL logo mới
  company.logo = cloudinaryResult.secure_url;
  let result = await company.save();
  return result;
};

module.exports = {
  createCompanyService,
  getListCompanyService,
  getCompanyByIdService,
  getCompanyByIndustryIdService,
  getCompanyByProvinceIdService,
  updateCompanyService,
  deleteCompanyService,
  uploadLogoCompanyService,
};
