import { Form, Input, Button, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useSignin } from "../../../auth/hooks/useSignin";
import styles from "../../styles/SigninCandidateForm.module.css";

const { Title, Text } = Typography;

const SigninCandidateForm = () => {
  const { mutate: signinMutation, isLoading } = useSignin();

  const onFinish = (values) => {
    signinMutation(values);
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
            disabled={isLoading}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className={styles.inputIcon} />}
                placeholder="Nhập email của bạn"
                className={styles.customInput}
                autoComplete="email"
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
