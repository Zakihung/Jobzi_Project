const express = require("express");
const {
  createResumeAnalysis,
  getListResumeAnalysis,
  getResumeAnalysisById,
  getResumeAnalysisByOnlineResumeId,
  getResumeAnalysisByResumeFileId,
  deleteResumeAnalysis,
  deleteAllResumeAnalysis,
} = require("../controllers/resume_analysis.controller");

const router = express.Router();

// Public routes
router.post("/create", createResumeAnalysis);
router.get("/", getListResumeAnalysis);
router.get("/:id", getResumeAnalysisById);
router.get(
  "/online-resume/:online_resume_id",
  getResumeAnalysisByOnlineResumeId
);
router.get("/resume-file/:resume_file_id", getResumeAnalysisByResumeFileId);
router.delete("/:id", deleteResumeAnalysis);
router.delete("/", deleteAllResumeAnalysis);

module.exports = router;
