import React from "react";
import { Card, Typography } from "antd";
import styled from "styled-components";
import TextEditor from "../molecules/TextEditor";

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

const BenefitsSection = ({ editor, errors, sectionRefs, disabled }) => {
  return (
    <StyledCard ref={sectionRefs.benefits}>
      <StyledTitle level={3}>Quyền lợi ứng viên</StyledTitle>
      <StyledSubTitle>Mô tả quyền lợi ứng viên</StyledSubTitle>
      <TextEditor editor={editor} disabled={disabled} />
      {errors.benefits && <Text type="danger">{errors.benefits.message}</Text>}
    </StyledCard>
  );
};

export default BenefitsSection;
