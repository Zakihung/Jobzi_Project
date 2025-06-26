const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const JobPostWorkAddress = require("../models/job_post_work_address.model");

const createJobPostWorkAddressService = async (jobPostWorkAddressData) => {
  const { job_post_id, work_address_id } = jobPostWorkAddressData;
  if (!job_post_id || !work_address_id) {
    throw new AppError(
      "Thiếu trường bắt buộc: job_post_id và work_address_id là bắt buộc",
      400
    );
  }

  let result = await JobPostWorkAddress.create({
    job_post_id,
    work_address_id,
  });

  return result;
};

const getAllJobPostWorkAddressService = async () => {
  let result = await JobPostWorkAddress.find()
    .populate("job_post_id")
    .populate("work_address_id");
  return result;
};

const getJobPostByWorkAddressIdService = async (work_address_id) => {
  let result = await JobPostWorkAddress.find({ work_address_id }).populate(
    "job_post_id"
  );
  if (!result.length) {
    throw new AppError(
      "Không tìm thấy bài đăng công việc cho địa chỉ làm việc này",
      404
    );
  }
  return result;
};

const getWorkAddressByJobPostIdService = async (job_post_id) => {
  let result = await JobPostWorkAddress.find({ job_post_id }).populate({
    path: "work_address_id",
    populate: {
      path: "province_id",
      model: "Province",
    },
  });
  if (!result.length) {
    throw new AppError(
      "Không tìm thấy địa chỉ làm việc cho bài đăng công việc này",
      404
    );
  }
  return result;
};

const deleteJobPostWorkAddressService = async (id) => {
  let jobPostWorkAddress = await JobPostWorkAddress.findById(id);
  if (!jobPostWorkAddress) {
    throw new AppError(
      "Không tìm thấy liên kết bài đăng công việc và địa chỉ làm việc",
      404
    );
  }
  let result = await JobPostWorkAddress.deleteOne({ _id: id }); // Xóa cứng khỏi database
  return result;
};

module.exports = {
  createJobPostWorkAddressService,
  getAllJobPostWorkAddressService,
  getJobPostByWorkAddressIdService,
  getWorkAddressByJobPostIdService,
  deleteJobPostWorkAddressService,
};
