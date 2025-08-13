import React, { useRef, useState } from "react";
import { Layout, Row, Col, Skeleton } from "antd";
import styled from "styled-components";
import NavigationColumn from "../../features/cv_online/components/templates/NavigationColumn";
import ContentColumn from "../../features/cv_online/components/templates/ContentColumn";
import SidebarColumn from "../../features/cv_online/components/templates/SidebarColumn";
import useGetCandidateById from "../../features/candidate/hooks/useGetCandidateById";
import useGetOnlineResume from "../../features/cv_online/hooks/useGetOnlineResume";
import { AuthContext } from "../../contexts/auth.context";

// Styled Components
const ResumeLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const ContentRow = styled(Row)`
  background: #f8f9fa;
  padding: 16px 0;
  border-radius: 24px;

  @media (max-width: 576px) {
    padding: 0 16px;
    flex-direction: column; /* Xếp theo cột trên màn hình nhỏ */
  }
`;

const NavigationCol = styled(Col)`
  @media (max-width: 576px) {
    display: none; /* Ẩn NavigationColumn trên màn hình nhỏ */
  }
`;

const ContentCol = styled(Col)`
  @media (max-width: 576px) {
    order: 1; /* ContentColumn hiển thị đầu tiên */
    margin-bottom: 16px;
  }
`;

const SidebarCol = styled(Col)`
  @media (max-width: 576px) {
    order: 2; /* SidebarColumn hiển thị thứ hai */
  }
`;

const OnlineResumePage = () => {
  const { auth } = React.useContext(AuthContext);
  const candidateId = auth?.user?.candidate_id;
  const { isLoading: isLoadingCandidate } = useGetCandidateById(candidateId);
  const { isLoading: isLoadingResume } = useGetOnlineResume(candidateId);

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

  // Skeleton loading khi dữ liệu chưa sẵn sàng
  if (isLoadingCandidate || isLoadingResume) {
    return (
      <ResumeLayout>
        <Row justify="center">
          <Col span={21}>
            <ContentRow gutter={[24, 24]}>
              <NavigationCol xs={24} md={6} lg={5}>
                <Skeleton active paragraph={{ rows: 8 }} />
              </NavigationCol>
              <ContentCol xs={24} md={12} lg={14}>
                <Skeleton active paragraph={{ rows: 10 }} />
              </ContentCol>
              <SidebarCol xs={24} md={6} lg={5}>
                <Skeleton active paragraph={{ rows: 6 }} />
              </SidebarCol>
            </ContentRow>
          </Col>
        </Row>
      </ResumeLayout>
    );
  }

  return (
    <ResumeLayout>
      <Row justify="center">
        <Col xs={24} sm={23} md={22} lg={21}>
          <ContentRow gutter={[24, 24]}>
            <NavigationCol xs={24} md={6} lg={5}>
              <NavigationColumn sectionRefs={sectionRefs} />
            </NavigationCol>
            <ContentCol xs={24} md={12} lg={14}>
              <ContentColumn
                sectionRefs={sectionRefs}
                completedSections={completedSections}
                setCompletedSections={setCompletedSections}
              />
            </ContentCol>
            <SidebarCol xs={24} md={6} lg={5}>
              <SidebarColumn completedSections={completedSections} />
            </SidebarCol>
          </ContentRow>
        </Col>
      </Row>
    </ResumeLayout>
  );
};

export default OnlineResumePage;
