import React from "react";
import { Modal, Input } from "antd";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }

  .ant-input {
    border-radius: 8px;
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
`;

const EditCVModal = ({
  visible,
  onCancel,
  onOk,
  fileName,
  onFileNameChange,
}) => {
  return (
    <StyledModal
      title="Chỉnh sửa tên tệp CV"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy"
      centered
      height={300}
    >
      <Input
        value={fileName}
        onChange={(e) => onFileNameChange(e.target.value)}
        placeholder="Nhập tên tệp mới"
      />
    </StyledModal>
  );
};

export default EditCVModal;
