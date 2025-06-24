const mongoose = require("mongoose");

const candidate_save_companySchema = new mongoose.Schema(
  {
    candidate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

candidate_save_companySchema.index({ candidate_id: 1, company_id: 1 });

const Candidate_Save_Company = mongoose.model(
  "Candidate_Save_Company",
  candidate_save_companySchema,
  "CandidateSaveCompany"
);

module.exports = Candidate_Save_Company;
