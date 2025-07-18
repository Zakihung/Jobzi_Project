const express = require("express");
const router = express.Router();
const {
  createOnlineResume,
  getOnlineResume,
  getListOnlineResume,
  updateOnlineResume,
  addItemToArray,
  updateItemInArray,
  deleteItemInArray,
  deleteOnlineResume,
  deleteAllOnlineResumes,
} = require("../controllers/online_resume.controller");

// Các route không yêu cầu xác thực
router.post("/:candidate_id/create", createOnlineResume);
router.get("/:candidate_id", getOnlineResume);
router.get("/list", getListOnlineResume);
router.put("/:candidate_id/update", updateOnlineResume);
router.post("/:candidate_id/add-item", addItemToArray);
router.put("/:candidate_id/update-item", updateItemInArray);
router.delete("/:candidate_id/delete-item", deleteItemInArray);
router.delete("/:candidate_id", deleteOnlineResume);
router.delete("/all", deleteAllOnlineResumes);

module.exports = router;
