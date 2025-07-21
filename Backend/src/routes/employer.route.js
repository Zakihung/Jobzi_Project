const express = require("express");
const {
  getListEmployer,
  getEmployerById,
  getEmployerByUserId,
  getEmployerByCompanyId,
  updatePositionEmployer,
  deleteEmployer,
} = require("../controllers/employer.controller");

const router = express.Router();

// Public routes
router.get("/", getListEmployer);
router.get("/user/:user_id", getEmployerByUserId);
router.get("/company/:company_id", getEmployerByCompanyId);
router.get("/:id", getEmployerById);
router.put("/:id", updatePositionEmployer);
router.delete("/:id", deleteEmployer);

module.exports = router;
