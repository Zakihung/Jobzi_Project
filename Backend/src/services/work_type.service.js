const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const WorkType = require("../models/work_type.model");

const createWorkTypeService = async (workTypeData) => {
  const { name } = workTypeData;
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let result = await WorkType.create({
    name,
  });

  return result;
};

const getListWorkTypeService = async () => {
  let result = await WorkType.find();
  return result;
};

const getWorkTypeByIdService = async (work_type_id) => {
  let workType = await WorkType.findById(work_type_id);
  if (!workType) {
    throw new AppError("Không tìm thấy loại hình công việc", 404);
  }
  return workType;
};

const updateWorkTypeService = async (work_type_id, name) => {
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let workType = await WorkType.findById(work_type_id);
  if (!workType) {
    throw new AppError("Không tìm thấy loại hình công việc", 404);
  }

  workType.name = name;
  let result = await workType.save();
  return result;
};

const deleteWorkTypeService = async (work_type_id) => {
  let workType = await WorkType.findById(work_type_id);
  if (!workType) {
    throw new AppError("Không tìm thấy loại hình công việc", 404);
  }
  let result = await WorkType.deleteOne({ _id: work_type_id }); // Xóa cứng khỏi database
  return result;
};

module.exports = {
  createWorkTypeService,
  getListWorkTypeService,
  getWorkTypeByIdService,
  updateWorkTypeService,
  deleteWorkTypeService,
};
