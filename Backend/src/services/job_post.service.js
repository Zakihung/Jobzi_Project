const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const JobPost = require("../models/job_post.model");
const SkillsRequirement = require("../models/skills_requirement.model");
const JobPostSkillsRequirement = require("../models/job_post_skills_requirement.model");
const WorkAddress = require("../models/work_address.model");
const JobPostWorkAddress = require("../models/job_post_work_address.model");
const Province = require("../models/province.model");
const {
  getSkillsRequirementByJobPostIdService,
} = require("./job_post_skills_requirement.service");
const {
  getWorkAddressByJobPostIdService,
} = require("./job_post_work_address.service");

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

  // Lấy skills và locations cho từng job post
  result = await Promise.all(
    result.map(async (jobPost) => {
      const jobPostObj = jobPost.toObject();

      // Lấy skills
      const skills = await getSkillsRequirementByJobPostIdService(
        jobPost._id
      ).catch(() => []);
      jobPostObj.skills = skills.map(
        (skill) => skill.skills_requirement_id.name
      );

      // Lấy locations
      const locations = await getWorkAddressByJobPostIdService(
        jobPost._id
      ).catch(() => []);
      jobPostObj.locations = locations.map((location) => ({
        address: location.work_address_id.address,
        province: location.work_address_id.province_id.name,
      }));

      return jobPostObj;
    })
  );

  return result;
};

const getJobPostByIdService = async (job_post_id) => {
  let jobPost = await JobPost.findById(job_post_id)
    .populate("employer_id")
    .populate("job_position_id");

  if (!jobPost) {
    throw new AppError("Không tìm thấy bài đăng tuyển dụng", 404);
  }

  const jobPostObj = jobPost.toObject();

  // Lấy skills
  const skills = await getSkillsRequirementByJobPostIdService(
    job_post_id
  ).catch(() => []);
  jobPostObj.skills = skills.map((skill) => skill.skills_requirement_id.name);

  // Lấy locations
  const locations = await getWorkAddressByJobPostIdService(job_post_id).catch(
    () => []
  );
  jobPostObj.locations = locations.map((location) => ({
    address: location.work_address_id.address,
    province: location.work_address_id.province_id.name,
  }));

  return jobPostObj;
};

const getJobPostsByEmployerIdService = async (employer_id) => {
  let jobPosts = await JobPost.find({ employer_id })
    .populate("employer_id")
    .populate("job_position_id");

  // Lấy skills và locations cho từng job post
  jobPosts = await Promise.all(
    jobPosts.map(async (jobPost) => {
      const jobPostObj = jobPost.toObject();

      // Lấy skills
      const skills = await getSkillsRequirementByJobPostIdService(
        jobPost._id
      ).catch(() => []);
      jobPostObj.skills = skills.map(
        (skill) => skill.skills_requirement_id.name
      );

      // Lấy locations
      const locations = await getWorkAddressByJobPostIdService(
        jobPost._id
      ).catch(() => []);
      jobPostObj.locations = locations.map((location) => ({
        address: location.work_address_id.address,
        province: location.work_address_id.province_id.name,
      }));

      return jobPostObj;
    })
  );

  return jobPosts;
};

const getJobPostsByJobPositionIdService = async (job_position_id) => {
  let jobPosts = await JobPost.find({ job_position_id })
    .populate("employer_id")
    .populate("job_position_id");

  // Lấy skills và locations cho từng job post
  jobPosts = await Promise.all(
    jobPosts.map(async (jobPost) => {
      const jobPostObj = jobPost.toObject();

      // Lấy skills
      const skills = await getSkillsRequirementByJobPostIdService(
        jobPost._id
      ).catch(() => []);
      jobPostObj.skills = skills.map(
        (skill) => skill.skills_requirement_id.name
      );

      // Lấy locations
      const locations = await getWorkAddressByJobPostIdService(
        jobPost._id
      ).catch(() => []);
      jobPostObj.locations = locations.map((location) => ({
        address: location.work_address_id.address,
        province: location.work_address_id.province_id.name,
      }));

      return jobPostObj;
    })
  );

  return jobPosts;
};

const updateJobPostService = async (job_post_id, jobPostData) => {
  // Kiểm tra jobPostData có tồn tại không
  if (!jobPostData) {
    throw new AppError("Dữ liệu bài đăng tuyển dụng không được cung cấp", 400);
  }

  // Cung cấp giá trị mặc định cho skills và locations nếu không tồn tại
  const { skills = [], locations = [], ...otherData } = jobPostData;

  let jobPost = await JobPost.findById(job_post_id);
  if (!jobPost) {
    throw new AppError("Không tìm thấy bài đăng tuyển dụng", 404);
  }

  // Cập nhật các trường khác của job post
  Object.assign(jobPost, otherData);
  await jobPost.save();

  // Xử lý skills
  if (Array.isArray(skills)) {
    // Lấy danh sách skills hiện tại
    const currentSkills = await JobPostSkillsRequirement.find({
      job_post_id,
    }).populate("skills_requirement_id");
    const currentSkillSet = new Set(
      currentSkills.map((item) => item.skills_requirement_id.name)
    );

    // Tìm skills cần thêm
    const skillsToAdd = skills.filter((skill) => !currentSkillSet.has(skill));
    const skillPromises = skillsToAdd.map(async (skill) => {
      let skillDoc = await SkillsRequirement.findOne({ name: skill });
      if (!skillDoc) {
        skillDoc = await SkillsRequirement.create({ name: skill });
      }
      return JobPostSkillsRequirement.create({
        job_post_id,
        skills_requirement_id: skillDoc._id,
      });
    });
    await Promise.all(skillPromises);

    // Tìm skills cần xóa
    const skillsToRemove = currentSkills.filter(
      (item) => !skills.includes(item.skills_requirement_id.name)
    );
    const removeSkillPromises = skillsToRemove.map(async (item) => {
      await JobPostSkillsRequirement.deleteOne({ _id: item._id });
      // Kiểm tra nếu skill không còn được sử dụng bởi job post nào khác
      const skillUsage = await JobPostSkillsRequirement.findOne({
        skills_requirement_id: item.skills_requirement_id._id,
      });
      if (!skillUsage) {
        await SkillsRequirement.deleteOne({
          _id: item.skills_requirement_id._id,
        });
      }
    });
    await Promise.all(removeSkillPromises);

    // Tìm skills cần sửa (trường hợp đổi tên skill)
    const skillsToUpdate = skills.filter((skill) =>
      currentSkills.some((item) => item.skills_requirement_id.name !== skill)
    );
    const updateSkillPromises = skillsToUpdate.map(async (skill) => {
      const existingSkill = currentSkills.find(
        (item) => item.skills_requirement_id.name === skill
      );
      if (!existingSkill) {
        let skillDoc = await SkillsRequirement.findOne({ name: skill });
        if (!skillDoc) {
          skillDoc = await SkillsRequirement.create({ name: skill });
        }
        await JobPostSkillsRequirement.updateOne(
          {
            job_post_id,
            skills_requirement_id: existingSkill?.skills_requirement_id._id,
          },
          { skills_requirement_id: skillDoc._id }
        );
      }
    });
    await Promise.all(updateSkillPromises);
  }

  // Xử lý locations
  if (Array.isArray(locations)) {
    // Lấy danh sách work addresses hiện tại
    const currentAddresses = await JobPostWorkAddress.find({
      job_post_id,
    }).populate({
      path: "work_address_id",
      populate: { path: "province_id" },
    });
    const currentAddressSet = new Set(
      currentAddresses.map(
        (item) =>
          `${item.work_address_id.province_id.name}:${item.work_address_id.address}`
      )
    );

    // Tìm locations cần thêm
    const locationsToAdd = locations.filter(
      (loc) => !currentAddressSet.has(`${loc.province}:${loc.address}`)
    );
    const addressPromises = locationsToAdd.map(async (loc) => {
      const provinceDoc = await Province.findOne({ name: loc.province });
      if (!provinceDoc) {
        throw new AppError(
          `Không tìm thấy tỉnh/thành phố: ${loc.province}`,
          400
        );
      }
      let workAddress = await WorkAddress.create({
        province_id: provinceDoc._id,
        address: loc.address,
      });
      return JobPostWorkAddress.create({
        job_post_id,
        work_address_id: workAddress._id,
      });
    });
    await Promise.all(addressPromises);

    // Tìm locations cần xóa
    const locationsToRemove = currentAddresses.filter(
      (item) =>
        !locations.some(
          (loc) =>
            loc.province === item.work_address_id.province_id.name &&
            loc.address === item.work_address_id.address
        )
    );
    const removeAddressPromises = locationsToRemove.map(async (item) => {
      await JobPostWorkAddress.deleteOne({ _id: item._id });
      // Kiểm tra nếu work address không còn được sử dụng bởi job post nào khác
      const addressUsage = await JobPostWorkAddress.findOne({
        work_address_id: item.work_address_id._id,
      });
      if (!addressUsage) {
        await WorkAddress.deleteOne({ _id: item.work_address_id._id });
      }
    });
    await Promise.all(removeAddressPromises);

    // Tìm locations cần sửa
    const locationsToUpdate = locations.filter((loc) =>
      currentAddresses.some(
        (item) =>
          loc.province === item.work_address_id.province_id.name &&
          loc.address !== item.work_address_id.address
      )
    );
    const updateAddressPromises = locationsToUpdate.map(async (loc) => {
      const existingAddress = currentAddresses.find(
        (item) => loc.province === item.work_address_id.province_id.name
      );
      if (existingAddress) {
        await WorkAddress.updateOne(
          { _id: existingAddress.work_address_id._id },
          { address: loc.address }
        );
      }
    });
    await Promise.all(updateAddressPromises);
  }

  // Lấy lại job post với skills và locations mới
  const updatedJobPost = await getJobPostByIdService(job_post_id);
  return updatedJobPost;
};

const updateStatusJobPostService = async (job_post_id, status) => {
  let jobPost = await JobPost.findById(job_post_id);
  if (!jobPost) {
    throw new AppError("Không tìm thấy bài đăng tuyển dụng", 404);
  }

  if (!["active", "inactive"].includes(status)) {
    throw new AppError(
      "Trạng thái không hợp lệ, phải là 'active' hoặc 'inactive'",
      400
    );
  }

  jobPost.status = status;
  let result = await jobPost.save();
  return result;
};

const deleteJobPostService = async (job_post_id) => {
  let jobPost = await JobPost.findById(job_post_id);
  if (!jobPost) {
    throw new AppError("Không tìm thấy bài đăng tuyển dụng", 404);
  }

  // Xóa các document liên quan trong JobPostSkillsRequirement
  await JobPostSkillsRequirement.deleteMany({ job_post_id });

  // Xóa các document liên quan trong JobPostWorkAddress
  await JobPostWorkAddress.deleteMany({ job_post_id });

  // Xóa job post trong collection JobPost
  let result = await JobPost.deleteOne({ _id: job_post_id });

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
  updateStatusJobPostService,
  deleteJobPostService,
  deleteAllJobPostsService,
};
