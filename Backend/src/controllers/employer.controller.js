const {
  getListEmployerService,
  getEmployerByIdService,
  updatePositionService,
  deleteEmployerService,
} = require("../services/employer.service");

const getListEmployer = async (req, res, next) => {
  try {
    const data = await getListEmployerService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getEmployerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getEmployerByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updatePositionEmployer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { position } = req.body;
    const data = await updatePositionService(id, position);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteEmployer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteEmployerService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListEmployer,
  getEmployerById,
  updatePositionEmployer,
  deleteEmployer,
};
