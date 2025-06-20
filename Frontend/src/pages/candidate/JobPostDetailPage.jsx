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
  Spin,
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
import SigninRequiredModal from "../../components/organisms/SigninRequiredModal";
import { useAuth } from "../../contexts/auth.context";
import styles from "../../styles/JobPostDetailPage.module.css";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const JobPostDetailPage = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false); // Giả lập loading state
  const [modalVisible, setModalVisible] = useState(false);

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

  // Xử lý lưu công việc
  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  // Xử lý ứng tuyển
  const handleApply = () => {
    if (isLoggedIn) {
      navigate("/apply");
    } else {
      setModalVisible(true);
    }
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  // Xử lý xem công ty
  const handleViewCompany = () => {
    navigate("/companies/abc");
  };

  if (loading) {
    return (
      <Layout className={styles.jobDetailLayout}>
        <Content className={styles.jobDetailContent}>
          <div className={styles.loadingContainer}>
            <Spin size="large" />
          </div>
        </Content>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout className={styles.jobDetailLayout}>
        <Content className={styles.jobDetailContent}>
          <Text className={styles.noResults}>
            Không tìm thấy thông tin công việc
          </Text>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className={styles.jobDetailLayout}>
      <Content className={styles.jobDetailContent}>
        <Row gutter={[24, 24]} className={styles.jobDetailRow}>
          <Col span={2} />
          {/* Left Section: Job Details */}
          <Col span={14}>
            <Card className={styles.jobDetailCard}>
              <div className={styles.jobHeader}>
                <Title level={2} className={styles.jobTitle}>
                  {job.title}
                </Title>
                <Space className={styles.jobActions}>
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
                    className={styles.saveButton}
                  >
                    {isSaved ? "Đã lưu" : "Lưu việc làm"}
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    className={styles.applyButton}
                    onClick={handleApply}
                  >
                    Ứng tuyển ngay
                  </Button>
                </Space>
              </div>

              <Space className={styles.jobTags} wrap>
                <Tag icon={<DollarOutlined />} className={styles.jobTag}>
                  {job.salary}
                </Tag>
                <Tag icon={<EnvironmentOutlined />} className={styles.jobTag}>
                  {job.location}
                </Tag>
                <Tag icon={<ClockCircleOutlined />} className={styles.jobTag}>
                  {job.type}
                </Tag>
                <Tag icon={<UserOutlined />} className={styles.jobTag}>
                  {job.experience}
                </Tag>
                <Text className={styles.postedTime}>Đăng {job.posted}</Text>
              </Space>

              <Divider />

              <div className={styles.jobSection}>
                <Title level={4} className={styles.sectionTitle}>
                  Mô tả công việc
                </Title>
                <Paragraph className={styles.sectionContent}>
                  {job.description}
                </Paragraph>
              </div>

              <div className={styles.jobSection}>
                <Title level={4} className={styles.sectionTitle}>
                  Yêu cầu ứng viên
                </Title>
                <ul className={styles.sectionList}>
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.jobSection}>
                <Title level={4} className={styles.sectionTitle}>
                  Phúc lợi
                </Title>
                <ul className={styles.sectionList}>
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.jobSection}>
                <Title level={4} className={styles.sectionTitle}>
                  Thông tin thêm
                </Title>
                <Space direction="vertical" className={styles.additionalInfo}>
                  <div className={styles.infoItem}>
                    <EnvironmentOutlined className={styles.infoIcon} />
                    <Text>Địa điểm: {job.detailedLocation}</Text>
                  </div>
                  <div className={styles.infoItem}>
                    <ClockCircleOutlined className={styles.infoIcon} />
                    <Text>Thời gian làm việc: {job.workingHours}</Text>
                  </div>
                </Space>
              </div>

              <div className={styles.jobFooter}>
                <Space className={styles.skillTags} wrap>
                  {job.tags.map((tag) => (
                    <Tag key={tag} className={styles.skillTag}>
                      {tag}
                    </Tag>
                  ))}
                </Space>
              </div>
            </Card>
          </Col>

          {/* Right Section: Company Info */}
          <Col span={6}>
            <Card className={styles.companyInfoCard}>
              <div className={styles.companyHeader}>
                <Avatar
                  src={job.logo}
                  size={80}
                  className={styles.companyLogo}
                />
                <Title level={4} className={styles.companyName}>
                  {company.name}
                </Title>
                <Rate
                  disabled
                  allowHalf
                  value={company.rating}
                  className={styles.companyRating}
                />
                <Text className={styles.companyReviews}>
                  {company.rating} ({company.reviews} đánh giá)
                </Text>
              </div>

              <Divider />

              <Space direction="vertical" className={styles.companyDetails}>
                <div className={styles.detailItem}>
                  <StarOutlined className={styles.detailIcon} />
                  <Text>Lĩnh vực: {company.industry}</Text>
                </div>
                <div className={styles.detailItem}>
                  <UserOutlined className={styles.detailIcon} />
                  <Text>Quy mô: {company.size}</Text>
                </div>
                <div className={styles.detailItem}>
                  <EnvironmentOutlined className={styles.detailIcon} />
                  <Text>Địa điểm: {company.location}</Text>
                </div>
              </Space>

              <Button
                type="primary"
                block
                className={styles.viewCompanyButton}
                onClick={handleViewCompany}
              >
                Xem thêm về công ty
              </Button>
            </Card>
          </Col>
          <Col span={2} />
        </Row>
        <SigninRequiredModal
          visible={modalVisible}
          onCancel={handleModalCancel}
        />
      </Content>
    </Layout>
  );
};

export default JobPostDetailPage;
