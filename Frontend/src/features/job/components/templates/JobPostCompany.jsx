import React from "react";
import { Typography, Button, Card, Space, Avatar, Divider, Rate } from "antd";
import {
  StarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ExportOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Box, ExternalLink } from "lucide-react";
import useGetCompanyById from "../../../company/hooks/Company/useGetCompanyById";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 24px;
  margin-bottom: 24px;

  @media (max-width: 992px) {
    position: static;
  }

  @media (max-width: 576px) {
    padding: 16px;
  }
`;

const CompanyHeader = styled.div`
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const CompanyLogo = styled(Avatar)`
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  @media (max-width: 576px) {
    width: 60px !important;
    height: 60px !important;
  }
`;

const CompanyNameSpace = styled.div`
  flex: 1;
  height: 80px;
  overflow: hidden;

  @media (max-width: 576px) {
    height: 60px;
  }
`;

const CompanyName = styled(Text)`
  font-size: 1.25rem;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4em;
  max-height: calc(1.4em * 3);

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const CompanyDetails = styled(Space)`
  width: 100%;
  margin-bottom: 10px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 15px;
  margin-bottom: 8px;
`;

const DetailIcon = styled.span`
  color: #577cf6;
  font-size: 16px;
  margin-top: -2px;

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

const DetailLabel = styled(Text)`
  color: #666;
  font-size: 14px;
  white-space: nowrap;
  line-height: 1.4em;
  height: 1.4em;
  align-self: flex-start;

  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

const DetailValue = styled(Text)`
  font-size: 14px;
  font-weight: 450;
  color: #000;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4em;
  max-height: calc(1.4em * 3);
  flex: 1;

  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

const ViewCompanyButton = styled(Button)`
  background: #577cf6 !important;
  border-color: #577cf6 !important;
  border-radius: 8px;
  font-weight: 600;
  height: 40px;

  &:hover {
    background: #4c6ef5 !important;
    border-color: #4c6ef5 !important;
    box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
  }

  @media (max-width: 576px) {
    height: 36px;
    font-size: 12px;
  }
`;

const JobPostCompany = ({ companyId }) => {
  const navigate = useNavigate();
  const { data: companyData, isLoading } = useGetCompanyById(companyId);
  if (isLoading) return;
  return (
    <StyledCard>
      <CompanyHeader>
        <CompanyLogo src={companyData?.logo} size={80} />
        <CompanyNameSpace>
          <CompanyName>{companyData?.name}</CompanyName>
        </CompanyNameSpace>
      </CompanyHeader>

      <CompanyDetails direction="vertical">
        {companyData?.max_size != 0 && (
          <DetailItem>
            <DetailIcon>
              <TeamOutlined />
            </DetailIcon>
            <DetailLabel>Quy mô:</DetailLabel>
            <DetailValue>
              {companyData?.min_size} - {companyData?.max_size} nhân viên
            </DetailValue>
          </DetailItem>
        )}

        <DetailItem>
          <DetailIcon>
            <Box size={18} strokeWidth={1.75} />
          </DetailIcon>
          <DetailLabel>Lĩnh vực:</DetailLabel>
          <DetailValue>{companyData?.company_industry_id?.name}</DetailValue>
        </DetailItem>

        <DetailItem>
          <DetailIcon>
            <EnvironmentOutlined />
          </DetailIcon>
          <DetailLabel>Địa điểm:</DetailLabel>
          <DetailValue>
            {companyData?.address}, {companyData?.province_id?.name}
          </DetailValue>
        </DetailItem>
      </CompanyDetails>

      <ViewCompanyButton
        type="primary"
        block
        icon={<ExternalLink size={18} />}
        iconPosition="end"
        onClick={() => navigate(`/company/${companyId}`)}
      >
        Xem chi tiết công ty
      </ViewCompanyButton>
    </StyledCard>
  );
};

export default JobPostCompany;
