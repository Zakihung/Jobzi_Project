import React from "react";
import { Card, Avatar, Typography, Button, Tag, Badge } from "antd";
import {
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Title, Text } = Typography;

const JobCardWrapper = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  background: #ffffff;
  padding: 24px;
  height: 100%;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const CompanyLogo = styled(Avatar)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const JobActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionBtn = styled(Button)`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  &:hover {
    background: #577cf6;
    color: #ffffff;
    border-color: #577cf6;
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

const JobTitleGroup = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const JobTitle = styled(Title)`
  && {
    color: #1a1a1a !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    margin: 0 !important;
    line-height: 1.3;
    flex: 1;
  }
`;

const UrgentBadge = styled(Badge)`
  .ant-badge-count {
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 12px;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const CompanyName = styled(Text)`
  color: #666;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  display: block;
`;

const JobDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
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

const SalaryText = styled(Text)`
  color: #52c41a;
  font-weight: 600;
`;

const JobTypeTag = styled(Tag)`
  background: #f0f5ff;
  color: #577cf6;
  border: 1px solid #b3d4ff;
  border-radius: 12px;
  font-size: 11px;
  padding: 2px 8px;
`;

const JobTags = styled.div`
  margin-bottom: 20px;
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

const JobFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

const PostedTime = styled(Text)`
  color: #999;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ApplyBtn = styled(Button)`
  background: #577cf6;
  border-color: #577cf6;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  height: 36px;
  padding: 0 20px;
  transition: all 0.3s ease;
  &:hover {
    background: #4c6ef5;
    border-color: #4c6ef5;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
  }
`;

const JobCard = ({ job }) => {
  return (
    <JobCardWrapper hoverable>
      <JobHeader>
        <CompanyLogo src={job.logo} size={56} />
        <JobActions>
          <SaveBtn
            type="text"
            icon={<HeartOutlined />}
            className={job.saved ? "saved" : ""}
          />
          <ActionBtn type="text" icon={<ShareAltOutlined />} />
        </JobActions>
      </JobHeader>
      <JobInfo>
        <JobTitleGroup>
          <JobTitle level={4}>{job.title}</JobTitle>
          {job.urgent && <UrgentBadge count="Urgent" />}
        </JobTitleGroup>
        <CompanyName>{job.company}</CompanyName>
        <JobDetails>
          <DetailItem>
            <DetailIcon as={EnvironmentOutlined} />
            <Text>{job.location}</Text>
          </DetailItem>
          <DetailItem>
            <DetailIcon as={DollarOutlined} />
            <SalaryText>{job.salary}</SalaryText>
          </DetailItem>
          <DetailItem>
            <DetailIcon as={ClockCircleOutlined} />
            <JobTypeTag>{job.type}</JobTypeTag>
          </DetailItem>
        </JobDetails>
        <JobTags>
          {job.tags.map((tag) => (
            <SkillTag key={tag}>{tag}</SkillTag>
          ))}
        </JobTags>
        <JobFooter>
          <PostedTime type="secondary">
            <ClockCircleOutlined /> {job.posted}
          </PostedTime>
          <ApplyBtn type="primary">Ứng tuyển ngay</ApplyBtn>
        </JobFooter>
      </JobInfo>
    </JobCardWrapper>
  );
};

export default JobCard;
