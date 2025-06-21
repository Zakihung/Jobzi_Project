import { Form, Typography } from "antd";
import { useSignup } from "../../../auth/hooks/useSignup";
import styles from "../../styles/SignupEmployerContainer.module.css";
import { useState } from "react";
import moment from "moment";
import RoleSelectionModal from "../templates/RoleSelectionModal";
import { useLocation } from "react-router-dom";
import SignupEmployerForm from "../organisms/SignupEmployerForm";
import Stepcard from "./StepCard";

const { Title, Text } = Typography;

const SignupEmployerContainer = () => {
  const [form] = Form.useForm();
  const { mutate: signupMutation, isLoading } = useSignup(form);
  const location = useLocation();
  const [modalVisible, setModalVisible] = useState(
    location.state?.showRoleModal || false
  );
  const [selectedGender, setSelectedGender] = useState("male");

  const onFinish = (values) => {
    const formattedValues = {
      full_name: values.full_name,
      email: values.email,
      gender: values.gender,
      phone_number: values.phone_number,
      password: values.password,
      role: "employer",
      date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
    };
    signupMutation(formattedValues);
  };

  const today = moment();
  const maxDate = today.clone().subtract(15, "years");
  const minDate = today.clone().subtract(60, "years");

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    form.setFieldsValue({ gender: gender });
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.signupContainer}>
      <RoleSelectionModal visible={modalVisible} onClose={handleModalClose} />
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
              Tuyển dụng hiệu quả cùng chúng tôi
            </Title>
            <Text className={styles.imageDescription}>
              Tiếp cận hàng triệu ứng viên tiềm năng. Tạo tài khoản nhà tuyển
              dụng và đăng tin tuyển dụng ngay hôm nay để tìm được nhân tài phù
              hợp!
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
              Tạo tài khoản nhà tuyển dụng
            </Title>
            <Text className={styles.welcomeSubtitle}>
              Chỉ vài bước để bắt đầu hành trình tìm kiếm ứng viên phù hợp
            </Text>
          </div>

          {/* Signup Form */}
          {/* <SignupEmployerForm
            form={form}
            onFinish={onFinish}
            isLoading={isLoading}
            selectedGender={selectedGender}
            handleGenderSelect={handleGenderSelect}
            minDate={minDate}
            maxDate={maxDate}
          /> */}
          <Stepcard
            form={form}
            onFinish={onFinish}
            isLoading={isLoading}
            selectedGender={selectedGender}
            handleGenderSelect={handleGenderSelect}
            minDate={minDate}
            maxDate={maxDate}
          />
          {/* Signin link */}
          <div className={styles.signinSection}>
            <Text className={styles.signinText}>
              Đã có tài khoản?{" "}
              <a href="/employer-signin" className={styles.signinLink}>
                Đăng nhập ngay
              </a>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupEmployerContainer;
