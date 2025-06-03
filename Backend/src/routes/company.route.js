const express = require("express");
const {
  createCompany,
  getListCompany,
  getCompanyById,
  getCompanyByIndustryId,
  updateCompany,
  deleteCompany,
  uploadLogoCompany,
} = require("../controllers/company.controller");
const upload = require("../middleware/uploadAvatarCompany");

const router = express.Router();

// Public routes
router.post("/create", upload.single("logo"), createCompany);
router.get("/", getListCompany);
router.get("/:id", getCompanyById);
router.get("/industry/:company_industry_id", getCompanyByIndustryId);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);
router.post("/:id/upload-logo", upload.single("logo"), uploadLogoCompany);

module.exports = router;
