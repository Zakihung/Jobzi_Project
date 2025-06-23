const {
  createExperienceLevelService,
  getAllExperienceLevelService,
  getExperienceLevelByIdService,
  updateExperienceLevelService,
  deleteExperienceLevelService,
} = require("../services/experience_level.service");

const createExperienceLevel = async (req, res, next) => {
  try {
    const { name } = req.body;
    const data = await createExperienceLevelService({ name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllExperienceLevel = async (req, res, next) => {
  try {
    const data = await getAllExperienceLevelService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getExperienceLevelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getExperienceLevelByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateExperienceLevel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await updateExperienceLevelService(id, name);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteExperienceLevel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteExperienceLevelService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExperienceLevel,
  getAllExperienceLevel,
  getExperienceLevelById,
  updateExperienceLevel,
  deleteExperienceLevel,
};
