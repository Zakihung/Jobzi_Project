const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const OnlineResume = require("../models/online_resume.model");
const User = require("../models/user.model"); // Thêm import
const Candidate = require("../models/candidate.model"); // Thêm import

const createOnlineResumeService = async (resumeData) => {
  const { candidate_id, personalInfo } = resumeData;
  if (!candidate_id || !personalInfo) {
    throw new AppError(
      "Thiếu các trường bắt buộc: candidate_id, personalInfo",
      400
    );
  }
  if (
    !personalInfo.full_name ||
    !personalInfo.phone_number ||
    !personalInfo.date_of_birth ||
    !personalInfo.email
  ) {
    throw new AppError("Thiếu các trường bắt buộc trong personalInfo", 400);
  }

  const result = await OnlineResume.create({
    candidate_id,
    personalInfo: {
      full_name: personalInfo.full_name,
      phone_number: personalInfo.phone_number,
      date_of_birth: personalInfo.date_of_birth,
      email: personalInfo.email,
      address: personalInfo.address,
      zalo: personalInfo.zalo,
      facebook: personalInfo.facebook,
      avatar:
        personalInfo.avatar ||
        "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750090817/avaMacDinh_toiqej.jpg",
    },
    jobExpectations: [],
    education: [],
    highlights: [],
    workExperience: [],
    projects: [],
    skills: [],
  });

  return result;
};

const getOnlineResumeByCandidateIdService = async (candidate_id) => {
  const resume = await OnlineResume.findOne({ candidate_id });
  if (!resume) {
    throw new AppError("Không tìm thấy hồ sơ", 404);
  }
  return resume;
};

const getListOnlineResumeService = async () => {
  const result = await OnlineResume.find();
  return result;
};

const updateOnlineResumeService = async (candidate_id, updateData) => {
  const resume = await OnlineResume.findOne({ candidate_id });
  if (!resume) {
    throw new AppError("Không tìm thấy hồ sơ", 404);
  }

  const { personalInfo } = updateData;

  if (personalInfo) {
    if (
      !personalInfo.full_name ||
      !personalInfo.phone_number ||
      !personalInfo.date_of_birth ||
      !personalInfo.email
    ) {
      throw new AppError(
        "Các trường bắt buộc trong personalInfo không được để trống",
        400
      );
    }
    if (!/^[a-zA-ZÀ-ỹ\s.-]{1,100}$/.test(personalInfo.full_name)) {
      throw new AppError(
        "Họ tên không hợp lệ! Chỉ được chứa chữ cái, khoảng trắng, dấu chấm hoặc dấu gạch nối, tối đa 100 ký tự.",
        400
      );
    }
    if (
      !/^(?:\+84|0)(?:3[2-9]|5[2689]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/.test(
        personalInfo.phone_number
      )
    ) {
      throw new AppError(
        "Số điện thoại không hợp lệ! Phải bắt đầu bằng +84 hoặc 0, theo sau là 9-10 chữ số.",
        400
      );
    }
    const dob = new Date(personalInfo.date_of_birth);
    const today = new Date();
    const minAge = 15;
    const maxAge = 60;
    const minDate = new Date(
      today.getFullYear() - maxAge,
      today.getMonth(),
      today.getDate()
    );
    const maxDate = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate()
    );
    if (isNaN(dob.getTime()) || dob < minDate || dob > maxDate) {
      throw new AppError(
        `Ngày sinh không hợp lệ! Phải từ ${minAge} đến ${maxAge} tuổi.`,
        400
      );
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        personalInfo.email
      )
    ) {
      throw new AppError("Email không hợp lệ", 400);
    }

    resume.personalInfo = {
      full_name: personalInfo.full_name,
      phone_number: personalInfo.phone_number,
      date_of_birth: personalInfo.date_of_birth,
      email: personalInfo.email,
      address: personalInfo.address || resume.personalInfo.address,
      zalo: personalInfo.zalo || resume.personalInfo.zalo,
      facebook: personalInfo.facebook || resume.personalInfo.facebook,
      avatar: personalInfo.avatar || resume.personalInfo.avatar,
    };

    // Đồng bộ với User
    const candidate = await Candidate.findOne({ _id: candidate_id });
    if (candidate) {
      await User.findByIdAndUpdate(candidate.user_id, {
        full_name: personalInfo.full_name,
        phone_number: personalInfo.phone_number,
        date_of_birth: personalInfo.date_of_birth,
        email: personalInfo.email,
        avatar: personalInfo.avatar || resume.personalInfo.avatar,
      });
    }
  }

  const result = await resume.save();
  return result;
};

const addItemToArrayService = async (candidate_id, field, item) => {
  const resume = await OnlineResume.findOne({ candidate_id });
  if (!resume) {
    throw new AppError("Không tìm thấy hồ sơ", 404);
  }

  // Kiểm tra số lượng tối đa cho jobExpectations (tối đa 3)
  if (field === "jobExpectations" && resume.jobExpectations.length >= 3) {
    throw new AppError("Chỉ có thể thêm tối đa 3 mong muốn tìm việc", 400);
  }

  // Kiểm tra dữ liệu đầu vào cho các trường
  if (field === "education") {
    if (
      !item.school ||
      !item.education ||
      !item.major ||
      !item.startMonth ||
      !item.startYear ||
      !item.endMonth ||
      !item.endYear
    ) {
      throw new AppError("Thiếu các trường bắt buộc cho education", 400);
    }
    if (
      item.endYear < item.startYear ||
      (item.endYear === item.startYear && item.endMonth <= item.startMonth)
    ) {
      throw new AppError(
        "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
        400
      );
    }
  } else if (field === "workExperience") {
    if (
      !item.company ||
      !item.position ||
      !item.industry ||
      !item.startMonth ||
      !item.startYear ||
      !item.endMonth ||
      !item.endYear ||
      !item.description
    ) {
      throw new AppError("Thiếu các trường bắt buộc cho workExperience", 400);
    }
    if (
      item.endYear < item.startYear ||
      (item.endYear === item.startYear && item.endMonth <= item.startMonth)
    ) {
      throw new AppError(
        "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
        400
      );
    }
  } else if (field === "projects") {
    if (
      !item.projectName ||
      !item.role ||
      !item.startMonth ||
      !item.startYear ||
      !item.endMonth ||
      !item.endYear ||
      !item.description
    ) {
      throw new AppError("Thiếu các trường bắt buộc cho projects", 400);
    }
    if (
      item.endYear < item.startYear ||
      (item.endYear === item.startYear && item.endMonth <= item.startMonth)
    ) {
      throw new AppError(
        "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
        400
      );
    }
  } else if (field === "skills") {
    if (!item.skillName || !item.experience || !item.proficiency) {
      throw new AppError("Thiếu các trường bắt buộc cho skills", 400);
    }
  } else if (field === "highlights") {
    if (!item.title || !item.description) {
      throw new AppError("Thiếu các trường bắt buộc cho highlights", 400);
    }
  } else if (field === "jobExpectations") {
    if (!item.jobType || !item.position || !item.province) {
      throw new AppError("Thiếu các trường bắt buộc cho jobExpectations", 400);
    }
    if (
      item.salary_type === "Khoảng lương" &&
      (!item.min_salary_range ||
        !item.max_salary_range ||
        item.min_salary_range < 0 ||
        item.max_salary_range < 0)
    ) {
      throw new AppError("Khoảng lương không hợp lệ", 400);
    }
  } else {
    throw new AppError("Trường không hợp lệ", 400);
  }

  resume[field].push(item);
  const result = await resume.save();
  return result;
};

const updateItemInArrayService = async (candidate_id, field, index, item) => {
  const resume = await OnlineResume.findOne({ candidate_id });
  if (!resume) {
    throw new AppError("Không tìm thấy hồ sơ", 404);
  }
  if (!resume[field][index]) {
    throw new AppError(
      `Không tìm thấy mục tại vị trí ${index} trong ${field}`,
      404
    );
  }

  // Kiểm tra dữ liệu đầu vào tương tự addItemToArrayService
  if (field === "education") {
    if (
      !item.school ||
      !item.education ||
      !item.major ||
      !item.startMonth ||
      !item.startYear ||
      !item.endMonth ||
      !item.endYear
    ) {
      throw new AppError("Thiếu các trường bắt buộc cho education", 400);
    }
    if (
      item.endYear < item.startYear ||
      (item.endYear === item.startYear && item.endMonth <= item.startMonth)
    ) {
      throw new AppError(
        "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
        400
      );
    }
  } else if (field === "workExperience") {
    if (
      !item.company ||
      !item.position ||
      !item.industry ||
      !item.startMonth ||
      !item.startYear ||
      !item.endMonth ||
      !item.endYear ||
      !item.description
    ) {
      throw new AppError("Thiếu các trường bắt buộc cho workExperience", 400);
    }
    if (
      item.endYear < item.startYear ||
      (item.endYear === item.startYear && item.endMonth <= item.startMonth)
    ) {
      throw new AppError(
        "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
        400
      );
    }
  } else if (field === "projects") {
    if (
      !item.projectName ||
      !item.role ||
      !item.startMonth ||
      !item.startYear ||
      !item.endMonth ||
      !item.endYear ||
      !item.description
    ) {
      throw new AppError("Thiếu các trường bắt buộc cho projects", 400);
    }
    if (
      item.endYear < item.startYear ||
      (item.endYear === item.startYear && item.endMonth <= item.startMonth)
    ) {
      throw new AppError(
        "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
        400
      );
    }
  } else if (field === "skills") {
    if (!item.skillName || !item.experience || !item.proficiency) {
      throw new AppError("Thiếu các trường bắt buộc cho skills", 400);
    }
  } else if (field === "highlights") {
    if (!item.title || !item.description) {
      throw new AppError("Thiếu các trường bắt buộc cho highlights", 400);
    }
  } else if (field === "jobExpectations") {
    if (!item.jobType || !item.position || !item.province) {
      throw new AppError("Thiếu các trường bắt buộc cho jobExpectations", 400);
    }
    if (
      item.salary_type === "Khoảng lương" &&
      (!item.min_salary_range ||
        !item.max_salary_range ||
        item.min_salary_range < 0 ||
        item.max_salary_range < 0)
    ) {
      throw new AppError("Khoảng lương không hợp lệ", 400);
    }
  } else {
    throw new AppError("Trường không hợp lệ", 400);
  }

  resume[field][index] = item;
  const result = await resume.save();
  return result;
};

const deleteItemInArrayService = async (candidate_id, field, index) => {
  const resume = await OnlineResume.findOne({ candidate_id });
  if (!resume) {
    throw new AppError("Không tìm thấy hồ sơ", 404);
  }
  if (!resume[field][index]) {
    throw new AppError(
      `Không tìm thấy mục tại vị trí ${index} trong ${field}`,
      404
    );
  }

  resume[field].splice(index, 1);
  const result = await resume.save();
  return result;
};

const deleteOnlineResumeService = async (candidate_id) => {
  const resume = await OnlineResume.findOne({ candidate_id });
  if (!resume) {
    throw new AppError("Không tìm thấy hồ sơ", 404);
  }
  const result = await resume.delete(); // Xóa mềm
  return result;
};

const deleteAllOnlineResumesService = async () => {
  const result = await OnlineResume.deleteMany({}); // Xóa cứng toàn bộ
  return result;
};

module.exports = {
  createOnlineResumeService,
  getOnlineResumeByCandidateIdService,
  getListOnlineResumeService,
  updateOnlineResumeService,
  addItemToArrayService,
  updateItemInArrayService,
  deleteItemInArrayService,
  deleteOnlineResumeService,
  deleteAllOnlineResumesService,
};
