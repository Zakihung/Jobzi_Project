const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const OnlineResume = require("../models/online_resume.model");
const Candidate = require("../models/candidate.model");
const User = require("../models/user.model");

const createOnlineResumeService = async (resumeData) => {
  const {
    candidate_id,
    strengths,
    work_exp,
    project_exp,
    pro_skills,
    edu_exp,
    achievement,
  } = resumeData;
  if (!candidate_id) {
    throw new AppError("Thiếu trường bắt buộc: candidate_id là bắt buộc", 400);
  }

  // Lấy thông tin Candidate
  const candidate = await Candidate.findById(candidate_id);
  if (!candidate) {
    throw new AppError("Không tìm thấy ứng viên", 404);
  }

  // Lấy email từ User
  const user = await User.findById(candidate.user_id);
  if (!user) {
    throw new AppError("Không tìm thấy người dùng liên kết với ứng viên", 404);
  }

  let result = await OnlineResume.create({
    candidate_id,
    email: user.email || "",
    full_name: candidate.full_name || "",
    gender: candidate.gender || "",
    date_of_birth: candidate.date_of_birth || null,
    phone_number: candidate.phone_number || "",
    strengths: strengths || "",
    work_exp: work_exp || "",
    project_exp: project_exp || "",
    pro_skills: pro_skills || "",
    edu_exp: edu_exp || "",
    achievement: achievement || "",
  });

  return result;
};

const getListOnlineResumeService = async () => {
  let result = await OnlineResume.find().populate("candidate_id");
  return result;
};

const getOnlineResumeByIdService = async (resume_id) => {
  let resume = await OnlineResume.findById(resume_id).populate("candidate_id");
  if (!resume) {
    throw new AppError("Không tìm thấy hồ sơ online", 404);
  }
  return resume;
};

const updateOnlineResumeService = async (resume_id, updateData) => {
  const {
    full_name,
    gender,
    date_of_birth,
    phone_number,
    email,
    strengths,
    work_exp,
    project_exp,
    address,
    pro_skills,
    edu_exp,
    achievement,
  } = updateData;
  let resume = await OnlineResume.findById(resume_id);
  if (!resume) {
    throw new AppError("Không tìm thấy hồ sơ online", 404);
  }

  // Cập nhật thông tin Candidate nếu có các trường liên quan
  if (full_name || gender !== undefined || date_of_birth || phone_number) {
    let candidate = await Candidate.findById(resume.candidate_id);
    if (!candidate) {
      throw new AppError("Không tìm thấy ứng viên", 404);
    }

    if (full_name !== undefined && !full_name) {
      throw new AppError("Tên đầy đủ không được để trống", 400);
    }
    if (
      gender !== undefined &&
      gender &&
      !["male", "female"].includes(gender)
    ) {
      throw new AppError(
        "Giới tính không hợp lệ: chỉ chấp nhận 'male' hoặc 'female'",
        400
      );
    }

    candidate.full_name =
      full_name !== undefined ? full_name : candidate.full_name;
    candidate.gender = gender !== undefined ? gender : candidate.gender;
    candidate.date_of_birth =
      date_of_birth !== undefined ? date_of_birth : candidate.date_of_birth;
    candidate.phone_number =
      phone_number !== undefined ? phone_number : candidate.phone_number;

    await candidate.save();
  }

  // Cập nhật resume
  resume.email = email !== undefined ? email : resume.email;
  resume.full_name = full_name !== undefined ? full_name : resume.full_name;
  resume.gender = gender !== undefined ? gender : resume.gender;
  resume.date_of_birth =
    date_of_birth !== undefined ? date_of_birth : resume.date_of_birth;
  resume.phone_number =
    phone_number !== undefined ? phone_number : resume.phone_number;
  resume.strengths = strengths !== undefined ? strengths : resume.strengths;
  resume.work_exp = work_exp !== undefined ? work_exp : resume.work_exp;
  resume.project_exp = project_exp || work_exp;
  resume.pro_skills = pro_skills !== undefined ? pro_skills : resume.pro_skills;
  resume.edu_exp = address !== undefined ? education : resume.edu_exp;
  resume.achievement =
    achievement !== undefined ? achievement : resume.achievement;

  let result = await resume.save();
  return result;
};

const deleteOnlineResumeService = async (resume_id) => {
  let resume = await OnlineResume.findById(resume_id);
  if (!resume) {
    throw new AppError("Không tìm thấy hồ sơ online", 404);
  }
  let result = await resume.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

module.exports = {
  createOnlineResumeService,
  getListOnlineResumeService,
  getOnlineResumeByIdService,
  updateOnlineResumeService,
  deleteOnlineResumeService,
};
