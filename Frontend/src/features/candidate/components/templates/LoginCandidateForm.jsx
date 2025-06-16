import React, { useContext, useState } from "react";
import { Form, Input, Button, Typography, Space, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../../contexts/auth.context";
import styles from "../../styles/LoginCandidateForm.module.css";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

// Dữ liệu mẫu cho việc đăng nhập (thay thế database tạm thời)
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@jobzi.com",
    password: "123456",
    role: "admin",
    full_name: "Quản trị viên",
    gender: "male",
    avatar:
      "https://res.cloudinary.com/luanvancloudinary/image/upload/v1749575123/user_avatars/gomoterxywkcwoaslewj.jpg",
    date_of_birth: "1990-01-01",
    phone_number: "0901234567",
    token: "mock_admin_token_123",
  },
  {
    id: "2",
    email: "user@jobzi.com",
    password: "123456",
    role: "candidate",
    full_name: "Nguyễn Phước Hưng",
    gender: "male",
    avatar:
      "https://res.cloudinary.com/luanvancloudinary/image/upload/v1749575123/user_avatars/gomoterxywkcwoaslewj.jpg",
    date_of_birth: "1995-05-15",
    phone_number: "0907654321",
    token: "mock_user_token_456",
  },
  {
    id: "3",
    email: "employer@jobzi.com",
    password: "123456",
    role: "employer",
    full_name: "Nguyễn Phước Hưng",
    gender: "male",
    avatar:
      "https://res.cloudinary.com/luanvancloudinary/image/upload/v1749575123/user_avatars/gomoterxywkcwoaslewj.jpg",
    date_of_birth: "1985-03-20",
    phone_number: "0909876543",
    token: "mock_employer_token_789",
  },
];

const LoginCandidateForm = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const { setAuth, setLoading } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Hàm mô phỏng API đăng nhập
  const mockLoginAPI = async (email, password) => {
    // Mô phỏng thời gian chờ API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Tìm user trong dữ liệu mẫu
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      return {
        success: true,
        data: user,
        message: "Đăng nhập thành công!",
      };
    } else {
      return {
        success: false,
        message: "Email hoặc mật khẩu không chính xác!",
      };
    }
  };

  const onFinish = async (values) => {
    setIsSubmitting(true);
    setLoading(true);

    try {
      const result = await mockLoginAPI(values.email, values.password);

      if (result.success) {
        // Cập nhật trạng thái đăng nhập
        setAuth({
          isAuthenticated: true,
          user: result.data,
        });

        // Hiển thị thông báo thành công
        message.success(result.message);

        // Gọi callback onSuccess nếu có
        if (onSuccess) {
          onSuccess(result.data);
        }

        // Có thể redirect hoặc đóng modal
        console.log("Đăng nhập thành công");
        navigate("/");
      } else {
        // Hiển thị lỗi
        message.error(result.message);
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      message.error("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // const handleForgotPassword = () => {
  //   message.info("Chức năng quên mật khẩu sẽ được cập nhật sau!");
  //   // Có thể mở modal quên mật khẩu hoặc chuyển hướng
  // };

  const handleSignUp = () => {
    if (onCancel) {
      onCancel(); // Đóng modal đăng nhập
    }
    // Chuyển đến trang đăng ký hoặc mở modal đăng ký
    console.log("Chuyển đến trang đăng ký");
  };

  return (
    <div className={styles.loginContainer}>
      {/* Left side - Image/Illustration */}
      <div className={styles.loginImageSection}>
        <div className={styles.imageContent}>
          <div className={styles.illustrationWrapper}>
            <img
              src="/src/assets/logo/logo_ngang.png"
              alt="Login Illustration"
              className={styles.loginIllustration}
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
              Chào mừng bạn quay trở lại
            </Title>
            <Text className={styles.welcomeSubtitle}>
              Đăng nhập để tiếp tục hành trình tìm việc của bạn
            </Text>
          </div>

          {/* Demo Accounts Info */}
          <div
            style={{
              background: "#f6ffed",
              border: "1px solid #b7eb8f",
              borderRadius: "6px",
              padding: "12px",
              marginBottom: "20px",
            }}
          >
            <Text strong style={{ color: "#52c41a", fontSize: "14px" }}>
              🎯 Tài khoản demo:
            </Text>
            <div style={{ fontSize: "12px", marginTop: "8px", color: "#666" }}>
              <div>👨‍💼 Admin: admin@jobzi.com / 123456</div>
              <div>🙋‍♂️ Ứng viên: user@jobzi.com / 123456</div>
              <div>🏢 Nhà tuyển dụng: employer@jobzi.com / 123456</div>
            </div>
          </div>

          {/* Login Form */}
          <Form
            form={form}
            name="loginForm"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className={styles.loginForm}
            initialValues={{
              email: "", // Có thể đặt email mặc định để test
              password: "",
            }}
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
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
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
                className={styles.loginButton}
                loading={isSubmitting}
                block
              >
                {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </Form.Item>

            {/* Sign up link */}
            <div className={styles.signupSection}>
              <Text className={styles.signupText}>
                Chưa có tài khoản?
                <Button
                  type="link"
                  onClick={handleSignUp}
                  className={styles.signupLink}
                  style={{ padding: "0 0 0 8px" }}
                >
                  Đăng ký ngay
                </Button>
              </Text>
            </div>
          </Form>

          {/* Quick Login Buttons for Demo */}
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #f0f0f0",
              paddingTop: "16px",
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                color: "#999",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Đăng nhập nhanh (Demo):
            </Text>
            <Space direction="vertical" style={{ width: "100%" }} size="small">
              <Button
                size="small"
                block
                onClick={() =>
                  form.setFieldsValue({
                    email: "admin@jobzi.com",
                    password: "123456",
                  })
                }
              >
                👨‍💼 Đăng nhập Admin
              </Button>
              <Button
                size="small"
                block
                onClick={() =>
                  form.setFieldsValue({
                    email: "user@jobzi.com",
                    password: "123456",
                  })
                }
              >
                🙋‍♂️ Đăng nhập Ứng viên
              </Button>
              <Button
                size="small"
                block
                onClick={() =>
                  form.setFieldsValue({
                    email: "employer@jobzi.com",
                    password: "123456",
                  })
                }
              >
                🏢 Đăng nhập Nhà tuyển dụng
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCandidateForm;
