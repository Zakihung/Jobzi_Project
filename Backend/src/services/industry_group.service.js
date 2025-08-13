const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const IndustryGroup = require("../models/industry_group.model");

const createIndustryGroupService = async (industryGroupData) => {
  const { name } = industryGroupData;
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let result = await IndustryGroup.create({
    name,
    status: "open",
  });

  return result;
};

const getListIndustryGroupService = async () => {
  let result = await IndustryGroup.find();
  return result;
};

const getIndustryGroupByIdService = async (industry_group_id) => {
  let industryGroup = await IndustryGroup.findById(industry_group_id);
  if (!industryGroup) {
    throw new AppError("Không tìm thấy nhóm ngành", 404);
  }
  return industryGroup;
};

const updateIndustryGroupStatusService = async (industry_group_id, status) => {
  if (!status || !["open", "closed", "under_review"].includes(status)) {
    throw new AppError("Giá trị trạng thái không hợp lệ", 400);
  }

  let industryGroup = await IndustryGroup.findById(industry_group_id);
  if (!industryGroup) {
    throw new AppError("Không tìm thấy nhóm ngành", 404);
  }

  industryGroup.status = status;
  let result = await industryGroup.save();
  return result;
};

const deleteIndustryGroupService = async (industry_group_id) => {
  let industryGroup = await IndustryGroup.findById(industry_group_id);
  if (!industryGroup) {
    throw new AppError("Không tìm thấy nhóm ngành", 404);
  }
  let result = await industryGroup.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

const deleteAllIndustryGroupsService = async () => {
  let result = await IndustryGroup.deleteMany({}); // Xóa cứng toàn bộ
  return result;
};

const updateIndustryGroupService = async (industry_group_id, updateData) => {
  const { name, status } = updateData;

  let industryGroup = await IndustryGroup.findById(industry_group_id);
  if (!industryGroup) {
    throw new AppError("Không tìm thấy nhóm ngành", 404);
  }

  if (name) {
    industryGroup.name = name;
  }
  if (status) {
    if (!["open", "closed", "under_review"].includes(status)) {
      throw new AppError("Giá trị trạng thái không hợp lệ", 400);
    }
    industryGroup.status = status;
  }

  let result = await industryGroup.save();
  return result;
};

module.exports = {
  createIndustryGroupService,
  getListIndustryGroupService,
  getIndustryGroupByIdService,
  updateIndustryGroupStatusService,
  deleteIndustryGroupService,
  deleteAllIndustryGroupsService,
  updateIndustryGroupService,
};
