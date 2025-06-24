const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const RoleOrganization = require("../models/role_organization.model");

const createRoleOrganizationService = async (roleOrganizationData) => {
  const { name } = roleOrganizationData;
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let result = await RoleOrganization.create({
    name,
  });

  return result;
};

const getAllRoleOrganizationService = async () => {
  let result = await RoleOrganization.find();
  return result;
};

const getRoleOrganizationByIdService = async (role_organization_id) => {
  let roleOrganization = await RoleOrganization.findById(role_organization_id);
  if (!roleOrganization) {
    throw new AppError("Không tìm thấy vai trò tổ chức", 404);
  }
  return roleOrganization;
};

const updateRoleOrganizationService = async (role_organization_id, name) => {
  if (!name) {
    throw new AppError("Thiếu trường bắt buộc: name là bắt buộc", 400);
  }

  let roleOrganization = await RoleOrganization.findById(role_organization_id);
  if (!roleOrganization) {
    throw new AppError("Không tìm thấy vai trò tổ chức", 404);
  }

  roleOrganization.name = name;
  let result = await roleOrganization.save();
  return result;
};

const deleteRoleOrganizationService = async (role_organization_id) => {
  let roleOrganization = await RoleOrganization.findById(role_organization_id);
  if (!roleOrganization) {
    throw new AppError("Không tìm thấy vai trò tổ chức", 404);
  }
  let result = await RoleOrganization.deleteOne({ _id: role_organization_id }); // Xóa cứng khỏi database
  return result;
};

module.exports = {
  createRoleOrganizationService,
  getAllRoleOrganizationService,
  getRoleOrganizationByIdService,
  updateRoleOrganizationService,
  deleteRoleOrganizationService,
};
