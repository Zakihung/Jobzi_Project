const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const jobPostWorkAddressSchema = new mongoose.Schema(
  {
    job_post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      required: true,
    },
    work_address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkAddress",
      required: true,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
jobPostWorkAddressSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const JobPostWorkAddress = mongoose.model(
  "JobPostWorkAddress",
  jobPostWorkAddressSchema
);

module.exports = JobPostWorkAddress;
