const express = require("express");
const {
  createJobPosition,
  getListJobPosition,
  getJobPositionById,
  updateJobPositionStatus,
  deleteJobPosition,
  deleteAllJobPositions,
} = require("../controllers/job_position.controller");
const router = express.Router();

// Public routes
router.post("/create", createJobPosition);
router.get("/", getListJobPosition);
router.get("/:id", getJobPositionById);
router.put("/status/:id", updateJobPositionStatus);
router.delete("/:id", deleteJobPosition);
router.delete("/all", deleteAllJobPositions);

module.exports = router;
