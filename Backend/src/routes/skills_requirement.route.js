const express = require("express");
const {
  createSkillsRequirement,
  getAllSkillsRequirement,
  getSkillsRequirementById,
  updateSkillsRequirement,
  deleteSkillsRequirement,
} = require("../controllers/skills_requirement.controller");
const router = express.Router();

// Public routes
router.post("/", createSkillsRequirement);
router.get("/", getAllSkillsRequirement);
router.get("/:id", getSkillsRequirementById);
router.put("/:id", updateSkillsRequirement);
router.delete("/:id", deleteSkillsRequirement);

module.exports = router;
