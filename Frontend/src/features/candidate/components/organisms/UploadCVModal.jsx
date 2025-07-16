import React from "react";
import { Modal, Upload, Space, Button, Input, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Text } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }

  .ant-modal-body {
    padding: 16px;
  }

  .ant-space {
    width: 100%;
  }

  .ant-space:last-child {
    display: flex;
    justify-content: flex-end;
  }

  .ant-input {
    margin-bottom: 16px;
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

const UploadDragger = styled(Upload.Dragger)`
  &.ant-upload-drag {
    border: 2px dashed #d6e4ff !important;
    border-radius: 12px !important;
    background: #f6f8ff !important;
    padding: 48px !important;
    transition: all 0.3s ease;
    min-height: 200px;
  }

  &.ant-upload-drag:hover {
    border-color: #577cf6 !important;
    background: #f0f4ff !important;
  }

  &.ant-upload-drag.ant-upload-drag-hover {
    border-color: #577cf6 !important;
    background: #e6f0ff !important;
  }

  &.ant-upload-drag:not(.ant-upload-disabled):hover {
    border-color: #577cf6 !important;
  }

  .ant-upload-drag-container {
    padding: 24px;
  }

  .ant-upload-drag-icon {
    font-size: 48px !important;
    color: #577cf6 !important;
    margin-bottom: 16px !important;
  }

  .ant-upload-text {
    font-size: 18px !important;
    font-weight: 600 !important;
    color: #1a1a1a !important;
    margin: 16px 0 !important;
  }

  .ant-upload-hint {
    font-size: 16px !important;
    color: #666 !important;
    margin: 0 !important;
  }

  /* Responsive styles */
  @media (max-width: 576px) {
    &.ant-upload-drag {
      padding: 32px !important;
      min-height: 160px;
    }

    .ant-upload-drag-icon {
      font-size: 36px !important;
    }

    .ant-upload-text {
      font-size: 16px !important;
    }

    .ant-upload-hint {
      font-size: 14px !important;
    }
  }

  /* Disabled state */
  &.ant-upload-drag.ant-upload-disabled {
    background: #f5f5f5 !important;
    border-color: #d9d9d9 !important;

    .ant-upload-drag-icon {
      color: #bfbfbf !important;
    }

    .ant-upload-text {
      color: #bfbfbf !important;
    }

    .ant-upload-hint {
      color: #bfbfbf !important;
    }
  }
`;

const UploadCVModal = ({
  visible,
  onCancel,
  selectedFile,
  fileName,
  onFileNameChange,
  onUploadChange,
  onUploadFile,
  isUploading,
}) => {
  return (
    <StyledModal
      title="Đăng tải CV"
      visible={visible}
      footer={null}
      onCancel={onCancel}
      width={700}
      centered
    >
      <Space direction="vertical" size={24} style={{ width: "100%" }}>
        <UploadDragger
          name="cvFile"
          accept=".pdf"
          maxCount={1}
          onChange={onUploadChange}
          beforeUpload={() => false}
          disabled={isUploading}
          fileList={selectedFile ? [selectedFile] : []}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Kéo và thả tệp CV tại đây</p>
          <p className="ant-upload-hint">Hỗ trợ định dạng .pdf</p>
        </UploadDragger>
        {selectedFile && (
          <>
            <Text>Tên tệp:</Text>
            <Input
              value={fileName}
              onChange={(e) => onFileNameChange(e.target.value)}
              placeholder="Nhập tên tệp (mặc định: tên file gốc)"
            />
            <Space style={{ justifyContent: "flex-end", width: "100%" }}>
              <Button onClick={onCancel} disabled={isUploading}>
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={onUploadFile}
                loading={isUploading}
                disabled={isUploading}
              >
                Đăng tải
              </Button>
            </Space>
          </>
        )}
      </Space>
    </StyledModal>
  );
};

export default UploadCVModal;
