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
router.get("/:id", getCompanyIndustryById);
router.put("/:id", updateCompanyIndustry);
router.delete("/:id", deleteCompanyIndustry);
router.delete("/all", deleteAllCompanyIndustries);

module.exports = router;
