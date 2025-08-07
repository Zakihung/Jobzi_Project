import React, { useState } from "react";
import { Modal, Radio, Upload, Button, App, Typography, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
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

const UploadWrapper = styled.div`
  margin-top: 16px;
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

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ApplyJobModal = ({
  visible,
  onCancel,
  resumeFiles,
  onSubmit,
  isSubmitting,
  hasOnlineResume,
  onlineResume,
}) => {
  const { message, modal } = App.useApp();
  const [selectedCV, setSelectedCV] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleUploadChange = ({ file }) => {
    if (file.status === "done") {
      message.success(`${file.name} đã được chọn để tải lên.`);
      setNewFile(file);
      setNewFileName(file.name);
      setSelectedCV("new");
    } else if (file.status === "error") {
      message.error(`${file.name} tải lên thất bại.`);
    } else {
      setNewFile(file);
      setNewFileName(file.name);
    }
  };

  const checkOnlineResumeFields = () => {
    if (!onlineResume?.data) return 0;
    const fields = [
      onlineResume.data.jobExpectations,
      onlineResume.data.education,
      onlineResume.data.highlights,
      onlineResume.data.workExperience,
      onlineResume.data.projects,
      onlineResume.data.skills,
    ];
    return fields.filter((field) => Array.isArray(field) && field.length > 0)
      .length;
  };

  const handleSubmit = async () => {
    if (!selectedCV) {
      message.error("Vui lòng chọn một CV để ứng tuyển!");
      return;
    }
    if (selectedCV === "new" && !newFile) {
      message.error("Vui lòng chọn file CV mới trước khi gửi!");
      return;
    }
    if (selectedCV === "online") {
      const nonEmptyFields = checkOnlineResumeFields();
      if (nonEmptyFields < 2) {
        const modalInstance = modal.warning({
          title: "Thông tin CV trực tuyến chưa đủ",
          content: (
            <div>
              Vui lòng bổ sung thông tin vào CV trực tuyến để có thể ứng tuyển
              bằng hình thức này!
            </div>
          ),
          centered: true,
          footer: (
            <FooterWrapper>
              <Button key="cancel" onClick={() => modalInstance.destroy()}>
                Đóng
              </Button>
              <Button
                key="fillMore"
                type="primary"
                onClick={() => {
                  modalInstance.destroy();
                  navigate("/online-resume");
                }}
              >
                Bổ sung ngay
              </Button>
            </FooterWrapper>
          ),
        });
        return;
      }
    }

    try {
      await onSubmit({ selectedCV, newFile, newFileName });
      setIsRedirecting(true);
      setTimeout(() => {
        navigate("/profile");
      }, 1000); // Chuyển hướng sau 1 giây
      setSelectedCV(null);
      setNewFile(null);
      setNewFileName("");
    } catch {
      // Lỗi đã được xử lý trong onSubmit (useCreateApplication)
    }
  };

  const handleCancel = () => {
    setSelectedCV(null);
    setNewFile(null);
    setNewFileName("");
    setIsRedirecting(false);
    onCancel();
  };

  return (
    <StyledModal
      title="Chọn CV để ứng tuyển"
      open={visible}
      onCancel={handleCancel}
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
                Gửi
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
          <LoadingText>Đang xử lý ứng tuyển</LoadingText>
        </LoadingContainer>
      ) : (
        <>
          <RadioGroup
            onChange={(e) => setSelectedCV(e.target.value)}
            value={selectedCV}
          >
            {hasOnlineResume && (
              <Radio value="online">CV trực tuyến (do Jobzi cung cấp)</Radio>
            )}
            {resumeFiles?.map((file) => (
              <Radio key={file._id} value={file._id}>
                {file.name} (
                {new Date(file.createdAt).toLocaleDateString("vi-VN")})
              </Radio>
            ))}
            <Radio value="new">Tải lên CV mới</Radio>
          </RadioGroup>
          {selectedCV === "new" && (
            <UploadWrapper>
              <Upload
                accept=".pdf"
                beforeUpload={() => false} // Ngăn upload tự động
                onChange={handleUploadChange}
                fileList={
                  newFile ? [{ uid: newFile.uid, name: newFile.name }] : []
                }
              >
                <Button icon={<UploadOutlined />}>Chọn file PDF</Button>
              </Upload>
            </UploadWrapper>
          )}
        </>
      )}
    </StyledModal>
  );
};

export default ApplyJobModal;
