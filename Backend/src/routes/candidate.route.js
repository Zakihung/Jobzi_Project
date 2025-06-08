const express = require("express");
const {
  getListCandidate,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  uploadAvatarCandidate,
} = require("../controllers/candidate.controller");
const upload = require("../middleware/uploadAvaCandidate");

const router = express.Router();

// Public routes
router.get("/", getListCandidate);
router.get("/:id", getCandidateById);
router.put("/:id", upload.single("avatar"), updateCandidate);
router.delete("/:id", deleteCandidate);
router.post(
  "/:id/upload-avatar",
  upload.single("avatar"),
  uploadAvatarCandidate
);

module.exports = router;
