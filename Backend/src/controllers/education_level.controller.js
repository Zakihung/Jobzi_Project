const {
  createEducationLevelService,
  getAllEducationLevelService,
  getEducationLevelByIdService,
  updateEducationLevelService,
  deleteEducationLevelService,
} = require("../services/education_level.service");

const createEducationLevel = async (req, res, next) => {
  try {
    const { name } = req.body;
    const data = await createEducationLevelService({ name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllEducationLevel = async (req, res, next) => {
  try {
    const data = await getAllEducationLevelService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getEducationLevelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getEducationLevelByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateEducationLevel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await updateEducationLevelService(id, name);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteEducationLevel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteEducationLevelService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEducationLevel,
  getAllEducationLevel,
  getEducationLevelById,
  updateEducationLevel,
  deleteEducationLevel,
};
