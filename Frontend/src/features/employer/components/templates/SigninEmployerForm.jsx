import { Form, Input, Button, Typography, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useSignin } from "../../../auth/hooks/useSignin";
import styles from "../../styles/SigninEmployerForm.module.css";
import { useState } from "react";

const { Title, Text } = Typography;

const SigninEmployerForm = () => {
  const { mutate: signinMutation, isLoading } = useSignin();
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = (values) => {
    setErrorMessage(""); // Xóa thông báo lỗi trước khi gọi API
    signinMutation(values, {
      onError: (error) => {
        setErrorMessage(
          error.errorMessage || "Email hoặc mật khẩu không chính xác!"
        );
      },
    });
  };
  // Hàm xử lý khi người dùng thay đổi input
  const handleInputChange = () => {
    if (errorMessage) {
      setErrorMessage(""); // Xóa thông báo lỗi khi người dùng bắt đầu nhập lại
    }
  };

  return (
    <div className={styles.signinContainer}>
      {/* Left side - Image/Illustration */}
      <div className={styles.signinImageSection}>
        <div className={styles.imageContent}>
          <div className={styles.illustrationWrapper}>
            <img
              src="/src/assets/logo/logo_ngang.png"
              alt="Signin Illustration"
              className={styles.signinIllustration}
            />
          </div>
          <div className={styles.imageText}>
            <Title level={2} className={styles.imageTitle}>
              Tìm kiếm nhân tài cho doanh nghiệp của bạn
            </Title>
            <Text className={styles.imageDescription}>
              Đăng nhập để tiếp cận hàng ngàn ứng viên tiềm năng, quản lý tin
              tuyển dụng, và xây dựng đội ngũ mơ ước cho công ty của bạn.
            </Text>
          </div>
        </div>
      </div>

      {/* Right side - Signin Form */}
      <div className={styles.signinFormSection}>
        <div className={styles.formWrapper}>
          {/* Logo */}
          <div className={styles.logoSigninSection}>
            <img
              src="/src/assets/logo/logo.png"
              alt="Logo"
              className={styles.logoSignin}
            />
          </div>

          {/* Welcome Header */}
          <div className={styles.welcomeHeader}>
            <Title level={1} className={styles.welcomeTitle}>
              Chào mừng bạn quay trở lại
            </Title>
            <Text className={styles.welcomeSubtitle}>
              Truy cập tài khoản để quản lý tuyển dụng hiệu quả
            </Text>
          </div>

          {/* Signin Form */}
          <Form
            name="signinForm"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className={styles.signinForm}
            disabled={isLoading}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Định dạng email không đúng!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className={styles.inputIcon} />}
                placeholder="Nhập email của bạn"
                className={styles.customInput}
                autoComplete="email"
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className={styles.inputIcon} />}
                placeholder="Nhập mật khẩu của bạn"
                className={styles.customInput}
                autoComplete="current-password"
                onChange={handleInputChange}
              />
            </Form.Item>

            {/* Forgot Password Link */}
            {/* <div style={{ textAlign: "right", marginBottom: "16px" }}>
              <Button
                type="link"
                onClick={handleForgotPassword}
                style={{ padding: 0, fontSize: "14px" }}
              >
                Quên mật khẩu?
              </Button>
            </div> */}

            {/* Hiển thị thông báo lỗi */}
            {errorMessage && (
              <Alert message={errorMessage} type="error" showIcon />
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.signinButton}
                isLoading={isLoading}
                block
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
              </Button>
            </Form.Item>

            {/* Sign up link */}
            <div className={styles.signupSection}>
              <Text className={styles.signupText}>
                Chưa có tài khoản?
                <a href="/employer-signup" className={styles.signupLink}>
                  Đăng ký ngay
                </a>
              </Text>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SigninEmployerForm;
