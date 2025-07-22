import React, { useState } from "react";
import { Modal, Radio, Upload, Button, message, Space, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";

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

const ApplyJobModal = ({
  visible,
  onCancel,
  resumeFiles,
  onSubmit,
  isSubmitting,
  hasOnlineResume,
}) => {
  const [selectedCV, setSelectedCV] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");

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

  const handleSubmit = () => {
    if (!selectedCV) {
      message.error("Vui lòng chọn một CV để ứng tuyển!");
      return;
    }
    if (selectedCV === "new" && !newFile) {
      message.error("Vui lòng chọn file CV mới trước khi gửi!");
      return;
    }
    onSubmit({ selectedCV, newFile, newFileName });
  };

  return (
    <StyledModal
      title="Chọn CV để ứng tuyển"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={isSubmitting}
        >
          Gửi
        </Button>,
      ]}
      width={600}
      centered
    >
      <RadioGroup
        onChange={(e) => setSelectedCV(e.target.value)}
        value={selectedCV}
      >
        {hasOnlineResume && <Radio value="online">CV trực tuyến</Radio>}
        {resumeFiles?.map((file) => (
          <Radio key={file._id} value={file._id}>
            {file.name} ({new Date(file.createdAt).toLocaleDateString("vi-VN")})
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
            fileList={newFile ? [{ uid: newFile.uid, name: newFile.name }] : []}
          >
            <Button icon={<UploadOutlined />}>Chọn file PDF</Button>
          </Upload>
        </UploadWrapper>
      )}
    </StyledModal>
  );
};

export default ApplyJobModal;
