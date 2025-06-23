const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const JobPostSkillsRequirement = require("../models/job_post_skills_requirement.model");

const createJobPostSkillsRequirementService = async (
  jobPostSkillsRequirementData
) => {
  const { skills_requirement_id, job_post_id } = jobPostSkillsRequirementData;
  if (!skills_requirement_id || !job_post_id) {
    throw new AppError(
      "Thiếu trường bắt buộc: skills_requirement_id và job_post_id là bắt buộc",
      400
    );
  }

  let result = await JobPostSkillsRequirement.create({
    skills_requirement_id,
    job_post_id,
  });

  return result;
};

const getAllJobPostSkillsRequirementService = async () => {
  let result = await JobPostSkillsRequirement.find()
    .populate("skills_requirement_id")
    .populate("job_post_id");
  return result;
};

const getSkillsRequirementByJobPostIdService = async (job_post_id) => {
  let result = await JobPostSkillsRequirement.find({ job_post_id }).populate(
    "skills_requirement_id"
  );
  if (!result.length) {
    throw new AppError(
      "Không tìm thấy yêu cầu kỹ năng cho bài đăng công việc này",
      404
    );
  }
  return result;
};

const getJobPostBySkillsRequirementIdService = async (
  skills_requirement_id
) => {
  let result = await JobPostSkillsRequirement.find({
    skills_requirement_id,
  }).populate("job_post_id");
  if (!result.length) {
    throw new AppError(
      "Không tìm thấy bài đăng công việc cho yêu cầu kỹ năng này",
      404
    );
  }
  return result;
};

const deleteJobPostSkillsRequirementService = async (id) => {
  let jobPostSkillsRequirement = await JobPostSkillsRequirement.findById(id);
  if (!jobPostSkillsRequirement) {
    throw new AppError(
      "Không tìm thấy liên kết yêu cầu kỹ năng và bài đăng công việc",
      404
    );
  }
  let result = await JobPostSkillsRequirement.deleteOne({ _id: id }); // Xóa cứng khỏi database
  return result;
};

module.exports = {
  createJobPostSkillsRequirementService,
  getAllJobPostSkillsRequirementService,
  getSkillsRequirementByJobPostIdService,
  getJobPostBySkillsRequirementIdService,
  deleteJobPostSkillsRequirementService,
};
