import React from "react";
import { Row, Col, Skeleton } from "antd";
import styled from "styled-components";
import ResetFilterButton from "../../../../components/organisms/ResetFilterButton";
import PaginationSection from "../../../../components/organisms/PaginationSection";
import NoResults from "../../../../components/organisms/NoResults";
import FilterPopover from "../../../../components/organisms/FilterPopover";
import CompanyGrid from "./CompanyGrid";
import useGetListCompanyIndustry from "../../hooks/Company_Industry/useGetListCompanyIndustry";

const AllCompaniesSectionWrapper = styled.section`
  padding: 1.5rem 0;
  background: #f8f9fa;
  border-radius: 24px;
  margin-top: 1rem;
`;

const SectionContainer = styled.div`
  margin: 0 20px;
  padding: 0;
`;

const SkeletonContainer = styled.div`
  padding: 16px;
`;

const AllCompaniesSection = ({
  filters,
  handleFilterChange,
  handleResetFilters,
  filteredCompanies,
  currentPage,
  pageSize,
  handlePageChange,
}) => {
  const { data: industries, isLoading: isLoadingIndustries } =
    useGetListCompanyIndustry();

  const sortedCompanies = filteredCompanies
    ? [...filteredCompanies].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  const startIndex = (currentPage - 1) * pageSize;
  const currentCompanies = sortedCompanies.slice(
    startIndex,
    startIndex + pageSize
  );

  const filterOptions = {
    industry: industries
      ? industries
          .filter((industry) => industry.status === "open" && !industry.deleted)
          .map((industry) => ({
            label: industry.name,
            value: industry.name,
          }))
      : [],
    companySize: [
      { label: "Dưới 50 nhân viên", value: "under-50" },
      { label: "50-100 nhân viên", value: "50-100" },
      { label: "100-500 nhân viên", value: "100-500" },
      { label: "Trên 500 nhân viên", value: "over-500" },
    ],
  };

  if (!filteredCompanies || isLoadingIndustries) {
    return (
      <AllCompaniesSectionWrapper>
        <SectionContainer>
          <Row
            align="middle"
            justify="space-between"
            style={{ gap: "8px", marginBottom: "24px" }}
          >
            <Col>
              <Row style={{ gap: "8px" }}>
                <Skeleton.Button active size="large" />
                <Skeleton.Button active size="large" />
              </Row>
            </Col>
            <Col>
              <Skeleton.Button active size="large" />
            </Col>
          </Row>
          <SkeletonContainer>
            <Row gutter={[16, 16]}>
              {Array(6)
                .fill()
                .map((_, index) => (
                  <Col key={index} xs={24} sm={12} md={8}>
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
      </AllCompaniesSectionWrapper>
    );
  }

  return (
    <AllCompaniesSectionWrapper>
      <SectionContainer>
        <Row
          align="middle"
          justify="space-between"
          style={{ gap: "8px", marginBottom: "24px" }}
        >
          <Col>
            <Row style={{ gap: "8px" }}>
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
            </Row>
          </Col>
          <Col>
            <ResetFilterButton onClick={handleResetFilters} />
          </Col>
        </Row>
        {currentCompanies.length > 0 ? (
          <CompanyGrid companies={currentCompanies} />
        ) : (
          <NoResults />
        )}
        <PaginationSection
          currentPage={currentPage}
          pageSize={pageSize}
          totalJobs={sortedCompanies.length}
          onChange={handlePageChange}
        />
      </SectionContainer>
    </AllCompaniesSectionWrapper>
  );
};

export default AllCompaniesSection;
