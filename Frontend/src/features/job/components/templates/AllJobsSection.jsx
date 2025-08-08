import React from "react";
import { Row, Col, Skeleton } from "antd";
import styled from "styled-components";
import ResetFilterButton from "../../../../components/organisms/ResetFilterButton";
import PaginationSection from "../../../../components/organisms/PaginationSection";
import NoResults from "../../../../components/organisms/NoResults";
import FilterPopover from "../../../../components/organisms/FilterPopover";
import JobGrid from "./JobGrid";

const AllJobsSectionWrapper = styled.section`
  padding: 1.5rem 0;
  background: #f8f9fa;
  border-radius: 24px;
  margin-top: 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0;
    border-radius: 16px;
  }

  @media (max-width: 576px) {
    padding: 0.5rem 0;
    border-radius: 12px;
  }
`;

const SectionContainer = styled.div`
  margin: 0 20px;
  padding: 0;

  @media (max-width: 576px) {
    margin: 0 10px;
  }
`;

const SkeletonContainer = styled.div`
  padding: 16px;

  @media (max-width: 576px) {
    padding: 8px;
  }
`;

const FilterRow = styled(Row)`
  gap: 8px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AllJobsSection = ({
  filters,
  handleFilterChange,
  handleResetFilters,
  filteredJobs,
  isLoading,
  currentPage,
  pageSize,
  handlePageChange,
}) => {
  const sortedJobs = filteredJobs
    ? [...filteredJobs].sort((a, b) => new Date(b.posted) - new Date(a.posted))
    : [];

  const totalItems = sortedJobs?.length || 0;

  const startIndex = (currentPage - 1) * pageSize;
  const currentJobs = sortedJobs.slice(startIndex, startIndex + pageSize);

  const filterOptions = {
    jobType: [
      { label: "Toàn thời gian", value: "full_time" },
      { label: "Bán thời gian", value: "part_time" },
      { label: "Thực tập", value: "intern" },
    ],
    experience: [
      { label: "Không yêu cầu", value: "none" },
      { label: "1 năm", value: "1" },
      { label: "2 năm", value: "2" },
      { label: "3 năm", value: "3" },
      { label: "4 năm", value: "4" },
      { label: "5 năm", value: "5" },
      { label: "Trên 5 năm", value: "over-5" },
    ],
    education: [
      { label: "Không yêu cầu", value: "Không yêu cầu" },
      { label: "Trung học phổ thông", value: "Trung học phổ thông" },
      { label: "Trung cấp", value: "Trung cấp" },
      { label: "Cao đẳng", value: "Cao đẳng" },
      { label: "Đại học", value: "Đại học" },
      { label: "Thạc sĩ", value: "Thạc sĩ" },
      { label: "Tiến sĩ", value: "Tiến sĩ" },
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

  if (isLoading) {
    return (
      <AllJobsSectionWrapper>
        <SectionContainer>
          <FilterRow align="middle" justify="space-between">
            <Col>
              <Row style={{ gap: "8px" }}>
                {Array(4)
                  .fill()
                  .map((_, index) => (
                    <Skeleton.Button key={index} active size="large" />
                  ))}
              </Row>
            </Col>
            <Col>
              <Skeleton.Button active size="large" />
            </Col>
          </FilterRow>
          <SkeletonContainer>
            <Row gutter={[16, 16]}>
              {Array(6)
                .fill()
                .map((_, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={6}>
                    <Skeleton
                      active
                      avatar={{ size: 70, shape: "square" }}
                      paragraph={{ rows: 3 }}
                    />
                  </Col>
                ))}
            </Row>
          </SkeletonContainer>
          <Skeleton.Button active size="large" style={{ marginTop: 16 }} />
        </SectionContainer>
      </AllJobsSectionWrapper>
    );
  }

  return (
    <AllJobsSectionWrapper>
      <SectionContainer>
        <FilterRow align="middle" justify="space-between">
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
        </FilterRow>
        {currentJobs.length > 0 ? (
          <JobGrid jobs={currentJobs} />
        ) : (
          <NoResults />
        )}
        {(totalItems > 0 || currentJobs.length > 0) && (
          <PaginationSection
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        )}
      </SectionContainer>
    </AllJobsSectionWrapper>
  );
};

export default AllJobsSection;
