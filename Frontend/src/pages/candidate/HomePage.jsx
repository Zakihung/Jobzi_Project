import React from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import HeroSection from "../../features/home/components/templates/HeroSection";
import FeaturedJobsSection from "../../features/home/components/templates/FeaturedJobsSection";
import FeaturesSection from "../../features/home/components/templates/FeaturesSection";

const { Content } = Layout;

const HomepageLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const HomepageContent = styled(Content)`
  background: #ffffff;
  padding: 0 16px;
  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

const HomePage = () => {
  return (
    <HomepageLayout>
      <HomepageContent>
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={22} md={22} lg={22} xl={22}>
            <HeroSection />
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={22} md={22} lg={22} xl={22}>
            <FeaturedJobsSection />
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={22} md={22} lg={22} xl={22}>
            <FeaturesSection />
          </Col>
        </Row>
      </HomepageContent>
    </HomepageLayout>
  );
};

export default HomePage;
