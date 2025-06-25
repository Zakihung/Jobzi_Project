import React, { useEffect } from "react";
import { Card, Typography, Input, Row, Col } from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  background: #ffffff;
  padding: 16px;
  margin-bottom: 16px;
`;

const StyledTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;

  @media (max-width: 768px) {
    font-size: 20px !important;
  }

  @media (max-width: 576px) {
    font-size: 18px !important;
  }
`;

const StyledSubTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  margin-bottom: 12px !important;

  @media (max-width: 768px) {
    font-size: 16px !important;
  }

  @media (max-width: 576px) {
    font-size: 14px !important;
  }
`;

const CvInfoSection = ({
  control,
  errors,
  watch,
  sectionRefs,
  completedSections,
  setCompletedSections,
}) => {
  const checkCompletion = (values) => {
    const requiredFields = [
      values.expiredAt,
      values.recipient_name,
      values.recipient_phone_number,
      values.recipient_email,
    ];

    const areFieldsFilled = requiredFields.every(
      (field) => field && field.trim() !== ""
    );

    const isExpiredAtValid = validateDate(values.expiredAt) === true;
    const isNameValid = validateName(values.recipient_name) === true;
    const isPhoneValid = validatePhone(values.recipient_phone_number) === true;
    const isEmailValid = validateEmail(values.recipient_email) === true;

    const isSectionValid =
      isExpiredAtValid && isNameValid && isPhoneValid && isEmailValid;
    const isComplete = areFieldsFilled && isSectionValid;

    if (isComplete && !completedSections.includes("Thông tin nhận CV")) {
      setCompletedSections([...completedSections, "Thông tin nhận CV"]);
    } else if (!isComplete && completedSections.includes("Thông tin nhận CV")) {
      setCompletedSections(
        completedSections.filter((section) => section !== "Thông tin nhận CV")
      );
    }
  };

  useEffect(() => {
    if (watch && typeof watch === "function") {
      const subscription = watch((values) => {
        checkCompletion(values);
      });
      return () => {
        if (subscription?.unsubscribe) {
          subscription.unsubscribe();
        }
      };
    } else {
      checkCompletion(control.getValues());
    }
  }, [watch, control, completedSections, setCompletedSections]);

  const validateDate = (value) => {
    if (!value) return "Vui lòng nhập hạn chót nhận hồ sơ";
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(value)) {
      return "Hạn chót phải có định dạng dd/mm/yyyy";
    }
    const [day, month, year] = value.split("/").map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(inputDate.getTime())) {
      return "Ngày không hợp lệ";
    }
    if (inputDate < today) {
      return "Hạn chót không được là ngày trong quá khứ";
    }
    return true;
  };

  const validateName = (value) => {
    if (!value) return "Vui lòng nhập họ và tên";
    const regex = /^[A-Za-zÀ-ỹ\s]+$/;
    if (!regex.test(value)) {
      return "Họ và tên chỉ được chứa chữ cái và dấu cách";
    }
    return true;
  };

  const validatePhone = (value) => {
    if (!value) return "Vui lòng nhập SĐT";
    const regex = /^(?:\+84|0)(3|5|7|8|9)\d{8}$/;
    if (!regex.test(value)) {
      return "Số điện thoại không hợp lệ (ví dụ: +84312345678 hoặc 0342002210)";
    }
    return true;
  };

  const validateEmail = (value) => {
    if (!value) return "Vui lòng nhập email";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      return "Email không hợp lệ";
    }
    return true;
  };

  return (
    <StyledCard ref={sectionRefs.cvInfo}>
      <StyledTitle level={3}>Thông tin nhận CV</StyledTitle>
      <StyledSubTitle>Hạn chót nhận CV</StyledSubTitle>
      <Row gutter={[12, 8]}>
        <Col span={8}>
          <Controller
            name="expiredAt"
            control={control}
            rules={{
              required: "Vui lòng nhập hạn chót nhận hồ sơ",
              validate: validateDate,
            }}
            validateTrigger="onChange"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="dd/mm/yyyy"
                size="large"
                status={errors.expiredAt ? "error" : ""}
                style={{ width: "100%", marginBottom: 16 }}
              />
            )}
          />
          {errors.expiredAt && (
            <Text type="danger">{errors.expiredAt.message}</Text>
          )}
        </Col>
      </Row>
      <StyledSubTitle>Thông tin người nhận CV</StyledSubTitle>
      <Row gutter={[12, 8]}>
        <Col span={24}>
          <StyledSubTitle>
            <strong>Họ và tên</strong>
          </StyledSubTitle>
          <Controller
            name="recipient_name"
            control={control}
            rules={{
              required: "Vui lòng nhập họ và tên",
              validate: validateName,
            }}
            validateTrigger="onChange"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Họ và tên"
                size="large"
                status={errors.recipient_name ? "error" : ""}
                style={{ width: "100%", marginBottom: 16 }}
              />
            )}
          />
          {errors.recipient_name && (
            <Text type="danger">{errors.recipient_name.message}</Text>
          )}
        </Col>
      </Row>
      <Row gutter={[12, 8]}>
        <Col span={8}>
          <StyledSubTitle>
            <strong>Số điện thoại</strong>
          </StyledSubTitle>
          <Controller
            name="recipient_phone_number"
            control={control}
            rules={{
              required: "Vui lòng nhập SĐT",
              validate: validatePhone,
            }}
            validateTrigger="onChange"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Số điện thoại"
                size="large"
                status={errors.recipient_phone_number ? "error" : ""}
                style={{ width: "100%", marginBottom: 16 }}
              />
            )}
          />
          {errors.recipient_phone_number && (
            <Text type="danger">{errors.recipient_phone_number.message}</Text>
          )}
        </Col>
        <Col span={16}>
          <StyledSubTitle>
            <strong>Email</strong>
          </StyledSubTitle>
          <Controller
            name="recipient_email"
            control={control}
            rules={{
              required: "Vui lòng nhập email",
              validate: validateEmail,
            }}
            validateTrigger="onChange"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Email"
                size="large"
                status={errors.recipient_email ? "error" : ""}
                style={{ width: "100%", marginBottom: 8 }}
              />
            )}
          />
          {errors.recipient_email && (
            <Text type="danger">{errors.recipient_email.message}</Text>
          )}
        </Col>
      </Row>
    </StyledCard>
  );
};

export default CvInfoSection;
