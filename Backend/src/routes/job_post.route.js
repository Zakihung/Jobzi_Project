const express = require("express");
const {
  createJobPost,
  getAllJobPosts,
  getJobPostById,
  getJobPostsByEmployerId,
  getJobPostsByJobPositionId,
  updateJobPost,
  deleteJobPost,
  deleteAllJobPosts,
} = require("../controllers/job_post.controller");
const router = express.Router();

// Public routes
router.post("/create", createJobPost);
router.get("/", getAllJobPosts);
router.get("/:id", getJobPostById);
router.get("/employer/:employerId", getJobPostsByEmployerId);
router.get("/job-position/:jobPositionId", getJobPostsByJobPositionId);
router.put("/:id", updateJobPost);
router.delete("/:id", deleteJobPost);
router.delete("/", deleteAllJobPosts);

module.exports = router;
