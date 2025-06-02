const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Industry = require("../models/industry.model");

const createIndustryService = async (industryData) => {
  const { industry_group_id, name } = industryData;
  if (!industry_group_id || !name) {
    throw new AppError(
      "Thiếu các trường bắt buộc: industry_group_id và name là bắt buộc",
      400
    );
  }

  let result = await Industry.create({
    industry_group_id,
    name,
    status: "open",
  });

  return result;
};

const getListIndustryService = async () => {
  let result = await Industry.find().populate("industry_group_id");
  return result;
};

const getIndustryByIdService = async (industry_id) => {
  let industry = await Industry.findById(industry_id).populate(
    "industry_group_id"
  );
  if (!industry) {
    throw new AppError("Không tìm thấy ngành", 404);
  }
  return industry;
};

const updateIndustryStatusService = async (industry_id, status) => {
  if (!status || !["open", "closed", "under_review"].includes(status)) {
    throw new AppError("Giá trị trạng thái không hợp lệ", 400);
  }

  let industry = await Industry.findById(industry_id);
  if (!industry) {
    throw new AppError("Không tìm thấy ngành", 404);
  }

  industry.status = status;
  let result = await industry.save();
  return result;
};

const deleteIndustryService = async (industry_id) => {
  let industry = await Industry.findById(industry_id);
  if (!industry) {
    throw new AppError("Không tìm thấy ngành", 404);
  }
  let result = await industry.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

const deleteAllIndustriesService = async () => {
  let result = await Industry.deleteMany({}); // Xóa cứng toàn bộ
  return result;
};

module.exports = {
  createIndustryService,
  getListIndustryService,
  getIndustryByIdService,
  updateIndustryStatusService,
  deleteIndustryService,
  deleteAllIndustriesService,
};
