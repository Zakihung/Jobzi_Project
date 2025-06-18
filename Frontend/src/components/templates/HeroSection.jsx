import React from "react";
import { Row, Col, Typography, Space, Tag, Button } from "antd";
import { TrophyOutlined, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import HeroCarousel from "../organisms/HeroCarousel";
import SearchBar from "../organisms/SearchBar";

const { Title, Text, Paragraph } = Typography;

const HeroSectionWrapper = styled.section`
  background: linear-gradient(135deg, #577cf6 0%, #667eea 50%, #764ba2 100%);
  padding: 30px 0;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  border-radius: 24px;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 80%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
  z-index: 1;
  height: fit-content;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const HeroTitle = styled(Title)`
  && {
    color: #ffffff !important;
    font-size: 52px !important;
    font-weight: 800 !important;
    margin-bottom: 24px !important;
    line-height: 1.2 !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Highlight = styled.span`
  background: linear-gradient(45deg, #ffd700, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroDescription = styled(Paragraph)`
  && {
    color: rgba(255, 255, 255, 0.9) !important;
    font-size: 18px;
    margin-bottom: 30px;
    line-height: 1.6;
    max-width: 600px;
  }
`;

const QuickTags = styled.div`
  margin: 20px 0;
`;

const TagsLabel = styled(Text)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
`;

const QuickTag = styled(Tag)`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }
`;

const HeroStats = styled.div`
  display: flex;
  gap: 48px;
  margin-top: 20px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled(Title)`
  && {
    color: #ffffff !important;
    font-size: 32px !important;
    font-weight: 700 !important;
    margin: 0 !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const StatLabel = styled(Text)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
`;

const HeroSection = () => {
  const quickTags = [
    "React",
    "Python",
    "Java",
    "Marketing",
    "Design",
    "DevOps",
    "AI/ML",
    "Remote",
  ];

  return (
    <HeroSectionWrapper>
      <HeroBackground />
      <HeroContainer>
        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} lg={14}>
            <HeroBadge>
              <TrophyOutlined /> #1.000.000 Nền tảng tuyển dụng Việt Nam
            </HeroBadge>
            <HeroTitle level={1}>
              Tìm kiếm cơ hội nghề nghiệp
              <Highlight> tuyệt vời</Highlight>
            </HeroTitle>
            <HeroDescription>
              Khám phá hàng nghìn việc làm từ các công ty hàng đầu. Bắt đầu hành
              trình sự nghiệp của bạn ngay hôm nay với mức lương cạnh tranh và
              môi trường làm việc chuyên nghiệp!
            </HeroDescription>
            <SearchBar />
            <QuickTags>
              <TagsLabel>Từ khóa phổ biến:</TagsLabel>
              <Space wrap>
                {quickTags.map((tag) => (
                  <QuickTag key={tag}>{tag}</QuickTag>
                ))}
              </Space>
            </QuickTags>
            <HeroStats>
              <StatItem>
                <StatNumber level={4}>10.000+</StatNumber>
                <StatLabel>Việc làm</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber level={4}>5.000+</StatNumber>
                <StatLabel>Công ty</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber level={4}>100.000+</StatNumber>
                <StatLabel>Ứng viên</StatLabel>
              </StatItem>
            </HeroStats>
          </Col>
          <Col xs={24} lg={10}>
            <HeroCarousel />
          </Col>
        </Row>
      </HeroContainer>
    </HeroSectionWrapper>
  );
};

export default HeroSection;
