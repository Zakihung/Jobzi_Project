import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Tag,
  Avatar,
  Carousel,
  Input,
  Select,
  Space,
  Typography,
  Divider,
  Badge,
  Rate,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  FireOutlined,
  StarOutlined,
  RightOutlined,
  HeartOutlined,
  ShareAltOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import styles from "../../styles/HomePage.module.css";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

const HomePage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Sample data
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechViet Solutions",
      logo: "https://via.placeholder.com/60/577cf6/ffffff?text=TV",
      location: "Hồ Chí Minh",
      salary: "25-35 triệu",
      type: "Full-time",
      tags: ["React", "TypeScript", "Next.js"],
      urgent: true,
      saved: false,
      posted: "2 giờ trước",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      logo: "https://via.placeholder.com/60/36CFC9/ffffff?text=SX",
      location: "Hà Nội",
      salary: "30-45 triệu",
      type: "Full-time",
      tags: ["Product Strategy", "Agile", "Analytics"],
      urgent: false,
      saved: true,
      posted: "4 giờ trước",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Agency",
      logo: "https://via.placeholder.com/60/FF6B6B/ffffff?text=CA",
      location: "Đà Nẵng",
      salary: "15-25 triệu",
      type: "Full-time",
      tags: ["Figma", "Sketch", "Prototyping"],
      urgent: false,
      saved: false,
      posted: "1 ngày trước",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Corp",
      logo: "https://via.placeholder.com/60/4ECDC4/ffffff?text=CT",
      location: "Remote",
      salary: "35-50 triệu",
      type: "Remote",
      tags: ["AWS", "Docker", "Kubernetes"],
      urgent: true,
      saved: false,
      posted: "3 giờ trước",
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "AI Innovations",
      logo: "https://via.placeholder.com/60/95E1D3/ffffff?text=AI",
      location: "Hồ Chí Minh",
      salary: "40-60 triệu",
      type: "Full-time",
      tags: ["Python", "Machine Learning", "TensorFlow"],
      urgent: false,
      saved: true,
      posted: "5 giờ trước",
    },
    {
      id: 6,
      title: "Mobile Developer",
      company: "AppMaster Studio",
      logo: "https://via.placeholder.com/60/FFD93D/ffffff?text=AM",
      location: "Hà Nội",
      salary: "20-30 triệu",
      type: "Full-time",
      tags: ["React Native", "iOS", "Android"],
      urgent: false,
      saved: false,
      posted: "1 ngày trước",
    },
  ];

  const topCompanies = [
    {
      id: 1,
      name: "FPT Software",
      logo: "https://via.placeholder.com/80/577cf6/ffffff?text=FPT",
      rating: 4.2,
      reviews: 1250,
      jobs: 45,
      description:
        "Công ty phần mềm hàng đầu Việt Nam với hơn 25 năm kinh nghiệm",
      employees: "10,000+",
    },
    {
      id: 2,
      name: "Viettel",
      logo: "https://via.placeholder.com/80/36CFC9/ffffff?text=VT",
      rating: 4.0,
      reviews: 890,
      jobs: 32,
      description: "Tập đoàn công nghệ - viễn thông hàng đầu",
      employees: "50,000+",
    },
    {
      id: 3,
      name: "VNG Corporation",
      logo: "https://via.placeholder.com/80/FF6B6B/ffffff?text=VNG",
      rating: 4.5,
      reviews: 567,
      jobs: 28,
      description: "Công ty công nghệ giải trí và game số 1 Việt Nam",
      employees: "3,000+",
    },
    {
      id: 4,
      name: "Tiki Corporation",
      logo: "https://via.placeholder.com/80/4ECDC4/ffffff?text=TK",
      rating: 4.3,
      reviews: 423,
      jobs: 24,
      description: "Nền tảng thương mại điện tử hàng đầu Việt Nam",
      employees: "2,500+",
    },
  ];

  const carouselItems = [
    {
      title: "Tìm việc làm IT tốt nhất",
      subtitle: "Hơn 10,000 cơ hội việc làm đang chờ bạn",
      icon: "💻",
      className: styles.carouselItemIt,
    },
    {
      title: "Khởi nghiệp cùng Startup",
      subtitle: "Gia nhập các công ty startup đầy tiềm năng",
      icon: "🚀",
      className: styles.carouselItemStartup,
    },
    {
      title: "Remote Work - Tương lai của công việc",
      subtitle: "Làm việc từ xa với mức lương hấp dẫn",
      icon: "🏠",
      className: styles.carouselItemRemote,
    },
  ];

  const handleSearch = () => {
    console.log("Search:", searchKeyword, selectedLocation);
  };

  return (
    <Layout className={styles.homepageLayout}>
      <Content className={styles.homepageContent}>
        {/* Hero Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className={styles.heroSection}>
              <div className={styles.heroBackground}></div>
              <div className={styles.heroContainer}>
                <Row gutter={[40, 40]} align="middle">
                  <Col xs={24} lg={14}>
                    <div className={styles.heroContent}>
                      <div className={styles.heroBadge}>
                        <TrophyOutlined /> #1 Nền tảng tuyển dụng Việt Nam
                      </div>
                      <Title level={1} className={styles.heroTitle}>
                        Tìm kiếm cơ hội nghề nghiệp
                        <span className={styles.highlight}> tuyệt vời</span>
                      </Title>
                      <Paragraph className={styles.heroDescription}>
                        Khám phá hàng nghìn việc làm từ các công ty hàng đầu.
                        Bắt đầu hành trình sự nghiệp của bạn ngay hôm nay với
                        mức lương cạnh tranh và môi trường làm việc chuyên
                        nghiệp!
                      </Paragraph>

                      {/* Search Bar */}
                      <div className={styles.heroSearch}>
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
                          <div className={styles.locationoselectGroup}>
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

                      {/* Quick Tags */}
                      <div className={styles.quickTags}>
                        <Text className={styles.tagsLabel}>
                          Từ khóa phổ biến:
                        </Text>
                        <Space wrap>
                          {[
                            "React",
                            "Python",
                            "Java",
                            "Marketing",
                            "Design",
                            "DevOps",
                            "AI/ML",
                            "Remote",
                          ].map((tag) => (
                            <Tag key={tag} className={styles.quickTag}>
                              {tag}
                            </Tag>
                          ))}
                        </Space>
                      </div>

                      {/* Statistics */}
                      <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                          <Title level={4} className={styles.statNumber}>
                            10K+
                          </Title>
                          <Text className={styles.statLabel}>Việc làm</Text>
                        </div>
                        <div className={styles.statItem}>
                          <Title level={4} className={styles.statNumber}>
                            5K+
                          </Title>
                          <Text className={styles.statLabel}>Công ty</Text>
                        </div>
                        <div className={styles.statItem}>
                          <Title level={4} className={styles.statNumber}>
                            100K+
                          </Title>
                          <Text className={styles.statLabel}>Ứng viên</Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} lg={10}>
                    <div className={styles.heroCarousel}>
                      <Carousel autoplay autoplaySpeed={4000} effect="fade">
                        {carouselItems.map((item, index) => (
                          <div key={index}>
                            <div
                              className={`${styles.carouselItem} ${item.className}`}
                            >
                              <div className={styles.carouselContent}>
                                <div className={styles.carouselIcon}>
                                  {item.icon}
                                </div>
                                <Title
                                  level={3}
                                  className={styles.carouselTitle}
                                >
                                  {item.title}
                                </Title>
                                <Text className={styles.carouselSubtitle}>
                                  {item.subtitle}
                                </Text>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </Col>
                </Row>
              </div>
            </section>
          </Col>
          <Col span={2} />
        </Row>
        {/* Featured Jobs Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className={styles.featuredJobsSection}>
              <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitleGroup}>
                    <Title level={2} className={styles.sectionTitle}>
                      <FireOutlined className={styles.sectionIcon} />
                      Việc làm nổi bật
                    </Title>
                    <Text className={styles.sectionSubtitle}>
                      Những cơ hội việc làm tốt nhất được cập nhật hàng ngày
                    </Text>
                  </div>
                  <Button type="primary" ghost className={styles.viewAllBtn}>
                    Xem tất cả <RightOutlined />
                  </Button>
                </div>

                <Row gutter={[24, 24]}>
                  {featuredJobs.map((job) => (
                    <Col xs={24} md={12} xl={8} key={job.id}>
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
                              className={`${styles.saveBtn} ${
                                job.saved ? styles.saved : ""
                              }`}
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
                            <Button type="primary" className={styles.applyBtn}>
                              Ứng tuyển ngay
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </section>
          </Col>
          <Col span={2} />
        </Row>

        {/* Top Companies Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className={styles.topCompaniesSection}>
              <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitleGroup}>
                    <Title level={2} className={styles.sectionTitle}>
                      <StarOutlined className={styles.sectionIcon} />
                      Top công ty hàng đầu
                    </Title>
                    <Text className={styles.sectionSubtitle}>
                      Những công ty uy tín với môi trường làm việc tốt nhất
                    </Text>
                  </div>
                  <Button type="primary" ghost className={styles.viewAllBtn}>
                    Xem tất cả <RightOutlined />
                  </Button>
                </div>

                <Row gutter={[24, 24]}>
                  {topCompanies.map((company) => (
                    <Col xs={24} md={12} lg={6} key={company.id}>
                      <Card className={styles.companyCard} hoverable>
                        <div className={styles.companyHeader}>
                          <Avatar
                            src={company.logo}
                            size={72}
                            className={styles.companyAvatar}
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
                            <Text>{company.employees} nhân viên</Text>
                          </div>
                          <div className={styles.companyStat}>
                            <CheckCircleOutlined className={styles.statIcon} />
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
                  ))}
                </Row>
              </div>
            </section>
          </Col>
          <Col span={2} />
        </Row>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionContainer}>
            <div className={`${styles.sectionHeader} ${styles.centered}`}>
              <Title level={2} className={styles.sectionTitle}>
                Tại sao chọn chúng tôi?
              </Title>
              <Text className={styles.sectionSubtitle}>
                Những lý do khiến Jobzi trở thành lựa chọn hàng đầu
              </Text>
            </div>

            <Row gutter={[32, 32]} justify="center">
              <Col xs={24} md={8}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <SearchOutlined />
                  </div>
                  <Title level={4} className={styles.featureTitle}>
                    Tìm kiếm thông minh
                  </Title>
                  <Text className={styles.featureDescription}>
                    Công nghệ AI giúp tìm kiếm và gợi ý việc làm phù hợp với kỹ
                    năng và kinh nghiệm của bạn
                  </Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <UserOutlined />
                  </div>
                  <Title level={4} className={styles.featureTitle}>
                    Hồ sơ chuyên nghiệp
                  </Title>
                  <Text className={styles.featureDescription}>
                    Tạo hồ sơ ấn tượng với các template được thiết kế bởi chuyên
                    gia HR
                  </Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <CheckCircleOutlined />
                  </div>
                  <Title level={4} className={styles.featureTitle}>
                    Ứng tuyển nhanh chóng
                  </Title>
                  <Text className={styles.featureDescription}>
                    Ứng tuyển chỉ với một cú click và theo dõi trạng thái đơn
                    ứng tuyển real-time
                  </Text>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </Content>
    </Layout>
  );
};

export default HomePage;
