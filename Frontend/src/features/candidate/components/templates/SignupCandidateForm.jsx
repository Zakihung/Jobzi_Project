import { Form, Input, Button, Typography, Space, Checkbox } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "../../styles/SignupCandidateForm.module.css";

const { Title, Text } = Typography;

const SignupCandidateForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className={styles.signupContainer}>
      {/* Left side - Image/Illustration */}
      <div className={styles.signupImageSection}>
        <div className={styles.imageContent}>
          <div className={styles.illustrationWrapper}>
            <img
              src="/src/assets/logo/logo_ngang.png"
              alt="Signup Illustration"
              className={styles.signupIllustration}
            />
          </div>
          <div className={styles.imageText}>
            <Title level={2} className={styles.imageTitle}>
              Bắt đầu hành trình mới cùng chúng tôi
            </Title>
            <Text className={styles.imageDescription}>
              Tham gia cộng đồng hàng triệu ứng viên và nhà tuyển dụng. Tạo hồ
              sơ của bạn và khám phá những cơ hội việc làm tuyệt vời đang chờ
              đón!
            </Text>
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className={styles.signupFormSection}>
        <div className={styles.formWrapper}>
          {/* Logo */}
          <div className={styles.logoSignupSection}>
            <img
              src="/src/assets/logo/logo.png"
              alt="Logo"
              className={styles.logoSignup}
            />
          </div>

          {/* Welcome Header */}
          <div className={styles.welcomeHeader}>
            <Title level={1} className={styles.welcomeTitle}>
              Tạo tài khoản mới
            </Title>
            <Text className={styles.welcomeSubtitle}>
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
            className={styles.signupForm}
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
                prefix={<UserOutlined className={styles.inputIcon} />}
                placeholder="Nhập họ và tên đầy đủ"
                className={styles.customInput}
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
                prefix={<MailOutlined className={styles.inputIcon} />}
                placeholder="Nhập địa chỉ email"
                className={styles.customInput}
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
                prefix={<LockOutlined className={styles.inputIcon} />}
                placeholder="Tạo mật khẩu mạnh"
                className={styles.customInput}
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
                prefix={<LockOutlined className={styles.inputIcon} />}
                placeholder="Nhập lại mật khẩu"
                className={styles.customInput}
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
              <Checkbox className={styles.agreementCheckbox}>
                Tôi đồng ý với{" "}
                <a href="/terms" className={styles.termsLink}>
                  Điều khoản sử dụng
                </a>{" "}
                và{" "}
                <a href="/privacy" className={styles.termsLink}>
                  Chính sách bảo mật
                </a>
              </Checkbox>
            </Form.Item>

            {/* Signup Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.signupButton}
                block
              >
                Tạo tài khoản
              </Button>
            </Form.Item>

            {/* Signin link */}
            <div className={styles.signinSection}>
              <Text className={styles.signinText}>
                Đã có tài khoản?
                <a href="/signin" className={styles.signinLink}>
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
