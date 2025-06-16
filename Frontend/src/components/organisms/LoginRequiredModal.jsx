import React from "react";
import { Modal, Button, Typography, Space } from "antd";
import { LockOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/LoginRequiredModal.module.css";

const { Title, Text } = Typography;

const LoginRequiredModal = ({ visible, onCancel }) => {
  const navigate = useNavigate();

  // Xử lý điều hướng đến trang đăng nhập
  const handleLogin = () => {
    navigate("/login");
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
      closable
      closeIcon={<CloseOutlined className={styles.modalCloseIcon} />}
      className={styles.loginRequiredModal}
      wrapClassName={styles.modalWrapper}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalIcon}>
          <LockOutlined />
        </div>
        <Title level={3} className={styles.modalTitle}>
          Tài khoản chưa đăng nhập
        </Title>
        <Text className={styles.modalDescription}>
          Vui lòng đăng nhập để sử dụng tính năng này.
        </Text>
        <Space className={styles.modalButtons}>
          <Button
            size="large"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            size="large"
            className={styles.loginButton}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default LoginRequiredModal;
