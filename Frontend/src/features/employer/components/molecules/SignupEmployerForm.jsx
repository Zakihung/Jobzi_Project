import { Form, Input, Button, DatePicker, Row, Col, Typography } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import styles from "../../styles/SignupEmployerForm.module.css";
import { useEffect, useState } from "react";
import moment from "moment";

const { Text } = Typography;

const SignupEmployerForm = ({ onFinish, isLoading, setFormRef }) => {
  const [form] = Form.useForm();
  const [selectedGender, setSelectedGender] = useState("male");
  const today = moment();
  const maxDate = today.clone().subtract(15, "years");
  const minDate = today.clone().subtract(60, "years");

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    form.setFieldsValue({ gender: gender });
  };

  // Gửi tham chiếu form ra ngoài
  useEffect(() => {
    if (setFormRef) {
      setFormRef(form);
    }
  }, [form, setFormRef]);

  return (
    <Form
      form={form}
      name="signupForm"
      onFinish={onFinish}
      layout="vertical"
      size="large"
      className={styles.signupForm}
      scrollToFirstError
      disabled={isLoading}
      initialValues={{ gender: "male" }}
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
            type: "email",
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
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <div className={styles.genderButtonGroup}>
              <Button
                type={selectedGender === "male" ? "primary" : "default"}
                icon={<ManOutlined />}
                onClick={() => handleGenderSelect("male")}
                className={`${styles.genderButton} ${
                  selectedGender === "male" ? styles.genderButtonActive : ""
                }`}
              >
                Nam
              </Button>
              <Button
                type={selectedGender === "female" ? "primary" : "default"}
                icon={<WomanOutlined />}
                onClick={() => handleGenderSelect("female")}
                className={`${styles.genderButton} ${
                  selectedGender === "female" ? styles.genderButtonActive : ""
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
                  value && value.isAfter(minDate) && value.isBefore(maxDate)
                    ? Promise.resolve()
                    : Promise.reject(new Error("Tuổi phải từ 15 đến 60 tuổi!")),
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
              <div>
                Mật khẩu phải có:
                <ul style={{ margin: "2px 0 0 25px", padding: 0 }}>
                  <li>Ít nhất 8 ký tự</li>
                  <li>Ít nhất một chữ cái viết hoa</li>
                  <li>Ít nhất một chữ số</li>
                  <li>Ít nhất một ký tự đặc biệt</li>
                </ul>
              </div>
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
              return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
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
    </Form>
  );
};

export default SignupEmployerForm;
