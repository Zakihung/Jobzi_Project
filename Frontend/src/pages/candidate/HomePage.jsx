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
`;

const HomePage = () => {
  return (
    <HomepageLayout>
      <HomepageContent>
        <Row justify={"center"}>
          <Col span={21}>
            <HeroSection />
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col span={21}>
            <FeaturedJobsSection />
          </Col>
        </Row>
        {/* <Row justify={"center"}>
          <Col span={21}>
            <TopCompaniesSection />
          </Col>
        </Row> */}
        <FeaturesSection />
      </HomepageContent>
    </HomepageLayout>
  );
};

export default HomePage;
