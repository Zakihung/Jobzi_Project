const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const WorkAddress = require("../models/work_address.model");

const createWorkAddressService = async (workAddressData) => {
  const { province_id, address } = workAddressData;
  if (!province_id || !address) {
    throw new AppError(
      "Thiếu trường bắt buộc: province_id và address là bắt buộc",
      400
    );
  }

  let result = await WorkAddress.create({
    province_id,
    address,
  });

  return result;
};

const getAllWorkAddressService = async () => {
  let result = await WorkAddress.find().populate("province_id");
  return result;
};

const getWorkAddressByIdService = async (work_address_id) => {
  let workAddress = await WorkAddress.findById(work_address_id).populate(
    "province_id"
  );
  if (!workAddress) {
    throw new AppError("Không tìm thấy địa chỉ làm việc", 404);
  }
  return workAddress;
};

const updateWorkAddressService = async (work_address_id, workAddressData) => {
  const { province_id, address } = workAddressData;
  if (!province_id || !address) {
    throw new AppError(
      "Thiếu trường bắt buộc: province_id và address là bắt buộc",
      400
    );
  }

  let workAddress = await WorkAddress.findById(work_address_id);
  if (!workAddress) {
    throw new AppError("Không tìm thấy địa chỉ làm việc", 404);
  }

  workAddress.province_id = province_id;
  workAddress.address = address;
  let result = await workAddress.save();
  return result;
};

const deleteWorkAddressService = async (work_address_id) => {
  let workAddress = await WorkAddress.findById(work_address_id);
  if (!workAddress) {
    throw new AppError("Không tìm thấy địa chỉ làm việc", 404);
  }
  let result = await WorkAddress.deleteOne({ _id: work_address_id }); // Xóa cứng khỏi database
  return result;
};

module.exports = {
  createWorkAddressService,
  getAllWorkAddressService,
  getWorkAddressByIdService,
  updateWorkAddressService,
  deleteWorkAddressService,
};
