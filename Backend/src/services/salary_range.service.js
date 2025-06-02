const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const SalaryRange = require("../models/salary_range.model");

const createSalaryRangeService = async (salaryRangeData) => {
  const { type, min, max } = salaryRangeData;
  if (!type) {
    throw new AppError("Thiếu trường bắt buộc: type là bắt buộc", 400);
  }
  if (!["negotiable", "range"].includes(type)) {
    throw new AppError("Giá trị type không hợp lệ", 400);
  }
  if (type === "negotiable" && (min !== 0 || max !== 0)) {
    throw new AppError("Khi type là negotiable, min và max phải bằng 0", 400);
  }
  if (type === "range" && (min < 0 || max < 0 || min > max)) {
    throw new AppError(
      "Giá trị min và max không hợp lệ: min và max phải >= 0 và min <= max",
      400
    );
  }

  let result = await SalaryRange.create({
    type,
    min: type === "negotiable" ? 0 : min,
    max: type === "negotiable" ? 0 : max,
  });

  return result;
};

const getListSalaryRangeService = async () => {
  let result = await SalaryRange.find();
  return result;
};

const getSalaryRangeByIdService = async (salary_range_id) => {
  let salaryRange = await SalaryRange.findById(salary_range_id);
  if (!salaryRange) {
    throw new AppError("Không tìm thấy khoảng lương", 404);
  }
  return salaryRange;
};

const updateSalaryRangeService = async (salary_range_id, updateData) => {
  const { type, min, max } = updateData;
  let salaryRange = await SalaryRange.findById(salary_range_id);
  if (!salaryRange) {
    throw new AppError("Không tìm thấy khoảng lương", 404);
  }

  if (type && !["negotiable", "range"].includes(type)) {
    throw new AppError("Giá trị type không hợp lệ", 400);
  }

  const updatedType = type || salaryRange.type;
  if (updatedType === "negotiable" && (min !== 0 || max !== 0)) {
    throw new AppError("Khi type là negotiable, min và max phải bằng 0", 400);
  }
  if (updatedType === "range" && (min < 0 || max < 0 || min > max)) {
    throw new AppError(
      "Giá trị min và max không hợp lệ: min và max phải >= 0 và min <= max",
      400
    );
  }

  salaryRange.type = updatedType;
  salaryRange.min =
    updatedType === "negotiable"
      ? 0
      : min !== undefined
      ? min
      : salaryRange.min;
  salaryRange.max =
    updatedType === "negotiable"
      ? 0
      : max !== undefined
      ? max
      : salaryRange.max;

  let result = await salaryRange.save();
  return result;
};

const deleteSalaryRangeService = async (salary_range_id) => {
  let salaryRange = await SalaryRange.findById(salary_range_id);
  if (!salaryRange) {
    throw new AppError("Không tìm thấy khoảng lương", 404);
  }
  let result = await salaryRange.delete(); // Xóa mềm sử dụng mongoose-delete
  return result;
};

module.exports = {
  createSalaryRangeService,
  getListSalaryRangeService,
  getSalaryRangeByIdService,
  updateSalaryRangeService,
  deleteSalaryRangeService,
};
