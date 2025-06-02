const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Application = require("../models/application.model");

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
  let result = await Application.find().populate(
    "job_post_id candidate_id resume_file_id online_resume_id"
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
  let result = await Application.find({ candidate_id }).populate(
    "job_post_id candidate_id resume_file_id online_resume_id"
  );
  return result;
};

module.exports = {
  createApplicationService,
  getListApplicationService,
  getApplicationByIdService,
  updateApplicationStatusService,
  deleteApplicationService,
  deleteAllApplicationsService,
  getApplicationsByCandidateIdService,
};
