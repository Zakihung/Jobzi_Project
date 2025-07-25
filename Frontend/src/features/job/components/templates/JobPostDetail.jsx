import React from "react";
import { Typography, Card, Space, Divider, Row } from "antd";
import { EnvironmentOutlined, ClockCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title, Text, Paragraph } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 1.5rem;

  @media (max-width: 1200px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const JobTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 25px !important;
  font-weight: 700 !important;
  margin: 0 !important;

  @media (max-width: 768px) {
    font-size: 24px !important;
  }

  @media (max-width: 576px) {
    font-size: 20px !important;
  }
`;

const JobSection = styled.div`
  margin-bottom: 32px;
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

const SectionTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;

  @media (max-width: 768px) {
    font-size: 18px !important;
  }
`;

const HtmlContent = styled.div`
  color: #666;
  font-size: 15px;
  line-height: 1.6;

  @media (max-width: 576px) {
    font-size: 14px;
  }

  ul {
    padding-left: 20px;
    list-style-type: disc;
  }

  li {
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 8px;
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

const AdditionalInfo = styled(Space)`
  width: 100%;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 15px;
  margin-bottom: 12px;

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

const InfoIcon = styled.span`
  color: #577cf6;
  font-size: 16px;
`;

const JobPostDetail = ({ job }) => {
  const detailedLocations =
    job?.locations?.map((loc) => {
      const address = loc.address?.trim() || "";
      const province = loc.province?.trim() || "";
      return [address, province].filter(Boolean).join(", ");
    }) || [];
  return (
    <StyledCard>
      <Row>
        <JobHeader>
          <JobTitle level={2}>Chi tiết tin tuyển dụng</JobTitle>
        </JobHeader>
      </Row>
      <Row>
        {job?.skills && job?.skills.length > 0 && (
          <TagList>
            {job?.skills.map((skill, index) => (
              <TagItem key={index}>{skill}</TagItem>
            ))}
          </TagList>
        )}
      </Row>
      <JobSection>
        <SectionTitle level={4}>Mô tả công việc</SectionTitle>
        <HtmlContent
          dangerouslySetInnerHTML={{ __html: job?.description || "" }}
        />
      </JobSection>

      <JobSection>
        <SectionTitle level={4}>Yêu cầu ứng viên</SectionTitle>
        <HtmlContent
          dangerouslySetInnerHTML={{ __html: job?.requirements || "" }}
        />
      </JobSection>

      <JobSection>
        <SectionTitle level={4}>Quyền lợi ứng viên</SectionTitle>
        <HtmlContent
          dangerouslySetInnerHTML={{ __html: job?.benefits || "" }}
        />
      </JobSection>

      <JobSection>
        <SectionTitle level={4}>Địa điểm làm việc</SectionTitle>
        <AdditionalInfo>
          {detailedLocations.map((loc, index) => (
            <InfoItem key={index}>
              <InfoIcon>
                <EnvironmentOutlined />
              </InfoIcon>
              <Text>{loc}</Text>
            </InfoItem>
          ))}
        </AdditionalInfo>
        {/* <AdditionalInfo direction="vertical">
          <InfoItem>
            <InfoIcon>
              <ClockCircleOutlined />
            </InfoIcon>
            <Text>Thời gian làm việc: {job?.workingHours}</Text>
          </InfoItem>
        </AdditionalInfo> */}
      </JobSection>
    </StyledCard>
  );
};

export default JobPostDetail;
