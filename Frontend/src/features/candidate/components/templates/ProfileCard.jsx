import React, { useState } from "react";
import { Card, Typography, Avatar, Button, Popover } from "antd";
import { EditOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: white;
  padding: 24px;
  margin-bottom: 24px;
  text-align: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ProfileName = styled(Title)`
  color: #1a1a1a !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  margin: 0 !important;

  @media (max-width: 768px) {
    font-size: 18px !important;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: #f6f8ff;
  }
`;

const StatusText = styled(Text)`
  color: #10b981;
  font-size: 14px;
  font-weight: 500;
`;

const EditStatusIcon = styled(EditOutlined)`
  color: #577cf6;
  font-size: 14px;
`;

const StatusOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

const StatusOption = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  color: #1a1a1a;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: #f6f8ff;
  }

  @media (max-width: 576px) {
    font-size: 13px;
    padding: 6px 10px;
  }
`;

const OnlineResumeButton = styled(Button)`
  background: #577cf6 !important;
  border-color: #577cf6 !important;
  border-radius: 8px;
  font-weight: 600;
  height: 40px;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background: #4c6ef5 !important;
    border-color: #4c6ef5 !important;
    box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
  }

  @media (max-width: 768px) {
    height: 36px;
  }
`;

const ProfileCard = ({
  userData,
  candidateStatus,
  onStatusChange,
  onViewOnlineResume,
}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  // Mapping between backend status values and display text
  const statusMap = {
    ready: "Sẵn sàng tìm việc",
    not_available: "Chưa có nhu cầu",
    available_this_month: "Nhận việc trong tháng này",
  };

  // Map backend status to display text
  const displayStatus = statusMap[candidateStatus] || candidateStatus;

  // Status options for Popover
  const statusOptions = [
    { backend: "ready", display: "Sẵn sàng tìm việc" },
    { backend: "not_available", display: "Chưa có nhu cầu" },
    { backend: "available_this_month", display: "Nhận việc trong tháng này" },
  ];

  const handleStatusSelect = (status) => {
    onStatusChange(status);
    setIsPopoverVisible(false); // Đóng Popover ngay khi chọn trạng thái
  };

  const statusPopoverContent = (
    <StatusOptions>
      {statusOptions.map(({ backend, display }) => (
        <StatusOption key={backend} onClick={() => handleStatusSelect(backend)}>
          {display}
        </StatusOption>
      ))}
    </StatusOptions>
  );

  return (
    <StyledCard>
      <ProfileHeader>
        <Avatar
          src={
            userData.avatar ||
            "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750090817/avaMacDinh_toiqej.jpg"
          }
          size={90}
        />
        <ProfileName level={4}>{userData.full_name}</ProfileName>
        <Popover
          content={statusPopoverContent}
          visible={isPopoverVisible}
          onVisibleChange={(visible) => setIsPopoverVisible(visible)}
          trigger="click"
          placement="bottom"
        >
          <StatusWrapper>
            <StatusText>{displayStatus}</StatusText>
            <EditStatusIcon />
          </StatusWrapper>
        </Popover>
        <OnlineResumeButton
          type="primary"
          size="large"
          onClick={onViewOnlineResume}
        >
          CV trực tuyến
        </OnlineResumeButton>
      </ProfileHeader>
    </StyledCard>
  );
};

export default ProfileCard;
