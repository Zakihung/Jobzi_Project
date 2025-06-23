const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const SkillsRequirement = require("../models/skills_requirement.model");

const createSkillsRequirementService = async (skillsRequirementData) => {
  const { name } = skillsRequirementData;
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let result = await SkillsRequirement.create({
    name,
  });

  return result;
};

const getAllSkillsRequirementService = async () => {
  let result = await SkillsRequirement.find();
  return result;
};

const getSkillsRequirementByIdService = async (skills_requirement_id) => {
  let skillsRequirement = await SkillsRequirement.findById(
    skills_requirement_id
  );
  if (!skillsRequirement) {
    throw new AppError("Không tìm thấy yêu cầu kỹ năng", 404);
  }
  return skillsRequirement;
};

const updateSkillsRequirementService = async (skills_requirement_id, name) => {
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let skillsRequirement = await SkillsRequirement.findById(
    skills_requirement_id
  );
  if (!skillsRequirement) {
    throw new AppError("Không tìm thấy yêu cầu kỹ năng", 404);
  }

  skillsRequirement.name = name;
  let result = await skillsRequirement.save();
  return result;
};

const deleteSkillsRequirementService = async (skills_requirement_id) => {
  let skillsRequirement = await SkillsRequirement.findById(
    skills_requirement_id
  );
  if (!skillsRequirement) {
    throw new AppError("Không tìm thấy yêu cầu kỹ năng", 404);
  }
  let result = await SkillsRequirement.deleteOne({
    _id: skills_requirement_id,
  }); // Xóa cứng khỏi database
  return result;
};

module.exports = {
  createSkillsRequirementService,
  getAllSkillsRequirementService,
  getSkillsRequirementByIdService,
  updateSkillsRequirementService,
  deleteSkillsRequirementService,
};
