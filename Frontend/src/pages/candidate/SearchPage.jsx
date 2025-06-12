import React, { useState, useMemo } from "react";
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
  Pagination,
  Avatar,
  Tag,
  Badge,
  Dropdown,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
  HeartOutlined,
  ShareAltOutlined,
  DownOutlined,
} from "@ant-design/icons";
import styles from "../../styles/SearchPage.module.css";
import classNames from "classnames";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const SearchPage = () => {
  // State cho search và filters
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

  // Dữ liệu mẫu cho jobs
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
      })),
    []
  );

  // Logic lọc jobs dựa trên search và filters
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

      const [minSalary] = job.salary.split("-").map((s) => parseInt(s));
      const matchesSalary =
        minSalary >= filters.salary[0] &&
        (filters.salary[1] === 100 || minSalary <= filters.salary[1]);

      return (
        matchesKeyword && matchesLocation && matchesJobType && matchesSalary
      );
    });
  }, [allJobs, searchKeyword, selectedLocation, filters]);

  // Xử lý tìm kiếm
  const handleSearch = () => {
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  };

  // Reset filters
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

  // Xử lý thay đổi filter
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset về trang đầu khi thay đổi filter
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tính toán jobs hiển thị dựa trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + pageSize);

  // Dữ liệu cho filter options
  const filterOptions = {
    jobType: [
      { label: "Full-time", value: "full-time" },
      { label: "Part-time", value: "part-time" },
      { label: "Remote", value: "remote" },
      { label: "Freelance", value: "freelance" },
    ],
    experience: [
      { label: "Không yêu cầu", value: "none" },
      { label: "Dưới 1 năm", value: "under-1-year" },
      { label: "1-3 năm", value: "1-3-years" },
      { label: "3-5 năm", value: "3-5-years" },
      { label: "Trên 5 năm", value: "over-5-years" },
    ],
    education: [
      { label: "Không yêu cầu", value: "none" },
      { label: "Trung cấp", value: "intermediate" },
      { label: "Cao đẳng", value: "college" },
      { label: "Đại học", value: "university" },
      { label: "Sau đại học", value: "postgraduate" },
    ],
    industry: [
      { label: "Công nghệ thông tin", value: "it" },
      { label: "Tài chính", value: "finance" },
      { label: "Marketing", value: "marketing" },
      { label: "Sản xuất", value: "manufacturing" },
      { label: "Y tế", value: "healthcare" },
    ],
    companySize: [
      { label: "Dưới 50 nhân viên", value: "under-50" },
      { label: "50-100 nhân viên", value: "50-100" },
      { label: "100-500 nhân viên", value: "100-500" },
      { label: "Trên 500 nhân viên", value: "over-500" },
    ],
  };

  // Tạo dropdown menu cho mỗi filter
  const createDropdownMenu = (filterKey, title) => {
    const selectedValues = filters[filterKey];
    const options = filterOptions[filterKey];

    const menu = (
      <div className={styles.filterDropdownMenu}>
        <div className={styles.filterDropdownContent}>
          <Checkbox.Group
            options={options}
            value={selectedValues}
            onChange={(values) => handleFilterChange(filterKey, values)}
          />
        </div>
      </div>
    );

    const buttonText =
      selectedValues.length > 0 ? `${title} (${selectedValues.length})` : title;

    return (
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
        <Button
          className={classNames(styles.filterDropdownBtn, {
            [styles.active]: selectedValues.length > 0,
          })}
        >
          {buttonText} <DownOutlined />
        </Button>
      </Dropdown>
    );
  };

  return (
    <Layout className={styles.searchpageLayout}>
      <Content className={styles.searchpageContent}>
        {/* Banner Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className={styles.bannerSection}>
              <div className={styles.bannerBackground} />
              <div className={styles.bannerContainer}>
                <Title level={1} className={styles.bannerTitle}>
                  Tìm kiếm việc làm{" "}
                  <span className={styles.highlight}>phù hợp</span>
                </Title>
                <Text className={styles.bannerDescription}>
                  Khám phá hàng nghìn cơ hội việc làm với bộ lọc thông minh
                </Text>

                {/* Search Bar */}
                <div className={styles.searchContainer}>
                  <div className={styles.searchInputGroup}>
                    <Input
                      size="large"
                      placeholder="Nhập vị trí công việc, kỹ năng..."
                      prefix={<SearchOutlined />}
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className={styles.searchInput}
                    />
                  </div>
                  <div className={styles.locationInputGroup}>
                    <Select
                      size="large"
                      placeholder="Chọn địa điểm"
                      className={styles.locationSelect}
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
                    className={styles.searchButton}
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

        {/* All Jobs Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className={styles.allJobsSection}>
              <div className={styles.sectionContainer}>
                <Row gutter={[16, 16]} align="middle">
                  {/* Job Type Filter */}
                  <Col xs={12} sm={6} md={3}>
                    {createDropdownMenu("jobType", "Hình thức")}
                  </Col>

                  {/* Experience Filter */}
                  <Col xs={12} sm={6} md={3}>
                    {createDropdownMenu("experience", "Kinh nghiệm")}
                  </Col>

                  {/* Education Filter */}
                  <Col xs={12} sm={6} md={3}>
                    {createDropdownMenu("education", "Học vấn")}
                  </Col>

                  {/* Industry Filter */}
                  <Col xs={12} sm={6} md={3}>
                    {createDropdownMenu("industry", "Lĩnh vực")}
                  </Col>

                  {/* Company Size Filter */}
                  <Col xs={12} sm={6} md={3}>
                    {createDropdownMenu("companySize", "Quy mô")}
                  </Col>

                  {/* Salary Filter */}
                  <Col xs={12} sm={12} md={5}>
                    <div className={styles.salaryFilterGroup}>
                      <Text className={styles.salaryFilterLabel} strong>
                        Mức lương (triệu VNĐ)
                      </Text>
                      <div className={styles.salarySliderContainer}>
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
                          className={styles.salarySlider}
                        />
                      </div>
                    </div>
                  </Col>

                  {/* Reset Button */}
                  <Col xs={12} sm={12} md={4}>
                    <Button
                      type="primary"
                      ghost
                      className={styles.resetFilterBtn}
                      onClick={handleResetFilters}
                    >
                      <ReloadOutlined /> Reset
                    </Button>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  {currentJobs.length > 0 ? (
                    currentJobs.map((job) => (
                      <Col xs={24} sm={12} md={6} key={job.id}>
                        <Card className={styles.jobCard} hoverable>
                          <div className={styles.jobHeader}>
                            <Avatar
                              src={job.logo}
                              size={56}
                              className={styles.companyLogo}
                            />
                            <div className={styles.jobActions}>
                              <Button
                                type="text"
                                icon={<HeartOutlined />}
                                className={classNames(styles.saveBtn, {
                                  [styles.saved]: job.saved,
                                })}
                              />
                              <Button
                                type="text"
                                icon={<ShareAltOutlined />}
                                className={styles.shareBtn}
                              />
                            </div>
                          </div>
                          <div className={styles.jobInfo}>
                            <div className={styles.jobTitleGroup}>
                              <Title level={4} className={styles.jobTitle}>
                                {job.title}
                              </Title>
                              {job.urgent && (
                                <Badge
                                  count="Urgent"
                                  className={styles.urgentBadge}
                                />
                              )}
                            </div>
                            <Text className={styles.companyName}>
                              {job.company}
                            </Text>
                            <div className={styles.jobDetails}>
                              <div className={styles.detailItem}>
                                <EnvironmentOutlined
                                  className={styles.detailIcon}
                                />
                                <Text>{job.location}</Text>
                              </div>
                              <div className={styles.detailItem}>
                                <DollarOutlined className={styles.detailIcon} />
                                <Text className={styles.salaryText}>
                                  {job.salary}
                                </Text>
                              </div>
                              <div className={styles.detailItem}>
                                <ClockCircleOutlined
                                  className={styles.detailIcon}
                                />
                                <Tag className={styles.jobTypeTag}>
                                  {job.type}
                                </Tag>
                              </div>
                            </div>
                            <div className={styles.jobTags}>
                              {job.tags.map((tag) => (
                                <Tag key={tag} className={styles.skillTag}>
                                  {tag}
                                </Tag>
                              ))}
                            </div>
                            <div className={styles.jobFooter}>
                              <Text
                                className={styles.postedTime}
                                type="secondary"
                              >
                                <ClockCircleOutlined /> {job.posted}
                              </Text>
                              <Button
                                type="primary"
                                className={styles.applyBtn}
                              >
                                Ứng tuyển ngay
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Col span={24}>
                      <Text className={styles.noResults}>
                        Không tìm thấy công việc phù hợp
                      </Text>
                    </Col>
                  )}
                </Row>

                <div className={styles.paginationContainer}>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredJobs.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    className={styles.jobsPagination}
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
