import React from "react";
import { Typography, Card, Space, Row } from "antd";
import {
  TrophyOutlined,
  StarOutlined,
  BookOutlined,
  ClockCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { VenusAndMars } from "lucide-react";

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 24px;
`;

const SectionTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 25px !important;
  font-weight: 700 !important;
  margin-bottom: 16px !important;
`;

const GeneralInfoDetails = styled(Space)`
  width: 100%;
`;

const InfoItem = styled.div`
  background: none;
  border: none;
  border-radius: 12px;
  font-size: 13px;
  padding: 0;
  margin: 0 0 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 576px) {
    font-size: 12px;
    padding: 2px 8px;
  }
`;

const InfoIcon = styled.span`
  background: #577cf6;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-size: 18px;
  border-radius: 50%;

  svg {
    width: 18px;
    height: 18px;
    stroke-width: 2; /* cho Lucide icon rõ hơn */
  }
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const JobPostGeneralInfo = ({ job }) => {
  const generalInfo = [
    {
      icon: <TrophyOutlined />,
      label: "Cấp bậc",
      value: job.level || "NaN",
    },
    {
      icon: <StarOutlined />,
      label: "Cấp độ chuyên môn",
      value: job.expertise + " trở lên" || "N/a",
    },
    {
      icon: <BookOutlined />,
      label: "Học vấn",
      value: job.education + " trở lên" || "N/a",
    },
    {
      icon: <TeamOutlined />,
      label: "Số lượng tuyển",
      value: job.number || "N/a",
    },
    {
      icon: <ClockCircleOutlined />,
      label: "Hình thức làm việc",
      value: job.workType || "N/a",
    },
    {
      icon: <VenusAndMars />,
      label: "Giới tính",
      value:
        job.gender === "unspecified"
          ? "Không yêu cầu"
          : job.gender === "male"
          ? "Nam"
          : "Nữ",
    },
  ];

  return (
    <StyledCard>
      <Row>
        <SectionTitle level={4}>Thông tin chung</SectionTitle>
      </Row>
      <Row>
        <GeneralInfoDetails direction="vertical">
          {generalInfo.map((info, index) => (
            <InfoItem key={index}>
              <InfoIcon>{info.icon}</InfoIcon>
              <InfoContent>
                <Text>{info.label}</Text>
                <Text strong>{info.value}</Text>
              </InfoContent>
            </InfoItem>
          ))}
        </GeneralInfoDetails>
      </Row>
    </StyledCard>
  );
};

export default JobPostGeneralInfo;
