import React, { useState, useMemo, useCallback } from "react";
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
  Spin,
} from "antd";
import {
  FilterOutlined,
  ReloadOutlined,
  StarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import styles from "../../styles/CompanyPage.module.css";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const CompanyPage = () => {
  // State cho filters, pagination và loading
  const [filters, setFilters] = useState({
    industry: [],
    companySize: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Giả lập loading state
  const pageSize = 16;

  // Dữ liệu mẫu cho companies
  const allCompanies = useMemo(
    () =>
      Array.from({ length: 50 }, (_, index) => ({
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
        )}${
          index + 1
        }, hoạt động trong lĩnh vực công nghệ và giải pháp sáng tạo.`,
        employees: ["under-50", "50-100", "100-500", "1000+"][index % 4],
        industry: [
          "công-nghệ-thông-tin",
          "tài-chính",
          "marketing",
          "sản-xuất",
          "y-tế",
        ][index % 5],
      })),
    []
  );

  // Logic lọc companies dựa trên filters
  const filteredCompanies = useMemo(() => {
    return allCompanies.filter((company) => {
      const matchesIndustry =
        filters.industry.length > 0
          ? filters.industry.includes(company.industry)
          : true;

      const matchesCompanySize =
        filters.companySize.length > 0
          ? filters.companySize.includes(company.employees)
          : true;

      return matchesIndustry && matchesCompanySize;
    });
  }, [allCompanies, filters]);

  // Reset filters
  const handleResetFilters = useCallback(() => {
    setFilters({
      industry: [],
      companySize: [],
    });
    setCurrentPage(1);
  }, []);

  // Xử lý thay đổi filter
  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  // Xử lý thay đổi trang
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // Tính toán companies hiển thị dựa trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const currentCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <Layout className={styles.companypageLayout}>
      <Content className={styles.companypageContent}>
        {/* Banner Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className={styles.bannerSection}>
              <div className={styles.bannerBackground} />
              <div className={styles.bannerContainer}>
                <Title level={1} className={styles.bannerTitle}>
                  Khám phá{" "}
                  <span className={styles.highlight}>công ty hàng đầu</span>
                </Title>
                <Text className={styles.bannerDescription}>
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
            <section className={styles.filtersSection}>
              <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitleGroup}>
                    <Title level={2} className={styles.sectionTitle}>
                      <FilterOutlined className={styles.sectionIcon} />
                      Bộ lọc công ty
                    </Title>
                    <Text className={styles.sectionSubtitle}>
                      Lọc công ty theo lĩnh vực và quy mô để tìm lựa chọn phù
                      hợp
                    </Text>
                  </div>
                  <Button
                    type="primary"
                    ghost
                    className={styles.resetFilterBtn}
                    onClick={handleResetFilters}
                  >
                    <ReloadOutlined /> Đặt lại bộ lọc
                  </Button>
                </div>

                <Card className={styles.filterCard}>
                  <Row gutter={[24, 24]}>
                    {/* Industry Filter */}
                    <Col xs={24} md={12}>
                      <div className={styles.filterGroup}>
                        <Title level={5} className={styles.filterTitle}>
                          Lĩnh vực kinh doanh
                        </Title>
                        <Checkbox.Group
                          options={[
                            {
                              label: "Công nghệ thông tin",
                              value: "công-nghệ-thông-tin",
                            },
                            { label: "Tài chính", value: "tài-chính" },
                            { label: "Marketing", value: "marketing" },
                            { label: "Sản xuất", value: "sản-xuất" },
                            { label: "Y tế", value: "y-tế" },
                          ]}
                          value={filters.industry}
                          onChange={(values) =>
                            handleFilterChange("industry", values)
                          }
                          className={styles.checkboxGroup}
                        />
                      </div>
                    </Col>

                    {/* Company Size Filter */}
                    <Col xs={24} md={12}>
                      <div className={styles.filterGroup}>
                        <Title level={5} className={styles.filterTitle}>
                          Quy mô công ty
                        </Title>
                        <Checkbox.Group
                          options={[
                            { label: "Dưới 50 nhân viên", value: "under-50" },
                            { label: "50-100 nhân viên", value: "50-100" },
                            { label: "100-500 nhân viên", value: "100-500" },
                            { label: "Trên 1000 nhân viên", value: "1000+" },
                          ]}
                          value={filters.companySize}
                          onChange={(values) =>
                            handleFilterChange("companySize", values)
                          }
                          className={styles.checkboxGroup}
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
            <section className={styles.allCompaniesSection}>
              <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitleGroup}>
                    <Title level={2} className={styles.sectionTitle}>
                      <StarOutlined className={styles.sectionIcon} />
                      Tất cả công ty
                    </Title>
                    <Text className={styles.sectionSubtitle}>
                      {filteredCompanies.length} công ty đang tìm kiếm nhân tài
                    </Text>
                  </div>
                </div>

                {loading ? (
                  <div className={styles.loadingContainer}>
                    <Spin size="large" />
                  </div>
                ) : (
                  <Row gutter={[16, 16]}>
                    {currentCompanies.length > 0 ? (
                      currentCompanies.map((company) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={company.id}>
                          <Card className={styles.companyCard} hoverable>
                            <div className={styles.companyHeader}>
                              <Avatar
                                src={company.logo}
                                size={72}
                                className={styles.companyLogo}
                              />
                              <div className={styles.companyRating}>
                                <Rate
                                  disabled
                                  defaultValue={company.rating}
                                  allowHalf
                                  className={styles.ratingStars}
                                />
                                <Text className={styles.ratingText}>
                                  {company.rating} ({company.reviews})
                                </Text>
                              </div>
                            </div>
                            <div className={styles.companyInfo}>
                              <Title level={4} className={styles.companyName}>
                                {company.name}
                              </Title>
                              <Paragraph className={styles.companyDescription}>
                                {company.description}
                              </Paragraph>
                            </div>
                            <div className={styles.companyStats}>
                              <div className={styles.companyStat}>
                                <TeamOutlined className={styles.statIcon} />
                                <Text>
                                  {company.employees
                                    .replace("under-50", "Dưới 50")
                                    .replace("1000+", "Trên 1000")}{" "}
                                  nhân viên
                                </Text>
                              </div>
                              <div className={styles.companyStat}>
                                <CheckCircleOutlined
                                  className={styles.statIcon}
                                />
                                <Text>{company.jobs} việc làm</Text>
                              </div>
                            </div>
                            <div className={styles.companyFooter}>
                              <Button
                                type="primary"
                                className={styles.viewCompanyBtn}
                                block
                              >
                                Xem công ty
                              </Button>
                            </div>
                          </Card>
                        </Col>
                      ))
                    ) : (
                      <Col span={24}>
                        <Text className={styles.noResults}>
                          Không tìm thấy công ty phù hợp
                        </Text>
                      </Col>
                    )}
                  </Row>
                )}

                <div className={styles.paginationContainer}>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredCompanies.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    className={styles.companiesPagination}
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
