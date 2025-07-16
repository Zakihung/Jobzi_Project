import React from "react";
import { Modal } from "antd";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }

  .ant-btn {
    border-radius: 8px;
  }
`;

const PreviewIframe = styled.iframe`
  width: 100%;
  height: 500px;
  border: none;
  border-radius: 8px;
`;

const PreviewCVModal = ({ visible, onCancel, previewUrl }) => {
  return (
    <StyledModal
      title="Xem trước CV"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
    >
      <PreviewIframe src={previewUrl} title="CV Preview" />
    </StyledModal>
  );
};

export default PreviewCVModal;
