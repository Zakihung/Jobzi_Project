const express = require("express");
const {
  createCompanyIndustry,
  getListCompanyIndustry,
  getCompanyIndustryById,
  updateCompanyIndustry,
  deleteCompanyIndustry,
  deleteAllCompanyIndustries,
} = require("../controllers/company_industry.controller");
const router = express.Router();

// Public routes
router.post("/create", createCompanyIndustry);
router.get("/", getListCompanyIndustry);
router.delete("/", deleteAllCompanyIndustries);
router.get("/:id", getCompanyIndustryById);
router.put("/:id", updateCompanyIndustry);
router.delete("/:id", deleteCompanyIndustry);

module.exports = router;
