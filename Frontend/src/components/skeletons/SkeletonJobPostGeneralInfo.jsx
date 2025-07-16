import { Card, Skeleton, Row, Space, Col } from "antd";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 24px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.div`
  margin-bottom: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const InfoIcon = styled.div`
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;
`;

const SkeletonJobPostGeneralInfo = () => (
  <StyledCard>
    <Row>
      <SectionTitle>
        <Skeleton.Input
          active
          style={{ display: "block", width: "100%", height: 28 }}
        />
      </SectionTitle>
    </Row>
    <Row>
      <Space direction="vertical" style={{ width: "100%" }}>
        {[...Array(6)].map((_, idx) => (
          <InfoItem key={idx}>
            <InfoIcon>
              <Skeleton.Avatar active size={28} shape="circle" />
            </InfoIcon>
            <InfoContent>
              <Skeleton.Input
                active
                size="small"
                style={{ width: 100, height: 18 }}
              />
              <Skeleton.Input
                active
                size="small"
                style={{ width: 120, height: 18 }}
              />
            </InfoContent>
          </InfoItem>
        ))}
      </Space>
    </Row>
  </StyledCard>
);

export default SkeletonJobPostGeneralInfo;
