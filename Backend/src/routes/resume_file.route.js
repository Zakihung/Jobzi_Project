const express = require("express");
const {
  createResumeFile,
  getListResumeFile,
  getResumeFileByCandidateId,
  getResumeFileById,
  updateResumeFile,
  deleteResumeFile,
} = require("../controllers/resume_file.controller");
const upload = require("../middleware/uploadResumeFile");

const router = express.Router();

// Public routes
router.post("/create", upload.single("resume"), createResumeFile);
router.get("/", getListResumeFile);
router.get("/candidate/:candidate_id", getResumeFileByCandidateId);
router.get("/:id", getResumeFileById);
router.put("/:id", upload.single("resume"), updateResumeFile);
router.delete("/:id", deleteResumeFile);

module.exports = router;
