import React from "react";
import { Card, Tag, Avatar, Space, Rate, Typography } from "antd";
import {
  EnvironmentOutlined,
  UserOutlined,
  StarOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  margin-bottom: 24px;
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px;

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CompanyLogo = styled(Avatar)`
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  @media (max-width: 992px) {
    margin-bottom: 16px;
  }
`;

const CompanyInfoSection = styled.div`
  flex: 1;
`;

const CompanyName = styled(Title)`
  &.ant-typography {
    color: #1a1a1a !important;
    font-size: 28px !important;
    font-weight: 700 !important;
    margin-bottom: 12px !important;

    @media (max-width: 768px) {
      font-size: 24px !important;
    }

    @media (max-width: 576px) {
      font-size: 20px !important;
    }
  }
`;

const CompanyTags = styled(Space)`
  margin-bottom: 12px;
`;

const StyledTag = styled(Tag)`
  background: #f0f5ff;
  color: #577cf6;
  border: 1px solid #b3d4ff;
  border-radius: 12px;
  font-size: 13px;
  padding: 4px 12px;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 576px) {
    font-size: 12px;
    padding: 2px 8px;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
  margin-bottom: 24px;
`;

const TagItem = styled.span`
  background-color: #e6f0ff;
  color: #1a73e8;
  font-size: 14px;
  padding: 4px 14px;
  border-radius: 16px;
  font-weight: 500;
`;

const CompanyBasicInfo = ({ company }) => {
  return (
    <StyledCard>
      <CompanyHeader>
        <CompanyLogo src={company.logo} size={120} />
        <CompanyInfoSection>
          <CompanyName level={2}>{company.name}</CompanyName>
          <TagList>
            <TagItem>
              <StarOutlined /> {company.company_industry}
            </TagItem>
            <TagItem>
              <UserOutlined /> {company.min_size} - {company.max_size} nhân viên
            </TagItem>
            <TagItem>
              <EnvironmentOutlined /> {company.address}, {company.province}
            </TagItem>
          </TagList>
        </CompanyInfoSection>
      </CompanyHeader>
    </StyledCard>
  );
};

export default CompanyBasicInfo;
