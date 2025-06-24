require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connection = require("./configs/database");
const errorHandler = require("./middleware/errorHandler");
const configViewEngine = require("./configs/viewEngine");

const userRoutes = require("./routes/user.route");
const applicationRoutes = require("./routes/application.route");
const candidate_save_job_postRoutes = require("./routes/candidate_save_job_post.route");
const candidateRoutes = require("./routes/candidate.route");
const company_industryRoutes = require("./routes/company_industry.route");
const companyRoutes = require("./routes/company.route");
const employerRoutes = require("./routes/employer.route");
const industry_groupRoutes = require("./routes/industry_group.route");
const industryRoutes = require("./routes/industry.route");
const job_postRoutes = require("./routes/job_post.route");
const job_positionRoutes = require("./routes/job_position.route");
const online_resumeRoutes = require("./routes/online_resume.route");
const resume_analysisRoutes = require("./routes/resume_analysis.route");
const resume_fileRoutes = require("./routes/resume_file.route");
const salary_rangeRoutes = require("./routes/salary_range.route");
const work_typeRoutes = require("./routes/work_type.route");
const experience_levelRoutes = require("./routes/experience_level.route");
const education_levelRoutes = require("./routes/education_level.route");
const job_post_skills_requirementRoutes = require("./routes/job_post_skills_requirement.route");
const job_post_work_addressRoutes = require("./routes/job_post_work_address.route");
const provinceRoutes = require("./routes/province.route");
const work_addressRoutes = require("./routes/work_address.route");
const skills_requirementRoutes = require("./routes/skills_requirement.route");
const role_organizationRoutes = require("./routes/role_organization.route");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
configViewEngine(app);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/candidate-save-job-post", candidate_save_job_postRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/company-industry", company_industryRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/employer", employerRoutes);
app.use("/api/industry-group", industry_groupRoutes);
app.use("/api/industry", industryRoutes);
app.use("/api/job-post", job_postRoutes);
app.use("/api/job-position", job_positionRoutes);
app.use("/api/online-resume", online_resumeRoutes);
app.use("/api/resume-analysis", resume_analysisRoutes);
app.use("/api/resume-file", resume_fileRoutes);
app.use("/api/salary-range", salary_rangeRoutes);
app.use("/api/work-type", work_typeRoutes);
app.use("/api/experience-level", experience_levelRoutes);
app.use("/api/education-level", education_levelRoutes);
app.use("/api/job-post-skills-requirement", job_post_skills_requirementRoutes);
app.use("/api/job-post-work-address", job_post_work_addressRoutes);
app.use("/api/province", provinceRoutes);
app.use("/api/work-address", work_addressRoutes);
app.use("/api/skills-requirement", skills_requirementRoutes);
app.use("/api/role-organization", role_organizationRoutes);

// Middleware xử lý lỗi
app.use(errorHandler);

// Kết nối database và khởi động server
(async () => {
  try {
    await connection(); // Đợi kết nối database thành công
    console.log("Database connected successfully");

    // Khởi động server HTTP
    const server = app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connecting to DB: ", error);
    process.exit(1);
  }
})();
