import React from "react";
import { Typography } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

const FeatureItemWrapper = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #577cf6 0%, #667eea 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 32px;
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(87, 124, 246, 0.3);
`;

const FeatureTitle = styled(Title)`
  && {
    color: #1a1a1a !important;
    font-size: 20px !important;
    font-weight: 600 !important;
    margin-bottom: 16px !important;
  }
`;

const FeatureDescription = styled(Text)`
  color: #666;
  font-size: 14px;
  line-height: 1.6;
`;

const FeatureItem = ({ icon, title, description }) => {
  return (
    <FeatureItemWrapper>
      <FeatureIcon>{icon}</FeatureIcon>
      <FeatureTitle level={4}>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
    </FeatureItemWrapper>
  );
};

export default FeatureItem;
