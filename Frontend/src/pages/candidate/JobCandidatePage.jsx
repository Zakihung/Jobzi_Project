import React, { useState, useMemo } from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import BannerSection from "../../components/templates/BannerSection";
import AllJobsSection from "../../features/job/components/templates/AllJobsSection";
import { useLocation } from "react-router-dom";
import useGetAllJobPosts from "../../features/postjob/hooks/Job_Post/useGetAllJobPosts";
import useGetListCompany from "../../features/company/hooks/Company/useGetListCompany";

const { Content } = Layout;

const JobpageLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const JobpageContent = styled(Content)`
  background: #ffffff;
`;

const JobCadidatePage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Toàn quốc");
  const location = useLocation();
  const page = location.pathname === "/jobs" ? "jobs" : "companies";
  const [filters, setFilters] = useState({
    jobType: [],
    salary: [],
    experience: [],
    education: [],
    industry: [],
    companySize: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  const { data: jobPosts, isLoading: isLoadingJobs } = useGetAllJobPosts();
  const { data: companies, isLoading: isLoadingCompanies } =
    useGetListCompany();

  const allJobs = useMemo(() => {
    if (!jobPosts || !companies) return [];

    return jobPosts.map((job) => {
      const company = companies.find(
        (c) => c._id === job.employer_id?.company_id
      );
      const locations =
        job.locations
          ?.map((loc) => loc.province)
          .filter(Boolean)
          .join(", ") || "Không xác định";
      return {
        id: job._id,
        title: job.title,
        company: company ? company.name : "Công ty không xác định",
        logo:
          company?.logo ||
          "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png",
        location: locations,
        salary:
          job.salary_type === "negotiable"
            ? "Thỏa thuận"
            : `${(job.min_salary_range / 1000000).toFixed(0)}-${(
                job.max_salary_range / 1000000
              ).toFixed(0)} triệu`,
        type: job.work_type,
        tags: job.skills,
        urgent: false,
        saved: false,
        posted: job.createdAt,
      };
    });
  }, [jobPosts, companies]);

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesKeyword =
        page === "jobs" && searchKeyword
          ? job.title.toLowerCase().includes(searchKeyword.toLowerCase())
          : true;

      const matchesLocation =
        selectedLocation && selectedLocation !== "Toàn quốc"
          ? job.location.toLowerCase().includes(selectedLocation.toLowerCase())
          : true;

      const matchesJobType =
        filters.jobType.length > 0
          ? filters.jobType.includes(job.type.toLowerCase())
          : true;

      const matchesSalary =
        filters.salary.length > 0
          ? filters.salary.some((salaryFilter) => {
              if (salaryFilter === "negotiable") {
                return job.salary === "Thỏa thuận";
              }
              const [filterMin, filterMax] = salaryFilter
                .replace("m", "")
                .split("-")
                .map((val) => parseFloat(val) || Infinity);
              const [jobMin, jobMax] =
                job.salary === "Thỏa thuận"
                  ? [0, Infinity]
                  : job.salary
                      .replace(" triệu", "")
                      .split("-")
                      .map((val) => parseFloat(val));
              return (
                jobMin >= filterMin &&
                (filterMax === Infinity || jobMax <= filterMax)
              );
            })
          : true;

      return (
        matchesKeyword && matchesLocation && matchesJobType && matchesSalary
      );
    });
  }, [allJobs, searchKeyword, selectedLocation, filters, page]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      jobType: [],
      salary: [],
      experience: [],
      education: [],
      industry: [],
      companySize: [],
    });
    setSearchKeyword("");
    setSelectedLocation("Toàn quốc");
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <JobpageLayout>
      <JobpageContent>
        <Row justify={"center"}>
          <Col span={21}>
            <BannerSection
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              handleSearch={handleSearch}
              page={page}
            />
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col span={21}>
            <AllJobsSection
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleResetFilters={handleResetFilters}
              filteredJobs={
                isLoadingJobs || isLoadingCompanies ? [] : filteredJobs
              }
              currentPage={currentPage}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
            />
          </Col>
        </Row>
      </JobpageContent>
    </JobpageLayout>
  );
};

export default JobCadidatePage;
