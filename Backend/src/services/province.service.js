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
  let result = await Province.find().sort({ name: 1 });
  return result;
};

const getAllProvinceAlphabetService = async () => {
  // Lấy tất cả tỉnh và sắp xếp theo name
  const provinces = await Province.find().sort({ name: 1 });

  // Nhóm tỉnh theo chữ cái đầu
  const groupedProvinces = provinces.reduce((acc, province) => {
    const firstLetter = province.name.charAt(0).toUpperCase(); // Lấy chữ cái đầu và chuyển thành in hoa
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(province);
    return acc;
  }, {});

  // Chuyển đổi thành mảng các đối tượng { letter, provinces }
  const result = Object.keys(groupedProvinces)
    .sort() // Sắp xếp các chữ cái theo thứ tự bảng chữ cái
    .map((letter) => ({
      letter,
      provinces: groupedProvinces[letter],
    }));

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
  getAllProvinceAlphabetService,
  getProvinceByIdService,
  updateProvinceService,
  deleteProvinceService,
};
