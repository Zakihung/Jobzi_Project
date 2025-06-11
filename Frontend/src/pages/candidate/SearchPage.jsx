import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Input,
  Select,
  Button,
  Space,
  Typography,
  Card,
  Checkbox,
  Slider,
  Divider,
  Pagination,
  Avatar,
  Tag,
  Badge,
  Rate,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  FilterOutlined,
  ReloadOutlined,
  HeartOutlined,
  ShareAltOutlined,
  FireOutlined,
} from "@ant-design/icons";
import "../../styles/SearchPage.css";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const SearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filters, setFilters] = useState({
    jobType: [],
    salary: [0, 100],
    experience: [],
    education: [],
    industry: [],
    companySize: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  // Sample job data (expanded to ensure enough data for pagination)
  const allJobs = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Vị trí công việc ${index + 1}`,
    company: `Công ty ${String.fromCharCode(65 + (index % 26))}`,
    logo: `https://via.placeholder.com/60/${Math.floor(
      Math.random() * 16777215
    ).toString(16)}/ffffff?text=C${index % 10}`,
    location: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Remote", "Cần Thơ"][
      index % 5
    ],
    salary: `${10 + (index % 40)}-${20 + (index % 40)} triệu`,
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
  }));

  const handleSearch = () => {
    console.log("Search:", searchKeyword, selectedLocation, filters);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleResetFilters = () => {
    setFilters({
      jobType: [],
      salary: [0, 100],
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
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate jobs to display based on current page
  const startIndex = (currentPage - 1) * pageSize;
  const currentJobs = allJobs.slice(startIndex, startIndex + pageSize);

  return (
    <Layout className="searchpage-layout">
      <Content className="searchpage-content">
        {/* Banner Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className="banner-section">
              <div className="banner-background"></div>
              <div className="banner-container">
                <Title level={1} className="banner-title">
                  Tìm kiếm việc làm <span className="highlight">phù hợp</span>
                </Title>
                <Text className="banner-description">
                  Khám phá hàng nghìn cơ hội việc làm với bộ lọc thông minh
                </Text>

                {/* Search Bar */}
                <div className="search-container">
                  <div className="search-input-group">
                    <Input
                      size="large"
                      placeholder="Nhập vị trí công việc, kỹ năng..."
                      prefix={<SearchOutlined />}
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <div className="location-input-group">
                    <Select
                      size="large"
                      placeholder="Chọn địa điểm"
                      className="location-select"
                      value={selectedLocation}
                      onChange={setSelectedLocation}
                      allowClear
                      suffixIcon={<EnvironmentOutlined />}
                    >
                      <Option value="ho-chi-minh">Hồ Chí Minh</Option>
                      <Option value="ha-noi">Hà Nội</Option>
                      <Option value="da-nang">Đà Nẵng</Option>
                      <Option value="can-tho">Cần Thơ</Option>
                      <Option value="remote">Remote</Option>
                    </Select>
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    className="search-button"
                    onClick={handleSearch}
                  >
                    <SearchOutlined /> Tìm kiếm
                  </Button>
                </div>
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
                      Bộ lọc tìm kiếm
                    </Title>
                    <Text className="section-subtitle">
                      Tinh chỉnh kết quả tìm kiếm theo nhu cầu của bạn
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
                    {/* Job Type Filter */}
                    <Col xs={24} md={12} lg={8}>
                      <div className="filter-group">
                        <Title level={5} className="filter-title">
                          Hình thức làm việc
                        </Title>
                        <Checkbox.Group
                          options={[
                            { label: "Full-time", value: "full-time" },
                            { label: "Part-time", value: "part-time" },
                            { label: "Remote", value: "remote" },
                            { label: "Freelance", value: "freelance" },
                          ]}
                          value={filters.jobType}
                          onChange={(values) =>
                            handleFilterChange("jobType", values)
                          }
                        />
                      </div>
                    </Col>

                    {/* Salary Filter */}
                    <Col xs={24} md={12} lg={8}>
                      <div className="filter-group">
                        <Title level={5} className="filter-title">
                          Mức lương (triệu VNĐ)
                        </Title>
                        <Slider
                          range
                          min={0}
                          max={100}
                          value={filters.salary}
                          onChange={(value) =>
                            handleFilterChange("salary", value)
                          }
                          marks={{
                            0: "0",
                            25: "25",
                            50: "50",
                            75: "75",
                            100: "100+",
                          }}
                        />
                      </div>
                    </Col>

                    {/* Experience Filter */}
                    <Col xs={24} md={12} lg={8}>
                      <div className="filter-group">
                        <Title level={5} className="filter-title">
                          Kinh nghiệm
                        </Title>
                        <Checkbox.Group
                          options={[
                            { label: "Không yêu cầu", value: "none" },
                            { label: "Dưới 1 năm", value: "under-1-year" },
                            { label: "1-3 năm", value: "1-3-years" },
                            { label: "3-5 năm", value: "3-5-years" },
                            { label: "Trên 5 năm", value: "over-5-years" },
                          ]}
                          value={filters.experience}
                          onChange={(values) =>
                            handleFilterChange("experience", values)
                          }
                        />
                      </div>
                    </Col>

                    {/* Education Filter */}
                    <Col xs={24} md={12} lg={8}>
                      <div className="filter-group">
                        <Title level={5} className="filter-title">
                          Học vấn
                        </Title>
                        <Checkbox.Group
                          options={[
                            { label: "Không yêu cầu", value: "none" },
                            { label: "Trung cấp", value: "intermediate" },
                            { label: "Cao đẳng", value: "college" },
                            { label: "Đại học", value: "university" },
                            { label: "Sau đại học", value: "postgraduate" },
                          ]}
                          value={filters.education}
                          onChange={(values) =>
                            handleFilterChange("education", values)
                          }
                        />
                      </div>
                    </Col>

                    {/* Industry Filter */}
                    <Col xs={24} md={12} lg={8}>
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
                    <Col xs={24} md={12} lg={8}>
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

        {/* All Jobs Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className="all-jobs-section">
              <div className="section-container">
                <div className="section-header">
                  <div className="section-title-group">
                    <Title level={2} className="section-title">
                      <FireOutlined className="section-icon" />
                      Tất cả việc làm
                    </Title>
                    <Text className="section-subtitle">
                      {allJobs.length} cơ hội việc làm đang chờ bạn
                    </Text>
                  </div>
                </div>

                <Row gutter={[24, 24]}>
                  {currentJobs.map((job) => (
                    <Col xs={24} sm={12} lg={6} key={job.id}>
                      <Card className="job-card" hoverable>
                        <div className="job-header">
                          <Avatar
                            src={job.logo}
                            size={56}
                            className="company-logo"
                          />
                          <div className="job-actions">
                            <Button
                              type="text"
                              icon={<HeartOutlined />}
                              className={`save-btn ${job.saved ? "saved" : ""}`}
                            />
                            <Button
                              type="text"
                              icon={<ShareAltOutlined />}
                              className="share-btn"
                            />
                          </div>
                        </div>

                        <div className="job-info">
                          <div className="job-title-group">
                            <Title level={4} className="job-title">
                              {job.title}
                            </Title>
                            {job.urgent && (
                              <Badge count="Urgent" className="urgent-badge" />
                            )}
                          </div>
                          <Text className="company-name">{job.company}</Text>

                          <div className="job-details">
                            <div className="detail-item">
                              <EnvironmentOutlined className="detail-icon" />
                              <Text>{job.location}</Text>
                            </div>
                            <div className="detail-item">
                              <DollarOutlined className="detail-icon" />
                              <Text className="salary-text">{job.salary}</Text>
                            </div>
                            <div className="detail-item">
                              <ClockCircleOutlined className="detail-icon" />
                              <Tag className="job-type-tag">{job.type}</Tag>
                            </div>
                          </div>

                          <div className="job-tags">
                            {job.tags.map((tag) => (
                              <Tag key={tag} className="skill-tag">
                                {tag}
                              </Tag>
                            ))}
                          </div>

                          <div className="job-footer">
                            <Text className="posted-time" type="secondary">
                              <ClockCircleOutlined /> {job.posted}
                            </Text>
                            <Button type="primary" className="apply-btn">
                              Ứng tuyển ngay
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <div className="pagination-container">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={allJobs.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    className="jobs-pagination"
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

export default SearchPage;
