const express = require("express");
const {
  createRoleOrganization,
  getAllRoleOrganization,
  getRoleOrganizationById,
  updateRoleOrganization,
  deleteRoleOrganization,
} = require("../controllers/role_organization.controller");
const router = express.Router();

// Public routes
router.post("/", createRoleOrganization);
router.get("/", getAllRoleOrganization);
router.get("/:id", getRoleOrganizationById);
router.put("/:id", updateRoleOrganization);
router.delete("/:id", deleteRoleOrganization);

module.exports = router;
