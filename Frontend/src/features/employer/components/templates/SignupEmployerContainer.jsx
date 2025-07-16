import { Button, Typography } from "antd";
import styles from "../../styles/SignupEmployerContainer.module.css";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import RoleSelectionModal from "../templates/RoleSelectionModal";
import { useLocation, useNavigate } from "react-router-dom";
import Stepcard from "../organisms/StepCard";

const { Title, Text } = Typography;

const SignupEmployerContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalVisible, setModalVisible] = useState(
    location.state?.showRoleModal || false
  );

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.signupContainer}>
      <RoleSelectionModal visible={modalVisible} onClose={handleModalClose} />
      {/* Left side - Image/Illustration */}
      <div className={styles.signupImageSection}>
        <div className={styles.imageContent}>
          <div className={styles.illustrationWrapper}>
            <img
              src="src/assets/logo/logo_ngang.png"
              alt="Signup Illustration"
              className={styles.signupIllustration}
            />
          </div>
          <div className={styles.imageText}>
            <Title level={2} className={styles.imageTitle}>
              Tuyển dụng hiệu quả cùng chúng tôi
            </Title>
            <Text className={styles.imageDescription}>
              Tiếp cận hàng triệu ứng viên tiềm năng. Tạo tài khoản nhà tuyển
              dụng và đăng tin tuyển dụng ngay hôm nay để tìm được nhân tài phù
              hợp!
            </Text>
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className={styles.signupFormSection}>
        {/* Back to Home Button */}
        <div className={styles.backToHomeFloating}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/")}
            className={styles.backToHomeButton}
          >
            Về trang chủ
          </Button>
        </div>
        <div className={styles.formWrapper}>
          {/* Logo */}
          <div className={styles.logoSignupSection}>
            <img
              src="/src/assets/logo/logo_ngang.png"
              alt="Logo"
              className={styles.logoSignup}
            />
          </div>

          {/* Welcome Header */}
          <div className={styles.welcomeHeader}>
            <Title level={1} className={styles.welcomeTitle}>
              Tạo tài khoản nhà tuyển dụng
            </Title>
            <Text className={styles.welcomeSubtitle}>
              Chỉ vài bước để bắt đầu hành trình tìm kiếm ứng viên phù hợp
            </Text>
          </div>

          {/* Stepcard Component */}
          <Stepcard />

          {/* Signin link */}
          <div className={styles.signinSection}>
            <Text className={styles.signinText}>
              Đã có tài khoản?{" "}
              <a href="/employer-signin" className={styles.signinLink}>
                Đăng nhập ngay
              </a>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupEmployerContainer;
