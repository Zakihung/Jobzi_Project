import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
// import SalaryFilter from "../organisms/SalaryFilter";
import ResetFilterButton from "../organisms/ResetFilterButton";
import JobCard from "../../features/job/components/organisms/JobCard";
import PaginationSection from "../organisms/PaginationSection";
import NoResults from "../organisms/NoResults";
import FilterPopover from "../organisms/FilterPopover";

const AllJobsSectionWrapper = styled.section`
  padding: 2rem 0;
  background: #f8f9fa;
  border-radius: 24px;
  margin-top: 2rem;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
`;

const AllJobsSection = ({
  filters,
  handleFilterChange,
  handleResetFilters,
  filteredJobs,
  currentPage,
  pageSize,
  handlePageChange,
}) => {
  const startIndex = (currentPage - 1) * pageSize;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + pageSize);

  const filterOptions = {
    jobType: [
      { label: "Full-time", value: "full-time" },
      { label: "Part-time", value: "part-time" },
      { label: "Remote", value: "remote" },
      { label: "Freelance", value: "freelance" },
    ],
    experience: [
      { label: "Không yêu cầu", value: "none" },
      { label: "Dưới 1 năm", value: "under-1-year" },
      { label: "1-3 năm", value: "1-3-years" },
      { label: "3-5 năm", value: "3-5-years" },
      { label: "Trên 5 năm", value: "over-5-years" },
    ],
    education: [
      { label: "Không yêu cầu", value: "none" },
      { label: "Trung cấp", value: "intermediate" },
      { label: "Cao đẳng", value: "college" },
      { label: "Đại học", value: "university" },
      { label: "Sau đại học", value: "postgraduate" },
    ],
    industry: [
      { label: "Công nghệ thông tin", value: "it" },
      { label: "Tài chính", value: "finance" },
      { label: "Marketing", value: "marketing" },
      { label: "Sản xuất", value: "manufacturing" },
      { label: "Y tế", value: "healthcare" },
    ],
    companySize: [
      { label: "Dưới 50 nhân viên", value: "under-50" },
      { label: "50-100 nhân viên", value: "50-100" },
      { label: "100-500 nhân viên", value: "100-500" },
      { label: "Trên 500 nhân viên", value: "over-500" },
    ],
    salary: [
      { label: "Thỏa thuận", value: "negotiable" },
      { label: "Dưới 5 triệu", value: "under-5m" },
      { label: "5-10 triệu", value: "5-10m" },
      { label: "10-15 triệu", value: "10-15m" },
      { label: "15-20 triệu", value: "15-20m" },
      { label: "20-25 triệu", value: "20-25m" },
      { label: "25-30 triệu", value: "25-30m" },
      { label: "30-35 triệu", value: "30-35m" },
      { label: "35-40 triệu", value: "35-40m" },
      { label: "40-45 triệu", value: "40-45m" },
      { label: "45-50 triệu", value: "45-50m" },
      { label: "Trên 50 triệu", value: "over-50m" },
    ],
  };

  console.log("filters.salary:", filters.salary);

  return (
    <AllJobsSectionWrapper>
      <SectionContainer>
        <Row
          align="middle"
          justify="space-between"
          style={{ gap: "8px", marginBottom: "16px" }}
        >
          <Col>
            <Row style={{ gap: "8px" }}>
              <FilterPopover
                filterKey="jobType"
                title="Hình thức"
                options={filterOptions.jobType}
                value={filters.jobType}
                onChange={(values) => handleFilterChange("jobType", values)}
              />
              <FilterPopover
                filterKey="experience"
                title="Kinh nghiệm"
                options={filterOptions.experience}
                value={filters.experience}
                onChange={(values) => handleFilterChange("experience", values)}
              />
              <FilterPopover
                filterKey="education"
                title="Học vấn"
                options={filterOptions.education}
                value={filters.education}
                onChange={(values) => handleFilterChange("education", values)}
              />
              <FilterPopover
                filterKey="industry"
                title="Lĩnh vực"
                options={filterOptions.industry}
                value={filters.industry}
                onChange={(values) => handleFilterChange("industry", values)}
              />
              <FilterPopover
                filterKey="companySize"
                title="Quy mô"
                options={filterOptions.companySize}
                value={filters.companySize}
                onChange={(values) => handleFilterChange("companySize", values)}
              />
              <FilterPopover
                filterKey="salary"
                title="Mức lương"
                options={filterOptions.salary}
                value={filters.salary}
                onChange={(values) => handleFilterChange("salary", values)}
              />
            </Row>
          </Col>
          <Col>
            <ResetFilterButton onClick={handleResetFilters} />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <Col xs={24} sm={12} md={8} key={job.id}>
                <JobCard job={job} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <NoResults />
            </Col>
          )}
        </Row>
        <PaginationSection
          currentPage={currentPage}
          pageSize={pageSize}
          totalJobs={filteredJobs.length}
          onChange={handlePageChange}
        />
      </SectionContainer>
    </AllJobsSectionWrapper>
  );
};

export default AllJobsSection;
