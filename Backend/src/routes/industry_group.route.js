const express = require("express");
const {
  createIndustryGroup,
  getListIndustryGroup,
  getIndustryGroupById,
  updateIndustryGroupStatus,
  deleteIndustryGroup,
  deleteAllIndustryGroups,
  updateIndustryGroup,
} = require("../controllers/industry_group.controller");
const router = express.Router();

// Public routes
router.post("/create", createIndustryGroup);
router.get("/", getListIndustryGroup);
router.delete("/", deleteAllIndustryGroups);
router.get("/:id", getIndustryGroupById);
router.put("/:id", updateIndustryGroup);
router.put("/status/:id", updateIndustryGroupStatus);
router.delete("/:id", deleteIndustryGroup);

module.exports = router;
