import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Space,
  Select,
  List,
  message,
} from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  SearchOutlined,
  FileTextOutlined,
  DownloadOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import styles from "../../styles/DashboardEmployer.module.css";

const { Title, Text } = Typography;

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardEmployer = () => {
  const navigate = useNavigate();
  const [chartFilter, setChartFilter] = useState("all");
  const [chartData, setChartData] = useState({
    labels: ["Nhận", "Duyệt", "Không đạt"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#577cf6", "#10b981", "#ef4444"],
        borderColor: ["#ffffff"],
        borderWidth: 2,
      },
    ],
  });

  // Sample employer data
  const employer = {
    name: "Công ty ABC",
    industry: "Công nghệ Thông tin",
    employees: "100-500",
    location: "TP. Hồ Chí Minh",
  };

  // Sample job postings data
  const jobPostings = [
    {
      id: 1,
      title: "Senior React Developer",
      status: "Đang tuyển",
      applications: 45,
      postedDate: "2025-06-01",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      status: "Tạm dừng",
      applications: 20,
      postedDate: "2025-05-28",
    },
    {
      id: 3,
      title: "Backend Developer",
      status: "Đã đóng",
      applications: 30,
      postedDate: "2025-05-15",
    },
  ];

  // Update chart data based on filter
  useEffect(() => {
    // Simulate API call to update chart data
    const dataMap = {
      all: [60, 25, 15],
      job1: [50, 30, 20],
      job2: [70, 20, 10],
      job3: [55, 25, 20],
    };
    setChartData({
      labels: ["Nhận", "Duyệt", "Không đạt"],
      datasets: [
        {
          data: dataMap[chartFilter],
          backgroundColor: ["#577cf6", "#10b981", "#ef4444"],
          borderColor: ["#ffffff"],
          borderWidth: 2,
        },
      ],
    });
  }, [chartFilter]);

  const handleExportReport = () => {
    message.success("Báo cáo đã được xuất!");
    // Implement export logic (e.g., download CSV/PDF)
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Đang tuyển":
        return `${styles.jobStatus} ${styles.active}`;
      case "Tạm dừng":
        return `${styles.jobStatus} ${styles.paused}`;
      case "Đã đóng":
        return `${styles.jobStatus} ${styles.closed}`;
      default:
        return styles.jobStatus;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Row gutter={[24, 24]}>
        <Col span={2} />
        {/* Column 1: Employer Info and Candidate Exploration */}
        <Col span={8}>
          <div className={styles.leftColumn}>
            <Card className={styles.infoCard}>
              <Title level={4} className={styles.cardTitle}>
                Sơ lược thông tin cá nhân
              </Title>
              <Space
                direction="vertical"
                size="middle"
                className={styles.infoContent}
              >
                <div className={styles.infoItem}>
                  <UserOutlined className={styles.infoIcon} />
                  <span className={styles.infoLabel}>Tên công ty:</span>
                  <span className={styles.infoValue}>{employer.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <UserOutlined className={styles.infoIcon} />
                  <span className={styles.infoLabel}>Ngành:</span>
                  <span className={styles.infoValue}>{employer.industry}</span>
                </div>
                <div className={styles.infoItem}>
                  <UserOutlined className={styles.infoIcon} />
                  <span className={styles.infoLabel}>Quy mô:</span>
                  <span className={styles.infoValue}>{employer.employees}</span>
                </div>
                <div className={styles.infoItem}>
                  <UserOutlined className={styles.infoIcon} />
                  <span className={styles.infoLabel}>Địa điểm:</span>
                  <span className={styles.infoValue}>{employer.location}</span>
                </div>
                <Button
                  type="primary"
                  block
                  className={styles.actionButton}
                  onClick={() => navigate("/employer/profile")}
                >
                  Xem chi tiết thông tin
                </Button>
              </Space>
            </Card>

            <Card className={styles.exploreCard}>
              <Title level={4} className={styles.cardTitle}>
                Khám phá ứng viên
              </Title>
              <Text className={styles.exploreText}>
                Khám phá ứng viên tiềm năng phù hợp với nhu cầu tuyển dụng của
                bạn
              </Text>
              <Button
                type="primary"
                block
                icon={<SearchOutlined />}
                className={styles.actionButton}
                onClick={() => navigate("/employer/search")}
              >
                Tìm kiếm ứng viên
              </Button>
            </Card>
          </div>
        </Col>

        {/* Column 2: Application Status Chart */}
        <Col span={12}>
          <div className={styles.rightColumn}>
            <Card className={styles.chartCard}>
              <Title level={4} className={styles.cardTitle}>
                Tỉ lệ hồ sơ ứng tuyển
              </Title>
              <Space className={styles.chartControls}>
                <Select
                  value={chartFilter}
                  onChange={setChartFilter}
                  className={styles.chartFilter}
                  options={[
                    { value: "all", label: "Tất cả việc làm" },
                    { value: "job1", label: "Senior React Developer" },
                    { value: "job2", label: "UI/UX Designer" },
                    { value: "job3", label: "Backend Developer" },
                  ]}
                />
                <Button
                  icon={<DownloadOutlined />}
                  onClick={handleExportReport}
                  className={styles.secondaryButton}
                >
                  Xuất báo cáo
                </Button>
                <Button
                  icon={<BarChartOutlined />}
                  onClick={() => navigate("/employer/reports")}
                  className={styles.secondaryButton}
                >
                  Xem tất cả báo cáo
                </Button>
              </Space>
              <div className={styles.chartWrapper}>
                <Pie
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: { font: { size: 14 } },
                      },
                      tooltip: { enabled: true },
                    },
                  }}
                />
              </div>
            </Card>
          </div>
        </Col>
        <Col span={2} />
      </Row>

      {/* Row 2: Quick Job Postings Management */}
      <Row gutter={[24, 24]} className={styles.jobPostingsRow}>
        <Col span={2} />
        <Col span={20}>
          <Card className={styles.jobPostingsCard}>
            <Title level={4} className={styles.cardTitle}>
              Quản lý tin tuyển dụng
            </Title>
            <List
              dataSource={jobPostings}
              renderItem={(item) => (
                <List.Item className={styles.jobItem}>
                  <List.Item.Meta
                    avatar={<FileTextOutlined className={styles.jobIcon} />}
                    title={
                      <div>
                        <div className={styles.jobTitle}>{item.title}</div>
                        <span className={getStatusClass(item.status)}>
                          {item.status}
                        </span>
                      </div>
                    }
                    description={
                      <div className={styles.jobMeta}>
                        <Text>Số ứng tuyển: {item.applications}</Text>
                        <Text>Ngày đăng: {item.postedDate}</Text>
                      </div>
                    }
                  />
                  <Button
                    type="link"
                    className={styles.secondaryButton}
                    onClick={() => navigate(`/employer/jobs/${item.id}`)}
                  >
                    Xem chi tiết
                  </Button>
                </List.Item>
              )}
            />
            <Button
              type="primary"
              block
              className={styles.actionButton}
              onClick={() => navigate("/employer/jobs/new")}
            >
              Đăng tin tuyển dụng mới
            </Button>
          </Card>
        </Col>
        <Col span={2} />
      </Row>
    </div>
  );
};

export default DashboardEmployer;
