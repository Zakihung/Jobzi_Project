import React, { useState, useRef } from "react";
import { Steps, Button, Card } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import SignupEmployerForm from "../molecules/SignupEmployerForm";
import CompanyForm from "../molecules/CompanyForm";
import useGetListCompanyIndustry from "../../../company/hooks/Company_Industry/useGetListCompanyIndustry";
import { useSignupEmployer } from "../../../auth/hooks/useSignupEmployer";

// CSS Variables
const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #577cf6;
    --primary-dark: #4f46e5;
    --primary-light: #818cf8;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --white: #ffffff;
    --gray-200: #e2e8f0;
    --border-radius: 12px;
  }
`;

const { Step } = Steps;

const StyledCard = styled(Card)`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  border: none;
`;

const StepContent = styled.div`
  margin-top: 24px;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const StyledButton = styled(Button)`
  height: 46px;
  border-radius: var(--border-radius);
  border: none;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
  min-width: 100%;

  &.primary {
    background: var(--primary);
    color: var(--white);

    &:hover {
      background: var(--primary-dark) !important;
      color: var(--white) !important;
      box-shadow: none;
    }
  }

  &.secondary {
    background: var(--primary);
    color: var(--white);

    &:hover {
      background: var(--primary-dark) !important;
      color: var(--white) !important;
      box-shadow: none;
    }
  }
`;

const Stepcard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [contactData, setContactData] = useState({});
  const { mutate: signupEmployerMutation, isLoading: isSignupLoading } =
    useSignupEmployer();
  const { data: industriesData, isLoading: isIndustriesLoading } =
    useGetListCompanyIndustry();
  const formRef = useRef(null);

  const steps = [
    {
      title: "Liên lạc",
      content: (
        <SignupEmployerForm
          onFinish={(values) => {
            setContactData({
              full_name: values.full_name,
              email: values.email,
              gender: values.gender,
              phone_number: values.phone_number,
              password: values.password,
              date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
              role: "employer",
            });
            setCurrentStep(1);
          }}
          isLoading={isSignupLoading || isIndustriesLoading}
          setFormRef={(form) => (formRef.current = form)}
        />
      ),
    },
    {
      title: "Công ty",
      content: (
        <CompanyForm
          onFinish={(companyValues) => {
            // Lấy company_industry_id từ industriesData
            const selectedIndustry = industriesData?.find(
              (industry) => industry.name === companyValues.company_industry
            );
            const companyData = {
              company_name: companyValues.company_name,
              company_industry_id: selectedIndustry?._id,
              address: companyValues.company_location,
              province_id: companyValues.province_id,
              position: companyValues.position,
            };

            const signupEmployerData = {
              ...contactData,
              ...companyData,
            };
            // Gửi dữ liệu đăng ký tài khoản
            signupEmployerMutation(signupEmployerData, {
              onSuccess: () => {
                console.log("Tạo tài khoản và công ty thành công!");
              },
              onError: (error) => {
                console.error("Lỗi khi đăng ký tài khoản:", error);
                setCurrentStep(0); // Quay lại bước 1 nếu đăng ký thất bại
                formRef.current?.setFields([
                  {
                    name: "email",
                    errors: ["Lỗi khi đăng ký tài khoản. Vui lòng thử lại!"],
                  },
                ]);
              },
            });
          }}
          isLoading={isSignupLoading || isIndustriesLoading}
          setFormRef={(form) => (formRef.current = form)}
        />
      ),
    },
  ];

  const handleNext = () => {
    if (formRef.current) {
      formRef.current
        .validateFields()
        .then(() => {
          formRef.current.submit();
        })
        .catch(() => {});
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <GlobalStyle />
      <StyledCard>
        <Steps
          current={currentStep}
          style={{ marginBottom: 24, padding: "0 5rem 0" }}
        >
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <StepContent>{steps[currentStep].content}</StepContent>
        <NavigationButtons>
          {currentStep > 0 && (
            <StyledButton className="secondary" onClick={handlePrev}>
              Quay lại
            </StyledButton>
          )}
          {currentStep < steps.length - 1 && (
            <StyledButton
              className="primary"
              onClick={handleNext}
              loading={isSignupLoading || isIndustriesLoading}
            >
              Tiếp theo
            </StyledButton>
          )}
        </NavigationButtons>
      </StyledCard>
    </>
  );
};

export default Stepcard;
