const express = require("express");
const {
  getListEmployer,
  getEmployerById,
  updateEmployer,
  deleteEmployer,
  uploadAvatarEmployer,
} = require("../controllers/employer.controller");
const upload = require("../middleware/uploadAvaEmployer");

const router = express.Router();

// Public routes
router.get("/", getListEmployer);
router.get("/:id", getEmployerById);
router.put("/:id", upload.single("avatar"), updateEmployer);
router.delete("/:id", deleteEmployer);
router.post(
  "/:id/upload-avatar",
  upload.single("avatar"),
  uploadAvatarEmployer
);

module.exports = router;
