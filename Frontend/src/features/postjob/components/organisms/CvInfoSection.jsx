import React from "react";
import { Card, Typography, Input } from "antd";
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
  sectionRefs,
  completedSections,
  setCompletedSections,
}) => {
  return (
    <StyledCard ref={sectionRefs.cvInfo}>
      <StyledTitle level={3}>Thông tin nhận CV</StyledTitle>
      <StyledSubTitle>Hạn chót nhận CV</StyledSubTitle>
      <Controller
        name="deadline"
        control={control}
        rules={{ required: "Vui lòng nhập hạn chót nhận hồ sơ" }}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Hạn chót nhận hồ sơ (dd/mm/yyyy)"
            size="large"
            onChange={(e) => {
              field.onChange(e);
              if (
                e.target.value &&
                !completedSections.includes("Thông tin nhận CV")
              ) {
                setCompletedSections([
                  ...completedSections,
                  "Thông tin nhận CV",
                ]);
              }
            }}
          />
        )}
      />
      {errors.deadline && <Text type="danger">{errors.deadline.message}</Text>}
    </StyledCard>
  );
};

export default CvInfoSection;
