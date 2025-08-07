import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Space, Select, Col } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BarChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Title } = Typography;

ChartJS.register(ArcElement, Tooltip, Legend);

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChartCard = styled(Card)`
  border-radius: 24px;
  background: #ffffff;
  box-shadow: none;
  border: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 24px;
  overflow: hidden;
  height: 100%;
  width: 100%;

  @media (max-width: 1200px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 576px) {
    padding: 16px;
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

  @media (max-width: 992px) {
    min-width: auto;
    width: 100%;
  }
`;

const SecondaryButton = styled(Button)`
  background: #ffffff !important;
  border-color: #d1d5db !important;
  color: #1f2937 !important;
  border-radius: 16px !important;
  font-weight: 500 !important;
  height: 40px !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;

  &:hover {
    background: #f9fafb !important;
    border-color: #577cf6 !important;
    color: #577cf6 !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  @media print {
    display: none;
  }
`;

const ChartWrapper = styled.div`
  max-width: 420px;
  margin: 0 auto;
  padding: 20px;
  background: #f9fafb;
  border-radius: 16px;

  @media (max-width: 1200px) {
    max-width: 350px;
  }

  @media (max-width: 768px) {
    max-width: 280px;
    padding: 16px;
  }

  @media (max-width: 576px) {
    max-width: 240px;
    padding: 12px;
  }
`;

const ApplicationChartColumn = () => {
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

  useEffect(() => {
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

  return (
    <Col span={14}>
      <RightColumn>
        <ChartCard>
          <CardTitle level={4}>Tỷ lệ hồ sơ ứng tuyển</CardTitle>
          <ChartControls>
            <ChartFilter
              value={chartFilter}
              onChange={setChartFilter}
              options={[
                { value: "all", label: "Tất cả việc làm" },
                { value: "job1", label: "Senior React Developer" },
                { value: "job2", label: "UI/UX Designer" },
                { value: "job3", label: "Backend Developer" },
              ]}
            />
            <SecondaryButton
              icon={<BarChartOutlined />}
              onClick={() => navigate("/employer/reports")}
            >
              Xem tất cả báo cáo
            </SecondaryButton>
          </ChartControls>
          <ChartWrapper>
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
          </ChartWrapper>
        </ChartCard>
      </RightColumn>
    </Col>
  );
};

export default ApplicationChartColumn;
