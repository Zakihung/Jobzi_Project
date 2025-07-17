import React from "react";
import { Card, List, Progress, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title, Text } = Typography;

const allSections = [
  "Thông tin cá nhân",
  "Trạng thái tìm việc",
  "Mong muốn tìm việc",
  "Học vấn",
  "Điểm nổi bật",
  "Kinh nghiệm làm việc",
  "Kinh nghiệm dự án",
  "Năng lực chuyên môn",
];

// Styled Components
const SidebarCard = styled(Card)`
  position: sticky;
  top: 76px;
  z-index: 100;
  @media (max-width: 768px) {
    position: static;
  }
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 16px;
`;

const SidebarTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
`;

const CompletedIcon = styled(CheckCircleOutlined)`
  color: #52c41a;
  margin-right: 8px;
`;

const IncompletedIcon = styled(CloseCircleOutlined)`
  color: #ff4d4f;
  margin-right: 8px;
`;

const SidebarColumn = ({ completedSections }) => {
  const completionPercentage = Math.round(
    (completedSections?.length / allSections?.length) * 100
  );

  return (
    <SidebarCard>
      <SidebarTitle level={4}>Hoàn thành thông tin</SidebarTitle>
      <ProgressContainer>
        <Progress
          type="circle"
          percent={completionPercentage}
          format={(percent) => `${percent}%`}
          strokeColor="#577cf6"
          trailColor="#e6f4ff"
          width={120}
        />
      </ProgressContainer>
      <List
        header={<Text strong>Trạng thái hoàn thành</Text>}
        dataSource={allSections}
        renderItem={(item) => (
          <List.Item>
            {completedSections?.includes(item) ? (
              <CompletedIcon />
            ) : (
              <IncompletedIcon />
            )}{" "}
            {item}
          </List.Item>
        )}
        style={{ marginBottom: 16 }}
      />
    </SidebarCard>
  );
};

export default SidebarColumn;
