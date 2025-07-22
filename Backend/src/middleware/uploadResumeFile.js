const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = ["image/jpeg", "image/png", "image/jpg"].includes(
      file.mimetype
    );
    const isPDF = file.mimetype === "application/pdf";
    return {
      folder: "resumes",
      allowed_formats: ["pdf", "jpg", "png", "jpeg"],
      resource_type: isImage ? "image" : isPDF ? "raw" : null,
      public_id: `resume_${Date.now()}.${
        file.mimetype === "application/pdf"
          ? "pdf"
          : file.mimetype.split("/")[1]
      }`,
      transformation: isImage
        ? [
            { width: 1000, height: 1000, crop: "limit" },
            { quality: "auto:best" },
          ]
        : null,
    };
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Chỉ hỗ trợ PDF, JPG, PNG, JPEG"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
