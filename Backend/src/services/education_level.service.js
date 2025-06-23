const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const EducationLevel = require("../models/education_level.model");

const createEducationLevelService = async (educationLevelData) => {
  const { name } = educationLevelData;
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let result = await EducationLevel.create({
    name,
  });

  return result;
};

const getAllEducationLevelService = async () => {
  let result = await EducationLevel.find();
  return result;
};

const getEducationLevelByIdService = async (education_level_id) => {
  let educationLevel = await EducationLevel.findById(education_level_id);
  if (!educationLevel) {
    throw new AppError("Không tìm thấy trình độ học vấn", 404);
  }
  return educationLevel;
};

const updateEducationLevelService = async (education_level_id, name) => {
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let educationLevel = await EducationLevel.findById(education_level_id);
  if (!educationLevel) {
    throw new AppError("Không tìm thấy trình độ học vấn", 404);
  }

  educationLevel.name = name;
  let result = await educationLevel.save();
  return result;
};

const deleteEducationLevelService = async (education_level_id) => {
  let educationLevel = await EducationLevel.findById(education_level_id);
  if (!educationLevel) {
    throw new AppError("Không tìm thấy trình độ học vấn", 404);
  }
  let result = await EducationLevel.deleteOne({ _id: education_level_id }); // Xóa cứng khỏi database
  return result;
};

module.exports = {
  createEducationLevelService,
  getAllEducationLevelService,
  getEducationLevelByIdService,
  updateEducationLevelService,
  deleteEducationLevelService,
};
