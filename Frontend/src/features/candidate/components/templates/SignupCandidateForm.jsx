import {
  Form,
  Input,
  Button,
  Typography,
  Space,
  Checkbox,
  DatePicker,
  Row,
  Col,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  ManOutlined,
  WomanOutlined,
  ArrowLeftOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useSignup } from "../../../auth/hooks/useSignup";
import styles from "../../styles/SignupCandidateForm.module.css";
import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const SignupCandidateForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const signupMutation = useSignup(form);

  const [selectedGender, setSelectedGender] = useState("male"); // Mặc định là Nam
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = (values) => {
    setIsSubmitting(true); // bật loading thủ công
    const formattedValues = {
      full_name: values.full_name,
      email: values.email,
      gender: values.gender,
      phone_number: values.phone_number,
      password: values.password,
      role: "candidate",
      date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
    };
    signupMutation.mutate(formattedValues, {
      onSuccess: () => {
        // loading sẽ được ẩn sau khi chuyển trang trong useSignin.js
        // nhưng vẫn giữ ít nhất 1.5s
        setTimeout(() => {
          setIsSubmitting(false);
        }, 1500);
      },
    });
  };

  // Lấy ngày hiện tại và tính giới hạn tuổi
  const today = moment();
  const maxDate = today.clone().subtract(15, "years");
  const minDate = today.clone().subtract(60, "years");

  // Xử lý chọn giới tính
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    form.setFieldsValue({ gender: gender });
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
              src="/src/assets/logo/logo.png"
              alt="Logo"
              className={styles.logoSignup}
            />
          </div>

          {/* Welcome Header */}
          <div className={styles.welcomeHeader}>
            <Title level={1} className={styles.welcomeTitle}>
              Tạo tài khoản ứng viên
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
            disabled={signupMutation.isLoading}
            initialValues={{ gender: "male" }} // Thiết lập giá trị mặc định
          >
            {/* Full Name Field */}
            <Form.Item
              name="full_name"
              label="Họ và tên"
              rules={[
                { required: true, message: "Vui lòng nhập họ và tên!" },
                {
                  pattern: /^[a-zA-ZÀ-ỹ\s.-]{2,100}$/,
                  message:
                    "Họ tên chỉ được chứa chữ cái, khoảng trắng và chứa từ 2 đến 100 ký tự!",
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
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Định dạng email không đúng!",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<MailOutlined className={styles.inputIcon} />}
                placeholder="Nhập địa chỉ email"
                className={styles.customInput}
              />
            </Form.Item>

            <Row gutter={[24, 24]}>
              <Col span={12}>
                {/* Gender Field với Button */}
                <Form.Item
                  name="gender"
                  label="Giới tính"
                  rules={[
                    { required: true, message: "Vui lòng chọn giới tính!" },
                  ]}
                >
                  <div className={styles.genderButtonGroup}>
                    <Button
                      type={selectedGender === "male" ? "primary" : "default"}
                      icon={<ManOutlined />}
                      onClick={() => handleGenderSelect("male")}
                      className={`${styles.genderButton} ${
                        selectedGender === "male"
                          ? styles.genderButtonActive
                          : ""
                      }`}
                    >
                      Nam
                    </Button>
                    <Button
                      type={selectedGender === "female" ? "primary" : "default"}
                      icon={<WomanOutlined />}
                      onClick={() => handleGenderSelect("female")}
                      className={`${styles.genderButton} ${
                        selectedGender === "female"
                          ? styles.genderButtonActive
                          : ""
                      }`}
                    >
                      Nữ
                    </Button>
                  </div>
                </Form.Item>
              </Col>
              <Col span={12}>
                {/* Date of Birth Field */}
                <Form.Item
                  name="date_of_birth"
                  label="Ngày sinh"
                  rules={[
                    { required: true, message: "Vui lòng chọn ngày sinh!" },
                    {
                      validator: (_, value) =>
                        value &&
                        value.isAfter(minDate) &&
                        value.isBefore(maxDate)
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Tuổi phải từ 15 đến 60 tuổi!")
                            ),
                    },
                  ]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày sinh"
                    className={styles.customInput}
                    disabledDate={(current) =>
                      current && (current < minDate || current > maxDate)
                    }
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Phone Number Field */}
            <Form.Item
              name="phone_number"
              label="Số điện thoại cá nhân"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Số điện thoại phải gồm đúng 10 chữ số!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className={styles.inputIcon} />}
                placeholder="Nhập số điện thoại"
                className={styles.customInput}
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: (
                    <>
                      Mật khẩu phải có:
                      <ul style={{ margin: "2px 0 0 25px", padding: 0 }}>
                        <li>Ít nhất 8 ký tự</li>
                        <li>Ít nhất một chữ cái viết hoa</li>
                        <li>Ít nhất một chữ số</li>
                        <li>Ít nhất một ký tự đặc biệt</li>
                      </ul>
                    </>
                  ),
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

            {/* Signup Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.signupButton}
                block
                loading={false}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoadingOutlined style={{ marginRight: 8 }} />
                    Đang tạo tài khoản...
                  </>
                ) : (
                  "Tạo tài khoản"
                )}
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
