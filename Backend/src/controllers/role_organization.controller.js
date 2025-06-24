const {
  createRoleOrganizationService,
  getAllRoleOrganizationService,
  getRoleOrganizationByIdService,
  updateRoleOrganizationService,
  deleteRoleOrganizationService,
} = require("../services/role_organization.service");

const createRoleOrganization = async (req, res, next) => {
  try {
    const { name } = req.body;
    const data = await createRoleOrganizationService({ name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllRoleOrganization = async (req, res, next) => {
  try {
    const data = await getAllRoleOrganizationService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getRoleOrganizationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getRoleOrganizationByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateRoleOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await updateRoleOrganizationService(id, name);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteRoleOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteRoleOrganizationService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoleOrganization,
  getAllRoleOrganization,
  getRoleOrganizationById,
  updateRoleOrganization,
  deleteRoleOrganization,
};
