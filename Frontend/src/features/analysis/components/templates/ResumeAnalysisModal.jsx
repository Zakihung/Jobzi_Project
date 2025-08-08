import React, { useState } from "react";
import { Modal, Radio, Button, App, Typography, Spin } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

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
`;

const RadioGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

const LoadingText = styled(Text)`
  margin-top: 16px;
  font-size: 16px;
  color: #1a1a1a;
`;

const ResumeAnalysisModal = ({
  visible,
  onCancel,
  resumeFiles,
  jobPostId,
  isSubmitting,
  // hasOnlineResume,
  onSubmit,
}) => {
  const { message } = App.useApp();
  const [selectedCV, setSelectedCV] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedCV) {
      message.error("Vui lòng chọn một CV để phân tích!");
      return;
    }

    try {
      const result = await onSubmit({ selectedCV, jobPostId });
      setIsRedirecting(true);

      // Xác định resume_file_id và online_resume_id dựa trên selectedCV
      const resume_file_id = selectedCV !== "online" ? selectedCV : "null";
      result?.online_resume_id === "null";

      // Chuyển hướng đến ResumeAnalysisPage với các tham số
      navigate(`/resume-analysis/${jobPostId}/${resume_file_id}`);
      setSelectedCV(null);
    } catch (error) {
      // Lỗi đã được xử lý trong onSubmit
      message.error(`Phân tích CV thất bại: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setSelectedCV(null);
    setIsRedirecting(false);
    onCancel();
  };

  return (
    <StyledModal
      title="Chọn CV để phân tích"
      open={visible}
      onCancel={handleCancel}
      maskClosable={false}
      footer={
        isSubmitting || isRedirecting
          ? null
          : [
              <Button key="cancel" onClick={handleCancel}>
                Hủy
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleSubmit}
                disabled={isSubmitting || isRedirecting}
              >
                Phân tích
              </Button>,
            ]
      }
      width={600}
      centered
    >
      {isRedirecting ? (
        <LoadingContainer>
          <Spin size="large" />
          <LoadingText>Đang chuyển hướng</LoadingText>
        </LoadingContainer>
      ) : isSubmitting ? (
        <LoadingContainer>
          <Spin size="large" />
          <LoadingText>Đang trích xuất thông tin và phân tích</LoadingText>
          <LoadingText>
            Việc phân tích có thể mất chút thời gian. Vui lòng chờ trong ít
            phút.
          </LoadingText>
        </LoadingContainer>
      ) : (
        <RadioGroup
          onChange={(e) => setSelectedCV(e.target.value)}
          value={selectedCV}
        >
          {/* {hasOnlineResume && (
            <Radio value="online">CV trực tuyến (do Jobzi cung cấp)</Radio>
          )} */}
          {resumeFiles?.map((file) => (
            <Radio key={file._id} value={file._id}>
              {file.name} (
              {new Date(file.createdAt).toLocaleDateString("vi-VN")})
            </Radio>
          ))}
        </RadioGroup>
      )}
    </StyledModal>
  );
};

export default ResumeAnalysisModal;
