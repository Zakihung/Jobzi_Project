const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const CompanyIndustry = require("../models/company_industry.model");

require("dotenv").config();

const createCompanyIndustryService = async (companyIndustryData) => {
  const { name } = companyIndustryData;
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let result = await CompanyIndustry.create({
    name,
    status: "open",
  });

  return result;
};

const getListCompanyIndustryService = async () => {
  let result = await CompanyIndustry.find();
  return result;
};

const getCompanyIndustryByIdService = async (company_industry_id) => {
  let companyIndustry = await CompanyIndustry.findById(company_industry_id);
  if (!companyIndustry) {
    throw new AppError("Không tìm thấy ngành công ty", 404);
  }
  return companyIndustry;
};

const updateCompanyIndustryService = async (
  company_industry_id,
  updateData
) => {
  const { name, status } = updateData;
  let companyIndustry = await CompanyIndustry.findById(company_industry_id);
  if (!companyIndustry) {
    throw new AppError("Không tìm thấy ngành công ty", 404);
  }

  if (name !== undefined && !name) {
    throw new AppError("Tên ngành công ty không được để trống", 400);
  }
  if (status && !["open", "closed", "under_review"].includes(status)) {
    throw new AppError("Giá trị trạng thái không hợp lệ", 400);
  }

  companyIndustry.name = name !== undefined ? name : companyIndustry.name;
  companyIndustry.status =
    status !== undefined ? status : companyIndustry.status;

  let result = await companyIndustry.save();
  return result;
};

const deleteCompanyIndustryService = async (company_industry_id) => {
  let companyIndustry = await CompanyIndustry.findById(company_industry_id);
  if (!companyIndustry) {
    throw new AppError("Không tìm thấy ngành công ty", 404);
  }
  let result = await companyIndustry.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

const deleteAllCompanyIndustriesService = async () => {
  let result = await CompanyIndustry.deleteMany({}); // Xóa cứng toàn bộ
  return result;
};

module.exports = {
  createCompanyIndustryService,
  getListCompanyIndustryService,
  getCompanyIndustryByIdService,
  updateCompanyIndustryService,
  deleteCompanyIndustryService,
  deleteAllCompanyIndustriesService,
};
