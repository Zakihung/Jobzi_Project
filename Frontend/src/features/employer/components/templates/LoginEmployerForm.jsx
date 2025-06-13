import React from "react";
import { Form, Input, Button, Typography, Space } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import styles from "../../styles/LoginEmployerForm.module.css";

const { Title, Text } = Typography;

const LoginEmployerForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Employer login submitted:", values);
  };

  return (
    <div className={styles.loginContainer}>
      {/* Left side - Image/Illustration */}
      <div className={styles.loginImageSection}>
        <div className={styles.imageContent}>
          <div className={styles.illustrationWrapper}>
            <img
              src="/src/assets/logo/logo_ngang.png"
              alt="Employer Login Illustration"
              className={styles.loginIllustration}
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

      {/* Right side - Login Form */}
      <div className={styles.loginFormSection}>
        <div className={styles.formWrapper}>
          {/* Logo */}
          <div className={styles.logoLoginSection}>
            <img
              src="/src/assets/logo/logo.png"
              alt="Logo"
              className={styles.logoLogin}
            />
          </div>

          {/* Welcome Header */}
          <div className={styles.welcomeHeader}>
            <Title level={1} className={styles.welcomeTitle}>
              Đăng nhập nhà tuyển dụng
            </Title>
            <Text className={styles.welcomeSubtitle}>
              Truy cập tài khoản để quản lý tuyển dụng hiệu quả
            </Text>
          </div>

          {/* Login Form */}
          <Form
            form={form}
            name="employerLoginForm"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className={styles.loginForm}
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
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className={styles.inputIcon} />}
                placeholder="Nhập mật khẩu của bạn"
                className={styles.customInput}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginButton}
                block
              >
                Đăng nhập
              </Button>
            </Form.Item>

            {/* Sign up link */}
            <div className={styles.signupSection}>
              <Text className={styles.signupText}>
                Chưa có tài khoản nhà tuyển dụng?
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

export default LoginEmployerForm;
