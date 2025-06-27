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
  overflow: hidden;
  background: #ffffff;
  padding: 16px;
  height: 100%;
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const CompanyLogo = styled(Avatar)`
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
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

const JobTitleGroup = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 4px;
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
  margin-bottom: 8px;
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
  margin-bottom: 8px;
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
  padding-top: 8px;
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
  &:hover {
    background: #4c6ef5;
    box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
  }
`;

const JobCard = ({ job }) => {
  return (
    <JobCardWrapper hoverable>
      <JobHeader>
        <CompanyLogo
          src={
            job.logo ||
            "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png"
          }
          size={56}
        />
        <JobActions>
          <SaveBtn
            type="text"
            icon={<HeartOutlined />}
            className={job.saved ? "saved" : ""}
          />
        </JobActions>
      </JobHeader>
      <JobInfo>
        <JobTitleGroup>
          <JobTitle level={4}>{job.title}</JobTitle>
        </JobTitleGroup>
        {/* <CompanyName>{job.company}</CompanyName> */}
        <JobDetails>
          <DetailItem>
            <DetailIcon as={EnvironmentOutlined} />
            <Text>{job.location}</Text>
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
