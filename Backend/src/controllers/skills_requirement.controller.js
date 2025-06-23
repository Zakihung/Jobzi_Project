const {
  createSkillsRequirementService,
  getAllSkillsRequirementService,
  getSkillsRequirementByIdService,
  updateSkillsRequirementService,
  deleteSkillsRequirementService,
} = require("../services/skills_requirement.service");

const createSkillsRequirement = async (req, res, next) => {
  try {
    const { name } = req.body;
    const data = await createSkillsRequirementService({ name });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllSkillsRequirement = async (req, res, next) => {
  try {
    const data = await getAllSkillsRequirementService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getSkillsRequirementById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getSkillsRequirementByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateSkillsRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await updateSkillsRequirementService(id, name);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteSkillsRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteSkillsRequirementService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSkillsRequirement,
  getAllSkillsRequirement,
  getSkillsRequirementById,
  updateSkillsRequirement,
  deleteSkillsRequirement,
};
