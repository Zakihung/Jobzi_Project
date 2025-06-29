import React from "react";
import { Typography, Button, Tag, Card, Space, Row, Col } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import { Send } from "lucide-react";
import styled from "styled-components";

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 1.5rem;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const JobTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 25px !important;
  font-weight: 700 !important;
  margin: 0 !important;

  @media (max-width: 768px) {
    font-size: 24px !important;
  }

  @media (max-width: 576px) {
    font-size: 20px !important;
  }
`;

const SaveButton = styled(Button)`
  color: #577cf6;
  font-weight: 600;
  border-radius: 8px;
  height: 40px;
  width: 100%;
  border: 1px solid #577cf6;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    color: #577cf6 !important;
    background: #f5f9ff !important;
  }

  @media (max-width: 768px) {
    flex: 1;
    height: 36px;
    font-size: 13px;
  }
`;

const ApplyButton = styled(Button)`
  background: #577cf6 !important;
  border-color: #577cf6 !important;
  border-radius: 8px;
  font-weight: 600;
  height: 40px;
  padding: 0 24px;
  width: 100%;

  &:hover {
    background: #4c6ef5 !important;
    border-color: #4c6ef5 !important;
    box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
  }

  @media (max-width: 768px) {
    flex: 1;
    height: 36px;
    font-size: 13px;
  }
`;

const AnalyzeButton = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  font-weight: 600;
  border: 1px solid #577cf6;
  color: #577cf6;
  background: #fff;
  transition: all 0.3s ease;

  &:hover {
    color: #577cf6 !important;
    background: #f5f9ff !important;
  }

  @media (max-width: 768px) {
    height: 36px;
    font-size: 13px;
  }
`;

const JobTag = styled(Tag)`
  background: none;
  border: none;
  border-radius: 12px;
  font-size: 13px;
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 576px) {
    font-size: 12px;
    padding: 2px 8px;
  }
`;

const IconWrapper = styled.div`
  background: #577cf6;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 20px;
  border-radius: 50%;
  padding: 20px;
`;

const TagContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const JobPostTitle = ({ job, isSaved, onSaveJob, onApply }) => {
  return (
    <StyledCard>
      <Row>
        <JobHeader>
          <JobTitle level={2}>{job.title}</JobTitle>
        </JobHeader>
      </Row>
      <Row justify={"space-between"}>
        <JobTag>
          <IconWrapper>
            <DollarOutlined />
          </IconWrapper>
          <TagContent>
            <Text>Thu nhập</Text>
            <Text strong>{job.salary}</Text>
          </TagContent>
        </JobTag>
        <JobTag>
          <IconWrapper>
            <EnvironmentOutlined />
          </IconWrapper>
          <TagContent>
            <Text>Địa điểm</Text>
            <Text strong>{job.location}</Text>
          </TagContent>
        </JobTag>
        <JobTag>
          <IconWrapper>
            <HourglassOutlined />
          </IconWrapper>
          <TagContent>
            <Text>Kinh nghiệm</Text>
            <Text strong>{job.experience}</Text>
          </TagContent>
        </JobTag>
        <JobTag>
          <IconWrapper>
            <ClockCircleOutlined />
          </IconWrapper>
          <TagContent>
            <Text>Hạn nộp</Text>
            <Text strong>{job.deadline}</Text>
          </TagContent>
        </JobTag>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "1rem" }}>
        <Col span={13}>
          <ApplyButton
            type="primary"
            size="large"
            onClick={onApply}
            icon={<Send size={18} />}
          >
            Ứng tuyển ngay
          </ApplyButton>
        </Col>
        <Col span={6}>
          <AnalyzeButton>Phân tích hồ sơ AI (Beta)</AnalyzeButton>
        </Col>
        <Col span={5}>
          <SaveButton
            type="text"
            icon={
              isSaved ? (
                <HeartFilled style={{ color: "#ff4d4f" }} />
              ) : (
                <HeartOutlined />
              )
            }
            onClick={onSaveJob}
          >
            {isSaved ? "Đã lưu" : "Lưu việc làm"}
          </SaveButton>
        </Col>
      </Row>
    </StyledCard>
  );
};

export default JobPostTitle;
