const express = require("express");
const {
  createWorkAddress,
  getAllWorkAddress,
  getWorkAddressById,
  updateWorkAddress,
  deleteWorkAddress,
} = require("../controllers/work_address.controller");
const router = express.Router();

// Public routes
router.post("/", createWorkAddress);
router.get("/", getAllWorkAddress);
router.get("/:id", getWorkAddressById);
router.put("/:id", updateWorkAddress);
router.delete("/:id", deleteWorkAddress);

module.exports = router;
