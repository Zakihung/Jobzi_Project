import React, { useContext } from "react";
import { Row, Col, Skeleton } from "antd";
import styled from "styled-components";
import { AuthContext } from "../../contexts/auth.context";
import useGetEmployerByUserId from "../../features/employer/hooks/useGetEmployerByUserId";
import JobPostOverviewColumn from "../../features/employer/components/templates/JobPostOverviewColumn";
import ApplicationChartColumn from "../../features/employer/components/templates/ApplicationChartColumn";

const DashboardContainer = styled.div`
  background: #ffffff;
  padding: 1rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media print {
    background: white;
    padding: 0;
  }
`;

const InnerContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;

const RowContainer = styled(Row)`
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 24px;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 576px) {
    padding: 0.5rem;
  }
`;

const DashboardEmployerPage = () => {
  const { auth } = useContext(AuthContext);
  const { data: employer, isLoading } = useGetEmployerByUserId(auth?.user?.id);
  const employerId = employer?.data?._id;

  if (isLoading) {
    return (
      <DashboardContainer>
        <Row justify="center">
          <Col xs={24} sm={22} md={21}>
            <InnerContainer>
              <RowContainer gutter={[16, 16]} justify="center">
                <Col xs={24} sm={24} md={12} lg={10}>
                  <Skeleton active paragraph={{ rows: 6 }} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={14}>
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </Col>
              </RowContainer>
            </InnerContainer>
          </Col>
        </Row>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Row justify="center">
        <Col xs={24} sm={22} md={21}>
          <InnerContainer>
            <RowContainer gutter={[16, 16]} justify="center">
              <JobPostOverviewColumn employerId={employerId} />
              <ApplicationChartColumn />
            </RowContainer>
          </InnerContainer>
        </Col>
      </Row>
    </DashboardContainer>
  );
};

export default DashboardEmployerPage;
