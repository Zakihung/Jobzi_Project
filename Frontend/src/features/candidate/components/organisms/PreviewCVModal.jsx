import React, { useState } from "react";
import { Modal, Spin } from "antd";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }

  .ant-modal-header {
    border-radius: 16px 16px 0 0;
  }

  .ant-btn {
    border-radius: 8px;
  }

  @media (max-width: 576px) {
    .ant-modal {
      width: 90% !important;
      margin: 0 auto;
    }
  }
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
`;

const PreviewIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const ErrorMessage = styled.p`
  color: #ff4d4f;
  text-align: center;
  font-size: 16px;
  margin: 20px 0;
`;

const PreviewCVModal = ({ visible, onCancel, previewUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isPDF = previewUrl && previewUrl.toLowerCase().endsWith(".pdf");
  const isImage = previewUrl && /\.(jpg|jpeg|png)$/i.test(previewUrl);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <StyledModal
      title="Xem tệp CV"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
    >
      <PreviewContainer>
        {previewUrl ? (
          isLoading && <Spin size="large" tip="Đang tải CV..." />
        ) : (
          <ErrorMessage>Không có file để hiển thị</ErrorMessage>
        )}
        {previewUrl && isPDF && (
          <PreviewIframe
            src={previewUrl}
            title="CV Preview"
            onLoad={handleIframeLoad}
            style={{ display: isLoading ? "none" : "block" }}
          />
        )}
        {previewUrl && isImage && (
          <PreviewImage
            src={previewUrl}
            alt="CV Preview"
            onLoad={handleImageLoad}
            style={{ display: isLoading ? "none" : "block" }}
          />
        )}
        {previewUrl && !isPDF && !isImage && (
          <ErrorMessage>Định dạng file không được hỗ trợ</ErrorMessage>
        )}
      </PreviewContainer>
    </StyledModal>
  );
};

export default PreviewCVModal;
