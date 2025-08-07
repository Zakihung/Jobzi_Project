import React, { useContext } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { AuthContext } from "../../contexts/auth.context";
import useGetEmployerByUserId from "../../features/employer/hooks/useGetEmployerByUserId";
import JobPostOverviewColumn from "../../features/employer/components/templates/JobPostOverviewColumn";
import ApplicationChartColumn from "../../features/employer/components/templates/ApplicationChartColumn";

const DashboardContainer = styled.div`
  background: #ffffff;

  @media print {
    background: white;
    padding: 0;
  }
`;

const InnerContainer = styled.div`
  overflow: hidden;
`;

const RowContainer = styled(Row)`
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 24px;
`;

const DashboardEmployerPage = () => {
  const { auth } = useContext(AuthContext);
  const { data: employer } = useGetEmployerByUserId(auth?.user?.id);
  const employerId = employer?.data?._id;

  return (
    <DashboardContainer>
      <Row justify="center">
        <Col span={21}>
          <InnerContainer>
            <RowContainer gutter={[24, 0]} justify="center">
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
