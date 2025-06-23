const express = require("express");
const {
  createJobPostWorkAddress,
  getAllJobPostWorkAddress,
  getJobPostByWorkAddressId,
  getWorkAddressByJobPostId,
  deleteJobPostWorkAddress,
} = require("../controllers/job_post_work_address.controller");
const router = express.Router();

// Public routes
router.post("/", createJobPostWorkAddress);
router.get("/", getAllJobPostWorkAddress);
router.get("/work-address/:work_address_id", getJobPostByWorkAddressId);
router.get("/job-post/:job_post_id", getWorkAddressByJobPostId);
router.delete("/:id", deleteJobPostWorkAddress);

module.exports = router;
