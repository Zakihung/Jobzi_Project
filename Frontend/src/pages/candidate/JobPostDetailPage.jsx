import React, { useState } from "react";
import { Layout, Row, Col, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import SigninRequiredModal from "../../components/organisms/SigninRequiredModal";
import { useAuth } from "../../contexts/auth.context";
import JobPostTitle from "../../features/job/components/templates/JobPostTitle";
import JobPostDetail from "../../features/job/components/templates/JobPostDetail";
import JobPostCompany from "../../features/job/components/templates/JobPostCompany";
import JobPostGeneralInfo from "../../features/job/components/templates/JobPostGeneralInfo";
import ApplyJobModal from "../../features/job/components/organisms/ApplyJobModal";
import useGetJobPostById from "../../features/postjob/hooks/Job_Post/useGetJobPostById";
import useGetResumeFilesByCandidateId from "../../features/resume_file/hooks/useGetResumeFilesByCandidateId";
import useCreateResumeFile from "../../features/resume_file/hooks/useCreateResumeFile";
import useCreateApplication from "../../features/application/hooks/useCreateApplication";
import useGetOnlineResume from "../../features/cv_online/hooks/useGetOnlineResume";
import SkeletonJobPostTitle from "../../components/skeletons/SkeletonJobPostTitle";
import SkeletonJobPostDetail from "../../components/skeletons/SkeletonJobPostDetail";
import SkeletonJobPostCompany from "../../components/skeletons/SkeletonJobPostCompany";
import SkeletonJobPostGeneralInfo from "../../components/skeletons/SkeletonJobPostGeneralInfo";
import styled from "styled-components";

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
  const { isLoggedIn, auth } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const { data: jobPostData, isLoading: isLoadingJobPostData } =
    useGetJobPostById(jobPostId);
  const { data: resumeFiles } = useGetResumeFilesByCandidateId(
    auth?.user?.candidate_id
  );
  const { data: onlineResume } = useGetOnlineResume(auth?.user?.candidate_id);
  const createResumeFile = useCreateResumeFile();
  const createApplication = useCreateApplication();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const companyId = jobPostData?.employer_id?.company_id;
  const candidateId = auth?.user?.candidate_id;

  // Xử lý lưu công việc
  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  // Xử lý hiển thị modal ứng tuyển
  const handleApply = () => {
    if (isLoggedIn) {
      setApplyModalVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  // Xử lý gửi hồ sơ
  const handleSubmitApplication = async ({
    selectedCV,
    newFile,
    newFileName,
  }) => {
    try {
      setIsSubmitting(true);
      let resumeData;

      if (selectedCV === "new" && newFile) {
        // Tải lên file mới
        resumeData = await createResumeFile.mutateAsync({
          candidateId,
          data: { name: newFileName || newFile.name },
          file: newFile,
        });
      } else if (selectedCV === "online" && onlineResume) {
        resumeData = { _id: onlineResume.data?._id, type: "online" };
      } else {
        resumeData = resumeFiles?.find((file) => file._id === selectedCV);
        if (!resumeData) {
          message.error("CV không tồn tại!");
          throw new Error("Invalid CV");
        }
      }

      // Gửi yêu cầu ứng tuyển bằng hook useCreateApplication
      await createApplication.mutateAsync({
        job_post_id: jobPostId,
        candidate_id: candidateId,
        resume_file_id: selectedCV === "online" ? null : resumeData._id,
        online_resume_id: selectedCV === "online" ? resumeData._id : null,
      });

      setApplyModalVisible(false);
    } catch {
      // Thông báo lỗi đã được xử lý trong useCreateApplication
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleApplyModalCancel = () => {
    setApplyModalVisible(false);
  };

  if (isLoadingJobPostData) {
    return (
      <StyledLayout>
        <StyledContent>
          <Row justify={"center"}>
            <Col
              span={21}
              style={{ backgroundColor: "#f8f9fa", borderRadius: 24 }}
            >
              <StyledRow gutter={[24, 24]} justify="center">
                <Col span={17}>
                  <SkeletonJobPostTitle />
                  <SkeletonJobPostDetail />
                </Col>
                <Col span={7}>
                  <SkeletonJobPostCompany />
                  <SkeletonJobPostGeneralInfo />
                </Col>
              </StyledRow>
            </Col>
          </Row>
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
            <ApplyJobModal
              visible={applyModalVisible}
              onCancel={handleApplyModalCancel}
              resumeFiles={resumeFiles}
              onSubmit={handleSubmitApplication}
              isSubmitting={isSubmitting}
              hasOnlineResume={!!onlineResume}
            />
          </Col>
        </Row>
      </StyledContent>
    </StyledLayout>
  );
};

export default JobPostDetailPage;
