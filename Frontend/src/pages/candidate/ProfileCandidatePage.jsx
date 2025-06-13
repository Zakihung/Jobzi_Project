import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Menu,
  Card,
  Typography,
  Avatar,
  Button,
  List,
  Space,
  Modal,
  Upload,
  message,
  Popover,
} from "antd";
import {
  FileTextOutlined,
  CalendarOutlined,
  HeartOutlined,
  UploadOutlined,
  UserOutlined,
  BookOutlined,
  ClockCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/ProfileCandidatePage.module.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const ProfileCandidatePage = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("applied");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cvFiles, setCvFiles] = useState([
    {
      id: 1,
      name: "CV_JohnDoe_v1.pdf",
      size: "1.2 MB",
      uploadDate: "2025-06-01",
    },
    {
      id: 2,
      name: "CV_JohnDoe_v2.pdf",
      size: "1.5 MB",
      uploadDate: "2025-06-05",
    },
  ]);
  const [candidateStatus, setCandidateStatus] = useState("Sẵn sàng tìm việc");

  // Sample candidate data
  const candidate = {
    name: "Nguyễn Phước Hưng",
    avatar: "https://via.placeholder.com/100",
    age: 23,
    experience: "1 năm",
    education: "Kỹ sư Công nghệ phần mềm",
  };

  // Sample data for menu content
  const appliedJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Công ty ABC",
      date: "2025-06-03",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Công ty XYZ",
      date: "2025-06-01",
    },
  ];

  const interviews = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Công ty ABC",
      date: "2025-06-10",
      time: "10:00 AM",
    },
  ];

  const followedJobs = [
    {
      id: 1,
      title: "Backend Developer",
      company: "Công ty DEF",
      date: "2025-06-02",
    },
  ];

  // Status options
  const statusOptions = [
    "Chưa có nhu cầu",
    "Sẵn sàng tìm việc",
    "Nhận việc trong tháng này",
  ];

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  const handleViewOnlineResume = () => {
    navigate("/online-resume");
  };

  const showUploadModal = () => {
    if (cvFiles.length >= 3) {
      message.warning("Bạn chỉ có thể đăng tải tối đa 3 tệp CV!");
      return;
    }
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      const newFile = {
        id: cvFiles.length + 1,
        name: info.file.name,
        size: `${(info.file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split("T")[0],
      };
      setCvFiles([...cvFiles, newFile]);
      message.success(`${info.file.name} đã được đăng tải thành công!`);
      setIsModalVisible(false);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} đăng tải thất bại.`);
    }
  };

  const handleStatusChange = (status) => {
    setCandidateStatus(status);
    message.success(`Cập nhật trạng thái thành: ${status}`);
    // Gọi API để lưu trạng thái nếu cần
    // Example: axios.patch("/api/candidate/status", { status });
  };

  const statusPopoverContent = (
    <div className={styles.statusOptions}>
      {statusOptions.map((status) => (
        <div
          key={status}
          className={styles.statusOption}
          onClick={() => handleStatusChange(status)}
        >
          {status}
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case "applied":
        return (
          <List
            dataSource={appliedJobs}
            renderItem={(item) => (
              <List.Item className={styles.listItem}>
                <List.Item.Meta
                  avatar={<FileTextOutlined className={styles.listIcon} />}
                  title={<Text strong>{item.title}</Text>}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text>{item.company}</Text>
                      <Text type="secondary">Gửi CV: {item.date}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        );
      case "interviews":
        return (
          <List
            dataSource={interviews}
            renderItem={(item) => (
              <List.Item className={styles.listItem}>
                <List.Item.Meta
                  avatar={<CalendarOutlined className={styles.listIcon} />}
                  title={<Text strong>{item.title}</Text>}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text>{item.company}</Text>
                      <Text type="secondary">
                        Lịch phỏng vấn: {item.date}, {item.time}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        );
      case "followed":
        return (
          <List
            dataSource={followedJobs}
            renderItem={(item) => (
              <List.Item className={styles.listItem}>
                <List.Item.Meta
                  avatar={<HeartOutlined className={styles.listIcon} />}
                  title={<Text strong>{item.title}</Text>}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text>{item.company}</Text>
                      <Text type="secondary">Quan tâm: {item.date}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout className={styles.profileLayout}>
      <Content className={styles.profileContent}>
        <Row gutter={[24, 24]} className={styles.profileRow}>
          {/* Left Section: Menu and Content */}
          <Col span={2} />
          <Col xs={24} lg={13}>
            <Card className={styles.menuCard}>
              <Menu
                mode="horizontal"
                selectedKeys={[selectedMenu]}
                onClick={handleMenuClick}
                className={styles.profileMenu}
              >
                <Menu.Item key="applied" icon={<FileTextOutlined />}>
                  Đã gửi CV
                </Menu.Item>
                <Menu.Item key="interviews" icon={<CalendarOutlined />}>
                  Phỏng vấn
                </Menu.Item>
                <Menu.Item key="followed" icon={<HeartOutlined />}>
                  Quan tâm
                </Menu.Item>
              </Menu>
              <div className={styles.menuContent}>{renderContent()}</div>
            </Card>
          </Col>

          {/* Right Section: Profile and CV Management */}
          <Col span={7}>
            <Card className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <Avatar
                  src={candidate.avatar}
                  size={100}
                  icon={<UserOutlined />}
                />
                <Title level={4} className={styles.profileName}>
                  {candidate.name}
                </Title>
                <Popover
                  content={statusPopoverContent}
                  trigger="click"
                  placement="bottom"
                >
                  <div className={styles.profileStatusWrapper}>
                    <Text className={styles.profileStatus}>
                      {candidateStatus}
                    </Text>
                    <EditOutlined className={styles.editStatusIcon} />
                  </div>
                </Popover>
                <Button
                  type="primary"
                  size="large"
                  className={styles.onlineResumeButton}
                  onClick={handleViewOnlineResume}
                >
                  CV-online
                </Button>
              </div>
              <Space direction="vertical" className={styles.profileInfo}>
                <div className={styles.infoItem}>
                  <UserOutlined className={styles.infoIcon} />
                  <Text>Tuổi: {candidate.age}</Text>
                </div>
                <div className={styles.infoItem}>
                  <ClockCircleOutlined className={styles.infoIcon} />
                  <Text>Kinh nghiệm: {candidate.experience}</Text>
                </div>
                <div className={styles.infoItem}>
                  <BookOutlined className={styles.infoIcon} />
                  <Text>Học vấn: {candidate.education}</Text>
                </div>
              </Space>
            </Card>

            <Card className={styles.cvManagementCard}>
              <Title level={5} className={styles.cvManagementTitle}>
                Quản lý tệp CV ({cvFiles.length}/3)
              </Title>
              <List
                dataSource={cvFiles}
                renderItem={(file) => (
                  <List.Item className={styles.cvItem}>
                    <List.Item.Meta
                      avatar={<FileTextOutlined className={styles.cvIcon} />}
                      title={<Text>{file.name}</Text>}
                      description={
                        <Space direction="vertical" size={4}>
                          <Text type="secondary">Kích thước: {file.size}</Text>
                          <Text type="secondary">
                            Ngày tải lên: {file.uploadDate}
                          </Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
              <Button
                type="primary"
                icon={<UploadOutlined />}
                className={styles.uploadCvButton}
                onClick={showUploadModal}
                block
              >
                Đăng tải tệp CV
              </Button>
            </Card>
          </Col>
          <Col span={2} />
        </Row>

        {/* Upload CV Modal */}
        <Modal
          title="Đăng tải tệp CV"
          visible={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          className={styles.uploadModal}
        >
          <Upload.Dragger
            name="cvFile"
            accept=".pdf"
            maxCount={1}
            action="/api/upload-cv" // Thay bằng API thực tế
            onChange={handleUploadChange}
            className={styles.uploadDragger}
          >
            <p className={styles.uploadIcon}>
              <UploadOutlined />
            </p>
            <p className={styles.uploadText}>Kéo và thả tệp CV tại đây</p>
            <p className={styles.uploadHint}>
              Hoặc nhấn để chọn tệp (chỉ chấp nhận .pdf)
            </p>
          </Upload.Dragger>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ProfileCandidatePage;
