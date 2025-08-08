const express = require("express");
const {
  createResumeAnalysis,
  processResumeAnalysis,
  updateResumeAnalysis,
  getListResumeAnalysis,
  getListResumeAnalysisByCandidateId,
  getResumeAnalysisById,
  getResumeAnalysisByOnlineResumeId,
  getResumeAnalysisByResumeFileId,
  getLatestResumeAnalysis,
  deleteResumeAnalysis,
  deleteAllResumeAnalysis,
} = require("../controllers/resume_analysis.controller");

const router = express.Router();

// Public routes
router.post("/create", createResumeAnalysis);
router.post("/process/resume-file/:resume_file_id", processResumeAnalysis);
router.get("/", getListResumeAnalysis);
router.get(
  "/online-resume/:online_resume_id",
  getResumeAnalysisByOnlineResumeId
);
router.get("/resume-file/:resume_file_id", getResumeAnalysisByResumeFileId);
router.get("/candidate/:candidate_id", getListResumeAnalysisByCandidateId);
router.get("/latest", getLatestResumeAnalysis);
router.patch("/:analysis_id", updateResumeAnalysis);
router.get("/:id", getResumeAnalysisById);
router.delete("/:id", deleteResumeAnalysis);
router.delete("/", deleteAllResumeAnalysis);

module.exports = router;
