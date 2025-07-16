import React from "react";
import { Modal, Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }

  .ant-btn {
    border-radius: 8px;
  }

  .ant-btn-primary {
    background: #577cf6 !important;
    border-color: #577cf6 !important;
  }

  .ant-btn-primary:hover {
    background: #4c6ef5 !important;
    border-color: #4c6ef5 !important;
  }

  .ant-btn-primary.ant-btn-dangerous {
    background: #ff4d4f !important;
    border-color: #ff4d4f !important;
  }

  .ant-btn-primary.ant-btn-dangerous:hover {
    background: #ff7875 !important;
    border-color: #ff7875 !important;
  }
`;

const DeleteCVModal = ({ visible, onCancel, onOk, isDeleting }) => {
  return (
    <StyledModal
      title="Xóa tệp CV"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true, loading: isDeleting }}
      centered
      height={300}
    >
      <Text>
        Bạn có chắc muốn xóa tệp CV này không? Hành động này không thể hoàn tác.
      </Text>
    </StyledModal>
  );
};

export default DeleteCVModal;
