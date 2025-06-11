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
import "../../styles/HomePage.css";

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
      background: "linear-gradient(135deg, #577cf6 0%, #667eea 100%)",
      icon: "💻",
    },
    {
      title: "Khởi nghiệp cùng Startup",
      subtitle: "Gia nhập các công ty startup đầy tiềm năng",
      background: "linear-gradient(135deg, #36CFC9 0%, #4ECDC4 100%)",
      icon: "🚀",
    },
    {
      title: "Remote Work - Tương lai của công việc",
      subtitle: "Làm việc từ xa với mức lương hấp dẫn",
      background: "linear-gradient(135deg, #95E1D3 0%, #36CFC9 100%)",
      icon: "🏠",
    },
  ];

  const handleSearch = () => {
    console.log("Search:", searchKeyword, selectedLocation);
  };

  return (
    <Layout className="homepage-layout">
      <Content className="homepage-content">
        {/* Hero Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className="hero-section">
              <div className="hero-background"></div>
              <div className="hero-container">
                <Row gutter={[40, 40]} align="middle">
                  <Col xs={24} lg={14}>
                    <div className="hero-content">
                      <div className="hero-badge">
                        <TrophyOutlined /> #1 Nền tảng tuyển dụng Việt Nam
                      </div>
                      <Title level={1} className="hero-title">
                        Tìm kiếm cơ hội nghề nghiệp
                        <span className="highlight"> tuyệt vời</span>
                      </Title>
                      <Paragraph className="hero-description">
                        Khám phá hàng nghìn việc làm từ các công ty hàng đầu.
                        Bắt đầu hành trình sự nghiệp của bạn ngay hôm nay với
                        mức lương cạnh tranh và môi trường làm việc chuyên
                        nghiệp!
                      </Paragraph>

                      {/* Search Bar */}
                      <div className="hero-search">
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

                      {/* Quick Tags */}
                      <div className="quick-tags">
                        <Text className="tags-label">Từ khóa phổ biến:</Text>
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
                            <Tag key={tag} className="quick-tag">
                              {tag}
                            </Tag>
                          ))}
                        </Space>
                      </div>

                      {/* Statistics */}
                      <div className="hero-stats">
                        <div className="stat-item">
                          <Title level={4} className="stat-number">
                            10K+
                          </Title>
                          <Text className="stat-label">Việc làm</Text>
                        </div>
                        <div className="stat-item">
                          <Title level={4} className="stat-number">
                            5K+
                          </Title>
                          <Text className="stat-label">Công ty</Text>
                        </div>
                        <div className="stat-item">
                          <Title level={4} className="stat-number">
                            100K+
                          </Title>
                          <Text className="stat-label">Ứng viên</Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} lg={10}>
                    <div className="hero-carousel">
                      <Carousel autoplay autoplaySpeed={4000} effect="fade">
                        {carouselItems.map((item, index) => (
                          <div key={index}>
                            <div
                              className="carousel-item"
                              style={{ background: item.background }}
                            >
                              <div className="carousel-content">
                                <div className="carousel-icon">{item.icon}</div>
                                <Title level={3} className="carousel-title">
                                  {item.title}
                                </Title>
                                <Text className="carousel-subtitle">
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
            <section className="featured-jobs-section">
              <div className="section-container">
                <div className="section-header">
                  <div className="section-title-group">
                    <Title level={2} className="section-title">
                      <FireOutlined className="section-icon" />
                      Việc làm nổi bật
                    </Title>
                    <Text className="section-subtitle">
                      Những cơ hội việc làm tốt nhất được cập nhật hàng ngày
                    </Text>
                  </div>
                  <Button type="primary" ghost className="view-all-btn">
                    Xem tất cả <RightOutlined />
                  </Button>
                </div>

                <Row gutter={[24, 24]}>
                  {featuredJobs.map((job) => (
                    <Col xs={24} md={12} xl={8} key={job.id}>
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
              </div>
            </section>
          </Col>
          <Col span={2} />
        </Row>

        {/* Top Companies Section */}
        <Row>
          <Col span={2} />
          <Col span={20}>
            <section className="top-companies-section">
              <div className="section-container">
                <div className="section-header">
                  <div className="section-title-group">
                    <Title level={2} className="section-title">
                      <StarOutlined className="section-icon" />
                      Top công ty hàng đầu
                    </Title>
                    <Text className="section-subtitle">
                      Những công ty uy tín với môi trường làm việc tốt nhất
                    </Text>
                  </div>
                  <Button type="primary" ghost className="view-all-btn">
                    Xem tất cả <RightOutlined />
                  </Button>
                </div>

                <Row gutter={[24, 24]}>
                  {topCompanies.map((company) => (
                    <Col xs={24} md={12} lg={6} key={company.id}>
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
              </div>
            </section>
          </Col>
          <Col span={2} />
        </Row>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-container">
            <div className="section-header centered">
              <Title level={2} className="section-title">
                Tại sao chọn chúng tôi?
              </Title>
              <Text className="section-subtitle">
                Những lý do khiến Jobzi trở thành lựa chọn hàng đầu
              </Text>
            </div>

            <Row gutter={[32, 32]} justify="center">
              <Col xs={24} md={8}>
                <div className="feature-item">
                  <div className="feature-icon">
                    <SearchOutlined />
                  </div>
                  <Title level={4} className="feature-title">
                    Tìm kiếm thông minh
                  </Title>
                  <Text className="feature-description">
                    Công nghệ AI giúp tìm kiếm và gợi ý việc làm phù hợp với kỹ
                    năng và kinh nghiệm của bạn
                  </Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="feature-item">
                  <div className="feature-icon">
                    <UserOutlined />
                  </div>
                  <Title level={4} className="feature-title">
                    Hồ sơ chuyên nghiệp
                  </Title>
                  <Text className="feature-description">
                    Tạo hồ sơ ấn tượng với các template được thiết kế bởi chuyên
                    gia HR
                  </Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="feature-item">
                  <div className="feature-icon">
                    <CheckCircleOutlined />
                  </div>
                  <Title level={4} className="feature-title">
                    Ứng tuyển nhanh chóng
                  </Title>
                  <Text className="feature-description">
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
