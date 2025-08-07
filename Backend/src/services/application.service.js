const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Application = require("../models/application.model");
const {
  getSkillsRequirementByJobPostIdService,
} = require("./job_post_skills_requirement.service");
const {
  getWorkAddressByJobPostIdService,
} = require("./job_post_work_address.service");

const createApplicationService = async (applicationData) => {
  const { job_post_id, candidate_id, resume_file_id, online_resume_id } =
    applicationData;
  if (!job_post_id || !candidate_id) {
    throw new AppError(
      "Thiếu các trường bắt buộc: job_post_id và candidate_id là bắt buộc",
      400
    );
  }

  let result = await Application.create({
    job_post_id,
    candidate_id,
    resume_file_id: resume_file_id || null,
    online_resume_id: online_resume_id || null,
    status: "pending",
  });

  return result;
};

const getListApplicationService = async () => {
  let result = await Application.find()
    .populate("candidate_id resume_file_id online_resume_id")
    .populate({
      path: "job_post_id",
      populate: [{ path: "employer_id" }, { path: "job_position_id" }],
    });

  // Optionally, lấy thêm `skills` và `locations` như `getAllJobPostsService`
  result = await Promise.all(
    result.map(async (application) => {
      const appObj = application.toObject();

      if (appObj.job_post_id?._id) {
        const skills = await getSkillsRequirementByJobPostIdService(
          appObj.job_post_id._id
        ).catch(() => []);
        appObj.job_post_id.skills = skills.map(
          (skill) => skill.skills_requirement_id.name
        );

        const locations = await getWorkAddressByJobPostIdService(
          appObj.job_post_id._id
        ).catch(() => []);
        appObj.job_post_id.locations = locations.map((location) => ({
          address: location.work_address_id.address,
          province: location.work_address_id.province_id.name,
        }));
      }

      return appObj;
    })
  );

  return result;
};

const getApplicationByIdService = async (application_id) => {
  let application = await Application.findById(application_id).populate(
    "job_post_id candidate_id resume_file_id online_resume_id"
  );
  if (!application) {
    throw new AppError("Không tìm thấy ứng tuyển", 404);
  }
  return application;
};

const getApplicationsByJobPostIdService = async (job_post_id) => {
  if (!mongoose.Types.ObjectId.isValid(job_post_id)) {
    throw new AppError("ID job_post không hợp lệ", 400);
  }

  let result = await Application.find({ job_post_id })
    .populate("resume_file_id online_resume_id")
    .populate({
      path: "candidate_id",
      populate: [{ path: "user_id" }],
    })
    .populate({
      path: "job_post_id",
      populate: [{ path: "employer_id" }, { path: "job_position_id" }],
    });

  result = await Promise.all(
    result.map(async (application) => {
      const appObj = application.toObject();

      if (appObj.job_post_id?._id) {
        const skills = await getSkillsRequirementByJobPostIdService(
          appObj.job_post_id._id
        ).catch(() => []);
        appObj.job_post_id.skills = skills.map(
          (skill) => skill.skills_requirement_id.name
        );

        const locations = await getWorkAddressByJobPostIdService(
          appObj.job_post_id._id
        ).catch(() => []);
        appObj.job_post_id.locations = locations.map((location) => ({
          address: location.work_address_id.address,
          province: location.work_address_id.province_id.name,
        }));
      }

      return appObj;
    })
  );

  return result;
};

const getNumberOfApplicationByJobPostIdService = async (job_post_id) => {
  if (!mongoose.Types.ObjectId.isValid(job_post_id)) {
    throw new AppError("ID job_post không hợp lệ", 400);
  }

  const count = await Application.countDocuments({ job_post_id });
  return { job_post_id, count };
};

const updateApplicationStatusService = async (application_id, status) => {
  if (
    !status ||
    !["pending", "reviewed", "accepted", "rejected", "withdrawn"].includes(
      status
    )
  ) {
    throw new AppError("Giá trị trạng thái không hợp lệ", 400);
  }

  let application = await Application.findById(application_id);
  if (!application) {
    throw new AppError("Không tìm thấy hồ sơ ứng tuyển", 404);
  }

  application.status = status;
  let result = await application.save();
  return result;
};

const deleteApplicationService = async (application_id) => {
  let application = await Application.findById(application_id);
  if (!application) {
    throw new AppError("Không tìm thấy hồ sơ ứng tuyển", 404);
  }
  let result = await application.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

const deleteAllApplicationsService = async () => {
  let result = await Application.deleteMany({}); // Xóa cứng toàn bộ
  return result;
};

const getApplicationsByCandidateIdService = async (candidate_id) => {
  if (!mongoose.Types.ObjectId.isValid(candidate_id)) {
    throw new AppError("ID ứng viên không hợp lệ", 400);
  }

  let result = await Application.find({ candidate_id })
    .populate("candidate_id resume_file_id online_resume_id")
    .populate({
      path: "job_post_id",
      populate: [{ path: "employer_id" }, { path: "job_position_id" }],
    });

  // Lấy thêm skills và locations nếu cần
  result = await Promise.all(
    result.map(async (application) => {
      const appObj = application.toObject();

      if (appObj.job_post_id?._id) {
        const skills = await getSkillsRequirementByJobPostIdService(
          appObj.job_post_id._id
        ).catch(() => []);
        appObj.job_post_id.skills = skills.map(
          (skill) => skill.skills_requirement_id.name
        );

        const locations = await getWorkAddressByJobPostIdService(
          appObj.job_post_id._id
        ).catch(() => []);
        appObj.job_post_id.locations = locations.map((location) => ({
          address: location.work_address_id.address,
          province: location.work_address_id.province_id.name,
        }));
      }

      return appObj;
    })
  );

  return result;
};

module.exports = {
  createApplicationService,
  getListApplicationService,
  getApplicationByIdService,
  getApplicationsByJobPostIdService,
  getNumberOfApplicationByJobPostIdService,
  updateApplicationStatusService,
  deleteApplicationService,
  deleteAllApplicationsService,
  getApplicationsByCandidateIdService,
};
