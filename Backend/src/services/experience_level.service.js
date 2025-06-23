const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const ExperienceLevel = require("../models/experience_level.model");

const createExperienceLevelService = async (experienceLevelData) => {
  const { name } = experienceLevelData;
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let result = await ExperienceLevel.create({
    name,
  });

  return result;
};

const getAllExperienceLevelService = async () => {
  let result = await ExperienceLevel.find();
  return result;
};

const getExperienceLevelByIdService = async (experience_level_id) => {
  let experienceLevel = await ExperienceLevel.findById(experience_level_id);
  if (!experienceLevel) {
    throw new AppError("Không tìm thấy cấp độ kinh nghiệm", 404);
  }
  return experienceLevel;
};

const updateExperienceLevelService = async (experience_level_id, name) => {
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let experienceLevel = await ExperienceLevel.findById(experience_level_id);
  if (!experienceLevel) {
    throw new AppError("Không tìm thấy cấp độ kinh nghiệm", 404);
  }

  experienceLevel.name = name;
  let result = await experienceLevel.save();
  return result;
};

const deleteExperienceLevelService = async (experience_level_id) => {
  let experienceLevel = await ExperienceLevel.findById(experience_level_id);
  if (!experienceLevel) {
    throw new AppError("Không tìm thấy cấp độ kinh nghiệm", 404);
  }
  let result = await ExperienceLevel.deleteOne({ _id: experience_level_id }); // Xóa cứng khỏi database
  return result;
};

module.exports = {
  createExperienceLevelService,
  getAllExperienceLevelService,
  getExperienceLevelByIdService,
  updateExperienceLevelService,
  deleteExperienceLevelService,
};
