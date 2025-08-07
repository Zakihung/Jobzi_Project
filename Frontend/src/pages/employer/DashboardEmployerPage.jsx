import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Button, Space, Select, List } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import { FileTextOutlined, BarChartOutlined } from "@ant-design/icons";
import styles from "../../styles/DashboardEmployerPage.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import useGetEmployerByUserId from "../../features/employer/hooks/useGetEmployerByUserId";
import useGetJobPostsByEmployerId from "../../features/postjob/hooks/Job_Post/useGetJobPostsByEmployerId";

const { Title, Text } = Typography;

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardEmployerPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { data: employer } = useGetEmployerByUserId(auth?.user?.id);
  const employerId = employer?.data?._id;
  const { data: jobsData, isLoading } = useGetJobPostsByEmployerId(employerId);

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

  const jobPostings = jobsData
    ? jobsData
        .map((job) => {
          const createdAt = new Date(job?.createdAt);
          const expiredDate = new Date(job?.expired_date);
          const today = new Date();
          const daysLeft = Math.ceil(
            (expiredDate - today) / (1000 * 60 * 60 * 24)
          );
          // Kiểm tra createdAt hợp lệ
          if (isNaN(createdAt.getTime())) {
            console.warn(`Invalid createdAt for job ${job?._id}`);
            return null;
          }
          return {
            id: job?._id,
            title: job?.title || "Không có tiêu đề", // Xử lý trường hợp title rỗng
            status:
              job?.status === "active"
                ? "Đang tuyển"
                : job?.status === "inactive"
                ? "Đang ẩn"
                : "Đã đóng",
            applications: job?.applications?.length || 0, // Số lượng ứng tuyển
            postedDate: createdAt.toLocaleDateString("vi-VN"), // Định dạng ngày
            createdAt: createdAt,
            daysLeft,
          };
        })
        .filter((job) => job !== null) // Loại bỏ các job không hợp lệ
        .sort((a, b) => b.createdAt - a.createdAt) // Sắp xếp theo ngày đăng mới nhất
        .slice(0, 3) // Lấy 3 việc làm mới nhất
    : [];

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

  if (isLoading) return;

  // const handleExportReport = () => {
  //   message.success("Báo cáo đã được xuất!");
  //   // Implement export logic (e.g., download CSV/PDF)
  // };

  const getStatusClass = (status) => {
    switch (status) {
      case "Đang tuyển":
        return `${styles.jobStatus} ${styles.active}`;
      case "Đang ẩn":
        return `${styles.jobStatus} ${styles.paused}`;
      case "Đã đóng":
        return `${styles.jobStatus} ${styles.closed}`;
      case "Hết hạn":
        return `${styles.jobStatus} ${styles.expired}`;
      default:
        return styles.jobStatus;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Row justify={"center"}>
        <Col span={21}>
          <div style={{ overflow: "hidden" }}>
            <Row
              gutter={[24, 0]}
              style={{
                padding: "1.5rem",
                background: "#f8f9fa",
                borderRadius: "24px",
              }}
              justify={"center"}
            >
              {/* Column 1: Employer Info and Candidate Exploration */}
              <Col span={10}>
                <Card className={styles.jobPostingsCard}>
                  <Title level={4} className={styles.cardTitle}>
                    Việc làm đã tạo
                  </Title>
                  <List
                    dataSource={jobPostings}
                    renderItem={(item) => (
                      <List.Item className={styles.jobItem}>
                        <List.Item.Meta
                          avatar={
                            <FileTextOutlined className={styles.jobIcon} />
                          }
                          title={
                            <div>
                              <div className={styles.jobTitle}>
                                {item.title}
                              </div>
                              <span
                                className={getStatusClass(
                                  item.daysLeft <= 0 ? "Hết hạn" : item.status
                                )}
                              >
                                {item.daysLeft <= 0 ? "Hết hạn" : item.status}
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
                        {/* <Button
                          type="link"
                          className={styles.secondaryButton}
                          onClick={() => navigate(`/employer/jobs/${item.id}`)}
                        >
                          Xem chi tiết
                        </Button> */}
                      </List.Item>
                    )}
                  />
                  <Button
                    type="primary"
                    block
                    className={styles.actionButton}
                    onClick={() => navigate("/employer/jobs")}
                    style={{ marginTop: 12 }}
                  >
                    Xem tất cả việc làm đã tạo
                  </Button>
                  <Button
                    type="primary"
                    block
                    className={styles.actionButton}
                    onClick={() => navigate("/employer/postjob")}
                    style={{ marginTop: 12 }}
                  >
                    Đăng tin tuyển dụng mới
                  </Button>
                </Card>
              </Col>

              {/* Column 2: Application Status Chart */}
              <Col span={14}>
                <div className={styles.rightColumn}>
                  <Card className={styles.chartCard}>
                    <Title level={4} className={styles.cardTitle}>
                      Tỷ lệ hồ sơ ứng tuyển
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
                      {/* <Button
                        icon={<DownloadOutlined />}
                        onClick={handleExportReport}
                        className={styles.secondaryButton}
                      >
                        Xuất báo cáo
                      </Button> */}
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
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardEmployerPage;
