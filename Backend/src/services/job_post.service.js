const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const JobPost = require("../models/job_post.model");
const SkillsRequirement = require("../models/skills_requirement.model");
const JobPostSkillsRequirement = require("../models/job_post_skills_requirement.model");
const WorkAddress = require("../models/work_address.model");
const JobPostWorkAddress = require("../models/job_post_work_address.model");
const Province = require("../models/province.model");

const createJobPostService = async (jobPostData) => {
  const {
    employer_id,
    job_position_id,
    title,
    skills,
    locations,
    ...otherData
  } = jobPostData;
  if (!employer_id || !job_position_id || !title) {
    throw new AppError(
      "Thiếu các trường bắt buộc: employer_id, job_position_id và title là bắt buộc",
      400
    );
  }

  // Tạo job post
  let jobPost = await JobPost.create({
    employer_id,
    job_position_id,
    title,
    ...otherData,
  });

  // Xử lý skills
  if (skills && Array.isArray(skills) && skills.length > 0) {
    const skillDocs = await Promise.all(
      skills.map(async (skill) => {
        let skillDoc = await SkillsRequirement.findOne({ name: skill });
        if (!skillDoc) {
          skillDoc = await SkillsRequirement.create({ name: skill });
        }
        return skillDoc;
      })
    );

    const jobPostSkills = skillDocs.map((skillDoc) => ({
      job_post_id: jobPost._id,
      skills_requirement_id: skillDoc._id,
    }));

    await JobPostSkillsRequirement.insertMany(jobPostSkills);
  }

  // Xử lý locations
  if (locations && Array.isArray(locations) && locations.length > 0) {
    const locationDocs = await Promise.all(
      locations.map(async (location) => {
        if (!location.address || !location.province) {
          throw new AppError("Mỗi địa điểm phải có address và province", 400);
        }

        // Tìm Province có name khớp với location.province
        const provinceDoc = await Province.findOne({ name: location.province });
        if (!provinceDoc) {
          throw new AppError(
            `Không tìm thấy tỉnh/thành phố: ${location.province}`,
            400
          );
        }

        // Tạo WorkAddress với province_id là _id của Province
        return await WorkAddress.create({
          address: location.address,
          province_id: provinceDoc._id,
        });
      })
    );

    const jobPostLocations = locationDocs.map((locationDoc) => ({
      job_post_id: jobPost._id,
      work_address_id: locationDoc._id,
    }));

    await JobPostWorkAddress.insertMany(jobPostLocations);
  }

  // Lấy lại job post với populate
  jobPost = await JobPost.findById(jobPost._id)
    .populate("employer_id")
    .populate("job_position_id");

  return jobPost;
};

const getAllJobPostsService = async () => {
  let result = await JobPost.find()
    .populate("employer_id")
    .populate("job_position_id");
  return result;
};

const getJobPostByIdService = async (job_post_id) => {
  let jobPost = await JobPost.findById(job_post_id)
    .populate("employer_id")
    .populate("job_position_id");
  if (!jobPost) {
    throw new AppError("Không tìm thấy bài đăng tuyển dụng", 404);
  }
  return jobPost;
};

const getJobPostsByEmployerIdService = async (employer_id) => {
  let jobPosts = await JobPost.find({ employer_id })
    .populate("employer_id")
    .populate("job_position_id");
  return jobPosts;
};

const getJobPostsByJobPositionIdService = async (job_position_id) => {
  let jobPosts = await JobPost.find({ job_position_id })
    .populate("employer_id")
    .populate("job_position_id");
  return jobPosts;
};

const updateJobPostService = async (job_post_id, updateData) => {
  let jobPost = await JobPost.findById(job_post_id);
  if (!jobPost) {
    throw new AppError("Không tìm thấy bài đăng tuyển dụng", 404);
  }

  Object.assign(jobPost, updateData);
  let result = await jobPost.save();
  return result;
};

const deleteJobPostService = async (job_post_id) => {
  let jobPost = await JobPost.findById(job_post_id);
  if (!jobPost) {
    throw new AppError("Không tìm thấy bài đăng tuyển dụng", 404);
  }
  let result = await JobPost.deleteOne({ _id: job_post_id }); // Xóa cứng
  return result;
};

const deleteAllJobPostsService = async () => {
  let result = await JobPost.deleteMany({}); // Xóa cứng toàn bộ
  return result;
};

module.exports = {
  createJobPostService,
  getAllJobPostsService,
  getJobPostByIdService,
  getJobPostsByEmployerIdService,
  getJobPostsByJobPositionIdService,
  updateJobPostService,
  deleteJobPostService,
  deleteAllJobPostsService,
};
