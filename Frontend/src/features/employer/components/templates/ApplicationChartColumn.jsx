import React, { useState, useContext } from "react";
import { Card, Typography, Space, Select, Col, Skeleton } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { AuthContext } from "../../../../contexts/auth.context";
import styled from "styled-components";
import useGetJobPostsByEmployerId from "../../../postjob/hooks/Job_Post/useGetJobPostsByEmployerId";
import useGetApplicationCountByStatusForEmployer from "../../../application/hooks/useGetApplicationCountByStatusForEmployer";
import useGetApplicationCountByStatusForJobPost from "../../../application/hooks/useGetApplicationCountByStatusForJobPost";
import useGetTotalApplicationsForEmployer from "../../../application/hooks/useGetTotalApplicationsForEmployer";

const { Title, Text } = Typography;

ChartJS.register(ArcElement, Tooltip, Legend);

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ChartCard = styled(Card)`
  border-radius: 24px;
  background: #ffffff;
  box-shadow: none;
  border: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 24px;
  overflow: hidden;
  height: 100%;
  min-height: 300px;

  @media (max-width: 1200px) {
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 576px) {
    padding: 12px;
  }

  @media print {
    box-shadow: none;
    border: 1px solid #ccc;
    page-break-inside: avoid;
  }
`;

const CardTitle = styled(Title)`
  color: #1f2937 !important;
  font-size: 20px !important;
  font-weight: 700 !important;
  margin-bottom: 24px !important;
  line-height: 1.3 !important;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    font-size: 18px !important;
    margin-bottom: 20px !important;
  }

  @media (max-width: 576px) {
    font-size: 16px !important;
    margin-bottom: 16px !important;
  }
`;

const ChartControls = styled(Space)`
  margin-bottom: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ChartFilter = styled(Select)`
  min-width: 220px;
  height: 40px;
  width: 100%;

  @media (max-width: 576px) {
    min-width: auto;
    height: 36px;
  }
`;

const TotalApplicationsText = styled(Text)`
  font-size: 16px;
  color: #1f2937;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 576px) {
    font-size: 13px;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    height: 320px;
    padding: 16px;
  }

  @media (max-width: 768px) {
    height: 280px;
    padding: 12px;
  }

  @media (max-width: 576px) {
    height: 240px;
    padding: 10px;
  }
`;

const SkeletonWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 1200px) {
    max-width: 400px;
  }

  @media (max-width: 768px) {
    max-width: 280px;
  }

  @media (max-width: 576px) {
    max-width: 100%;
  }
`;

const ApplicationChartColumn = () => {
  const { auth } = useContext(AuthContext);
  const employerId = auth?.user?.employer_id;
  const [chartFilter, setChartFilter] = useState("all");

  const { data: jobPosts = [], isLoading: isLoadingJobPosts } =
    useGetJobPostsByEmployerId(employerId);
  const { data: employerStats, isLoading: isLoadingEmployerStats } =
    useGetApplicationCountByStatusForEmployer(employerId);
  const { data: jobPostStats, isLoading: isLoadingJobPostStats } =
    useGetApplicationCountByStatusForJobPost(
      chartFilter !== "all" ? chartFilter : null
    );
  const { data: totalApplications, isLoading: isLoadingTotal } =
    useGetTotalApplicationsForEmployer(employerId);

  const chartData = {
    labels: [
      "Đang chờ duyệt",
      "Đã xem",
      "Đã chấp nhận",
      "Đã từ chối",
      "Đã rút",
    ],
    datasets: [
      {
        data:
          chartFilter === "all"
            ? [
                employerStats?.counts?.pending || 0,
                employerStats?.counts?.reviewed || 0,
                employerStats?.counts?.accepted || 0,
                employerStats?.counts?.rejected || 0,
                employerStats?.counts?.withdrawn || 0,
              ]
            : [
                jobPostStats?.counts?.pending || 0,
                jobPostStats?.counts?.reviewed || 0,
                jobPostStats?.counts?.accepted || 0,
                jobPostStats?.counts?.rejected || 0,
                jobPostStats?.counts?.withdrawn || 0,
              ],
        backgroundColor: [
          "#eab308",
          "#577cf6",
          "#10b981",
          "#ef4444",
          "#6b7280",
        ],
        borderColor: ["#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const jobPostOptions = [
    { value: "all", label: "Tất cả việc làm" },
    ...jobPosts.map((job) => ({
      value: job._id,
      label: job.title,
    })),
  ];

  if (isLoadingJobPosts || isLoadingEmployerStats || isLoadingJobPostStats) {
    return (
      <Col xs={24} sm={24} md={12} lg={14}>
        <RightColumn>
          <ChartCard>
            <CardTitle level={4}>Tỷ lệ hồ sơ ứng tuyển</CardTitle>
            <SkeletonWrapper>
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active avatar paragraph={{ rows: 0 }} />
            </SkeletonWrapper>
          </ChartCard>
        </RightColumn>
      </Col>
    );
  }

  return (
    <Col xs={24} sm={24} md={12} lg={14}>
      <RightColumn>
        <ChartCard>
          <CardTitle level={4}>Tỷ lệ hồ sơ ứng tuyển</CardTitle>
          <ChartControls>
            <ChartFilter
              value={chartFilter}
              onChange={(value) => setChartFilter(value)}
              options={jobPostOptions}
              loading={isLoadingJobPosts}
              placeholder="Chọn tin tuyển dụng"
              disabled={isLoadingJobPosts || !jobPosts.length}
            />
            <TotalApplicationsText>
              Tổng số ứng viên:{" "}
              {isLoadingTotal ? "Đang tải..." : totalApplications?.count || 0}
            </TotalApplicationsText>
          </ChartControls>
          <ChartWrapper>
            <Pie
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { font: { size: 14 } },
                  },
                  tooltip: { enabled: true },
                },
              }}
            />
          </ChartWrapper>
        </ChartCard>
      </RightColumn>
    </Col>
  );
};

export default ApplicationChartColumn;
