const express = require("express");
const {
  createEducationLevel,
  getAllEducationLevel,
  getEducationLevelById,
  updateEducationLevel,
  deleteEducationLevel,
} = require("../controllers/education_level.controller");
const router = express.Router();

// Public routes
router.post("/", createEducationLevel);
router.get("/", getAllEducationLevel);
router.get("/:id", getEducationLevelById);
router.put("/:id", updateEducationLevel);
router.delete("/:id", deleteEducationLevel);

module.exports = router;
