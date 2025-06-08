const express = require("express");
const {
  createWorkType,
  getListWorkType,
  getWorkTypeById,
  updateWorkType,
  deleteWorkType,
} = require("../controllers/work_type.controller");
const router = express.Router();

// Public routes
router.post("/", createWorkType);
router.get("/", getListWorkType);
router.get("/:id", getWorkTypeById);
router.put("/:id", updateWorkType);
router.delete("/:id", deleteWorkType);

module.exports = router;
