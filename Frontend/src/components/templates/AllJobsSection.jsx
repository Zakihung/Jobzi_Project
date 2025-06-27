import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import ResetFilterButton from "../organisms/ResetFilterButton";
import PaginationSection from "../organisms/PaginationSection";
import NoResults from "../organisms/NoResults";
import FilterPopover from "../organisms/FilterPopover";
import useGetAllJobPosts from "../../features/postjob/hooks/Job_Post/useGetAllJobPosts";
import JobGrid from "../../features/job/components/templates/JobGrid";

const AllJobsSectionWrapper = styled.section`
  padding: 1.5rem 0;
  background: #f8f9fa;
  border-radius: 24px;
  margin-top: 1rem;
`;

const SectionContainer = styled.div`
  margin: 0 20px;
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
  const { data: jobs, isLoading } = useGetAllJobPosts();

  // Sắp xếp jobs theo ngày đăng (createdAt) mới nhất
  const sortedJobs = jobs
    ? [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  // Áp dụng bộ lọc cho jobs
  const filteredAndSortedJobs = sortedJobs.filter((job) => {
    const matchesJobType = filters.jobType.length
      ? filters.jobType.includes(job.type.toLowerCase())
      : true;
    const matchesSalary = filters.salary.length
      ? filters.salary.some((range) => {
          const [min, max] = job.salary
            .split("-")
            .map((val) => parseFloat(val.replace(" triệu", "")));
          if (range === "negotiable") return job.salary === "Thỏa thuận";
          if (range === "under-5m") return max <= 5;
          if (range === "over-50m") return min >= 50;
          const [filterMin, filterMax] = range
            .split("-")
            .map((val) => parseFloat(val.replace("m", "")));
          return min <= filterMax && max >= filterMin;
        })
      : true;
    return matchesJobType && matchesSalary;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const currentJobs = filteredAndSortedJobs.slice(
    startIndex,
    startIndex + pageSize
  );

  const filterOptions = {
    jobType: [
      { label: "Toàn thời gian", value: "full-time" },
      { label: "Bán thời gian", value: "part-time" },
      { label: "Thực tập", value: "intern" },
    ],
    experience: [
      { label: "Không yêu cầu", value: "none" },
      { label: "1-2 năm", value: "1-2-years" },
      { label: "2-3 năm", value: "2-3-years" },
      { label: "3-4 năm", value: "3-4-years" },
      { label: "4-5 năm", value: "4-5-years" },
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

  return (
    <AllJobsSectionWrapper>
      <SectionContainer>
        <Row
          align="middle"
          justify="space-between"
          style={{ gap: "8px", marginBottom: "24px" }}
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
        {currentJobs.length > 0 ? (
          <JobGrid jobs={currentJobs} />
        ) : (
          <NoResults />
        )}
        <PaginationSection
          currentPage={currentPage}
          pageSize={pageSize}
          totalJobs={filteredAndSortedJobs.length}
          onChange={handlePageChange}
        />
      </SectionContainer>
    </AllJobsSectionWrapper>
  );
};

export default AllJobsSection;
