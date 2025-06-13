import React, { useState, useMemo } from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import BannerSection from "../../components/templates/BannerSection";
import AllJobsSection from "../../components/templates/AllJobsSection";

const { Content } = Layout;

const SearchpageLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const SearchpageContent = styled(Content)`
  background: #ffffff;
`;

const SearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filters, setFilters] = useState({
    jobType: [],
    salary: [], // Mảng rỗng để chứa các chuỗi như ["negotiable", "5-10m"]
    experience: [],
    education: [],
    industry: [],
    companySize: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  const allJobs = useMemo(
    () =>
      Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        title: `Vị trí công việc ${index + 1}`,
        company: `Công ty ${String.fromCharCode(65 + (index % 26))}`,
        logo: `https://via.placeholder.com/60/${Math.floor(
          Math.random() * 16777215
        ).toString(16)}/ffffff?text=C${index % 10}`,
        location: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Remote", "Cần Thơ"][
          index % 5
        ],
        salary: `${10 + (index % 40)}-${20 + (index % 40)} triệu`, // Ví dụ: "10-20 triệu"
        type: ["Full-time", "Part-time", "Remote", "Freelance"][index % 4],
        tags: [
          ["React", "Node.js", "JavaScript"],
          ["Python", "Django", "Flask"],
          ["Java", "Spring", "Hibernate"],
          ["Marketing", "SEO", "Analytics"],
          ["Design", "Figma", "Sketch"],
        ][index % 5],
        urgent: index % 3 === 0,
        saved: index % 4 === 0,
        posted: `${index % 24} giờ trước`,
      })),
    []
  );

  // Hàm ánh xạ giá trị salary từ filterOptions.salary sang khoảng số
  const salaryRanges = {
    negotiable: [0, Infinity], // Thỏa thuận: bất kỳ mức lương nào
    "under-5m": [0, 5], // Dưới 5 triệu
    "5-10m": [5, 10],
    "10-15m": [10, 15],
    "15-20m": [15, 20],
    "20-25m": [20, 25],
    "25-30m": [25, 30],
    "30-35m": [30, 35],
    "35-40m": [35, 40],
    "40-45m": [40, 45],
    "45-50m": [45, 50],
    "over-50m": [50, Infinity], // Trên 50 triệu
  };

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesKeyword = searchKeyword
        ? job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.tags.some((tag) =>
            tag.toLowerCase().includes(searchKeyword.toLowerCase())
          )
        : true;

      const matchesLocation = selectedLocation
        ? job.location.toLowerCase() ===
          selectedLocation
            .replace("ho-chi-minh", "Hồ Chí Minh")
            .replace("ha-noi", "Hà Nội")
            .replace("da-nang", "Đà Nẵng")
            .replace("can-tho", "Cần Thơ")
            .toLowerCase()
        : true;

      const matchesJobType =
        filters.jobType.length > 0
          ? filters.jobType.includes(job.type.toLowerCase())
          : true;

      const matchesSalary =
        filters.salary.length > 0
          ? filters.salary.some((salaryFilter) => {
              const [min, max] = salaryRanges[salaryFilter] || [0, Infinity];
              const [jobMin] = job.salary
                .replace(" triệu", "")
                .split("-")
                .map((s) => parseInt(s));
              return jobMin >= min && (max === Infinity || jobMin <= max);
            })
          : true;

      return (
        matchesKeyword && matchesLocation && matchesJobType && matchesSalary
      );
    });
  }, [allJobs, searchKeyword, selectedLocation, filters]);

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
    setSelectedLocation("");
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
    <SearchpageLayout>
      <SearchpageContent>
        <Row>
          <Col span={2} />
          <Col span={20}>
            <BannerSection
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              handleSearch={handleSearch}
            />
          </Col>
          <Col span={2} />
        </Row>
        <Row>
          <Col span={2} />
          <Col span={20}>
            <AllJobsSection
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleResetFilters={handleResetFilters}
              filteredJobs={filteredJobs}
              currentPage={currentPage}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
            />
          </Col>
          <Col span={2} />
        </Row>
      </SearchpageContent>
    </SearchpageLayout>
  );
};

export default SearchPage;
