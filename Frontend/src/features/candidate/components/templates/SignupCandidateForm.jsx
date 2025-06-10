import { Form, Input, Button, Typography, Space, Checkbox } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import "../../styles/SignupCandidateForm.css";

const { Title, Text } = Typography;

const SignupCandidateForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="signup-container">
      {/* Left side - Image/Illustration */}
      <div className="signup-image-section">
        <div className="image-content">
          <div className="illustration-wrapper">
            <img
              src="/src/assets/logo/logo_ngang.png"
              alt="Signup Illustration"
              className="signup-illustration"
            />
          </div>
          <div className="image-text">
            <Title level={2} className="image-title">
              Bắt đầu hành trình mới cùng chúng tôi
            </Title>
            <Text className="image-description">
              Tham gia cộng đồng hàng triệu ứng viên và nhà tuyển dụng. Tạo hồ
              sơ của bạn và khám phá những cơ hội việc làm tuyệt vời đang chờ
              đón!
            </Text>
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="signup-form-section">
        <div className="form-wrapper">
          {/* Logo */}
          <div className="logo-section">
            <img src="/src/assets/logo/logo.png" alt="Logo" className="logo" />
          </div>

          {/* Welcome Header */}
          <div className="welcome-header">
            <Title level={1} className="welcome-title">
              Tạo tài khoản mới
              <span className="rocket-emoji">🚀</span>
            </Title>
            <Text className="welcome-subtitle">
              Chỉ vài bước đơn giản để bắt đầu tìm kiếm công việc mơ ước
            </Text>
          </div>

          {/* Signup Form */}
          <Form
            form={form}
            name="signupForm"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className="signup-form"
            scrollToFirstError
          >
            {/* Full Name Field */}
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[
                { required: true, message: "Vui lòng nhập họ và tên!" },
                { min: 2, message: "Họ và tên phải có ít nhất 2 ký tự!" },
                { max: 50, message: "Họ và tên không được vượt quá 50 ký tự!" },
                {
                  pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
                  message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="input-icon" />}
                placeholder="Nhập họ và tên đầy đủ"
                className="custom-input"
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Định dạng email không đúng!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="input-icon" />}
                placeholder="Nhập địa chỉ email"
                className="custom-input"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message:
                    "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="input-icon" />}
                placeholder="Tạo mật khẩu mạnh"
                className="custom-input"
              />
            </Form.Item>

            {/* Confirm Password Field */}
            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="input-icon" />}
                placeholder="Nhập lại mật khẩu"
                className="custom-input"
              />
            </Form.Item>

            {/* Terms and Conditions */}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Vui lòng đồng ý với điều khoản sử dụng!")
                        ),
                },
              ]}
            >
              <Checkbox className="agreement-checkbox">
                Tôi đồng ý với{" "}
                <a href="/terms" className="terms-link">
                  Điều khoản sử dụng
                </a>{" "}
                và{" "}
                <a href="/privacy" className="terms-link">
                  Chính sách bảo mật
                </a>
              </Checkbox>
            </Form.Item>

            {/* Signup Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signup-button"
                block
              >
                Tạo tài khoản
              </Button>
            </Form.Item>

            {/* Divider */}
            {/* <div className="divider">
              <span className="divider-text">hoặc</span>
            </div> */}

            {/* Google Signup */}
            {/* <Button
              className="google-signup-button"
              block
              icon={
                <img
                  src="/src/assets/icons/google.png"
                  alt="Google"
                  className="google-icon"
                />
              }
            >
              Đăng ký bằng Google
            </Button> */}

            {/* Login link */}
            <div className="login-section">
              <Text className="login-text">
                Đã có tài khoản?
                <a href="/login" className="login-link">
                  Đăng nhập ngay
                </a>
              </Text>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupCandidateForm;
