import React from "react";
import { Card, Avatar, Typography, Button, Rate } from "antd";
import { TeamOutlined, CheckCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title, Text, Paragraph } = Typography;

const CompanyCardWrapper = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  background: #ffffff;
  height: 100%;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CompanyHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const CompanyAvatar = styled(Avatar)`
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const CompanyRating = styled.div`
  margin-bottom: 12px;
`;

const RatingStars = styled(Rate)`
  font-size: 14px;
  margin-bottom: 4px;
`;

const RatingText = styled(Text)`
  color: #666;
  font-size: 12px;
  display: block;
`;

const CompanyInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const CompanyName = styled(Title)`
  && {
    color: #1a1a1a !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    margin-bottom: 12px !important;
  }
`;

const CompanyDescription = styled(Paragraph)`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const CompanyStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
`;

const CompanyStat = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
`;

const StatIcon = styled.span`
  color: #577cf6;
  font-size: 14px;
`;

const CompanyFooter = styled.div`
  margin-top: auto;
`;

const ViewCompanyBtn = styled(Button)`
  background: #577cf6;
  border-color: #577cf6;
  border-radius: 8px;
  font-weight: 600;
  height: 40px;
  transition: all 0.3s ease;
  &:hover {
    background: #4c6ef5;
    border-color: #4c6ef5;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
  }
`;

const CompanyCard = ({ company }) => {
  return (
    <CompanyCardWrapper hoverable>
      <CompanyHeader>
        <CompanyAvatar src={company.logo} size={72} />
        <CompanyRating>
          <RatingStars disabled defaultValue={company.rating} allowHalf />
          <RatingText>
            {company.rating} ({company.reviews})
          </RatingText>
        </CompanyRating>
      </CompanyHeader>
      <CompanyInfo>
        <CompanyName level={4}>{company.name}</CompanyName>
        <CompanyDescription>{company.description}</CompanyDescription>
      </CompanyInfo>
      <CompanyStats>
        <CompanyStat>
          <StatIcon as={TeamOutlined} />
          <Text>{company.employees} nhân viên</Text>
        </CompanyStat>
        <CompanyStat>
          <StatIcon as={CheckCircleOutlined} />
          <Text>{company.jobs} việc làm</Text>
        </CompanyStat>
      </CompanyStats>
      <CompanyFooter>
        <ViewCompanyBtn type="primary" block>
          Xem công ty
        </ViewCompanyBtn>
      </CompanyFooter>
    </CompanyCardWrapper>
  );
};

export default CompanyCard;
