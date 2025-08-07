import { Layout, Row, Col } from "antd";
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

  @media (max-width: 576px) {
    padding: 16px;
  }
`;

const ContentCol = styled(Col)`
  width: 100%;
`;

const CandidateEmployerPage = () => {
  const { auth } = useContext(AuthContext);
  const { data: employer } = useGetEmployerByUserId(auth?.user?.id);
  const employerId = employer?.data?._id;

  const { data: jobsData, isLoading: isJobsLoading } =
    useGetJobPostsByEmployerId(employerId);

  if (isJobsLoading) return <div>Đang tải...</div>;

  const jobs =
    jobsData?.map((job) => ({
      id: job?._id,
      title: job?.title,
    })) || [];

  return (
    <Container gutter={[24, 24]} justify="center">
      <ContentCol span={21}>
        {jobs.map((job) => (
          <JobPostCard key={job.id} job={job} />
        ))}
      </ContentCol>
    </Container>
  );
};

export default CandidateEmployerPage;
