const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const roleOrganizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

// Thêm plugin xóa mềm
roleOrganizationSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const RoleOrganization = mongoose.model(
  "RoleOrganization",
  roleOrganizationSchema,
  "RoleOrganization"
);

module.exports = RoleOrganization;
