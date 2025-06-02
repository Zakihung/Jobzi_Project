const express = require("express");
const {
  createJobRole,
  getListJobRole,
  getJobRoleById,
  updateJobRoleStatus,
  deleteJobRole,
  deleteAllJobRoles,
} = require("../controllers/job_role.controller");
const router = express.Router();

// Public routes
router.post("/create", createJobRole);
router.get("/", getListJobRole);
router.get("/:id", getJobRoleById);
router.put("/status/:id", updateJobRoleStatus);
router.delete("/:id", deleteJobRole);
router.delete("/all", deleteAllJobRoles);

module.exports = router;
