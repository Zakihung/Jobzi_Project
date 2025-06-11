const express = require("express");
const {
  getListCandidate,
  getCandidateById,
  updateStatusCandidate,
  deleteCandidate,
} = require("../controllers/candidate.controller");

const router = express.Router();

// Public routes
router.get("/", getListCandidate);
router.get("/:id", getCandidateById);
router.put("/:id/status", updateStatusCandidate);
router.delete("/:id", deleteCandidate);

module.exports = router;
