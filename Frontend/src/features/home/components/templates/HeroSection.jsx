import React, { useState } from "react";
import { Row, Col, Typography, Space, Tag, Button, Skeleton } from "antd";
import { TrophyOutlined, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import HeroCarousel from "../organisms/HeroCarousel";
import SearchBar from "../../../../components/organisms/SearchBar";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const HeroSectionWrapper = styled.section`
  background: linear-gradient(135deg, #577cf6 0%, #667eea 50%, #764ba2 100%);
  padding: 20px 0;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  @media (min-width: 768px) {
    padding: 30px 0;
    border-radius: 24px;
  }
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
  padding: 0 16px;
  position: relative;
  z-index: 2;
  @media (min-width: 768px) {
    padding: 0 20px;
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  @media (min-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
    margin-bottom: 24px;
    border-radius: 20px;
  }
`;

const HeroTitle = styled(Title)`
  && {
    color: #ffffff !important;
    font-size: 32px !important;
    font-weight: 800 !important;
    margin-bottom: 16px !important;
    line-height: 1.2 !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    @media (min-width: 768px) {
      font-size: 45px !important;
      margin-bottom: 24px !important;
    }
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
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.6;
    max-width: 100%;
    @media (min-width: 768px) {
      font-size: 18px;
      margin-bottom: 30px;
      max-width: 600px;
    }
  }
`;

const QuickTags = styled.div`
  margin: 12px 0;
  @media (min-width: 768px) {
    margin: 20px 0;
  }
`;

const TagsLabel = styled(Text)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: 500;
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const QuickTag = styled(Tag)`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 16px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
  @media (min-width: 768px) {
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 13px;
  }
`;

const HeroStats = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 768px) {
    gap: 48px;
    margin-top: 16px;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled(Title)`
  && {
    color: #ffffff !important;
    font-size: 24px !important;
    font-weight: 700 !important;
    margin: 0 !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    @media (min-width: 768px) {
      font-size: 32px !important;
    }
  }
`;

const StatLabel = styled(Text)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: 500;
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const SkeletonContainer = styled.div`
  padding: 16px;
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
  ];

  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Giả lập tải dữ liệu
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      localStorage.setItem("searchKeyword", searchKeyword);
    } else {
      localStorage.removeItem("searchKeyword");
    }
    navigate("/jobs");
  };

  if (isLoading) {
    return (
      <HeroSectionWrapper>
        <HeroBackground />
        <HeroContainer>
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} lg={14}>
              <SkeletonContainer>
                <Skeleton active title={{ width: "30%" }} paragraph={false} />
                <Skeleton
                  active
                  title={{ width: "60%" }}
                  paragraph={{ rows: 2 }}
                />
                <Skeleton.Input active style={{ width: "100%", height: 40 }} />
                <Skeleton active paragraph={{ rows: 1 }} />
                <Row gutter={[16, 16]}>
                  {Array(3)
                    .fill()
                    .map((_, index) => (
                      <Col key={index} xs={8} sm={6}>
                        <Skeleton
                          active
                          title={{ width: "80%" }}
                          paragraph={false}
                        />
                      </Col>
                    ))}
                </Row>
              </SkeletonContainer>
            </Col>
            <Col xs={24} lg={10}>
              <Skeleton active avatar={{ size: 200 }} paragraph={{ rows: 4 }} />
            </Col>
          </Row>
        </HeroContainer>
      </HeroSectionWrapper>
    );
  }

  return (
    <HeroSectionWrapper>
      <HeroBackground />
      <HeroContainer>
        <Row gutter={[24, 24]} align="middle">
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
            <SearchBar
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              handleSearch={handleSearch}
              selectedLocation=""
              setSelectedLocation={() => {}}
            />
            <QuickTags>
              <TagsLabel>Từ khóa phổ biến:</TagsLabel>
              <Space wrap style={{ marginTop: 8 }}>
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
