const express = require("express");
const {
  createJobPost,
  getListJobPost,
  getJobPostById,
  getJobPostByEmployerId,
  getJobPostByJobPositionId,
  getJobPostBySalaryRangeId,
  getJobPostByWorkTypeId,
  updateJobPost,
  updateJobPostStatus,
  deleteJobPost,
} = require("../controllers/job_post.controller");

const router = express.Router();

// Public routes
router.post("/create", createJobPost);
router.get("/", getListJobPost);
router.get("/:id", getJobPostById);
router.get("/employer/:employer_id", getJobPostByEmployerId);
router.get("/job-position/:job_position_id", getJobPostByJobPositionId);
router.get("/salary-range/:salary_range_id", getJobPostBySalaryRangeId);
router.get("/work-type/:work_type_id", getJobPostByWorkTypeId);
router.put("/:id", updateJobPost);
router.patch("/status/:id", updateJobPostStatus);
router.delete("/:id", deleteJobPost);

module.exports = router;
