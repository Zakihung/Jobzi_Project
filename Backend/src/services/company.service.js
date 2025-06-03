const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Company = require("../models/company.model");
const cloudinary = require("../configs/cloudinary");

const createCompanyService = async (companyData, file) => {
  const { company_industry_id, name, description, size, website_url, address } =
    companyData;
  if (!company_industry_id || !name) {
    throw new AppError(
      "Thiếu các trường bắt buộc: company_industry_id và name là bắt buộc",
      400
    );
  }

  let logoUrl = "";
  if (file) {
    logoUrl = file.path; // Lấy URL từ Cloudinary sau khi upload
  }

  let result = await Company.create({
    company_industry_id,
    name,
    description: description || "",
    size: size || "",
    website_url: website_url || "",
    address: address || "",
    logo: logoUrl,
  });

  return result;
};

const getListCompanyService = async () => {
  let result = await Company.find().populate("company_industry_id");
  return result;
};

const getCompanyByIdService = async (company_id) => {
  let company = await Company.findById(company_id).populate(
    "company_industry_id"
  );
  if (!company) {
    throw new AppError("Không tìm thấy công ty", 404);
  }
  return company;
};

const getCompanyByIndustryIdService = async (company_industry_id) => {
  if (!mongoose.Types.ObjectId.isValid(company_industry_id)) {
    throw new AppError("ID ngành công ty không hợp lệ", 400);
  }
  let result = await Company.find({ company_industry_id }).populate(
    "company_industry_id"
  );
  return result;
};

const updateCompanyService = async (company_id, updateData) => {
  const { company_industry_id, name, description, size, website_url, address } =
    updateData;
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
  company.name = name !== undefined ? name : company.name;
  company.description =
    description !== undefined ? description : company.description;
  company.size = size !== undefined ? size : company.size;
  company.website_url =
    website_url !== undefined ? website_url : company.website_url;
  company.address = address !== undefined ? address : company.address;

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
  let result = await company.delete(); // Xóa mềm sử dụng mongoose-delete
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

  // Xóa logo cũ trên Cloudinary nếu tồn tại
  if (company.logo) {
    const publicId = company.logo.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`company_avatars/${publicId}`);
  }

  // Lưu URL của logo mới từ Cloudinary
  company.logo = file.path; // file.path chứa URL từ Cloudinary sau khi upload
  let result = await company.save();
  return result;
};

module.exports = {
  createCompanyService,
  getListCompanyService,
  getCompanyByIdService,
  getCompanyByIndustryIdService,
  updateCompanyService,
  deleteCompanyService,
  uploadLogoCompanyService,
};
