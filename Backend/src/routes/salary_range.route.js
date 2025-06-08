const express = require("express");
const {
  createSalaryRange,
  getListSalaryRange,
  getSalaryRangeById,
  updateSalaryRange,
  deleteSalaryRange,
} = require("../controllers/salary_range.controller");
const router = express.Router();

// Public routes
router.post("/", createSalaryRange);
router.get("/", getListSalaryRange);
router.get("/:id", getSalaryRangeById);
router.put("/:id", updateSalaryRange);
router.delete("/:id", deleteSalaryRange);

module.exports = router;
