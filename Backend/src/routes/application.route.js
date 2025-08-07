const express = require("express");
const {
  createApplication,
  getListApplication,
  getApplicationById,
  getApplicationsByJobPostId,
  getApplicationCountByStatusForEmployer,
  getTotalApplicationsForEmployer,
  getApplicationCountByStatusForJobPost,
  getNumberOfApplicationByJobPostId,
  updateApplicationStatus,
  deleteApplication,
  deleteAllApplications,
  getApplicationsByCandidateId,
} = require("../controllers/application.controller");
const router = express.Router();

// Public routes
router.post("/create", createApplication);
router.get("/", getListApplication);
router.put("/status/:id", updateApplicationStatus);
router.get("/job-post/:job_post_id", getApplicationsByJobPostId);
router.get("/job-post/:job_post_id/count", getNumberOfApplicationByJobPostId);
router.delete("/all", deleteAllApplications);
router.get("/candidate/:candidate_id", getApplicationsByCandidateId);
router.get(
  "/employer/:employer_id/status-count",
  getApplicationCountByStatusForEmployer
);
router.get(
  "/employer/:employer_id/total-count",
  getTotalApplicationsForEmployer
);
router.get(
  "/job-post/:job_post_id/status-count",
  getApplicationCountByStatusForJobPost
);
router.get("/:id", getApplicationById);
router.delete("/:id", deleteApplication);

module.exports = router;
