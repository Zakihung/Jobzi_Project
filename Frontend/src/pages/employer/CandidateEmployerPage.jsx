import {
  Layout,
  Row,
  Col,
  Card,
  Table,
  Button,
  Switch,
  Typography,
  Tag,
  Space,
  Popconfirm,
  message,
  Avatar,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined,
  FilePdfOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import styles from "../../styles/CandidateEmployerPage.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import useGetEmployerByUserId from "../../features/employer/hooks/useGetEmployerByUserId";
import useGetJobPostsByEmployerId from "../../features/postjob/hooks/Job_Post/useGetJobPostsByEmployerId";

const { Content } = Layout;
const { Title, Text } = Typography;

const CandidateEmployerPage = () => {
  const { auth } = useContext(AuthContext);
  const { data: employer } = useGetEmployerByUserId(auth?.user?.id);
  const employerId = employer?.data?._id;

  const { data: jobsData, isLoading: isJobsLoading } =
    useGetJobPostsByEmployerId(employerId);

  if (isJobsLoading) return <div>Đang tải...</div>;

  const jobs =
    jobsData?.map((job) => ({
      id: job?._id,
      title: job?.title,
    })) || [];

  const handleStatusChange = (applicationId, checked) => {
    // Cập nhật trạng thái ứng viên (cần thêm API để cập nhật trạng thái)
    message.success(checked ? "Đã duyệt ứng viên" : "Đã hủy duyệt ứng viên");
  };

  const handleViewProfile = (profileUrl, type) => {
    if (type === "pdf") {
      window.open(profileUrl, "_blank");
      message.info("Đang mở file PDF hồ sơ...");
    } else {
      window.open(profileUrl, "_blank");
      message.info("Đang mở hồ sơ trực tuyến...");
    }
  };

  const getApplicationStatus = (status) => {
    switch (status) {
      case "approved":
        return { text: "Đã duyệt", color: "green" };
      case "rejected":
        return { text: "Đã từ chối", color: "red" };
      default:
        return { text: "Đang xem xét", color: "blue" };
    }
  };

  const columns = [
    {
      title: "Ứng viên",
      dataIndex: "candidate",
      key: "candidate",
      width: "30%",
      render: (_, record) => (
        <div className={styles.candidateInfo}>
          <Avatar
            src={record.avatar}
            icon={!record.avatar && <UserOutlined />}
            size={40}
            className={styles.avatar}
          />
          <div>
            <Title level={5} className={styles.candidateName}>
              {record.name}
            </Title>
            <div className={styles.contactInfo}>
              <MailOutlined className={styles.contactIcon} />
              <Text type="secondary">{record.email}</Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Thông tin ứng tuyển",
      dataIndex: "application",
      key: "application",
      width: "30%",
      render: (_, record) => (
        <div className={styles.applicationInfo}>
          <div className={styles.applicationItem}>
            <ClockCircleOutlined className={styles.dateIcon} />
            <Text type="secondary">
              Ngày ứng tuyển: {record.applicationDate}
            </Text>
          </div>
          <div className={styles.applicationItem}>
            <ProfileOutlined className={styles.dateIcon} />
            <Text type="secondary">Hồ sơ: {record.profileName}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (_, record) => {
        const statusInfo = getApplicationStatus(record.status);
        return (
          <div className={styles.statusControl}>
            <Switch
              checked={record.status === "approved"}
              onChange={(checked) => handleStatusChange(record.id, checked)}
              checkedChildren="Đã duyệt"
              unCheckedChildren="Chưa duyệt"
              className={styles.statusSwitch}
            />
            <Tag color={statusInfo.color} className={styles.statusTag}>
              {statusInfo.text}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Hồ sơ",
      dataIndex: "profile",
      key: "profile",
      width: "20%",
      render: (_, record) => (
        <Button
          type="primary"
          icon={
            record.profileType === "pdf" ? (
              <FilePdfOutlined />
            ) : (
              <ProfileOutlined />
            )
          }
          size="small"
          onClick={() =>
            handleViewProfile(record.profileUrl, record.profileType)
          }
          className={styles.viewProfileButton}
        >
          Xem hồ sơ
        </Button>
      ),
    },
  ];

  // Dữ liệu mẫu ứng viên (thay thế bằng dữ liệu từ API thật)
  const mockApplications = [
    {
      id: "app1",
      name: "Nguyễn Văn A",
      avatar: "https://example.com/avatar1.jpg",
      email: "nguyenvana@example.com",
      applicationDate: new Date().toLocaleDateString("vi-VN"),
      profileName: "Hồ sơ ứng tuyển 1",
      status: "pending",
      profileType: "pdf",
      profileUrl: "https://example.com/profile1.pdf",
    },
    {
      id: "app2",
      name: "Trần Thị B",
      avatar: "https://example.com/avatar2.jpg",
      email: "tranthib@example.com",
      applicationDate: new Date().toLocaleDateString("vi-VN"),
      profileName: "Hồ sơ trực tuyến 2",
      status: "approved",
      profileType: "online",
      profileUrl: "https://example.com/profile2",
    },
  ];

  return (
    <Row
      gutter={[24, 24]}
      style={{
        background: "#fff",
        borderRadius: "24px",
      }}
      justify={"center"}
    >
      <Col span={21}>
        {jobs.map((job) => (
          <Card key={job.id} className={styles.jobCard}>
            <div className={styles.cardHeader}>
              <Title level={2} className={styles.jobTitle}>
                {job.title}
              </Title>
              <Text type="secondary" className={styles.candidateCount}>
                Tổng cộng: {mockApplications.length} ứng viên
              </Text>
            </div>
            <Table
              columns={columns}
              dataSource={mockApplications}
              rowKey="id"
              className={styles.candidateTable}
              scroll={{ x: 800 }}
            />
          </Card>
        ))}
      </Col>
    </Row>
  );
};

export default CandidateEmployerPage;
