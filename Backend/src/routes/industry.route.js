const express = require("express");
const {
  createIndustry,
  getListIndustry,
  getIndustryById,
  updateIndustryStatus,
  deleteIndustry,
  deleteAllIndustries,
} = require("../controllers/industry.controller");
const router = express.Router();

// Public routes
router.post("/create", createIndustry);
router.get("/", getListIndustry);
router.delete("/", deleteAllIndustries);
router.get("/:id", getIndustryById);
router.put("/status/:id", updateIndustryStatus);
router.delete("/:id", deleteIndustry);

module.exports = router;
