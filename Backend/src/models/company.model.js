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
      require: true,
    },
    size: {
      type: String,
      require: true,
    },
    logo: {
      type: String,
      default: "",
    },
    website_url: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      require: true,
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
