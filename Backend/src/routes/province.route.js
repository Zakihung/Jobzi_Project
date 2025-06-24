const express = require("express");
const {
  createProvince,
  getAllProvince,
  getAllProvinceAlphabet,
  getProvinceById,
  updateProvince,
  deleteProvince,
} = require("../controllers/province.controller");
const router = express.Router();

// Public routes
router.post("/", createProvince);
router.get("/", getAllProvince);
router.get("/alphabet", getAllProvinceAlphabet);
router.get("/:id", getProvinceById);
router.put("/:id", updateProvince);
router.delete("/:id", deleteProvince);

module.exports = router;
