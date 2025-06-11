import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Card,
  Tag,
  Avatar,
  Tabs,
  List,
  Space,
  Button,
  Rate,
} from "antd";
import {
  EnvironmentOutlined,
  UserOutlined,
  StarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/CompanyDetailPage.css";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const CompanyDetailPage = () => {
  const navigate = useNavigate();

  // Sample company data
  const company = {
    id: 1,
    name: "Công ty ABC",
    logo: "https://via.placeholder.com/120/577cf6/ffffff?text=ABC",
    industry: "Công nghệ thông tin",
    size: "100-500 nhân viên",
    location: "Tòa nhà ABC, Quận 1, TP. Hồ Chí Minh",
    rating: 4.2,
    reviews: 150,
    introduction:
      "Công ty ABC là một công ty công nghệ hàng đầu, chuyên cung cấp các giải pháp phần mềm sáng tạo. Với hơn 10 năm kinh nghiệm, chúng tôi tự hào mang đến các sản phẩm và dịch vụ chất lượng cao cho khách hàng toàn cầu.",
    businessOperations: [
      "Phát triển phần mềm tùy chỉnh.",
      "Giải pháp trí tuệ nhân tạo và học máy.",
      "Dịch vụ tư vấn công nghệ thông tin.",
      "Quản lý hệ thống đám mây.",
    ],
    regulations: [
      "Tuân thủ quy định làm việc từ 9:00 - 18:00, Thứ Hai - Thứ Sáu.",
      "Khuyến khích môi trường làm việc minh bạch và hợp tác.",
      "Đánh giá hiệu suất định kỳ hàng quý.",
    ],
    benefits: [
      "Bảo hiểm sức khỏe toàn diện.",
      "Thưởng hiệu suất và các dịp lễ, Tết.",
      "Cơ hội đào tạo và phát triển nghề nghiệp.",
      "Môi trường làm việc năng động, sáng tạo.",
    ],
    recruiters: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        position: "HR Manager",
        avatar: "https://via.placeholder.com/40",
      },
      {
        id: 2,
        name: "Trần Thị B",
        position: "Recruitment Specialist",
        avatar: "https://via.placeholder.com/40",
      },
    ],
  };

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      location: "Hồ Chí Minh",
      salary: "20-30 triệu VNĐ",
      type: "Full-time",
      posted: "2 ngày trước",
    },
    {
      id: 2,
      title: "Backend Developer (Node.js)",
      location: "Hồ Chí Minh",
      salary: "18-25 triệu VNĐ",
      type: "Full-time",
      posted: "3 ngày trước",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Remote",
      salary: "15-20 triệu VNĐ",
      type: "Part-time",
      posted: "5 ngày trước",
    },
  ];

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <Layout className="company-detail-layout">
      <Content className="company-detail-content">
        {/* Row 1: Basic Company Info */}
        <Row className="company-info-row">
          <Col span={2} />
          <Col span={20}>
            <Card className="company-info-card">
              <div className="company-header">
                <Avatar
                  src={company.logo}
                  size={120}
                  className="company-logo"
                />
                <div className="company-info">
                  <Title level={2} className="company-name">
                    {company.name}
                  </Title>
                  <Space className="company-tags" wrap>
                    <Tag icon={<StarOutlined />} className="company-tag">
                      {company.industry}
                    </Tag>
                    <Tag icon={<UserOutlined />} className="company-tag">
                      {company.size}
                    </Tag>
                    <Tag icon={<EnvironmentOutlined />} className="company-tag">
                      {company.location}
                    </Tag>
                  </Space>
                  <Space className="company-rating">
                    <Rate
                      disabled
                      allowHalf
                      value={company.rating}
                      className="rating-stars"
                    />
                    <Text className="rating-text">
                      {company.rating} ({company.reviews} đánh giá)
                    </Text>
                  </Space>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={2} />
        </Row>

        {/* Row 2: Tabs and Content */}
        <Row gutter={[24, 24]} className="company-content-row">
          <Col span={2} />
          <Col span={20}>
            <Tabs defaultActiveKey="introduction" className="company-tabs">
              <TabPane tab="Giới thiệu công ty" key="introduction">
                <Row gutter={[24, 24]}>
                  {/* Column 1: Introduction and Business Operations */}
                  <Col xs={24} lg={16}>
                    <Card className="content-card">
                      <div className="content-section">
                        <Title level={4} className="section-title">
                          Giới thiệu công ty
                        </Title>
                        <Paragraph className="section-content">
                          {company.introduction}
                        </Paragraph>
                      </div>
                      <div className="content-section">
                        <Title level={4} className="section-title">
                          Nghiệp vụ kinh doanh
                        </Title>
                        <ul className="section-list">
                          {company.businessOperations.map((op, index) => (
                            <li key={index}>{op}</li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </Col>

                  {/* Column 2: Regulations, Benefits, Recruiters */}
                  <Col xs={24} lg={8}>
                    <Card className="content-card">
                      <div className="content-section">
                        <Title level={4} className="section-title">
                          Quy định công ty
                        </Title>
                        <ul className="section-list">
                          {company.regulations.map((reg, index) => (
                            <li key={index}>{reg}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="content-section">
                        <Title level={4} className="section-title">
                          Phúc lợi
                        </Title>
                        <ul className="section-list">
                          {company.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="content-section">
                        <Title level={4} className="section-title">
                          Nhà tuyển dụng
                        </Title>
                        <List
                          dataSource={company.recruiters}
                          renderItem={(item) => (
                            <List.Item className="recruiter-item">
                              <Avatar src={item.avatar} size={40} />
                              <div className="recruiter-info">
                                <Text strong>{item.name}</Text>
                                <Text className="recruiter-position">
                                  {item.position}
                                </Text>
                              </div>
                            </List.Item>
                          )}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col span={2} />
                </Row>
              </TabPane>
              <TabPane tab="Vị trí tuyển dụng" key="jobs">
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <Card className="content-card">
                      <List
                        dataSource={jobs}
                        renderItem={(job) => (
                          <List.Item
                            actions={[
                              <Button
                                type="primary"
                                className="view-job-button"
                                onClick={() => handleViewJob(job.id)}
                              >
                                Xem chi tiết
                              </Button>,
                            ]}
                            className="job-item"
                          >
                            <List.Item.Meta
                              avatar={<Avatar icon={<CheckCircleOutlined />} />}
                              title={<Text strong>{job.title}</Text>}
                              description={
                                <Space direction="vertical" size={4}>
                                  <Text>{job.location}</Text>
                                  <Text>{job.salary}</Text>
                                  <Text>{job.type}</Text>
                                  <Text type="secondary">
                                    Đăng {job.posted}
                                  </Text>
                                </Space>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CompanyDetailPage;
