import { Card, Skeleton, Row, Col, Space } from "antd";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 1.5rem;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
  margin-bottom: 24px;
`;

const TagItem = styled.div`
  border-radius: 16px;
  width: 80px;
  height: 28px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-right: 3rem;
`;

const HtmlContent = styled.div`
  margin-bottom: 32px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const SkeletonJobPostDetail = () => (
  <StyledCard>
    {/* Header */}
    <Row>
      <Skeleton.Input
        active
        style={{ width: 220, height: 32, marginBottom: 16 }}
      />
    </Row>
    {/* TagList */}
    <TagList>
      {[1, 2, 3, 4].map((_, idx) => (
        <TagItem key={idx}>
          <Skeleton.Input
            active
            size="small"
            style={{ width: 60, height: 20 }}
          />
        </TagItem>
      ))}
    </TagList>
    {/* Mô tả công việc */}
    <HtmlContent>
      <Skeleton.Input
        active
        style={{ width: 180, height: 24, marginBottom: 16 }}
      />
      <Skeleton active paragraph={{ rows: 5 }} />
    </HtmlContent>
    {/* Yêu cầu ứng viên */}
    <HtmlContent>
      <Skeleton.Input
        active
        style={{ width: 180, height: 24, marginBottom: 16 }}
      />
      <Skeleton active paragraph={{ rows: 4 }} />
    </HtmlContent>
    {/* Quyền lợi ứng viên */}
    <HtmlContent>
      <Skeleton.Input
        active
        style={{ width: 180, height: 24, marginBottom: 16 }}
      />
      <Skeleton active paragraph={{ rows: 3 }} />
    </HtmlContent>
    {/* Địa điểm làm việc */}
    <HtmlContent>
      <Skeleton.Input
        active
        style={{ width: 180, height: 24, marginBottom: 16 }}
      />
      <Space direction="vertical" style={{ width: "100%" }}>
        {[1, 2].map((_, idx) => (
          <InfoItem key={idx}>
            <Skeleton.Avatar active size={24} />
            <Skeleton.Input
              active
              size="small"
              style={{ width: 120, height: 20 }}
            />
          </InfoItem>
        ))}
      </Space>
    </HtmlContent>
  </StyledCard>
);

export default SkeletonJobPostDetail;
