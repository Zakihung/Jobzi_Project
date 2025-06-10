const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const JobPosition = require("../models/job_position.model");

const createJobPositionService = async (jobPositionData) => {
  const { industry_id, name } = jobPositionData;
  if (!industry_id || !name) {
    throw new AppError(
      "Thiếu các trường bắt buộc: industry_id và name là bắt buộc",
      400
    );
  }

  let result = await JobPosition.create({
    industry_id,
    name,
    status: "open",
  });

  return result;
};

const getListJobPositionService = async () => {
  let result = await JobPosition.find().populate("industry_id");
  return result;
};

const getJobPositionByIdService = async (job_position_id) => {
  let jobPosition = await JobPosition.findById(job_position_id).populate(
    "industry_id"
  );
  if (!jobPosition) {
    throw new AppError("Không tìm thấy vị trí công việc", 404);
  }
  return jobPosition;
};

const updateJobPositionStatusService = async (job_position_id, status) => {
  if (!status || !["open", "closed", "under_review"].includes(status)) {
    throw new AppError("Giá trị trạng thái không hợp lệ", 400);
  }

  let jobPosition = await JobPosition.findById(job_position_id);
  if (!jobPosition) {
    throw new AppError("Không tìm thấy vị trí công việc", 404);
  }

  jobPosition.status = status;
  let result = await jobPosition.save();
  return result;
};

const deleteJobPositionService = async (job_position_id) => {
  let jobPosition = await JobPosition.findById(job_position_id);
  if (!jobPosition) {
    throw new AppError("Không tìm thấy vị trí công việc", 404);
  }
  let result = await jobPosition.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

const deleteAllJobPositionsService = async () => {
  let result = await JobPosition.deleteMany({}); // Xóa cứng toàn bộ
  return result;
};

module.exports = {
  createJobPositionService,
  getListJobPositionService,
  getJobPositionByIdService,
  updateJobPositionStatusService,
  deleteJobPositionService,
  deleteAllJobPositionsService,
};
