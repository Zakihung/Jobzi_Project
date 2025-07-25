// AdminStatisticsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  DatePicker,
  Select,
  Space,
  Statistic,
  Button,
} from "antd";
import styled from "styled-components";
import {
  BarChartOutlined,
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import Chart from "chart.js/auto";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import useGetListUser from "../../features/auth/hooks/useGetListUser";
import useGetAllJobPosts from "../../features/postjob/hooks/Job_Post/useGetAllJobPosts";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

// Styled Components
const PageContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding: 0;
  margin: -32px;
  border-radius: 24px;
`;

const ContentWrapper = styled.div`
  padding: 32px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const PageTitle = styled(Title)`
  margin: 0 !important;
  color: #262626;
  font-size: 28px !important;
  font-weight: 600 !important;
`;

const PageSubtitle = styled.p`
  color: #8c8c8c;
  margin: 8px 0 0 0;
  font-size: 16px;
`;

const FilterSection = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .ant-card-body {
    padding: 20px;
  }
`;

const FilterControls = styled.div`
  display: flex;
  padding: 16px;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled(Card)`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  .ant-card-body {
    padding: 24px;
  }

  .ant-statistic-title {
    color: #8c8c8c;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .ant-statistic-content {
    color: #262626;
    font-size: 32px;
    font-weight: 700;
  }

  &.jobs-stat .ant-statistic-content {
    color: #1890ff;
  }

  &.accounts-stat .ant-statistic-content {
    color: #52c41a;
  }

  &.today-jobs-stat .ant-statistic-content {
    color: #fa8c16;
  }

  &.today-accounts-stat .ant-statistic-content {
    color: #722ed1;
  }
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
`;

const ChartCard = styled(Card)`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  .ant-card-head {
    border-bottom: 2px solid #f0f0f0;

    .ant-card-head-title {
      color: #262626;
      font-weight: 600;
      font-size: 16px;
    }
  }

  .ant-card-body {
    padding: 24px;
  }
`;

const ChartWrapper = styled.div`
  height: 400px;
  position: relative;
`;

const PrimaryButton = styled(Button)`
  background: #1890ff;
  border-color: #1890ff;
  border-radius: 8px;
  font-weight: 500;
  height: 40px;
  padding: 0 20px;

  &:hover {
    background: #40a9ff;
    border-color: #40a9ff;
  }
`;

const StyledSelect = styled(Select)`
  min-width: 150px;

  .ant-select-selector {
    border-radius: 8px;
    height: 40px;

    .ant-select-selection-item {
      line-height: 40px;
    }
  }
`;

const StyledRangePicker = styled(RangePicker)`
  border-radius: 8px;
  height: 40px;
`;

const AdminStatisticsPage = () => {
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(30, "day"),
    dayjs(),
  ]);
  const [chartType, setChartType] = useState("day");

  const jobsChartRef = useRef(null);
  const accountsChartRef = useRef(null);
  const jobsChartInstance = useRef(null);
  const accountsChartInstance = useRef(null);

  const { data: users = [], isLoading: isUserLoading } = useGetListUser();
  const { data: jobPosts = [], isLoading: isJobLoading } = useGetAllJobPosts();
  const isLoading = isUserLoading || isJobLoading;

  const today = dayjs().startOf("day");
  const statsData = {
    totalJobs: jobPosts.length,
    totalAccounts: users.length,
    todayJobs: jobPosts.filter((j) => dayjs(j.createdAt).isAfter(today)).length,
    todayAccounts: users.filter((u) => dayjs(u.createdAt).isAfter(today))
      .length,
  };

  const generateChartData = (type, source) => {
    const start = dateRange[0];
    const end = dateRange[1];
    const labels = [];
    const counts = {};

    if (type === "day") {
      let current = start.clone();
      while (current.isSameOrBefore(end, "day")) {
        const label = current.format("DD/MM");
        labels.push(label);
        counts[label] = 0;
        current = current.add(1, "day");
      }

      source.forEach((item) => {
        const created = dayjs(item.createdAt);
        const label = created.format("DD/MM");
        if (created.isBetween(start, end, "day", "[]")) {
          counts[label] = (counts[label] || 0) + 1;
        }
      });
    }

    if (type === "month") {
      let current = start.startOf("month");
      while (current.isSameOrBefore(end, "month")) {
        const label = current.format("MM/YYYY");
        labels.push(label);
        counts[label] = 0;
        current = current.add(1, "month");
      }

      source.forEach((item) => {
        const created = dayjs(item.createdAt).format("MM/YYYY");
        if (labels.includes(created)) {
          counts[created] += 1;
        }
      });
    }

    if (type === "year") {
      let current = start.startOf("year");
      while (current.isSameOrBefore(end, "year")) {
        const label = current.format("YYYY");
        labels.push(label);
        counts[label] = 0;
        current = current.add(1, "year");
      }

      source.forEach((item) => {
        const created = dayjs(item.createdAt).format("YYYY");
        if (labels.includes(created)) {
          counts[created] += 1;
        }
      });
    }

    return {
      labels,
      data: labels.map((label) => counts[label] || 0),
    };
  };

  const createChart = (canvas, title, data, color) => {
    const ctx = canvas.getContext("2d");
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: title,
            data: data.data,
            backgroundColor: color.bg,
            borderColor: color.border,
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: color.border,
            borderWidth: 1,
            cornerRadius: 8,
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#8c8c8c",
              font: {
                size: 12,
                weight: 500,
              },
            },
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "#8c8c8c",
              font: {
                size: 12,
                weight: 500,
              },
            },
            grid: {
              color: "#f0f0f0",
              drawBorder: false,
            },
          },
        },
      },
    });
  };

  const updateCharts = () => {
    if (!jobsChartRef.current || !accountsChartRef.current) return;

    const jobsData = generateChartData(chartType, jobPosts);
    const accountsData = generateChartData(chartType, users);

    if (jobsChartInstance.current) jobsChartInstance.current.destroy();
    if (accountsChartInstance.current) accountsChartInstance.current.destroy();

    jobsChartInstance.current = createChart(
      jobsChartRef.current,
      "Tin tuyển dụng",
      jobsData,
      {
        bg: "rgba(24,144,255,0.1)",
        border: "#1890ff",
      }
    );

    accountsChartInstance.current = createChart(
      accountsChartRef.current,
      "Tài khoản mới",
      accountsData,
      {
        bg: "rgba(82,196,26,0.1)",
        border: "#52c41a",
      }
    );
  };

  useEffect(() => {
    if (!isLoading) updateCharts();
    return () => {
      if (jobsChartInstance.current) jobsChartInstance.current.destroy();
      if (accountsChartInstance.current)
        accountsChartInstance.current.destroy();
    };
  }, [dateRange, chartType, isLoading]);

  return (
    <PageContainer>
      <ContentWrapper>
        <PageHeader>
          <HeaderLeft>
            <PageTitle>Thống kê hệ thống</PageTitle>
            <PageSubtitle>
              Theo dõi và phân tích dữ liệu hoạt động của hệ thống
            </PageSubtitle>
          </HeaderLeft>
        </PageHeader>

        <FilterSection>
          <FilterControls>
            <Space size={16}>
              <CalendarOutlined style={{ color: "#8c8c8c" }} />
              <StyledRangePicker
                value={dateRange}
                onChange={setDateRange}
                format="DD/MM/YYYY"
                placeholder={["Từ ngày", "Đến ngày"]}
              />
            </Space>

            <Space size={16}>
              <BarChartOutlined style={{ color: "#8c8c8c" }} />
              <StyledSelect
                value={chartType}
                onChange={setChartType}
                placeholder="Chọn kiểu hiển thị"
              >
                <Option value="day">Theo ngày</Option>
                <Option value="month">Theo tháng</Option>
                <Option value="year">Theo năm</Option>
              </StyledSelect>
            </Space>

            <PrimaryButton
              type="primary"
              icon={<ReloadOutlined />}
              onClick={updateCharts}
              loading={isLoading}
            >
              Làm mới
            </PrimaryButton>
          </FilterControls>
        </FilterSection>

        <StatsGrid>
          <StatCard className="jobs-stat">
            <Statistic
              title="Tổng số tin tuyển dụng"
              value={statsData.totalJobs}
              prefix={<FileTextOutlined />}
            />
          </StatCard>

          <StatCard className="accounts-stat">
            <Statistic
              title="Tổng số tài khoản"
              value={statsData.totalAccounts}
              prefix={<UserOutlined />}
            />
          </StatCard>

          <StatCard className="today-jobs-stat">
            <Statistic
              title="Tin tuyển dụng hôm nay"
              value={statsData.todayJobs}
              prefix={<FileTextOutlined />}
            />
          </StatCard>

          <StatCard className="today-accounts-stat">
            <Statistic
              title="Tài khoản mới hôm nay"
              value={statsData.todayAccounts}
              prefix={<UserOutlined />}
            />
          </StatCard>
        </StatsGrid>

        <ChartSection>
          <ChartCard title="Thống kê tin tuyển dụng">
            <ChartWrapper>
              <canvas ref={jobsChartRef} />
            </ChartWrapper>
          </ChartCard>

          <ChartCard title="Thống kê tài khoản mới">
            <ChartWrapper>
              <canvas ref={accountsChartRef} />
            </ChartWrapper>
          </ChartCard>
        </ChartSection>
      </ContentWrapper>
    </PageContainer>
  );
};

export default AdminStatisticsPage;
