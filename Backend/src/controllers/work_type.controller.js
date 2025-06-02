const {
  createWorkTypeService,
  getListWorkTypeService,
  getWorkTypeByIdService,
  updateWorkTypeService,
  deleteWorkTypeService,
} = require("../services/work_type.service");

const createWorkType = async (req, res, next) => {
  try {
    const { name } = req.body;
    const data = await createWorkTypeService({ name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getListWorkType = async (req, res, next) => {
  try {
    const data = await getListWorkTypeService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getWorkTypeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getWorkTypeByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateWorkType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await updateWorkTypeService(id, name);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteWorkType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteWorkTypeService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWorkType,
  getListWorkType,
  getWorkTypeById,
  updateWorkType,
  deleteWorkType,
};
