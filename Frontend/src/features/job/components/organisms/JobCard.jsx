import React, { useContext, useState, useEffect } from "react";
import { Card, Avatar, Typography, Button, Tag, Skeleton, App } from "antd";
import {
  EnvironmentOutlined,
  DollarOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import styled from "styled-components";
import { formatTime } from "../../../../constants/formatTime";
import useGetCompanyById from "../../../company/hooks/Company/useGetCompanyById";
import { useNavigate } from "react-router-dom";
import useSaveJobPost from "../../../candidate/hooks/Candidate_Save_Job_Post/useSaveJobPost";
import useUnSaveJobPost from "../../../candidate/hooks/Candidate_Save_Job_Post/useUnSaveJobPost";
import useGetJobPostSaveByCandidate from "../../../candidate/hooks/Candidate_Save_Job_Post/useGetJobPostSaveByCandidate";
import { AuthContext } from "../../../../contexts/auth.context";
import SigninRequiredModal from "../../../../components/organisms/SigninRequiredModal";

const { Title, Text } = Typography;

const JobCardWrapper = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  padding: 16px;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  &:hover {
    .job-title {
      color: #577cf6 !important;
    }
    border: 1px solid #577cf6;
    box-shadow: 0 0 0 3px rgba(87, 124, 246, 0.2);
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const CompanyLogo = styled(Avatar)`
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  jutify: flex-start;
`;

const JobActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionBtn = styled(Button)`
  color: #1a1a1a !important;
  border: 1px solid #e8e8e8 !important;
  background: #ffffff;
  font-weight: 600;
  width: 36px;
  height: 36px;
  padding: 0 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  &:hover {
    border-color: #577cf6 !important;
    color: #577cf6 !important;
    background: #f6f8ff !important;
  }

  .anticon {
    transition: transform 0.3s ease;
  }

  &:hover {
    .anticon {
      transform: scale(1.3);
    }
  }
`;

const SaveBtn = styled(ActionBtn)`
  font-size: 17px;
  transition: background-color 0.3s;

  &.saved {
    background-color: #fff1f0;
    &:hover {
      border-color: #ffe1e1 !important;
      background-color: #ffe1e1 !important;
    }
  }
`;

const JobInfo = styled.div`
  flex: 1;
`;

const JobContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const JobTitle = styled(Title)`
  && {
    color: #1a1a1a !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    margin: 0 !important;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CompanyName = styled(Text)`
  margin-top: 4px;
  font-size: 15px;
  font-weight: 500;
  color: #666;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const JobDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 10px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
`;

const DetailIcon = styled.span`
  color: #577cf6;
  font-size: 14px;
`;

const DetailText = styled(Text)`
  font-size: 14px;
`;

const SalaryText = styled(Text)`
  color: #52c41a;
  font-weight: 600;
  font-size: 14px;
`;

const JobTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SkillTag = styled(Tag)`
  background: #f6f8ff;
  color: #577cf6;
  border: 1px solid #d6e4ff;
  border-radius: 16px;
  font-size: 12px;
  padding: 4px 12px;
  font-weight: 500;
`;

const PostedTime = styled(Text)`
  color: #999;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SkeletonContainer = styled.div`
  padding: 16px;
`;

const JobCard = ({ job }) => {
  const { auth } = useContext(AuthContext);
  const candidateId = auth?.user?.candidate_id;
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { data: companyData, isLoading } = useGetCompanyById(job.company);
  const { mutate: saveJobPost, isLoading: isSaving } = useSaveJobPost();
  const { mutate: unSaveJobPost, isLoading: isUnSaving } = useUnSaveJobPost();
  const { data: savedJobPosts, isLoading: isLoadingSavedJobPosts } =
    useGetJobPostSaveByCandidate(candidateId);
  const [isSaved, setIsSaved] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Kiểm tra trạng thái lưu bài đăng công việc từ backend
  useEffect(() => {
    if (savedJobPosts && job.id) {
      const isJobSaved = savedJobPosts.some(
        (savedJob) => savedJob.job_post_id._id === job.id
      );
      setIsSaved(isJobSaved);
    }
  }, [savedJobPosts, job.id]);

  const handleSaveJob = () => {
    if (!candidateId) {
      setModalVisible(true);
      return;
    }

    const data = { candidate_id: candidateId, job_post_id: job.id };
    if (isSaved) {
      unSaveJobPost(data, {
        onSuccess: () => {
          message.success("Đã hủy lưu việc làm này");
          setIsSaved(false); // Cập nhật trạng thái giao diện
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message || "Hủy lưu việc làm thất bại"
          );
        },
      });
    } else {
      saveJobPost(data, {
        onSuccess: () => {
          message.success("Đã lưu việc làm này");
          setIsSaved(true); // Cập nhật trạng thái giao diện
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message || "Lưu việc làm thất bại"
          );
        },
      });
    }
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  if (isLoading && isLoadingSavedJobPosts) {
    return (
      <JobCardWrapper>
        <SkeletonContainer>
          <Skeleton
            active
            avatar={{ size: 70, shape: "square" }}
            paragraph={{ rows: 3 }}
          />
        </SkeletonContainer>
      </JobCardWrapper>
    );
  }

  return (
    <JobCardWrapper onClick={() => navigate(`/jobpost/${job.id}`)}>
      <JobHeader>
        <CompanyLogo
          src={
            companyData?.logo ||
            "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png"
          }
          size={70}
        />
        <JobContent>
          <JobTitle className="job-title">{job.title}</JobTitle>
          <CompanyName>{companyData?.name}</CompanyName>
        </JobContent>
        <JobActions>
          <SaveBtn
            type="text"
            icon={
              isSaved ? (
                <HeartFilled style={{ color: "#ff4d4f" }} />
              ) : (
                <HeartOutlined />
              )
            }
            className={isSaved ? "saved" : ""}
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện click lan sang JobCardWrapper
              handleSaveJob();
            }}
            loading={isSaving || isUnSaving}
          />
        </JobActions>
      </JobHeader>
      <JobInfo>
        <JobDetails>
          <PostedTime type="secondary">{formatTime(job.posted)}</PostedTime>
          {job.location != "Không xác định" && (
            <DetailItem>
              <DetailIcon as={EnvironmentOutlined} />
              <DetailText>{job.location}</DetailText>
            </DetailItem>
          )}
          <DetailItem>
            <DetailIcon as={DollarOutlined} />
            <SalaryText>
              {job.salary === "0-0 triệu" ? "Thỏa thuận" : job.salary}
            </SalaryText>
          </DetailItem>
        </JobDetails>
        <JobTags>
          {job.tags.map((tag, index) => (
            <SkillTag key={`${job.id}-${index}`}>{tag}</SkillTag>
          ))}
        </JobTags>
      </JobInfo>
      <SigninRequiredModal
        visible={modalVisible}
        onCancel={handleModalCancel}
      />
    </JobCardWrapper>
  );
};

export default JobCard;
