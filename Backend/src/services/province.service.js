const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Province = require("../models/province.model");

const createProvinceService = async (provinceData) => {
  const { name } = provinceData;
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let result = await Province.create({
    name,
  });

  return result;
};

const getAllProvinceService = async () => {
  let result = await Province.find();
  return result;
};

const getProvinceByIdService = async (province_id) => {
  let province = await Province.findById(province_id);
  if (!province) {
    throw new AppError("Không tìm thấy tỉnh/thành phố", 404);
  }
  return province;
};

const updateProvinceService = async (province_id, name) => {
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let province = await Province.findById(province_id);
  if (!province) {
    throw new AppError("Không tìm thấy tỉnh/thành phố", 404);
  }

  province.name = name;
  let result = await province.save();
  return result;
};

const deleteProvinceService = async (province_id) => {
  let province = await Province.findById(province_id);
  if (!province) {
    throw new AppError("Không tìm thấy tỉnh/thành phố", 404);
  }
  let result = await Province.deleteOne({ _id: province_id }); // Xóa cứng khỏi database
  return result;
};

module.exports = {
  createProvinceService,
  getAllProvinceService,
  getProvinceByIdService,
  updateProvinceService,
  deleteProvinceService,
};
