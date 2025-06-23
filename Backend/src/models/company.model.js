const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const companySchema = new mongoose.Schema(
  {
    company_industry_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyIndustry",
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default:
        "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png",
    },
    website_url: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
companySchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
