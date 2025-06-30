import React from "react";
import { Card, Avatar, Typography, Button, Tag } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

const CompanyCardWrapper = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  padding: 16px;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  &:hover {
    .company-name {
      color: #577cf6 !important;
    }
    border: 1px solid #577cf6;
    box-shadow: 0 0 0 3px rgba(87, 124, 246, 0.2);
  }
`;

const CompanyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const CompanyLogo = styled(Avatar)`
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const CompanyContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 6rem;
  min-width: 0;
`;

const CompanyName = styled(Title)`
  && {
    color: #1a1a1a !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    margin: 0 !important;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const DetailText = styled(Text)`
  font-size: 14px;
  color: #666;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CompanyIndustry = styled(Text)`
  display: inline-block;
  max-width: 100%;
  margin-top: 4px;
  font-size: 15px;
  font-weight: 500;
  color: #666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const JobSectionTitle = styled(Text)`
  display: flex;
  justify-content: center;
  font-weight: 600;
  color: #577cf6;
  font-size: 1rem;
`;

const CompanyCard = ({ company }) => {
  return (
    <CompanyCardWrapper>
      <CompanyHeader>
        <CompanyLogo
          src={
            company.logo ||
            "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png"
          }
          size={70}
        />
        <CompanyContent>
          <CompanyName className="company-name">{company.name}</CompanyName>
          <CompanyIndustry>{company.company_industry_id?.name}</CompanyIndustry>
          <DetailText>
            {company.address}{" "}
            {company.size != "" && (
              <DetailText>• {company.size} nhân viên</DetailText>
            )}
          </DetailText>
        </CompanyContent>
      </CompanyHeader>
      <JobSectionTitle>
        Việc làm ({company.totalJobs || company.jobs?.length || 0})
      </JobSectionTitle>
    </CompanyCardWrapper>
  );
};

export default CompanyCard;
