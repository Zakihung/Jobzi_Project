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
  padding: 16px; /* Giảm padding trên màn hình nhỏ */

  @media (max-width: 576px) {
    padding: 12px;
  }
`;

const StyledMenu = styled(Menu)`
  && {
    border-radius: 12px;
    padding: 8px 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

    .ant-dropdown-menu-item {
      padding: 8px 12px;
      font-size: 13px; /* Giảm font-size trên màn hình nhỏ */
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
    font-size: 18px; /* Giảm font-size trên màn hình nhỏ */
    color: #595959;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f0f0f0;
    }

    @media (max-width: 576px) {
      font-size: 16px;
    }
  }
`;

const CVManagementTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  margin-bottom: 12px !important;

  @media (max-width: 576px) {
    font-size: 14px !important;
  }
`;

const CVItem = styled(List.Item)`
  padding: 10px 0;
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
    gap: 6px; /* Giảm gap trên màn hình nhỏ */
  }

  .ant-list-item-action .ant-btn {
    padding: 0 6px;
    font-size: 12px;
    line-height: 22px;
  }

  .ant-list-item-action .anticon {
    font-size: 16px; /* Giảm kích thước icon */
  }

  @media (max-width: 576px) {
    font-size: 13px;
    padding: 8px 0;
  }
`;

const CVIcon = styled(FileTextOutlined)`
  color: #577cf6;
  font-size: 18px; /* Giảm kích thước icon trên màn hình nhỏ */

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

const UploadCVButton = styled(Button)`
  background: #577cf6 !important;
  border-color: #577cf6 !important;
  border-radius: 8px;
  font-weight: 600;
  height: 36px; /* Giảm chiều cao nút */
  margin-top: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: #4c6ef5 !important;
    border-color: #4c6ef5 !important;
    box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
  }

  @media (max-width: 576px) {
    height: 32px;
    font-size: 13px;
  }
`;

const CVManagementCard = ({
  resumeFiles,
  isLoading,
  onPreviewFile,
  onEditFile,
  onDeleteFile,
  onUploadFile,
}) => {
  const isPreviewable = (file) => {
    if (!file.path) return false;
    const extension = file.path.split(".").pop()?.toLowerCase();
    const supportedFormats = ["pdf", "jpg", "jpeg", "png"];
    const isRawFile = file.path.includes("/raw/upload/");
    return supportedFormats.includes(extension) || isRawFile;
  };

  return (
    <StyledCard>
      <CVManagementTitle level={5}>
        Quản lý tệp CV ({resumeFiles?.length || 0} tệp)
      </CVManagementTitle>
      {isLoading ? (
        <List
          dataSource={[1, 2, 3]} // Hiển thị 3 skeleton items
          renderItem={() => (
            <CVItem>
              <List.Item.Meta
                avatar={<Skeleton.Avatar active size="default" />}
                title={
                  <Skeleton.Input active size="small" style={{ width: 100 }} />
                }
                description={
                  <Skeleton.Input active size="small" style={{ width: 150 }} />
                }
              />
              <div className="ant-list-item-action">
                <Skeleton.Button active size="small" style={{ width: 50 }} />
                <Skeleton.Button active size="small" style={{ width: 30 }} />
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
                      <Menu.Item
                        key="preview"
                        onClick={() =>
                          isPreviewable(file) && onPreviewFile(file)
                        }
                        disabled={!isPreviewable(file)}
                      >
                        Xem trước
                      </Menu.Item>
                      <Menu.Item key="edit" onClick={() => onEditFile(file)}>
                        Sửa tên
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
                      Ngày tải lên: {dayjs(file.createdAt).format("DD-MM-YYYY")}
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
      >
        Đăng tải tệp CV
      </UploadCVButton>
    </StyledCard>
  );
};

export default CVManagementCard;
