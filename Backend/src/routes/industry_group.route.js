const express = require("express");
const {
  createIndustryGroup,
  getListIndustryGroup,
  getIndustryGroupById,
  updateIndustryGroupStatus,
  deleteIndustryGroup,
  deleteAllIndustryGroups,
} = require("../controllers/industry_group.controller");
const router = express.Router();

// Public routes
router.post("/create", createIndustryGroup);
router.get("/", getListIndustryGroup);
router.get("/:id", getIndustryGroupById);
router.put("/status/:id", updateIndustryGroupStatus);
router.delete("/:id", deleteIndustryGroup);
router.delete("/all", deleteAllIndustryGroups);

module.exports = router;
