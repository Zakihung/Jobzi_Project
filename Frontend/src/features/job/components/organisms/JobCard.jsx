import React from "react";
import { Card, Avatar, Typography, Button, Tag, Badge } from "antd";
import {
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { formatTime } from "../../../../constants/formatTime";
import useGetCompanyById from "../../../company/hooks/Company/useGetCompanyById";
import { useNavigate } from "react-router-dom";

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
  &.saved {
    background: #ff4d4f;
    color: #ffffff;
    border-color: #ff4d4f;
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

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { data: companyData, isLoading } = useGetCompanyById(job.company);
  if (isLoading) return;
  return (
    <JobCardWrapper onClick={() => navigate(`/jobpost/${job.id}`)}>
      <JobHeader>
        <CompanyLogo
          src={
            job.logo ||
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
            icon={<HeartOutlined />}
            className={job.saved ? "saved" : ""}
          />
        </JobActions>
      </JobHeader>
      <JobInfo>
        {/* <CompanyName>{job.company}</CompanyName> */}
        <JobDetails>
          <PostedTime type="secondary">{formatTime(job.posted)}</PostedTime>
          <DetailItem>
            <DetailIcon as={EnvironmentOutlined} />
            <DetailText>{job.location}</DetailText>
          </DetailItem>
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
    </JobCardWrapper>
  );
};

export default JobCard;
