import React from "react";
import { Card, List, Typography, Button, Divider } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Text } = Typography;

const StickyMenu = styled.div`
  position: sticky;
  top: 76px;
  z-index: 100;
  @media (max-width: 768px) {
    position: static;
  }
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 16px;
  margin-bottom: 16px;

  @media (max-width: 576px) {
    padding: 16px;
  }
`;

const CompletedIcon = styled(CheckCircleOutlined)`
  color: #52c41a;
  margin-right: 8px;
`;

const IncompleteIcon = styled(CloseCircleOutlined)`
  color: #ff4d4f;
  margin-right: 8px;
`;

const SaveButton = styled(Button)`
  background-color: #10b981;
  border-color: #10b981;
  color: white;

  &:hover {
    background-color: #34d399 !important;
    border-color: #34d399 !important;
    color: white;
  }
`;

const SidebarProgress = ({
  completedSections,
  allSections,
  onSubmit,
  onEdit,
  isEditing,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPostJobPage = location.pathname === "/employer/postjob";

  return (
    <StickyMenu>
      <StyledCard>
        <List
          header={
            <Text strong>
              Đã hoàn thành: {completedSections.length}/{allSections.length} (
              {Math.round(
                (completedSections.length / allSections.length) * 100
              )}
              %)
            </Text>
          }
          dataSource={allSections}
          locale={{ emptyText: <br /> }}
          renderItem={(item) => (
            <List.Item>
              {completedSections.includes(item) ? (
                <CompletedIcon />
              ) : (
                <IncompleteIcon />
              )}{" "}
              {item}
            </List.Item>
          )}
        />
        <Divider style={{ margin: "0 0 10px" }} />
        {isPostJobPage ? (
          <Button type="primary" block onClick={onSubmit}>
            Đăng tuyển dụng
          </Button>
        ) : (
          <Button type="primary" block onClick={onEdit}>
            {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
          </Button>
        )}
        {isEditing && !isPostJobPage && (
          <>
            <Divider style={{ margin: "10px 0" }} />
            <SaveButton type="primary" block onClick={onSubmit}>
              Lưu
            </SaveButton>
          </>
        )}
        {!isPostJobPage && (
          <>
            <Divider style={{ margin: "10px 0" }} />
            <Button block onClick={() => navigate("/employer/jobs")}>
              Về trang Danh sách việc làm
            </Button>
          </>
        )}
        {isPostJobPage && (
          <>
            <Divider style={{ margin: "10px 0" }} />
            <Button block onClick={() => navigate("/employer")}>
              Trở về trang chủ
            </Button>
          </>
        )}
      </StyledCard>
    </StickyMenu>
  );
};

export default SidebarProgress;
