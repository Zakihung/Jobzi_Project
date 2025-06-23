const express = require("express");
const {
  createExperienceLevel,
  getAllExperienceLevel,
  getExperienceLevelById,
  updateExperienceLevel,
  deleteExperienceLevel,
} = require("../controllers/experience_level.controller");
const router = express.Router();

// Public routes
router.post("/", createExperienceLevel);
router.get("/", getAllExperienceLevel);
router.get("/:id", getExperienceLevelById);
router.put("/:id", updateExperienceLevel);
router.delete("/:id", deleteExperienceLevel);

module.exports = router;
