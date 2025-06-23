const {
  createJobPostSkillsRequirementService,
  getAllJobPostSkillsRequirementService,
  getSkillsRequirementByJobPostIdService,
  getJobPostBySkillsRequirementIdService,
  deleteJobPostSkillsRequirementService,
} = require("../services/job_post_skills_requirement.service");

const createJobPostSkillsRequirement = async (req, res, next) => {
  try {
    const { skills_requirement_id, job_post_id } = req.body;
    const data = await createJobPostSkillsRequirementService({
      skills_requirement_id,
      job_post_id,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllJobPostSkillsRequirement = async (req, res, next) => {
  try {
    const data = await getAllJobPostSkillsRequirementService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getSkillsRequirementByJobPostId = async (req, res, next) => {
  try {
    const { job_post_id } = req.params;
    const data = await getSkillsRequirementByJobPostIdService(job_post_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getJobPostBySkillsRequirementId = async (req, res, next) => {
  try {
    const { skills_requirement_id } = req.params;
    const data = await getJobPostBySkillsRequirementIdService(
      skills_requirement_id
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteJobPostSkillsRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteJobPostSkillsRequirementService(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobPostSkillsRequirement,
  getAllJobPostSkillsRequirement,
  getSkillsRequirementByJobPostId,
  getJobPostBySkillsRequirementId,
  deleteJobPostSkillsRequirement,
};
