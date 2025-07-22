import React from "react";
import { Row, Col, Typography, Button, Skeleton } from "antd";
import { FireOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import JobCard from "../../../job/components/organisms/JobCard";
import { useNavigate } from "react-router-dom";
import useGetAllJobPosts from "../../../postjob/hooks/Job_Post/useGetAllJobPosts";
import JobGrid from "../../../job/components/templates/JobGrid";

const { Title, Text } = Typography;

const FeaturedJobsSectionWrapper = styled.section`
  padding: 2rem;
  margin-top: 2rem;
  background: #f8f9fa;
  border-radius: 24px;
`;

const SectionContainer = styled.div`
  margin: 0;
  padding: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
`;

const SectionTitleGroup = styled.div`
  flex: 1;
`;

const SectionTitle = styled(Title)`
  && {
    color: #1a1a1a !important;
    font-size: 36px !important;
    font-weight: 700 !important;
    margin: 0 !important;
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const SectionIcon = styled(FireOutlined)`
  color: #577cf6;
  font-size: 32px;
`;

const SectionSubtitle = styled(Text)`
  color: #666;
  font-size: 16px;
  margin-top: 8px;
  display: block;
`;

const ViewAllBtn = styled(Button)`
  && {
    color: #577cf6 !important;
    border-color: #577cf6 !important;
    font-weight: 600;
    height: 40px;
    padding: 0 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    &:hover {
      background: #577cf6 !important;
      color: #ffffff !important;
    }
  }
`;

const SkeletonContainer = styled.div`
  padding: 16px;
`;

const FeaturedJobsSection = () => {
  const navigate = useNavigate();
  const { data: jobs, isLoading } = useGetAllJobPosts();

  // Sắp xếp jobs theo ngày đăng (createdAt) mới nhất
  const sortedJobs = jobs
    ? [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  if (isLoading) {
    return (
      <FeaturedJobsSectionWrapper>
        <SectionContainer>
          <SectionHeader>
            <SectionTitleGroup>
              <Skeleton active title={{ width: "30%" }} paragraph={false} />
            </SectionTitleGroup>
            <Skeleton.Button active size="large" />
          </SectionHeader>
          <SkeletonContainer>
            <Row gutter={[16, 16]}>
              {Array(6)
                .fill()
                .map((_, index) => (
                  <Col key={index} xs={24} sm={12} md={8}>
                    <Skeleton
                      active
                      avatar={{ size: 70, shape: "square" }}
                      paragraph={{ rows: 3 }}
                    />
                  </Col>
                ))}
            </Row>
          </SkeletonContainer>
        </SectionContainer>
      </FeaturedJobsSectionWrapper>
    );
  }

  return (
    <FeaturedJobsSectionWrapper>
      <SectionContainer>
        <SectionHeader>
          <SectionTitleGroup>
            <SectionTitle level={2}>
              <SectionIcon />
              Việc làm nổi bật
            </SectionTitle>
          </SectionTitleGroup>
          <ViewAllBtn type="primary" ghost onClick={() => navigate("/jobs")}>
            Xem tất cả <RightOutlined />
          </ViewAllBtn>
        </SectionHeader>
        <JobGrid jobs={sortedJobs || []} />
      </SectionContainer>
    </FeaturedJobsSectionWrapper>
  );
};

export default FeaturedJobsSection;
