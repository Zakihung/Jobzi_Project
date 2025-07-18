import { Form, Input, Button, Typography, Alert } from "antd";
import {
  MailOutlined,
  LockOutlined,
  ArrowLeftOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useSignin } from "../../../auth/hooks/useSignin";
import styles from "../../styles/SigninCandidateForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const SigninCandidateForm = () => {
  const navigate = useNavigate();
  const signinMutation = useSignin();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = (values) => {
    setErrorMessage("");
    setIsSubmitting(true); // bật loading thủ công

    signinMutation.mutate(values, {
      onError: (error) => {
        setErrorMessage(
          error.errorMessage || "Email hoặc mật khẩu không chính xác!"
        );
        setTimeout(() => setIsSubmitting(false), 1500); // giữ loading tối thiểu 1.5s
      },
      onSuccess: () => {
        // loading sẽ được ẩn sau khi chuyển trang trong useSignin.js
        // nhưng vẫn giữ ít nhất 1.5s
        setTimeout(() => {
          setIsSubmitting(false);
        }, 1500);
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
              Chào mừng đến với tương lai nghề nghiệp của bạn
            </Title>
            <Text className={styles.imageDescription}>
              Khám phá hàng ngàn cơ hội việc làm phù hợp với kỹ năng và đam mê
              của bạn. Hãy bắt đầu hành trình tìm kiếm công việc mơ ước ngay hôm
              nay!
            </Text>
          </div>
        </div>
      </div>

      {/* Right side - Signin Form */}
      <div className={styles.signinFormSection}>
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
              Đăng nhập để tiếp tục hành trình tìm việc của bạn
            </Text>
          </div>

          {/* Signin Form */}
          <Form
            name="signinForm"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className={styles.signinForm}
            disabled={signinMutation.isLoading}
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
                loading={false}
                disabled={isSubmitting}
                block
              >
                {isSubmitting ? (
                  <>
                    <LoadingOutlined style={{ marginRight: 8 }} />
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng Nhập"
                )}
              </Button>
            </Form.Item>

            {/* Sign up link */}
            <div className={styles.signupSection}>
              <Text className={styles.signupText}>
                Chưa có tài khoản?
                <a href="/signup" className={styles.signupLink}>
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

export default SigninCandidateForm;
