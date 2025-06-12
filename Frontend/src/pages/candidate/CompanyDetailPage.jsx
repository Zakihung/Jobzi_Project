import React, { useState } from "react";
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
  Spin,
} from "antd";
import {
  EnvironmentOutlined,
  UserOutlined,
  StarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/CompanyDetailPage.module.css";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const CompanyDetailPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Giả lập loading state

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

  // Xử lý xem chi tiết công việc
  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <Layout className={styles.companyDetailLayout}>
      <Content className={styles.companyDetailContent}>
        {/* Row 1: Basic Company Info */}
        <Row className={styles.companyInfoRow}>
          <Col span={2} />
          <Col span={20}>
            <Card className={styles.companyInfoCard}>
              <div className={styles.companyHeader}>
                <Avatar
                  src={company.logo}
                  size={120}
                  className={styles.companyLogo}
                />
                <div className={styles.companyInfo}>
                  <Title level={2} className={styles.companyName}>
                    {company.name}
                  </Title>
                  <Space className={styles.companyTags} wrap>
                    <Tag icon={<StarOutlined />} className={styles.companyTag}>
                      {company.industry}
                    </Tag>
                    <Tag icon={<UserOutlined />} className={styles.companyTag}>
                      {company.size}
                    </Tag>
                    <Tag
                      icon={<EnvironmentOutlined />}
                      className={styles.companyTag}
                    >
                      {company.location}
                    </Tag>
                  </Space>
                  <Space className={styles.companyRating}>
                    <Rate
                      disabled
                      allowHalf
                      value={company.rating}
                      className={styles.ratingStars}
                    />
                    <Text className={styles.ratingText}>
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
        <Row gutter={[24, 24]} className={styles.companyContentRow}>
          <Col span={2} />
          <Col span={20}>
            <Tabs
              defaultActiveKey="introduction"
              className={styles.companyTabs}
            >
              <TabPane tab="Giới thiệu công ty" key="introduction">
                <Row gutter={[24, 24]}>
                  {/* Column 1: Introduction and Business Operations */}
                  <Col xs={24} lg={16}>
                    <Card className={styles.contentCard}>
                      <div className={styles.contentSection}>
                        <Title level={4} className={styles.sectionTitle}>
                          Giới thiệu công ty
                        </Title>
                        <Paragraph className={styles.sectionContent}>
                          {company.introduction}
                        </Paragraph>
                      </div>
                      <div className={styles.contentSection}>
                        <Title level={4} className={styles.sectionTitle}>
                          Nghiệp vụ kinh doanh
                        </Title>
                        <ul className={styles.sectionList}>
                          {company.businessOperations.map((op, index) => (
                            <li key={index}>{op}</li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </Col>

                  {/* Column 2: Regulations, Benefits, Recruiters */}
                  <Col xs={24} lg={8}>
                    <Card className={styles.contentCard}>
                      <div className={styles.contentSection}>
                        <Title level={4} className={styles.sectionTitle}>
                          Quy định công ty
                        </Title>
                        <ul className={styles.sectionList}>
                          {company.regulations.map((reg, index) => (
                            <li key={index}>{reg}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.contentSection}>
                        <Title level={4} className={styles.sectionTitle}>
                          Phúc lợi
                        </Title>
                        <ul className={styles.sectionList}>
                          {company.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.contentSection}>
                        <Title level={4} className={styles.sectionTitle}>
                          Nhà tuyển dụng
                        </Title>
                        <List
                          dataSource={company.recruiters}
                          renderItem={(item) => (
                            <List.Item className={styles.recruiterItem}>
                              <Avatar src={item.avatar} size={40} />
                              <div className={styles.recruiterInfo}>
                                <Text strong>{item.name}</Text>
                                <Text className={styles.recruiterPosition}>
                                  {item.position}
                                </Text>
                              </div>
                            </List.Item>
                          )}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Vị trí tuyển dụng" key="jobs">
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <Card className={styles.contentCard}>
                      {loading ? (
                        <div className={styles.loadingContainer}>
                          <Spin size="large" />
                        </div>
                      ) : jobs.length > 0 ? (
                        <List
                          dataSource={jobs}
                          renderItem={(job) => (
                            <List.Item
                              actions={[
                                <Button
                                  type="primary"
                                  className={styles.viewJobButton}
                                  onClick={() => handleViewJob(job.id)}
                                >
                                  Xem chi tiết
                                </Button>,
                              ]}
                              className={styles.jobItem}
                            >
                              <List.Item.Meta
                                avatar={
                                  <Avatar icon={<CheckCircleOutlined />} />
                                }
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
                      ) : (
                        <Text className={styles.noResults}>
                          Không có vị trí tuyển dụng nào
                        </Text>
                      )}
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2} />
        </Row>
      </Content>
    </Layout>
  );
};

export default CompanyDetailPage;
