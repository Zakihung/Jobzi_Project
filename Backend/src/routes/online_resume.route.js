const express = require("express");
const {
  createOnlineResume,
  getListOnlineResume,
  getOnlineResumeById,
  updateOnlineResume,
  deleteOnlineResume,
} = require("../controllers/online_resume.controller");

const router = express.Router();

// Public routes
router.post("/create", createOnlineResume);
router.get("/", getListOnlineResume);
router.get("/:id", getOnlineResumeById);
router.put("/:id", updateOnlineResume);
router.delete("/:id", deleteOnlineResume);

module.exports = router;
