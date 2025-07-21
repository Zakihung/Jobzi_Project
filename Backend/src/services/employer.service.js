const AppError = require("../utils/AppError");
const Employer = require("../models/employer.model");

const getListEmployerService = async () => {
  let result = await Employer.find().populate("user_id").populate("company_id");
  return result;
};

const getEmployerByUserIdService = async (user_id) => {
  let employer = await Employer.findOne({ user_id })
    .populate("user_id")
    .populate("company_id");
  if (!employer) {
    throw new AppError("Không tìm thấy nhà tuyển dụng", 404);
  }
  return employer;
};

const getEmployerByCompanyIdService = async (company_id) => {
  let employer = await Employer.findOne({ company_id })
    .populate("user_id")
    .populate("company_id");
  if (!employer) {
    throw new AppError("Không tìm thấy nhà tuyển dụng", 404);
  }
  return employer;
};

const getEmployerByIdService = async (employer_id) => {
  let employer = await Employer.findById(employer_id)
    .populate("user_id")
    .populate("company_id");
  if (!employer) {
    throw new AppError("Không tìm thấy nhà tuyển dụng", 404);
  }
  return employer;
};

const updatePositionService = async (employer_id, position) => {
  let employer = await Employer.findById(employer_id);
  if (!employer) {
    throw new AppError("Không tìm thấy nhà tuyển dụng", 404);
  }

  if (position !== undefined && !position) {
    throw new AppError("Vị trí không được để trống", 400);
  }

  employer.position = position !== undefined ? position : employer.position;
  let result = await employer.save();
  return result;
};

const deleteEmployerService = async (employer_id) => {
  let employer = await Employer.findById(employer_id);
  if (!employer) {
    throw new AppError("Không tìm thấy nhà tuyển dụng", 404);
  }
  let result = await employer.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

module.exports = {
  getListEmployerService,
  getEmployerByIdService,
  getEmployerByUserIdService,
  getEmployerByCompanyIdService,
  updatePositionService,
  deleteEmployerService,
};
