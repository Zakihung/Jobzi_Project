const express = require("express");
const {
  createJobPost,
  getAllJobPosts,
  getFilteredJobPosts,
  getJobPostById,
  getJobPostsByEmployerId,
  getJobPostsByJobPositionId,
  updateJobPost,
  updateStatusJobPost,
  deleteJobPost,
  deleteAllJobPosts,
} = require("../controllers/job_post.controller");
const router = express.Router();

// Public routes
router.post("/create", createJobPost);
router.get("/", getAllJobPosts);
router.get("/employer/:employerId", getJobPostsByEmployerId);
router.get("/job-position/:jobPositionId", getJobPostsByJobPositionId);
router.put("/status/:id", updateStatusJobPost);
router.get("/filter/active", getFilteredJobPosts);
router.get("/:id", getJobPostById);
router.put("/:id", updateJobPost);
router.delete("/:id", deleteJobPost);
router.delete("/", deleteAllJobPosts);

module.exports = router;
