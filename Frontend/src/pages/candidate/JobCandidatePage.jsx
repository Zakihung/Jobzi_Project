import React, { useState, useMemo, useEffect } from "react";
import { Layout, Row, Col, Skeleton } from "antd";
import styled from "styled-components";
import BannerSection from "../../components/templates/BannerSection";
import AllJobsSection from "../../features/job/components/templates/AllJobsSection";
import { useLocation } from "react-router-dom";
import useGetListCompany from "../../features/company/hooks/Company/useGetListCompany";
import useGetFilteredJobPosts from "../../features/postjob/hooks/Job_Post/useGetFilteredJobPosts";

const { Content } = Layout;

const JobpageLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const JobpageContent = styled(Content)`
  background: #ffffff;
  padding: 16px 0;

  @media (max-width: 576px) {
    padding: 8px 0;
  }
`;

const JobCandidatePage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Toàn quốc");
  const location = useLocation();
  const page = location.pathname === "/jobs" ? "jobs" : "companies";
  const [filters, setFilters] = useState({
    jobType: [],
    experience: [],
    education: [],
    salary: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const savedKeyword = localStorage.getItem("searchKeyword");
    if (savedKeyword) {
      setSearchKeyword(savedKeyword);
      localStorage.removeItem("searchKeyword");
    }
  }, []);

  const { data: jobPosts, isLoading: isLoadingJobs } = useGetFilteredJobPosts();
  const { data: companies, isLoading: isLoadingCompanies } =
    useGetListCompany();

  const allJobs = useMemo(() => {
    if (!jobPosts || !companies) return [];

    return jobPosts.map((job) => {
      const company = companies.find(
        (c) => c._id === job?.employer_id?.company_id
      );
      const locations =
        job?.locations
          ?.map((loc) => loc.province)
          .filter(Boolean)
          .join(", ") || "Không xác định";
      return {
        id: job?._id,
        title: job?.title,
        company: company ? company.name : "Công ty không xác định",
        logo:
          company?.logo ||
          "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png",
        location: locations,
        salary:
          job?.salary_type === "negotiable"
            ? "Thỏa thuận"
            : `${(job?.min_salary_range / 1000000).toFixed(0)}-${(
                job?.max_salary_range / 1000000
              ).toFixed(0)} triệu`,
        work_type: job?.work_type || "Không xác định",
        min_years_experience: job?.min_years_experience || 0,
        education_level: job?.education_level || "Không yêu cầu",
        tags: job?.skills || [],
        urgent: false,
        saved: false,
        posted: job?.createdAt,
        min_salary_range: job?.min_salary_range || 0,
        max_salary_range: job?.max_salary_range || 0,
      };
    });
  }, [jobPosts, companies]);

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesKeyword =
        page === "jobs" && searchKeyword
          ? job?.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            job?.tags.some((tag) =>
              tag.toLowerCase().includes(searchKeyword.toLowerCase())
            )
          : true;

      const matchesLocation =
        selectedLocation && selectedLocation !== "Toàn quốc"
          ? job?.location.toLowerCase().includes(selectedLocation.toLowerCase())
          : true;

      const matchesJobType =
        filters.jobType.length > 0
          ? filters.jobType.includes(job?.work_type)
          : true;

      const matchesExperience =
        filters.experience.length > 0
          ? filters.experience.some((expFilter) => {
              const expValue =
                expFilter === "none"
                  ? 0
                  : expFilter === "over-5"
                  ? 5
                  : parseInt(expFilter);
              return (
                (expFilter === "none" && job?.min_years_experience === 0) ||
                (expFilter === "over-5" && job?.min_years_experience >= 5) ||
                job?.min_years_experience === expValue
              );
            })
          : true;

      const matchesEducation =
        filters.education.length > 0
          ? filters.education.includes(job?.education_level)
          : true;

      const matchesSalary =
        filters.salary.length > 0
          ? filters.salary.some((salaryFilter) => {
              if (salaryFilter === "negotiable") {
                return job?.salary_type === "negotiable";
              }
              const [filterMin, filterMax] = salaryFilter
                .replace("under-", "")
                .replace("over-", "")
                .replace("m", "")
                .split("-")
                .map((val) => parseFloat(val) * 1000000 || Infinity);
              const jobMin = job?.min_salary_range;
              const jobMax = job?.max_salary_range;
              return (
                (jobMin >= filterMin &&
                  (filterMax === Infinity || jobMin <= filterMax)) ||
                (jobMax >= filterMin &&
                  (filterMax === Infinity || jobMax <= filterMax))
              );
            })
          : true;

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesJobType &&
        matchesExperience &&
        matchesEducation &&
        matchesSalary
      );
    });
  }, [allJobs, searchKeyword, selectedLocation, filters, page]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      jobType: [],
      experience: [],
      education: [],
      salary: [],
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

  if (isLoadingJobs || isLoadingCompanies) {
    return (
      <JobpageLayout>
        <JobpageContent>
          <Row justify={"center"}>
            <Col xs={24} sm={22} md={21}>
              <Skeleton
                active
                paragraph={{ rows: 4 }}
                title={{ width: "80%" }}
                style={{ margin: "16px 0" }}
              />
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col xs={24} sm={22} md={21}>
              <Skeleton
                active
                paragraph={{ rows: 6 }}
                title={{ width: "60%" }}
              />
            </Col>
          </Row>
        </JobpageContent>
      </JobpageLayout>
    );
  }

  return (
    <JobpageLayout>
      <JobpageContent>
        <Row justify={"center"}>
          <Col xs={24} sm={22} md={21}>
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
          <Col xs={24} sm={22} md={21}>
            <AllJobsSection
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleResetFilters={handleResetFilters}
              filteredJobs={filteredJobs || []}
              isLoading={isLoadingJobs || isLoadingCompanies}
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

export default JobCandidatePage;
