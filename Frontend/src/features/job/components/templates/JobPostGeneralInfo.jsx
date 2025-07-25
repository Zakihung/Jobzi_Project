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

const roleOrganizationData = {
  unspecified: "Không quy định",
  intern: "Thực tập sinh",
  staff: "Nhân viên",
  leader: "Tổ trưởng",
  manager: "Trưởng nhóm",
  head: "Trưởng phòng",
  deputy_director: "Phó giám đốc bộ phận",
  director: "Giám đốc bộ phận",
  ceo: "Giám đốc điều hành (CEO)",
  cto: "Giám đốc kỹ thuật (CTO)",
  cfo: "Giám đốc tài chính (CFO)",
};

const experienceLevelData = {
  none: "Không yêu cầu",
  intern: "Thực tập sinh",
  fresher: "Mới tốt nghiệp (Fresher)",
  junior: "Nhân viên mới (Junior)",
  mid: "Trung cấp (Mid-level)",
  senior: "Nhân viên cao cấp (Senior)",
  lead: "Trưởng nhóm kỹ thuật (Team Lead / Technical Lead)",
  architect: "Kiến trúc sư hệ thống (Architect / Solution Architect)",
  expert: "Chuyên gia cao cấp (Principal / Expert)",
};

const educationLevelData = {
  "Không yêu cầu": "Không yêu cầu",
  "Trung học phổ thông": "Trung học phổ thông",
  "Trung cấp": "Trung cấp",
  "Cao đẳng": "Cao đẳng",
  "Đại học": "Đại học",
  "Thạc sĩ": "Thạc sĩ",
  "Tiến sĩ": "Tiến sĩ",
};

const workTypeData = {
  full_time: "Toàn thời gian",
  part_time: "Bán thời gian",
  internship: "Thực tập",
};

const genderData = {
  unspecified: "Không yêu cầu",
  male: "Nam",
  female: "Nữ",
};

const JobPostGeneralInfo = ({ job }) => {
  const generalInfo = [
    {
      icon: <TrophyOutlined />,
      label: "Cấp bậc",
      value: roleOrganizationData[job?.role_organization] || "Không rõ",
    },
    {
      icon: <StarOutlined />,
      label: "Cấp độ chuyên môn",
      value:
        experienceLevelData[job?.experience_level] + " trở lên" || "Không rõ",
    },
    {
      icon: <BookOutlined />,
      label: "Học vấn",
      value:
        educationLevelData[job?.education_level] + " trở lên" || "Không rõ",
    },
    {
      icon: <TeamOutlined />,
      label: "Số lượng tuyển",
      value: job?.number || "Không rõ",
    },
    {
      icon: <ClockCircleOutlined />,
      label: "Hình thức làm việc",
      value: workTypeData[job?.work_type] || "Không rõ",
    },
    {
      icon: <VenusAndMars />,
      label: "Giới tính",
      value: genderData[job?.gender] || "Không rõ",
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
