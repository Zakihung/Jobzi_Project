import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Menu,
  Card,
  Typography,
  Tag,
  Progress,
  Space,
  Divider,
  Badge,
  Descriptions,
  List,
  Avatar,
  Button,
} from "antd";
import {
  UserOutlined,
  TrophyOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  BulbOutlined,
  StarOutlined,
  BookOutlined,
  ToolOutlined,
  SolutionOutlined,
  HeartOutlined,
  CompassOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import styles from "../../styles/ResumeAnalysisPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import useGetLatestResumeAnalysis from "../../features/analysis/hooks/useGetLatestResumeAnalysis";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const ResumeAnalysisPage = () => {
  const navigate = useNavigate();
  const { job_post_id, resume_file_id, online_resume_id } = useParams(); // Lấy tham số từ URL (nếu có)
  const [selectedMenu, setSelectedMenu] = useState("overview");

  const {
    data: analysisData,
    isLoading,
    isError,
    error,
  } = useGetLatestResumeAnalysis(job_post_id, resume_file_id, online_resume_id);

  if (isLoading) {
    return (
      <Layout className={styles.analysisLayout}>
        <Content className={styles.analysisContent}>
          <Row justify="center">
            <Col span={21}>
              <Card>Đang tải dữ liệu phân tích...</Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout className={styles.analysisLayout}>
        <Content className={styles.analysisContent}>
          <Row justify="center">
            <Col span={21}>
              <Card>
                <Text type="danger">Lỗi khi tải dữ liệu: {error.message}</Text>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }

  if (!analysisData) {
    return (
      <Layout className={styles.analysisLayout}>
        <Content className={styles.analysisContent}>
          <Row justify="center">
            <Col span={21}>
              <Card>
                <Text>Không tìm thấy dữ liệu phân tích CV.</Text>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#faad14";
    if (score >= 40) return "#fa8c16";
    return "#f5222d";
  };

  const getScoreStatus = (score) => {
    if (score >= 80) return "Xuất sắc";
    if (score >= 60) return "Tốt";
    if (score >= 40) return "Trung bình";
    return "Hơi thấp cần cải thiện";
  };

  const renderOverview = () => (
    <div className={styles.contentSection}>
      <Title level={4} className={styles.sectionTitle}>
        Tổng quan
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card className={styles.analysisStrengthCard}>
            <Title level={5} className={styles.cardTitle}>
              <CheckCircleOutlined className={styles.successIcon} />
              Điểm mạnh
            </Title>
            <List
              dataSource={analysisData.analysis.strengths}
              renderItem={(item) => (
                <List.Item className={styles.listItem}>
                  <div>
                    <Tag color="green" className={styles.relatedTag}>
                      {item.related_to}
                    </Tag>
                    <br />
                    <Text strong>{item.description}</Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className={styles.analysisWeaknessCard}>
            <Title level={5} className={styles.cardTitle}>
              <WarningOutlined className={styles.warningIcon} />
              Điểm yếu
            </Title>
            <List
              dataSource={analysisData.analysis.weaknesses}
              renderItem={(item) => (
                <List.Item className={styles.listItem}>
                  <div>
                    <Tag color="orange" className={styles.relatedTag}>
                      {item.related_to}
                    </Tag>
                    <br />
                    <Text strong>{item.description}</Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderExtractInfo = () => (
    <div className={styles.contentSection}>
      <Title level={4} className={styles.sectionTitle}>
        Thông tin trích xuất
      </Title>

      {/* Thông tin cá nhân */}
      <Title level={5} className={styles.cardTitle}>
        <UserOutlined /> Thông tin cá nhân
      </Title>
      <Card className={styles.infoCard} style={{ marginBottom: 24 }}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Họ và tên">
            {analysisData.classification.personal_info.name}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {analysisData.classification.personal_info.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {analysisData.classification.personal_info.dob}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {analysisData.classification.personal_info.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ" span={2}>
            {analysisData.classification.personal_info.address}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Mục tiêu nghề nghiệp */}
      <Card className={styles.infoCard} style={{ marginBottom: 24 }}>
        <Title level={5} className={styles.cardTitle}>
          <CompassOutlined />
          Mục tiêu nghề nghiệp
        </Title>
        <Paragraph>{analysisData.classification.career_objective}</Paragraph>
      </Card>

      {/* Học vấn */}
      <Title level={5} className={styles.cardTitle}>
        <BookOutlined /> Học vấn
      </Title>
      <Card className={styles.infoCard} style={{ marginBottom: 24 }}>
        <List
          dataSource={analysisData.classification.education}
          renderItem={(item) => (
            <Card className={styles.educationCard}>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={<BookOutlined />}
                      className={styles.eduAvatar}
                    />
                  }
                  title={<Text strong>{item.institution}</Text>}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text>Bằng cấp: {item.degree}</Text>
                      <Text>Chuyên ngành: {item.major}</Text>
                      <Text>Thời gian: {item.duration}</Text>
                    </Space>
                  }
                />
              </List.Item>
            </Card>
          )}
        />
      </Card>

      {/* Kinh nghiệm làm việc */}
      <Title level={5} className={styles.cardTitle}>
        <SolutionOutlined /> Kinh nghiệm làm việc
      </Title>
      <div style={{ marginBottom: 24 }}>
        <Text strong>Tổng kinh nghiệm: </Text>
        <Badge
          count={`${analysisData.classification.total_experience} năm`}
          style={{
            backgroundColor: "#577cf6",
            fontSize: 13,
            alignItems: "center",
          }}
        />
      </div>
      <Card className={styles.infoCard} style={{ marginBottom: 24 }}>
        <List
          dataSource={analysisData.classification.work_experience}
          renderItem={(item) => (
            <Card className={styles.workCard}>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={<SolutionOutlined />}
                      className={styles.workAvatar}
                    />
                  }
                  title={<Text strong>{item.position}</Text>}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text>Công ty: {item.company}</Text>
                      <Text>Thời gian: {item.duration}</Text>
                      <Text>Mô tả: {item.responsibilities}</Text>
                    </Space>
                  }
                />
              </List.Item>
            </Card>
          )}
        />
      </Card>

      {/* Kỹ năng */}
      <Title level={5} className={styles.cardTitle}>
        <ToolOutlined /> Kỹ năng
      </Title>
      <Card className={styles.infoCard} style={{ marginBottom: 24 }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card className={styles.skillsCard}>
              <Space wrap>
                {analysisData.classification.skills.map((skill) => (
                  <Tag key={skill._id} color="blue" className={styles.skillTag}>
                    {skill.name} - {skill.proficiency}
                  </Tag>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Sở thích */}
      <Title level={5} className={styles.cardTitle}>
        <HeartOutlined /> Sở thích
      </Title>
      <Card className={styles.infoCard} style={{ marginBottom: 24 }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card className={styles.hobbiesCard}>
              <List
                dataSource={analysisData.classification.hobbies}
                renderItem={(hobby) => (
                  <List.Item>
                    <Text>{hobby}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );

  const renderJobMatch = () => (
    <div className={styles.contentSection}>
      <Title level={4} className={styles.sectionTitle}>
        Độ phù hợp với công việc
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={24}>
          <Card className={styles.scoreCard}>
            <div className={styles.scoreHeader}>
              <TrophyOutlined className={styles.scoreIcon} />
              <div>
                <Title level={5} className={styles.scoreTitle}>
                  Mức độ phù hợp
                </Title>
                <Text className={styles.scoreStatus}>
                  {getScoreStatus(analysisData.analysis.match_score)}
                </Text>
              </div>
            </div>
            <Progress
              percent={analysisData.analysis.match_score}
              strokeColor={getScoreColor(analysisData.analysis.match_score)}
              strokeWidth={12}
              format={(percent) => (
                <span className={styles.scoreText}>{percent}%</span>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <Card className={styles.matchCard}>
            <Title level={5} className={styles.cardTitle}>
              <CheckCircleOutlined className={styles.successIcon} />
              Phù hợp
            </Title>
            <List
              dataSource={analysisData.analysis.job_match}
              renderItem={(item) => (
                <List.Item className={styles.matchItem}>
                  <Space direction="vertical" size={4}>
                    <Text strong>{item.criteria}</Text>
                    <Text type="secondary">{item.description}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className={styles.mismatchCard}>
            <Title level={5} className={styles.cardTitle}>
              <CloseCircleOutlined className={styles.errorIcon} />
              Không phù hợp
            </Title>
            <List
              dataSource={analysisData.analysis.job_mismatch.slice(0, 5)}
              renderItem={(item) => (
                <List.Item className={styles.mismatchItem}>
                  <Space direction="vertical" size={4}>
                    <Text strong>{item.criteria}</Text>
                    <Text type="secondary">{item.description}</Text>
                  </Space>
                </List.Item>
              )}
            />
            {analysisData.analysis.job_mismatch.length > 5 && (
              <Text type="secondary" className={styles.moreText}>
                Và {analysisData.analysis.job_mismatch.length - 5} mục khác...
              </Text>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderSuggestions = () => (
    <div className={styles.contentSection}>
      <Title level={4} className={styles.sectionTitle}>
        Gợi ý cải thiện
      </Title>

      <Card className={styles.suggestionsCard}>
        <List
          dataSource={analysisData.analysis.suggestions}
          renderItem={(item) => (
            <List.Item className={styles.suggestionItem}>
              <List.Item.Meta
                avatar={<BulbOutlined className={styles.suggestionIcon} />}
                title={<Text strong>Phần {item.section}</Text>}
                description={item.suggestion}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case "overview":
        return renderOverview();
      case "extract":
        return renderExtractInfo();
      case "match":
        return renderJobMatch();
      case "suggestions":
        return renderSuggestions();
      default:
        return renderOverview();
    }
  };

  return (
    <Layout className={styles.analysisLayout}>
      <Content className={styles.analysisContent}>
        <Row justify="center">
          <Col
            span={21}
            style={{ backgroundColor: "#f8f9fa", borderRadius: 24 }}
          >
            <Row
              gutter={[24, 24]}
              className={styles.analysisRow}
              justify="center"
            >
              {/* Left Section: Menu */}
              <Col xs={24} md={8} lg={6}>
                <div className={styles.menu}>
                  <Button
                    type="link"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                    className={styles.backButton}
                  >
                    Về trang chi tiết việc làm
                  </Button>
                  <Card className={styles.menuCard}>
                    <div className={styles.menuHeader}>Kết quả phân tích</div>
                    <Menu
                      mode="vertical"
                      selectedKeys={[selectedMenu]}
                      onClick={handleMenuClick}
                      className={styles.analysisMenu}
                    >
                      <Menu.Item key="overview" icon={<TrophyOutlined />}>
                        Tổng quan
                      </Menu.Item>
                      <Menu.Item key="extract" icon={<UserOutlined />}>
                        Thông tin trích xuất
                      </Menu.Item>
                      <Menu.Item key="match" icon={<StarOutlined />}>
                        Độ phù hợp với công việc
                      </Menu.Item>
                      <Menu.Item key="suggestions" icon={<BulbOutlined />}>
                        Gợi ý cải thiện
                      </Menu.Item>
                    </Menu>
                  </Card>
                </div>
              </Col>

              {/* Right Section: Content */}
              <Col xs={24} md={16} lg={18}>
                <Card className={styles.contentCard}>{renderContent()}</Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ResumeAnalysisPage;
