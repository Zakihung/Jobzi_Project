import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { FireOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import JobCard from "../../features/job/components/organisms/JobCard";

const { Title, Text } = Typography;

const FeaturedJobsSectionWrapper = styled.section`
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

const SectionIcon = styled(FireOutlined)`
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

const FeaturedJobsSection = () => {
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechViet Solutions",
      logo: "https://via.placeholder.com/60/577cf6/ffffff?text=TV",
      location: "Hồ Chí Minh",
      salary: "25-35 triệu",
      type: "Full-time",
      tags: ["React", "TypeScript", "Next.js"],
      urgent: true,
      saved: false,
      posted: "2 giờ trước",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      logo: "https://via.placeholder.com/60/36CFC9/ffffff?text=SX",
      location: "Hà Nội",
      salary: "30-45 triệu",
      type: "Full-time",
      tags: ["Product Strategy", "Agile", "Analytics"],
      urgent: false,
      saved: true,
      posted: "4 giờ trước",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Agency",
      logo: "https://via.placeholder.com/60/FF6B6B/ffffff?text=CA",
      location: "Đà Nẵng",
      salary: "15-25 triệu",
      type: "Full-time",
      tags: ["Figma", "Sketch", "Prototyping"],
      urgent: false,
      saved: false,
      posted: "1 ngày trước",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Corp",
      logo: "https://via.placeholder.com/60/4ECDC4/ffffff?text=CT",
      location: "Remote",
      salary: "35-50 triệu",
      type: "Remote",
      tags: ["AWS", "Docker", "Kubernetes"],
      urgent: true,
      saved: false,
      posted: "3 giờ trước",
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "AI Innovations",
      logo: "https://via.placeholder.com/60/95E1D3/ffffff?text=AI",
      location: "Hồ Chí Minh",
      salary: "40-60 triệu",
      type: "Full-time",
      tags: ["Python", "Machine Learning", "TensorFlow"],
      urgent: false,
      saved: true,
      posted: "5 giờ trước",
    },
    {
      id: 6,
      title: "Mobile Developer",
      company: "AppMaster Studio",
      logo: "https://via.placeholder.com/60/FFD93D/ffffff?text=AM",
      location: "Hà Nội",
      salary: "20-30 triệu",
      type: "Full-time",
      tags: ["React Native", "iOS", "Android"],
      urgent: false,
      saved: false,
      posted: "1 ngày trước",
    },
  ];

  return (
    <FeaturedJobsSectionWrapper>
      <SectionContainer>
        <SectionHeader>
          <SectionTitleGroup>
            <SectionTitle level={2}>
              <SectionIcon />
              Việc làm nổi bật
            </SectionTitle>
            <SectionSubtitle>
              Những cơ hội việc làm tốt nhất được cập nhật hàng ngày
            </SectionSubtitle>
          </SectionTitleGroup>
          <ViewAllBtn type="primary" ghost>
            Xem tất cả <RightOutlined />
          </ViewAllBtn>
        </SectionHeader>
        <Row gutter={[24, 24]}>
          {featuredJobs.map((job) => (
            <Col xs={24} md={12} xl={8} key={job.id}>
              <JobCard job={job} />
            </Col>
          ))}
        </Row>
      </SectionContainer>
    </FeaturedJobsSectionWrapper>
  );
};

export default FeaturedJobsSection;
