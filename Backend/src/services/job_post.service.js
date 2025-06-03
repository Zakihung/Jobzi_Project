const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const JobPost = require("../models/job_post.model");

const createJobPostService = async (jobPostData) => {
  const {
    employer_id,
    job_role_id,
    salary_range_id,
    work_type_id,
    title,
    description,
    requirement,
    work_address,
    income,
    working_time,
    benefit,
    expire_time,
    status,
  } = jobPostData;
  if (
    !employer_id ||
    !job_role_id ||
    !salary_range_id ||
    !work_type_id ||
    !title
  ) {
    throw new AppError(
      "Thiếu các trường bắt buộc: employer_id, job_role_id, salary_range_id, work_type_id, title là bắt buộc",
      400
    );
  }
  if (status && !["open", "closed", "expired"].includes(status)) {
    throw new AppError(
      "Trạng thái không hợp lệ: chỉ chấp nhận 'open', 'closed', hoặc 'expired'",
      400
    );
  }

  // Gán expire_time mặc định là 30 ngày nếu không cung cấp
  const finalExpireTime = expire_time || 30;
  // Tính expired_date: ngày hiện tại + expire_time ngày
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7); // Điều chỉnh múi giờ +07
  const expiredDate = new Date(
    currentDate.getTime() + finalExpireTime * 24 * 60 * 60 * 1000
  );

  let result = await JobPost.create({
    employer_id,
    job_role_id,
    salary_range_id,
    work_type_id,
    title,
    description: description || "",
    requirement: requirement || "",
    work_address: work_address || "",
    income: income || "",
    working_time: working_time || "",
    benefit: benefit || "",
    expire_time: finalExpireTime,
    expired_date: expiredDate,
    status: status || "open",
  });

  return result;
};

const getListJobPostService = async () => {
  let result = await JobPost.find()
    .populate("employer_id")
    .populate("job_role_id")
    .populate("salary_range_id")
    .populate("work_type_id");
  return result;
};

const getJobPostByIdService = async (job_post_id) => {
  let jobPost = await JobPost.findById(job_post_id)
    .populate("employer_id")
    .populate("job_role_id")
    .populate("salary_range_id")
    .populate("work_type_id");
  if (!jobPost) {
    throw new AppError("Không tìm thấy bài đăng tuyển dụng", 404);
  }
  return jobPost;
};

const getJobPostByEmployerIdService = async (employer_id) => {
  if (!mongoose.Types.ObjectId.isValid(employer_id)) {
    throw new AppError("ID nhà tuyển dụng không hợp lệ", 400);
  }
  let result = await JobPost.find({ employer_id })
    .populate("employer_id")
    .populate("job_role_id")
    .populate("salary_range_id")
    .populate("work_type_id");
  return result;
};

const getJobPostByJobRoleIdService = async (job_role_id) => {
  if (!mongoose.Types.ObjectId.isValid(job_role_id)) {
    throw new AppError("ID vai trò công việc không hợp lệ", 400);
  }
  let result = await JobPost.find({ job_role_id })
    .populate("employer_id")
    .populate("job_role_id")
    .populate("salary_range_id")
    .populate("work_type_id");
  return result;
};

const getJobPostBySalaryRangeIdService = async (salary_range_id) => {
  if (!mongoose.Types.ObjectId.isValid(salary_range_id)) {
    throw new AppError("ID khoảng lương không hợp lệ", 400);
  }
  let result = await JobPost.find({ salary_range_id })
    .populate("employer_id")
    .populate("job_role_id")
    .populate("salary_range_id")
    .populate("work_type_id");
  return result;
};

const getJobPostByWorkTypeIdService = async (work_type_id) => {
  if (!mongoose.Types.ObjectId.isValid(work_type_id)) {
    throw new AppError("ID loại hình công việc không hợp lệ", 400);
  }
  let result = await JobPost.find({ work_type_id })
    .populate("employer_id")
    .populate("job_role_id")
    .populate("salary_range_id")
    .populate("work_type_id");
  return result;
};

const updateJobPostService = async (job_post_id, updateData) => {
  const {
    employer_id,
    job_role_id,
    salary_range_id,
    work_type_id,
    title,
    description,
    requirement,
    work_address,
    income,
    working_time,
    benefit,
    expire_time,
    status,
  } = updateData;
  let jobPost = await JobPost.findById(job_post_id);
  if (!jobPost) {
    throw new AppError("Không tìm thấy bài đăng tuyển dụng", 404);
  }

  if (title !== undefined && !title) {
    throw new AppError("Tiêu đề không được để trống", 400);
  }
  if (status !== undefined && !["open", "closed", "expired"].includes(status)) {
    throw new AppError(
      "Trạng thái không hợp lệ: chỉ chấp nhận 'open', 'closed', hoặc 'expired'",
      400
    );
  }

  // Cập nhật expire_time và expired_date nếu expire_time được cung cấp
  let finalExpireTime = jobPost.expire_time;
  let expiredDate = jobPost.expired_date;
  if (expire_time !== undefined) {
    finalExpireTime = expire_time || 30; // Mặc định 30 ngày nếu expire_time là null
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7); // Điều chỉnh múi giờ +07
    expiredDate = new Date(
      currentDate.getTime() + finalExpireTime * 24 * 60 * 60 * 1000
    );
  }

  jobPost.employer_id =
    employer_id !== undefined ? employer_id : jobPost.employer_id;
  jobPost.job_role_id =
    job_role_id !== undefined ? job_role_id : jobPost.job_role_id;
  jobPost.salary_range_id =
    salary_range_id !== undefined ? salary_range_id : jobPost.salary_range_id;
  jobPost.work_type_id =
    work_type_id !== undefined ? work_type_id : jobPost.work_type_id;
  jobPost.title = title !== undefined ? title : jobPost.title;
  jobPost.description =
    description !== undefined ? description : jobPost.description;
  jobPost.requirement =
    requirement !== undefined ? requirement : jobPost.requirement;
  jobPost.work_address =
    work_address !== undefined ? work_address : jobPost.work_address;
  jobPost.income = income !== undefined ? income : jobPost.income;
  jobPost.working_time =
    working_time !== undefined ? working_time : jobPost.working_time;
  jobPost.benefit = benefit !== undefined ? benefit : jobPost.benefit;
  jobPost.expire_time =
    expire_time !== undefined ? finalExpireTime : jobPost.expire_time;
  jobPost.expired_date =
    expire_time !== undefined ? expiredDate : jobPost.expired_date;
  jobPost.status = status !== undefined ? status : jobPost.status;

  let result = await jobPost.save();
  return result;
};

const updateJobPostStatusService = async (job_post_id, status) => {
  let jobPost = await JobPost.findById(job_post_id);
  if (!jobPost) {
    throw new AppError("Không tìm thấy bài đăng tuyển dụng", 404);
  }
  if (!["open", "closed", "expired"].includes(status)) {
    throw new AppError(
      "Trạng thái không hợp lệ: chỉ chấp nhận 'open', 'closed', hoặc 'expired'",
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
  let result = await jobPost.delete(); // Xóa mềm với mongoose-delete
  return result;
};

module.exports = {
  createJobPostService,
  getListJobPostService,
  getJobPostByIdService,
  getJobPostByEmployerIdService,
  getJobPostByJobRoleIdService,
  getJobPostBySalaryRangeIdService,
  getJobPostByWorkTypeIdService,
  updateJobPostService,
  updateJobPostStatusService,
  deleteJobPostService,
};
