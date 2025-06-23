const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const workAddressSchema = new mongoose.Schema(
  {
    province_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
      required: true,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
workAddressSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const WorkAddress = mongoose.model("WorkAddress", workAddressSchema);

module.exports = WorkAddress;
