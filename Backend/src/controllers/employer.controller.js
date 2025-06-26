const {
  getListEmployerService,
  getEmployerByIdService,
  getEmployerByUserIdService,
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

const getEmployerByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const employer = await getEmployerByUserIdService(user_id);
    res.status(200).json({
      status: "success",
      data: employer,
    });
  } catch (err) {
    next(err);
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
  getEmployerByUserId,
  updatePositionEmployer,
  deleteEmployer,
};
