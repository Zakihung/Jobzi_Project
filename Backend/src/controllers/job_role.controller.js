const {
  createJobRoleService,
  getListJobRoleService,
  getJobRoleByIdService,
  updateJobRoleStatusService,
  deleteJobRoleService,
  deleteAllJobRolesService,
} = require("../services/job_role.service");

const createJobRole = async (req, res, next) => {
  try {
    const { industry_id, name } = req.body;
    const data = await createJobRoleService({ industry_id, name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getListJobRole = async (req, res, next) => {
  try {
    const data = await getListJobRoleService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getJobRoleByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateJobRoleStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateJobRoleStatusService(id, status);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteJobRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteJobRoleService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteAllJobRoles = async (req, res, next) => {
  try {
    const data = await deleteAllJobRolesService();
    res.status(200).json({ message: "Đã xóa toàn bộ vai trò công việc", data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobRole,
  getListJobRole,
  getJobRoleById,
  updateJobRoleStatus,
  deleteJobRole,
  deleteAllJobRoles,
};
