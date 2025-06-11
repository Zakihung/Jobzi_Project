import React from "react";
import { Modal, Button, Typography, Space } from "antd";
import { LockOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginRequiredModal.css";

const { Title, Text } = Typography;

const LoginRequiredModal = ({ visible, onCancel }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Điều hướng đến trang đăng nhập
    onCancel(); // Đóng modal
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
      closable
      closeIcon={<CloseOutlined className="modal-close-icon" />}
      className="login-required-modal"
    >
      <div className="modal-content">
        <div className="modal-icon">
          <LockOutlined />
        </div>
        <Title level={3} className="modal-title">
          Yêu cầu đăng nhập
        </Title>
        <Text className="modal-description">
          Vui lòng đăng nhập để sử dụng chức năng này.
        </Text>
        <Space className="modal-buttons">
          <Button
            type="primary"
            size="large"
            className="login-button"
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
          <Button size="large" className="cancel-button" onClick={onCancel}>
            Hủy
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default LoginRequiredModal;
