import React, { useState } from "react";
import { Layout, Row, Col, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import SigninRequiredModal from "../../components/organisms/SigninRequiredModal";
import { useAuth } from "../../contexts/auth.context";
import JobPostTitle from "../../features/job/components/templates/JobPostTitle";
import JobPostDetail from "../../features/job/components/templates/JobPostDetail";
import JobPostCompany from "../../features/job/components/templates/JobPostCompany";
import JobPostGeneralInfo from "../../features/job/components/templates/JobPostGeneralInfo";
import styled from "styled-components";
import useGetJobPostById from "../../features/postjob/hooks/Job_Post/useGetJobPostById";

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  background: #ffffff;
  padding: 0;
`;

const StyledContent = styled(Content)`
  padding: 0;
  background: #ffffff;
`;

const StyledRow = styled(Row)`
  margin: 0 auto;
  padding: 1.5rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const NoResults = styled.div`
  color: #666;
  font-size: 16px;
  text-align: center;
  display: block;
  margin: 40px 0;
`;

const JobPostDetailPage = () => {
  const navigate = useNavigate();
  const { jobPostId } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const { isLoggedIn } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { data: jobPostData, isLoading: isLoadingJobPostData } =
    useGetJobPostById(jobPostId);

  const companyId = jobPostData?.employer_id?.company_id;

  console.log("jobPostData: ", jobPostData);

  // Xử lý lưu công việc
  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  // Xử lý ứng tuyển
  const handleApply = () => {
    if (isLoggedIn) {
      navigate("/apply");
    } else {
      setModalVisible(true);
    }
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  if (isLoadingJobPostData) {
    return (
      <StyledLayout>
        <StyledContent>
          <LoadingContainer>
            <Spin size="large" />
          </LoadingContainer>
        </StyledContent>
      </StyledLayout>
    );
  }

  if (!jobPostData) {
    return (
      <StyledLayout>
        <StyledContent>
          <NoResults>Không tìm thấy thông tin việc làm</NoResults>
        </StyledContent>
      </StyledLayout>
    );
  }

  return (
    <StyledLayout>
      <StyledContent>
        <Row justify={"center"}>
          <Col
            span={21}
            style={{ backgroundColor: "#f8f9fa", borderRadius: 24 }}
          >
            <StyledRow gutter={[24, 24]} justify="center">
              {/* Left Section */}
              <Col span={17}>
                {/* Row 1 Col 1: Job Title */}
                <JobPostTitle
                  job={jobPostData}
                  isSaved={isSaved}
                  onSaveJob={handleSaveJob}
                  onApply={handleApply}
                />

                {/* Row 2 Col 1: Job Detail */}
                <JobPostDetail job={jobPostData} />
              </Col>

              {/* Right Section */}
              <Col span={7}>
                {/* Row 1 Col 2: Company Info */}
                <JobPostCompany companyId={companyId} />

                {/* Row 2 Col 2: General Info */}
                <JobPostGeneralInfo job={jobPostData} />
              </Col>
            </StyledRow>

            <SigninRequiredModal
              visible={modalVisible}
              onCancel={handleModalCancel}
            />
          </Col>
        </Row>
      </StyledContent>
    </StyledLayout>
  );
};

export default JobPostDetailPage;
