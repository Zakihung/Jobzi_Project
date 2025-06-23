const express = require("express");
const {
  createJobPostSkillsRequirement,
  getAllJobPostSkillsRequirement,
  getSkillsRequirementByJobPostId,
  getJobPostBySkillsRequirementId,
  deleteJobPostSkillsRequirement,
} = require("../controllers/job_post_skills_requirement.controller");
const router = express.Router();

// Public routes
router.post("/", createJobPostSkillsRequirement);
router.get("/", getAllJobPostSkillsRequirement);
router.get("/job-post/:job_post_id", getSkillsRequirementByJobPostId);
router.get(
  "/skills-requirement/:skills_requirement_id",
  getJobPostBySkillsRequirementId
);
router.delete("/:id", deleteJobPostSkillsRequirement);

module.exports = router;
