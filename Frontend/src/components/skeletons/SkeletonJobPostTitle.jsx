import { Card, Skeleton, Row, Col } from "antd";
import styled from "styled-components";

// Khớp styled với JobPostTitle
const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 1.5rem;
  margin-bottom: 24px;
  width: 100%;

  @media (max-width: 1200px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const SkeletonJobPostTitle = () => (
  <StyledCard>
    {/* Job Title */}
    <Row>
      <Col span={24}>
        <Skeleton.Input active block style={{ height: 32, marginBottom: 16 }} />
      </Col>
    </Row>
    {/* Job Tags */}
    <Row justify="space-between" style={{ marginBottom: 16 }}>
      {[1, 2, 3, 4].map((_, idx) => (
        <Col key={idx} style={{ display: "flex", alignItems: "center" }}>
          <Skeleton.Avatar active size={32} style={{ marginRight: 12 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Skeleton.Input active style={{ height: 20, marginBottom: 4 }} />
            <Skeleton.Input active style={{ height: 20 }} />
          </div>
        </Col>
      ))}
    </Row>
    {/* Buttons */}
    <Row gutter={[16, 16]}>
      <Col span={13}>
        <Skeleton.Button active block style={{ height: 40 }} />
      </Col>
      <Col span={6}>
        <Skeleton.Button active block style={{ height: 40 }} />
      </Col>
      <Col span={5}>
        <Skeleton.Button active block style={{ height: 40 }} />
      </Col>
    </Row>
  </StyledCard>
);

export default SkeletonJobPostTitle;
