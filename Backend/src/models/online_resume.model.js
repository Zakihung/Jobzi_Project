const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

// Định nghĩa schema cho OnlineResume
const onlineResumeSchema = new Schema(
  {
    candidate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    personalInfo: {
      full_name: { type: String, required: true },
      phone_number: { type: String, required: true },
      date_of_birth: { type: Date, required: true },
      email: { type: String, required: true },
      address: { type: String },
      zalo: { type: String },
      facebook: { type: String },
      avatar: {
        type: String,
        default:
          "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750090817/avaMacDinh_toiqej.jpg",
      },
    },
    jobExpectations: [
      {
        jobType: {
          type: String,
          enum: ["Toàn thời gian", "Bán thời gian", "Thực tập"],
          required: true,
        },
        position: {
          type: String,
          required: true,
        },
        salary_type: {
          type: String,
          default: "Thỏa thuận",
          enum: ["Thỏa thuận", "Khoảng lương"],
          required: true,
        },
        min_salary_range: {
          type: Number,
          default: 0,
          min: 0,
        },
        max_salary_range: {
          type: Number,
          default: 0,
          min: 0,
        },
        province: {
          type: String,
          required: true,
        },
      },
    ],
    education: [
      {
        school: { type: String, required: true },
        education: {
          type: String,
          enum: [
            "Trung học cơ sở trở xuống",
            "Trung học phổ thông",
            "Trung cấp",
            "Cao đẳng",
            "Đại học",
            "Thạc sĩ",
            "Tiến sĩ",
          ],
          required: true,
        },
        major: { type: String, required: true },
        startMonth: { type: Number, required: true, min: 1, max: 12 },
        startYear: { type: Number, required: true, min: 1900 },
        endMonth: { type: Number, required: true, min: 1, max: 12 },
        endYear: { type: Number, required: true, min: 1900 },
      },
    ],
    highlights: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    workExperience: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        industry: { type: String, required: true },
        startMonth: { type: Number, required: true, min: 1, max: 12 },
        startYear: { type: Number, required: true, min: 1900 },
        endMonth: { type: Number, required: true, min: 1, max: 12 },
        endYear: { type: Number, required: true, min: 1900 },
        description: { type: String, required: true },
      },
    ],
    projects: [
      {
        projectName: { type: String, required: true },
        role: { type: String, required: true },
        projectLink: { type: String },
        startMonth: { type: Number, required: true, min: 1, max: 12 },
        startYear: { type: Number, required: true, min: 1900 },
        endMonth: { type: Number, required: true, min: 1, max: 12 },
        endYear: { type: Number, required: true, min: 1900 },
        description: { type: String, required: true },
      },
    ],
    skills: [
      {
        skillName: { type: String, required: true },
        experience: {
          type: String,
          enum: [
            "1 năm",
            "2 năm",
            "3 năm",
            "4 năm",
            "5 năm",
            "6 năm",
            "7 năm",
            "8 năm",
            "9 năm",
            "10 năm",
            "Trên 10 năm kinh nghiệm",
          ],
          required: true,
        },
        proficiency: {
          type: String,
          enum: ["Cơ bản", "Độc lập", "Thành thạo"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Thêm plugin xóa mềm
onlineResumeSchema.plugin(mongooseDelete, {
  deletedAt: true, // Tự động thêm trường `deletedAt`
  overrideMethods: "all", // Ghi đè các phương thức mặc định (find, findOne, count...)
  deleted: true,
});

const OnlineResume = mongoose.model(
  "OnlineResume",
  onlineResumeSchema,
  "OnlineResume"
);

module.exports = OnlineResume;
