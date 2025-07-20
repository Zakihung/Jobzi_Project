import React, { useRef, useState } from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import NavigationColumn from "../../features/cv_online/components/templates/NavigationColumn";
import ContentColumn from "../../features/cv_online/components/templates/ContentColumn";
import SidebarColumn from "../../features/cv_online/components/templates/SidebarColumn";

// Styled Components
const ResumeLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const OnlineResumePage = () => {
  const sectionRefs = {
    personalInfo: useRef(null),
    jobStatus: useRef(null),
    jobExpectation: useRef(null),
    education: useRef(null),
    highlights: useRef(null),
    workExperience: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
  };

  // State quản lý trạng thái hoàn thành
  const [completedSections, setCompletedSections] = useState([
    "Thông tin cá nhân",
    "Trạng thái tìm việc",
  ]);

  return (
    <ResumeLayout>
      <Row justify="center">
        <Col span={21}>
          <Row
            gutter={[24, 24]}
            style={{
              background: "#f8f9fa",
              padding: "16px 0",
              borderRadius: "24px",
            }}
          >
            <Col xs={24} md={6} lg={5}>
              <NavigationColumn sectionRefs={sectionRefs} />
            </Col>
            <Col xs={24} md={12} lg={14}>
              <ContentColumn
                sectionRefs={sectionRefs}
                completedSections={completedSections}
                setCompletedSections={setCompletedSections}
              />
            </Col>
            <Col xs={24} md={6} lg={5}>
              <SidebarColumn completedSections={completedSections} />
            </Col>
          </Row>
        </Col>
      </Row>
    </ResumeLayout>
  );
};

export default OnlineResumePage;
