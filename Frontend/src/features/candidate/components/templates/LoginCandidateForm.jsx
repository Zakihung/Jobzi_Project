import React from "react";
import { Form, Input, Button, Typography, Space } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import "../../styles/LoginCandidateForm.css";

const { Title, Text } = Typography;

const LoginCandidateForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="login-container">
      {/* Left side - Image/Illustration */}
      <div className="login-image-section">
        <div className="image-content">
          <div className="illustration-wrapper">
            <img
              src="/src/assets/logo/logo_ngang.png"
              alt="Login Illustration"
              className="login-illustration"
            />
          </div>
          <div className="image-text">
            <Title level={2} className="image-title">
              Chào mừng đến với tương lai nghề nghiệp của bạn
            </Title>
            <Text className="image-description">
              Khám phá hàng ngàn cơ hội việc làm phù hợp với kỹ năng và đam mê
              của bạn. Hãy bắt đầu hành trình tìm kiếm công việc mơ ước ngay hôm
              nay!
            </Text>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="login-form-section">
        <div className="form-wrapper">
          {/* Logo */}
          <div className="logo-section">
            <img src="/src/assets/logo/logo.png" alt="Logo" className="logo" />
          </div>

          {/* Welcome Header */}
          <div className="welcome-header">
            <Title level={1} className="welcome-title">
              Chào mừng bạn quay trở lại
              <span className="wave-emoji">👋</span>
            </Title>
            <Text className="welcome-subtitle">
              Đăng nhập để tiếp tục hành trình tìm việc của bạn
            </Text>
          </div>

          {/* Login Form */}
          <Form
            form={form}
            name="loginForm"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className="login-form"
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
                prefix={<MailOutlined className="input-icon" />}
                placeholder="Nhập email của bạn"
                className="custom-input"
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
                prefix={<LockOutlined className="input-icon" />}
                placeholder="Nhập mật khẩu của bạn"
                className="custom-input"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                block
              >
                Đăng nhập
              </Button>
            </Form.Item>

            {/* Divider */}
            {/* <div className="divider">
              <span className="divider-text">hoặc</span>
            </div> */}

            {/* Google Login */}
            {/* <Button
              className="google-login-button"
              block
              icon={
                <img
                  src="/src/assets/icons/google.png"
                  alt="Google"
                  className="google-icon"
                />
              }
            >
              Đăng nhập bằng Google
            </Button> */}

            {/* Sign up link */}
            <div className="signup-section">
              <Text className="signup-text">
                Chưa có tài khoản?
                <a href="/signup" className="signup-link">
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

export default LoginCandidateForm;
