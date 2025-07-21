const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const companySchema = new mongoose.Schema(
  {
    company_industry_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyIndustry",
      required: true,
    },
    province_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
      required: true,
    },
    name: {
      type: String,
      required: true,
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
    min_size: {
      type: Number,
      default: 0,
    },
    max_size: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      default: "",
    },
    introduction: {
      type: String,
      default: "",
    },
    businessOperations: {
      type: [String],
      default: [],
    },
    regulations: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
companySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
  deleted: true,
});

const Company = mongoose.model("Company", companySchema, "Company");

module.exports = Company;
