const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = ["image/jpeg", "image/png", "image/jpg"].includes(
      file.mimetype
    );
    return {
      folder: "resumes", // Thư mục lưu trữ file resume trên Cloudinary
      allowed_formats: ["pdf", "doc", "docx", "jpg", "png", "jpeg"], // Cho phép PDF, DOC, DOCX, JPG, PNG, JPEG
      resource_type: isImage ? "image" : "raw", // Image cho ảnh, raw cho tài liệu
      transformation: isImage
        ? [
            { width: 1000, height: 1000, crop: "limit" }, // Giới hạn kích thước ảnh
            { quality: "auto:best" }, // Tự động điều chỉnh chất lượng ảnh
          ]
        : null, // Không áp dụng transformation cho tài liệu
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
