import React from "react";
import { Row, Col, Card, Typography, List, Avatar } from "antd";
import styled from "styled-components";

const { Title, Paragraph, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 24px;

  @media (max-width: 992px) {
    padding: 16px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled(Title)`
  &.ant-typography {
    color: #1a1a1a !important;
    font-size: 20px !important;
    font-weight: 600 !important;
    margin-bottom: 16px !important;

    @media (max-width: 768px) {
      font-size: 18px !important;
    }
  }
`;

const SectionContent = styled(Paragraph)`
  &.ant-typography {
    color: #666;
    font-size: 15px;
    line-height: 1.6;

    @media (max-width: 576px) {
      font-size: 14px;
    }
  }
`;

const SectionList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  color: #666;
  font-size: 15px;
  line-height: 1.8;

  li {
    margin-bottom: 8px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

const RecruiterItem = styled(List.Item)`
  display: flex;
  align-items: center;
  justify-content: flex-start !important;
  gap: 12px;
  padding: 8px 0;

  @media (max-width: 576px) {
    gap: 8px;
  }
`;

const RecruiterInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecruiterPosition = styled(Text)`
  color: #666;
  font-size: 13px;
`;

const CompanyInfo = ({ company }) => {
  return (
    <Row gutter={[24, 24]}>
      {/* Column 1: Introduction and Business Operations */}
      <Col xs={24} lg={16}>
        <StyledCard>
          <ContentSection>
            <SectionTitle level={4}>Giới thiệu công ty</SectionTitle>
            <SectionContent>
              {company.introduction && company.introduction.trim() !== ""
                ? company.introduction
                : "Chưa điền thông tin"}
            </SectionContent>
          </ContentSection>
          <ContentSection>
            <SectionTitle level={4}>Nghiệp vụ kinh doanh</SectionTitle>
            {company.businessOperations &&
            company.businessOperations.length > 0 ? (
              <SectionList>
                {company.businessOperations.map((op, index) => (
                  <li key={index}>{op}</li>
                ))}
              </SectionList>
            ) : (
              <SectionContent>Chưa điền thông tin</SectionContent>
            )}
          </ContentSection>
        </StyledCard>
      </Col>

      {/* Column 2: Regulations, Benefits, Recruiters */}
      <Col xs={24} lg={8}>
        <StyledCard>
          <ContentSection>
            <SectionTitle level={4}>Quy định công ty</SectionTitle>
            {company.regulations && company.regulations.length > 0 ? (
              <SectionList>
                {company.regulations.map((op, index) => (
                  <li key={index}>{op}</li>
                ))}
              </SectionList>
            ) : (
              <SectionContent>Chưa điền thông tin</SectionContent>
            )}
          </ContentSection>
          <ContentSection>
            <SectionTitle level={4}>Phúc lợi</SectionTitle>
            {company.benefits && company.benefits.length > 0 ? (
              <SectionList>
                {company.benefits.map((op, index) => (
                  <li key={index}>{op}</li>
                ))}
              </SectionList>
            ) : (
              <SectionContent>Chưa điền thông tin</SectionContent>
            )}
          </ContentSection>
        </StyledCard>
      </Col>
    </Row>
  );
};

export default CompanyInfo;
