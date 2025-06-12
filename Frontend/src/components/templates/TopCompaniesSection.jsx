import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { StarOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import CompanyCard from "../../features/company/components/organisms/CompanyCard";

const { Title, Text } = Typography;

const TopCompaniesSectionWrapper = styled.section`
  padding: 1rem 0 2rem;
  margin-top: 2rem;
  background: #f8f9fa;
  border-radius: 24px;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
`;

const SectionTitleGroup = styled.div`
  flex: 1;
`;

const SectionTitle = styled(Title)`
  && {
    color: #1a1a1a !important;
    font-size: 36px !important;
    font-weight: 700 !important;
    margin: 0 !important;
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const SectionIcon = styled(StarOutlined)`
  color: #577cf6;
  font-size: 32px;
`;

const SectionSubtitle = styled(Text)`
  color: #666;
  font-size: 16px;
  margin-top: 8px;
  display: block;
`;

const ViewAllBtn = styled(Button)`
  && {
    color: #577cf6 !important;
    border-color: #577cf6 !important;
    font-weight: 600;
    height: 40px;
    padding: 0 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    &:hover {
      background: #577cf6 !important;
      color: #ffffff !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(87, 124, 246, 0.3);
    }
  }
`;

const TopCompaniesSection = () => {
  const topCompanies = [
    {
      id: 1,
      name: "FPT Software",
      logo: "https://via.placeholder.com/80/577cf6/ffffff?text=FPT",
      rating: 4.2,
      reviews: 1250,
      jobs: 45,
      description:
        "Công ty phần mềm hàng đầu Việt Nam với hơn 25 năm kinh nghiệm",
      employees: "10,000+",
    },
    {
      id: 2,
      name: "Viettel",
      logo: "https://via.placeholder.com/80/36CFC9/ffffff?text=VT",
      rating: 4.0,
      reviews: 890,
      jobs: 32,
      description: "Tập đoàn công nghệ - viễn thông hàng đầu",
      employees: "50,000+",
    },
    {
      id: 3,
      name: "VNG Corporation",
      logo: "https://via.placeholder.com/80/FF6B6B/ffffff?text=VNG",
      rating: 4.5,
      reviews: 567,
      jobs: 28,
      description: "Công ty công nghệ giải trí và game số 1 Việt Nam",
      employees: "3,000+",
    },
    {
      id: 4,
      name: "Tiki Corporation",
      logo: "https://via.placeholder.com/80/4ECDC4/ffffff?text=TK",
      rating: 4.3,
      reviews: 423,
      jobs: 24,
      description: "Nền tảng thương mại điện tử hàng đầu Việt Nam",
      employees: "2,500+",
    },
  ];

  return (
    <TopCompaniesSectionWrapper>
      <SectionContainer>
        <SectionHeader>
          <SectionTitleGroup>
            <SectionTitle level={2}>
              <SectionIcon />
              Top công ty hàng đầu
            </SectionTitle>
            <SectionSubtitle>
              Những công ty uy tín với môi trường làm việc tốt nhất
            </SectionSubtitle>
          </SectionTitleGroup>
          <ViewAllBtn type="primary" ghost>
            Xem tất cả <RightOutlined />
          </ViewAllBtn>
        </SectionHeader>
        <Row gutter={[24, 24]}>
          {topCompanies.map((company) => (
            <Col xs={24} md={12} lg={6} key={company.id}>
              <CompanyCard company={company} />
            </Col>
          ))}
        </Row>
      </SectionContainer>
    </TopCompaniesSectionWrapper>
  );
};

export default TopCompaniesSection;
