import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Button,
  Tag,
  Card,
  Space,
  Avatar,
  Divider,
  Rate,
} from "antd";
import {
  HeartOutlined,
  HeartFilled,
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/JobPostDetailPage.css";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const JobPostDetailPage = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  // Sample job post data
  const job = {
    id: 1,
    title: "Senior React Developer",
    company: "Công ty ABC",
    logo: "https://via.placeholder.com/80/577cf6/ffffff?text=ABC",
    location: "Hồ Chí Minh",
    salary: "20-30 triệu VNĐ",
    type: "Full-time",
    experience: "3-5 năm",
    posted: "2 ngày trước",
    description:
      "Chúng tôi đang tìm kiếm một lập trình viên React có kinh nghiệm để tham gia đội ngũ phát triển sản phẩm công nghệ cao. Bạn sẽ làm việc với các công nghệ hiện đại và đóng góp vào việc xây dựng các ứng dụng web tiên tiến.",
    requirements: [
      "Tốt nghiệp đại học chuyên ngành CNTT hoặc liên quan.",
      "Có ít nhất 3 năm kinh nghiệm với React, Redux, và các thư viện liên quan.",
      "Hiểu biết về RESTful APIs và GraphQL.",
      "Kỹ năng giao tiếp tốt, làm việc nhóm hiệu quả.",
    ],
    benefits: [
      "Mức lương cạnh tranh, thưởng dự án.",
      "Bảo hiểm sức khỏe toàn diện.",
      "Môi trường làm việc năng động, sáng tạo.",
      "Cơ hội tham gia các khóa đào tạo quốc tế.",
    ],
    detailedLocation: "Tòa nhà ABC, Quận 1, TP. Hồ Chí Minh",
    workingHours: "Thứ Hai - Thứ Sáu, 9:00 - 18:00",
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
  };

  // Sample company data
  const company = {
    name: "Công ty ABC",
    industry: "Công nghệ thông tin",
    size: "100-500 nhân viên",
    location: "Tòa nhà ABC, Quận 1, TP. Hồ Chí Minh",
    rating: 4.2,
    reviews: 150,
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  const handleApply = () => {
    // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
    navigate("/login");
  };

  const handleViewCompany = () => {
    navigate("/companies/abc");
  };

  return (
    <Layout className="job-detail-layout">
      <Content className="job-detail-content">
        <Row gutter={[24, 24]} className="job-detail-row">
          {/* Left Section: Job Details */}
          <Col span={2} />
          <Col span={14}>
            <Card className="job-detail-card">
              <div className="job-header">
                <Title level={2} className="job-title">
                  {job.title}
                </Title>
                <Space className="job-actions">
                  <Button
                    type="text"
                    icon={
                      isSaved ? (
                        <HeartFilled style={{ color: "#ff4d4f" }} />
                      ) : (
                        <HeartOutlined />
                      )
                    }
                    onClick={handleSaveJob}
                    className="save-button"
                  >
                    {isSaved ? "Đã lưu" : "Lưu việc làm"}
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    className="apply-button"
                    onClick={handleApply}
                  >
                    Ứng tuyển ngay
                  </Button>
                </Space>
              </div>

              <Space className="job-tags" wrap>
                <Tag icon={<DollarOutlined />} className="job-tag">
                  {job.salary}
                </Tag>
                <Tag icon={<EnvironmentOutlined />} className="job-tag">
                  {job.location}
                </Tag>
                <Tag icon={<ClockCircleOutlined />} className="job-tag">
                  {job.type}
                </Tag>
                <Tag icon={<UserOutlined />} className="job-tag">
                  {job.experience}
                </Tag>
                <Text className="posted-time">Đăng {job.posted}</Text>
              </Space>

              <Divider />

              <div className="job-section">
                <Title level={4} className="section-title">
                  Mô tả công việc
                </Title>
                <Paragraph className="section-content">
                  {job.description}
                </Paragraph>
              </div>

              <div className="job-section">
                <Title level={4} className="section-title">
                  Yêu cầu ứng viên
                </Title>
                <ul className="section-list">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="job-section">
                <Title level={4} className="section-title">
                  Phúc lợi
                </Title>
                <ul className="section-list">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="job-section">
                <Title level={4} className="section-title">
                  Thông tin thêm
                </Title>
                <Space direction="vertical" className="additional-info">
                  <div className="info-item">
                    <EnvironmentOutlined className="info-icon" />
                    <Text>Địa điểm: {job.detailedLocation}</Text>
                  </div>
                  <div className="info-item">
                    <ClockCircleOutlined className="info-icon" />
                    <Text>Thời gian làm việc: {job.workingHours}</Text>
                  </div>
                </Space>
              </div>

              <div className="job-footer">
                <Space className="skill-tags" wrap>
                  {job.tags.map((tag) => (
                    <Tag key={tag} className="skill-tag">
                      {tag}
                    </Tag>
                  ))}
                </Space>
              </div>
            </Card>
          </Col>

          {/* Right Section: Company Info */}
          <Col span={6}>
            <Card className="company-info-card">
              <div className="company-header">
                <Avatar src={job.logo} size={80} className="company-logo" />
                <Title level={4} className="company-name">
                  {company.name}
                </Title>
                <Rate
                  disabled
                  allowHalf
                  value={company.rating}
                  className="company-rating"
                />
                <Text className="company-reviews">
                  {company.rating} ({company.reviews} đánh giá)
                </Text>
              </div>

              <Divider />

              <Space direction="vertical" className="company-details">
                <div className="detail-item">
                  <StarOutlined className="detail-icon" />
                  <Text>Lĩnh vực: {company.industry}</Text>
                </div>
                <div className="detail-item">
                  <UserOutlined className="detail-icon" />
                  <Text>Quy mô: {company.size}</Text>
                </div>
                <div className="detail-item">
                  <EnvironmentOutlined className="detail-icon" />
                  <Text>Địa điểm: {company.location}</Text>
                </div>
              </Space>

              <Button
                type="primary"
                block
                className="view-company-button"
                onClick={handleViewCompany}
              >
                Xem thêm về công ty
              </Button>
            </Card>
          </Col>
          <Col span={2} />
        </Row>
      </Content>
    </Layout>
  );
};

export default JobPostDetailPage;
