import { Card, Skeleton, Avatar, Space } from "antd";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 24px;
  margin-bottom: 24px;
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const CompanyNameSpace = styled.div`
  flex: 1;
  height: 80px;
  display: flex;
  align-items: start;
`;

const CompanyDetails = styled(Space)`
  width: 100%;
  margin-bottom: 10px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 15px;
  margin-bottom: 8px;
`;

const DetailIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailLabel = styled.div`
  width: 80px;
  height: 18px;
`;

const SkeletonJobPostCompany = () => (
  <StyledCard>
    <CompanyHeader>
      <Skeleton.Avatar active shape="square" size={80} />
      <CompanyNameSpace>
        <Skeleton.Input active style={{ width: "100%", height: 28 }} />
      </CompanyNameSpace>
    </CompanyHeader>
    <CompanyDetails direction="vertical">
      <DetailItem>
        <DetailIcon>
          <Skeleton.Avatar active size={24} shape="circle" />
        </DetailIcon>
        <DetailLabel>
          <Skeleton.Input active block size="small" style={{ height: 18 }} />
        </DetailLabel>
      </DetailItem>
      <DetailItem>
        <DetailIcon>
          <Skeleton.Avatar active size={24} shape="circle" />
        </DetailIcon>
        <DetailLabel>
          <Skeleton.Input active block size="small" style={{ height: 18 }} />
        </DetailLabel>
      </DetailItem>
    </CompanyDetails>
    <Skeleton.Button active block style={{ height: 40 }} />
  </StyledCard>
);
export default SkeletonJobPostCompany;
