const express = require("express");
const {
  candidateSaveJobPost,
  candidateUnSaveJobPost,
  getCandidateSaveJobPost,
  getJobPostSaveByCandidate,
} = require("../controllers/candidate_save_job_post.controller");
const router = express.Router();

// Public routes
router.post("/save", candidateSaveJobPost);
router.delete("/unsave", candidateUnSaveJobPost);
router.get("/:id", getCandidateSaveJobPost);
router.get("/candidate/:candidate_id", getJobPostSaveByCandidate);

module.exports = router;
