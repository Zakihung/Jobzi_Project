import React from "react";
import { Card, Steps } from "antd";
import styled from "styled-components";

const { Step } = Steps;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 1rem 10rem;
  margin-bottom: 16px;

  .ant-steps-item-title {
    font-size: 15px;
    font-weight: 500;
  }

  .ant-steps-item-icon {
    background: #577cf6;
    border-color: #577cf6;
  }
`;

const StepsCard = ({ currentStep }) => {
  return (
    <StyledCard>
      <Steps current={currentStep}>
        <Step title="Nội dung đăng tuyển" />
        <Step title="Thiết lập quy trình" />
        <Step title="Đăng tin tuyển dụng" />
      </Steps>
    </StyledCard>
  );
};

export default StepsCard;
