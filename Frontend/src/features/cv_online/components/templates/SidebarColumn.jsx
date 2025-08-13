import React, { useContext, useState } from "react";
import { Card, List, Progress, Typography, Button, Skeleton } from "antd";
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
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 12px; /* Giảm padding */

  @media (max-width: 768px) {
    position: static;
    padding: 8px;
  }
`;

const SidebarTitle = styled(Typography.Title)`
  color: #1a1a1a !important;
  font-size: 18px !important; /* Giảm font-size */
  font-weight: 600 !important;
  margin-bottom: 8px !important;

  @media (max-width: 576px) {
    font-size: 16px !important;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0; /* Giảm margin */

  @media (max-width: 576px) {
    margin: 6px 0;
  }
`;

const CompletedIcon = styled(CheckCircleOutlined)`
  color: #52c41a;
  margin-right: 6px; /* Giảm margin */
  font-size: 14px; /* Giảm kích thước icon */

  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

const IncompletedIcon = styled(CloseCircleOutlined)`
  color: #ff4d4f;
  margin-right: 6px;
  font-size: 14px;

  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

const PreviewButton = styled(Button)`
  width: 100%;
  margin-bottom: 8px; /* Giảm margin */
  height: 36px; /* Giảm chiều cao */
  border-radius: 8px;
  font-weight: 500;

  @media (max-width: 576px) {
    height: 32px;
    font-size: 13px;
  }
`;

const ListItem = styled(List.Item)`
  font-size: 13px; /* Giảm font-size */

  @media (max-width: 576px) {
    font-size: 12px;
  }
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

  if (isLoadingResumeData) {
    return (
      <SidebarCard>
        <Skeleton.Button active block style={{ height: 36, marginBottom: 8 }} />
        <Skeleton active title={{ width: "50%" }} paragraph={{ rows: 4 }} />
      </SidebarCard>
    );
  }

  return (
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
          width={100} /* Giảm kích thước vòng tiến độ */
        />
      </ProgressContainer>

      <List
        header={<Text strong>Trạng thái hoàn thành</Text>}
        dataSource={allSections}
        renderItem={(item) => (
          <ListItem>
            {completedSections?.includes(item) ? (
              <CompletedIcon />
            ) : (
              <IncompletedIcon />
            )}{" "}
            {item}
          </ListItem>
        )}
        style={{ marginBottom: 12 }}
      />

      <PreviewResumeModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        resumeData={resumeData}
        isLoadingResumeData={isLoadingResumeData}
        isErrorResumeData={isErrorResumeData}
      />
    </SidebarCard>
  );
};

export default SidebarColumn;
