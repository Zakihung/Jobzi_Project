import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Space,
  Typography,
  Checkbox,
  Pagination,
  Avatar,
  Rate,
} from "antd";
import {
  FilterOutlined,
  ReloadOutlined,
  StarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "../../styles/CompanyPage.css";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const CompanyPage = () => {
  const [filters, setFilters] = useState({
    industry: [],
    companySize: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  // Sample company data
  const allCompanies = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Công ty ${String.fromCharCode(65 + (index % 26))}${index + 1}`,
    logo: `https://via.placeholder.com/80/${Math.floor(
      Math.random() * 16777215
    ).toString(16)}/ffffff?text=C${index % 10}`,
    rating: 3.5 + (index % 10) * 0.1,
    reviews: 100 + (index % 1000),
    jobs: 10 + (index % 50),
    description: `Mô tả ngắn về công ty ${String.fromCharCode(
      65 + (index % 26)
    )}${index + 1}, hoạt động trong lĩnh vực công nghệ và giải pháp sáng tạo.`,
    employees: ["50-100", "100-500", "500-1000", "1000+"][index % 4],
    industry: [
      "Công nghệ thông tin",
      "Tài chính",
      "Marketing",
      "Sản xuất",
      "Y tế",
    ][index % 5],
  }));

  const handleResetFilters = () => {
    setFilters({
      industry: [],
      companySize: [],
    });
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate companies to display based on current page
  const startIndex = (currentPage - 1) * pageSize;
  const currentCompanies = allCompanies.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <Layout className="companypage-layout">
      <Content className="companypage-content">
        {/* Banner Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className="banner-section">
              <div className="banner-background"></div>
              <div className="banner-container">
                <Title level={1} className="banner-title">
                  Khám phá <span className="highlight">công ty hàng đầu</span>
                </Title>
                <Text className="banner-description">
                  Tìm hiểu về các công ty uy tín với môi trường làm việc chuyên
                  nghiệp
                </Text>
              </div>
            </section>
          </Col>
          <Col span={2} />
        </Row>

        {/* Filters Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className="filters-section">
              <div className="section-container">
                <div className="section-header">
                  <div className="section-title-group">
                    <Title level={2} className="section-title">
                      <FilterOutlined className="section-icon" />
                      Bộ lọc công ty
                    </Title>
                    <Text className="section-subtitle">
                      Lọc công ty theo lĩnh vực và quy mô để tìm lựa chọn phù
                      hợp
                    </Text>
                  </div>
                  <Button
                    type="primary"
                    ghost
                    className="reset-filter-btn"
                    onClick={handleResetFilters}
                  >
                    <ReloadOutlined /> Đặt lại bộ lọc
                  </Button>
                </div>

                <Card className="filter-card">
                  <Row gutter={[24, 24]}>
                    {/* Industry Filter */}
                    <Col xs={24} md={12}>
                      <div className="filter-group">
                        <Title level={5} className="filter-title">
                          Lĩnh vực kinh doanh
                        </Title>
                        <Checkbox.Group
                          options={[
                            { label: "Công nghệ thông tin", value: "it" },
                            { label: "Tài chính", value: "finance" },
                            { label: "Marketing", value: "marketing" },
                            { label: "Sản xuất", value: "manufacturing" },
                            { label: "Y tế", value: "healthcare" },
                          ]}
                          value={filters.industry}
                          onChange={(values) =>
                            handleFilterChange("industry", values)
                          }
                        />
                      </div>
                    </Col>

                    {/* Company Size Filter */}
                    <Col xs={24} md={12}>
                      <div className="filter-group">
                        <Title level={5} className="filter-title">
                          Quy mô công ty
                        </Title>
                        <Checkbox.Group
                          options={[
                            { label: "Dưới 50 nhân viên", value: "under-50" },
                            { label: "50-100 nhân viên", value: "50-100" },
                            { label: "100-500 nhân viên", value: "100-500" },
                            { label: "Trên 500 nhân viên", value: "over-500" },
                          ]}
                          value={filters.companySize}
                          onChange={(values) =>
                            handleFilterChange("companySize", values)
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            </section>
          </Col>
          <Col span={2} />
        </Row>

        {/* All Companies Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className="all-companies-section">
              <div className="section-container">
                <div className="section-header">
                  <div className="section-title-group">
                    <Title level={2} className="section-title">
                      <StarOutlined className="section-icon" />
                      Tất cả công ty
                    </Title>
                    <Text className="section-subtitle">
                      {allCompanies.length} công ty đang tìm kiếm nhân tài
                    </Text>
                  </div>
                </div>

                <Row gutter={[24, 24]}>
                  {currentCompanies.map((company) => (
                    <Col xs={24} sm={12} lg={6} key={company.id}>
                      <Card className="company-card" hoverable>
                        <div className="company-header">
                          <Avatar
                            src={company.logo}
                            size={72}
                            className="company-avatar"
                          />
                          <div className="company-rating">
                            <Rate
                              disabled
                              defaultValue={company.rating}
                              allowHalf
                              className="rating-stars"
                            />
                            <Text className="rating-text">
                              {company.rating} ({company.reviews})
                            </Text>
                          </div>
                        </div>

                        <div className="company-info">
                          <Title level={4} className="company-name">
                            {company.name}
                          </Title>
                          <Paragraph className="company-description">
                            {company.description}
                          </Paragraph>
                        </div>

                        <div className="company-stats">
                          <div className="company-stat">
                            <TeamOutlined className="stat-icon" />
                            <Text>{company.employees} nhân viên</Text>
                          </div>
                          <div className="company-stat">
                            <CheckCircleOutlined className="stat-icon" />
                            <Text>{company.jobs} việc làm</Text>
                          </div>
                        </div>

                        <div className="company-footer">
                          <Button
                            type="primary"
                            className="view-company-btn"
                            block
                          >
                            Xem công ty
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <div className="pagination-container">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={allCompanies.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    className="companies-pagination"
                  />
                </div>
              </div>
            </section>
          </Col>
          <Col span={2} />
        </Row>
      </Content>
    </Layout>
  );
};

export default CompanyPage;
