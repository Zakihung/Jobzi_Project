const express = require("express");
const {
  createApplication,
  getListApplication,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  deleteAllApplications,
  getApplicationsByCandidateId,
} = require("../controllers/application.controller");
const router = express.Router();

// Public routes
router.post("/create", createApplication);
router.get("/", getListApplication);
router.get("/:id", getApplicationById);
router.put("/status/:id", updateApplicationStatus);
router.delete("/:id", deleteApplication);
router.delete("/all", deleteAllApplications);
router.get("/candidate/:candidate_id", getApplicationsByCandidateId);

module.exports = router;
