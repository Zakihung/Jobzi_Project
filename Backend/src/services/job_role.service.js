const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const JobRole = require("../models/job_role.model");

const createJobRoleService = async (jobRoleData) => {
  const { industry_id, name } = jobRoleData;
  if (!industry_id || !name) {
    throw new AppError(
      "Thiếu các trường bắt buộc: industry_id và name là bắt buộc",
      400
    );
  }

  let result = await JobRole.create({
    industry_id,
    name,
    status: "open",
  });

  return result;
};

const getListJobRoleService = async () => {
  let result = await JobRole.find().populate("industry_id");
  return result;
};

const getJobRoleByIdService = async (job_role_id) => {
  let jobRole = await JobRole.findById(job_role_id).populate("industry_id");
  if (!jobRole) {
    throw new AppError("Không tìm thấy vai trò công việc", 404);
  }
  return jobRole;
};

const updateJobRoleStatusService = async (job_role_id, status) => {
  if (!status || !["open", "closed", "under_review"].includes(status)) {
    throw new AppError("Giá trị trạng thái không hợp lệ", 400);
  }

  let jobRole = await JobRole.findById(job_role_id);
  if (!jobRole) {
    throw new AppError("Không tìm thấy vai trò công việc", 404);
  }

  jobRole.status = status;
  let result = await jobRole.save();
  return result;
};

const deleteJobRoleService = async (job_role_id) => {
  let jobRole = await JobRole.findById(job_role_id);
  if (!jobRole) {
    throw new AppError("Không tìm thấy vai trò công việc", 404);
  }
  let result = await jobRole.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

const deleteAllJobRolesService = async () => {
  let result = await JobRole.deleteMany({}); // Xóa cứng toàn bộ
  return result;
};

module.exports = {
  createJobRoleService,
  getListJobRoleService,
  getJobRoleByIdService,
  updateJobRoleStatusService,
  deleteJobRoleService,
  deleteAllJobRolesService,
};
