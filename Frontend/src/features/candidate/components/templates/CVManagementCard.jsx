import React from "react";
import {
  Card,
  Typography,
  Button,
  List,
  Space,
  Skeleton,
  Dropdown,
  Menu,
} from "antd";
import {
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: white;
  padding: 24px;
`;

const StyledMenu = styled(Menu)`
  && {
    border-radius: 12px;
    padding: 8px 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

    .ant-dropdown-menu-item {
      padding: 10px 16px;
      font-size: 14px;
      transition: all 0.2s ease;

      &:hover {
        background-color: #f5f7ff;
      }
    }

    .ant-dropdown-menu-item-danger {
      color: #ff4d4f;

      &:hover {
        background-color: #fff1f0;
        color: #d9363e;
      }
    }
  }
`;

const MoreButton = styled.button`
  && {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #595959;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const CVManagementTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;
`;

const CVItem = styled(List.Item)`
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  .ant-list-item-meta {
    flex: 1;
    max-width: 70%;
  }

  .ant-list-item-action {
    display: flex;
    gap: 8px;
  }

  .ant-list-item-action .ant-btn {
    padding: 0 8px;
    font-size: 12px;
    line-height: 24px;
  }

  .ant-list-item-action .anticon {
    font-size: 18px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

const CVIcon = styled(FileTextOutlined)`
  color: #577cf6;
  font-size: 20px;
`;

const UploadCVButton = styled(Button)`
  background: #577cf6 !important;
  border-color: #577cf6 !important;
  border-radius: 8px;
  font-weight: 600;
  height: 40px;
  margin-top: 16px;
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

const CVManagementCard = ({
  resumeFiles,
  isLoading,
  // onPreviewFile,
  onEditFile,
  onDeleteFile,
  onUploadFile,
}) => {
  return (
    <StyledCard>
      <CVManagementTitle level={5}>
        Quản lý tệp CV ({resumeFiles?.length || 0}/3)
      </CVManagementTitle>
      {isLoading ? (
        <List
          dataSource={[1]} // giả lập loading
          renderItem={() => (
            <CVItem>
              <List.Item.Meta
                avatar={<Skeleton.Avatar active size="default" />}
                title={
                  <Skeleton.Input active size="small" style={{ width: 120 }} />
                }
                description={
                  <Skeleton.Input active size="small" style={{ width: 180 }} />
                }
              />
              <div className="ant-list-item-action">
                <Skeleton.Button active size="small" style={{ width: 60 }} />
                <Skeleton.Button active size="small" style={{ width: 32 }} />
                <Skeleton.Button active size="small" style={{ width: 32 }} />
              </div>
            </CVItem>
          )}
        />
      ) : (
        <List
          dataSource={resumeFiles || []}
          locale={{ emptyText: "Chưa có tệp CV nào" }}
          renderItem={(file) => (
            <CVItem
              actions={[
                <Dropdown
                  trigger={["click"]}
                  placement="bottomRight"
                  overlay={
                    <StyledMenu>
                      {/* <Menu.Item
                        key="preview"
                        onClick={() => onPreviewFile(file)}
                      >
                        Xem trước
                      </Menu.Item> */}
                      <Menu.Item key="edit" onClick={() => onEditFile(file)}>
                        Chỉnh sửa
                      </Menu.Item>
                      <Menu.Item
                        key="delete"
                        danger
                        className="ant-dropdown-menu-item-danger"
                        onClick={() => onDeleteFile(file._id)}
                      >
                        Xóa
                      </Menu.Item>
                    </StyledMenu>
                  }
                >
                  <MoreButton>
                    <MoreOutlined />
                  </MoreButton>
                </Dropdown>,
              ]}
            >
              <List.Item.Meta
                avatar={<CVIcon />}
                title={<Text>{file.name}</Text>}
                description={
                  <Space direction="vertical" size={4}>
                    <Text type="secondary">
                      Ngày tải lên: {dayjs(file.createdAt).format("YYYY-MM-DD")}
                    </Text>
                  </Space>
                }
              />
            </CVItem>
          )}
        />
      )}
      <UploadCVButton
        type="primary"
        icon={<UploadOutlined />}
        onClick={onUploadFile}
        block
        disabled={resumeFiles?.length >= 3}
      >
        Đăng tải tệp CV
      </UploadCVButton>
    </StyledCard>
  );
};

export default CVManagementCard;
