import React, { useState, useMemo } from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import BannerSection from "../../components/templates/BannerSection";
import AllCompaniesSection from "../../features/company/components/templates/AllCompaniesSection";

const { Content } = Layout;

const CompanypageLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const CompanypageContent = styled(Content)`
  background: #ffffff;
`;

const CompanyPage = () => {
  const page = "companies";
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filters, setFilters] = useState({
    industry: [],
    companySize: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  const allCompanies = useMemo(
    () =>
      Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        title: `Vị trí công việc ${index + 1}`,
        company: `Công ty ${String.fromCharCode(65 + (index % 26))}`,
        logo: `https://via.placeholder.com/60/${Math.floor(
          Math.random() * 16777215
        ).toString(16)}/ffffff?text=C${index % 10}`,
        location: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"][index % 5],
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

  const filteredCompanies = useMemo(() => {
    return allCompanies.filter((job) => {
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

      return matchesKeyword && matchesLocation;
    });
  }, [allCompanies, searchKeyword, selectedLocation, filters]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
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
    <CompanypageLayout>
      <CompanypageContent>
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
            <AllCompaniesSection
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleResetFilters={handleResetFilters}
              filteredCompanies={filteredCompanies}
              currentPage={currentPage}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
            />
          </Col>
        </Row>
      </CompanypageContent>
    </CompanypageLayout>
  );
};

export default CompanyPage;
