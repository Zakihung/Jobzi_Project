import { Layout, Row, Col, Skeleton } from "antd";
import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/auth.context";
import useGetEmployerByUserId from "../../features/employer/hooks/useGetEmployerByUserId";
import useGetJobPostsByEmployerId from "../../features/postjob/hooks/Job_Post/useGetJobPostsByEmployerId";
import JobPostCard from "../../features/application/components/templates/JobPostCard";

const { Content } = Layout;

const Container = styled(Row)`
  background: #ffffff;
  border-radius: 24px;
  padding: 24px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 16px;
    margin: 0 8px;
  }

  @media (max-width: 576px) {
    padding: 5px;
    margin: 0 4px;
  }
`;

const ContentCol = styled(Col)`
  width: 100%;
`;

const SkeletonWrapper = styled.div`
  padding: 24px;
  background: #ffffff;
  border-radius: 24px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 20px;
    margin: 0 16px;
  }

  @media (max-width: 576px) {
    padding: 16px;
    margin: 0 8px;
  }
`;

const CandidateEmployerPage = () => {
  const { auth } = useContext(AuthContext);
  const { data: employer, isLoading: isEmployerLoading } =
    useGetEmployerByUserId(auth?.user?.id);
  const employerId = employer?.data?._id;

  const { data: jobsData, isLoading: isJobsLoading } =
    useGetJobPostsByEmployerId(employerId);

  if (isJobsLoading || isEmployerLoading) {
    return (
      <SkeletonWrapper>
        <Skeleton active paragraph={{ rows: 6 }} />
      </SkeletonWrapper>
    );
  }

  const jobs =
    jobsData?.map((job) => ({
      id: job?._id,
      title: job?.title,
    })) || [];

  return (
    <Container gutter={[24, 24]} justify="center">
      <ContentCol xs={24} sm={23} md={22} lg={22} xl={22}>
        {jobs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Text type="secondary" style={{ fontSize: 16 }}>
              Chưa có tin tuyển dụng nào.
            </Text>
          </div>
        ) : (
          jobs.map((job) => <JobPostCard key={job.id} job={job} />)
        )}
      </ContentCol>
    </Container>
  );
};

export default CandidateEmployerPage;
