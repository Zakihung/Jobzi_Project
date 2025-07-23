const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Chỉ hỗ trợ JPG, PNG, JPEG"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
