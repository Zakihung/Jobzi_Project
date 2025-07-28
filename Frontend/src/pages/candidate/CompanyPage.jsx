import React, { useState, useMemo } from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import BannerSection from "../../components/templates/BannerSection";
import AllCompaniesSection from "../../features/company/components/templates/AllCompaniesSection";
import { useLocation } from "react-router-dom";
import useGetListCompany from "../../features/company/hooks/Company/useGetListCompany";

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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Toàn quốc");
  const location = useLocation();
  const page = location.pathname === "/companies" ? "companies" : "jobs";
  const [filters, setFilters] = useState({
    industry: [],
    companySize: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const { data: companies, isLoading: isLoadingCompanies } =
    useGetListCompany();

  const allCompanies = useMemo(() => {
    if (!companies) return [];
    return companies.map((company) => ({
      _id: company._id,
      name: company.name,
      logo:
        company.logo ||
        "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png",
      province_id: company.province_id || { name: "Không xác định" },
      company_industry_id: company.company_industry_id || {
        name: "Không xác định",
      },
      min_size: company.min_size,
      max_size: company.max_size,
      createdAt: company.createdAt,
    }));
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    return allCompanies.filter((company) => {
      const matchesKeyword =
        page === "companies" && searchKeyword
          ? company.name.toLowerCase().includes(searchKeyword.toLowerCase())
          : true;

      const matchesLocation =
        selectedLocation && selectedLocation !== "Toàn quốc"
          ? company.province_id.name.toLowerCase() ===
            selectedLocation.toLowerCase()
          : true;

      const matchesIndustry =
        filters.industry.length > 0
          ? filters.industry.includes(company.company_industry_id.name)
          : true;

      const matchesCompanySize =
        filters.companySize.length > 0
          ? filters.companySize.some((sizeFilter) => {
              const [filterMin, filterMax] = sizeFilter
                .replace("under-", "")
                .replace("over-", "")
                .split("-")
                .map((val) => parseInt(val) || Infinity);
              const companyMin = company.min_size || 0;
              const companyMax = company.max_size || Infinity;
              return (
                (companyMin >= filterMin &&
                  (filterMax === Infinity || companyMin <= filterMax)) ||
                (companyMax >= filterMin &&
                  (filterMax === Infinity || companyMax <= filterMax))
              );
            })
          : true;

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesIndustry &&
        matchesCompanySize
      );
    });
  }, [allCompanies, searchKeyword, selectedLocation, filters, page]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
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
              filteredCompanies={filteredCompanies || []}
              isLoading={isLoadingCompanies}
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
