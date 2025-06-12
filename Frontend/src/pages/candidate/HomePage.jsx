import React from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import HeroSection from "../../components/templates/HeroSection";
import FeaturedJobsSection from "../../components/templates/FeaturedJobsSection";
import TopCompaniesSection from "../../components/templates/TopCompaniesSection";
import FeaturesSection from "../../components/templates/FeaturesSection";

const { Content } = Layout;

const HomepageLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const HomepageContent = styled(Content)`
  background: #ffffff;
`;

const HomePage = () => {
  return (
    <HomepageLayout>
      <HomepageContent>
        <Row>
          <Col span={2} />
          <Col span={20}>
            <HeroSection />
          </Col>
          <Col span={2} />
        </Row>
        <Row>
          <Col span={2} />
          <Col span={20}>
            <FeaturedJobsSection />
          </Col>
          <Col span={2} />
        </Row>
        <Row>
          <Col span={2} />
          <Col span={20}>
            <TopCompaniesSection />
          </Col>
          <Col span={2} />
        </Row>
        <FeaturesSection />
      </HomepageContent>
    </HomepageLayout>
  );
};

export default HomePage;
