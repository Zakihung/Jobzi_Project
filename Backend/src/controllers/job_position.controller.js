const {
  createJobPositionService,
  getListJobPositionService,
  getJobPositionByIdService,
  updateJobPositionStatusService,
  deleteJobPositionService,
  deleteAllJobPositionsService,
} = require("../services/job_position.service");

const createJobPosition = async (req, res, next) => {
  try {
    const { industry_id, name } = req.body;
    const data = await createJobPositionService({ industry_id, name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getListJobPosition = async (req, res, next) => {
  try {
    const data = await getListJobPositionService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobPositionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getJobPositionByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateJobPositionStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateJobPositionStatusService(id, status);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteJobPosition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteJobPositionService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteAllJobPositions = async (req, res, next) => {
  try {
    const data = await deleteAllJobPositionsService();
    res.status(200).json({ message: "Đã xóa toàn bộ vị trí công việc", data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobPosition,
  getListJobPosition,
  getJobPositionById,
  updateJobPositionStatus,
  deleteJobPosition,
  deleteAllJobPositions,
};
