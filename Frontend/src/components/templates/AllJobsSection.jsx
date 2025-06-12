import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import FilterDropdown from "../organisms/FilterDropdown";
import SalaryFilter from "../organisms/SalaryFilter";
import ResetFilterButton from "../organisms/ResetFilterButton";
import JobCard from "../../features/job/components/organisms/JobCard";
import PaginationSection from "../organisms/PaginationSection";
import NoResults from "../organisms/NoResults";

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
  };

  return (
    <AllJobsSectionWrapper>
      <SectionContainer>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={12} sm={6} md={3}>
            <FilterDropdown
              filterKey="jobType"
              title="Hình thức"
              options={filterOptions.jobType}
              value={filters.jobType}
              onChange={(values) => handleFilterChange("jobType", values)}
            />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <FilterDropdown
              filterKey="experience"
              title="Kinh nghiệm"
              options={filterOptions.experience}
              value={filters.experience}
              onChange={(values) => handleFilterChange("experience", values)}
            />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <FilterDropdown
              filterKey="education"
              title="Học vấn"
              options={filterOptions.education}
              value={filters.education}
              onChange={(values) => handleFilterChange("education", values)}
            />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <FilterDropdown
              filterKey="industry"
              title="Lĩnh vực"
              options={filterOptions.industry}
              value={filters.industry}
              onChange={(values) => handleFilterChange("industry", values)}
            />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <FilterDropdown
              filterKey="companySize"
              title="Quy mô"
              options={filterOptions.companySize}
              value={filters.companySize}
              onChange={(values) => handleFilterChange("companySize", values)}
            />
          </Col>
          <Col xs={12} sm={12} md={5}>
            <SalaryFilter
              value={filters.salary}
              onChange={(value) => handleFilterChange("salary", value)}
            />
          </Col>
          <Col xs={12} sm={12} md={4}>
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
