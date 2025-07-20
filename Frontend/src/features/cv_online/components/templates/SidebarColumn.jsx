import React, { useContext, useState } from "react";
import { Card, List, Progress, Typography, Button } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { AuthContext } from "../../../../contexts/auth.context";
import useGetOnlineResume from "../../hooks/useGetOnlineResume";
import PreviewResumeModal from "../organisms/PreviewResumeModal";

const { Text } = Typography;

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

const SidebarTitle = styled(Typography.Title)`
  color: #1a1a1a !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  margin-bottom: 12px !important;
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 12px 0;
`;

const CompletedIcon = styled(CheckCircleOutlined)`
  color: #52c41a;
  margin-right: 8px;
`;

const IncompletedIcon = styled(CloseCircleOutlined)`
  color: #ff4d4f;
  margin-right: 8px;
`;

const PreviewButton = styled(Button)`
  width: 100%;
  margin-bottom: 12px;
  height: 40px;
  border-radius: 8px;
  font-weight: 500;
`;

const SidebarColumn = ({ completedSections }) => {
  const { auth } = useContext(AuthContext);
  const candidateId = auth?.user?.candidate_id;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data: resumeData,
    isLoading: isLoadingResumeData,
    isError: isErrorResumeData,
  } = useGetOnlineResume(candidateId);

  const completionPercentage = Math.round(
    (completedSections?.length / allSections?.length) * 100
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <SidebarCard>
        <PreviewButton
          type="primary"
          icon={<EyeOutlined />}
          onClick={showModal}
          loading={isLoadingResumeData}
        >
          Xem trước hồ sơ
        </PreviewButton>

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

      <PreviewResumeModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        resumeData={resumeData}
        isLoadingResumeData={isLoadingResumeData}
        isErrorResumeData={isErrorResumeData}
      />
    </>
  );
};

export default SidebarColumn;
