const express = require("express");
const {
  getListEmployer,
  getEmployerById,
  updatePositionEmployer,
  deleteEmployer,
} = require("../controllers/employer.controller");

const router = express.Router();

// Public routes
router.get("/", getListEmployer);
router.get("/:id", getEmployerById);
router.put("/:id", updatePositionEmployer);
router.delete("/:id", deleteEmployer);

module.exports = router;
