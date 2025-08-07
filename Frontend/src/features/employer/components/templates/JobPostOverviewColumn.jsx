import React from "react";
import { Card, Typography, Button, List, Row, Col } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useGetJobPostsByEmployerId from "../../../postjob/hooks/Job_Post/useGetJobPostsByEmployerId";
import JobPostOverviewCard from "../organisms/JobPostOverviewCard";

const { Title, Text } = Typography;

const JobPostingsCard = styled(Card)`
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 24px;
  overflow: hidden;
  height: 100%;
  width: 100%;

  @media (max-width: 1200px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 576px) {
    padding: 16px;
  }

  @media print {
    box-shadow: none;
    border: 1px solid #ccc;
    page-break-inside: avoid;
  }
`;

const CardTitle = styled(Title)`
  color: #1f2937 !important;
  font-size: 20px !important;
  font-weight: 700 !important;
  margin-bottom: 24px !important;
  line-height: 1.3 !important;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    font-size: 18px !important;
    margin-bottom: 20px !important;
  }

  @media (max-width: 576px) {
    font-size: 16px !important;
    margin-bottom: 16px !important;
  }
`;

const JobItem = styled(List.Item)`
  padding: 20px 0;
  border-bottom: 1px solid #e5e7eb;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  border-radius: 16px;
  margin-bottom: 8px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  @media (max-width: 576px) {
    padding: 16px 0;
  }
`;

const JobIcon = styled(FileTextOutlined)`
  color: #577cf6;
  font-size: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(87, 124, 246, 0.1);
  border-radius: 16px;
`;

const JobTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
`;

const JobMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const JobStatus = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &.active {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }

  &.paused {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
  }

  &.closed {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }

  &.expired {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
`;

const ActionButton = styled(Button)`
  background: #577cf6 !important;
  border-color: #577cf6 !important;
  border-radius: 16px !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  height: 48px !important;
  font-size: 15px !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  margin-top: 12px;

  @media (max-width: 768px) {
    height: 44px !important;
    font-size: 14px !important;
  }

  @media (max-width: 576px) {
    height: 40px !important;
  }

  @media print {
    display: none;
  }
`;

const JobPostOverviewColumn = ({ employerId }) => {
  const navigate = useNavigate();
  const { data: jobsData, isLoading } = useGetJobPostsByEmployerId(employerId);

  const jobPostings = jobsData
    ? jobsData
        .map((job) => {
          const createdAt = new Date(job?.createdAt);
          const expiredDate = new Date(job?.expired_date);
          const today = new Date();
          const daysLeft = Math.ceil(
            (expiredDate - today) / (1000 * 60 * 60 * 24)
          );
          if (isNaN(createdAt.getTime())) {
            console.warn(`Invalid createdAt for job ${job?._id}`);
            return null;
          }
          return {
            id: job?._id,
            title: job?.title || "Không có tiêu đề",
            status:
              job?.status === "active"
                ? "Đang tuyển"
                : job?.status === "inactive"
                ? "Đang ẩn"
                : "Đã đóng",
            applications: job?.applications?.length || 0,
            postedDate: createdAt.toLocaleDateString("vi-VN"),
            createdAt: createdAt,
            daysLeft,
          };
        })
        .filter((job) => job !== null)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 3)
    : [];

  if (isLoading) return null;

  return (
    <Col span={10}>
      <JobPostingsCard>
        <CardTitle level={4}>Việc làm đã tạo</CardTitle>
        <List
          dataSource={jobPostings}
          renderItem={(item) => <JobPostOverviewCard job={item} />}
        />
        <ActionButton
          type="primary"
          block
          onClick={() => navigate("/employer/jobs")}
        >
          Xem tất cả việc làm đã tạo
        </ActionButton>
        <ActionButton
          type="primary"
          block
          onClick={() => navigate("/employer/postjob")}
        >
          Đăng tin tuyển dụng mới
        </ActionButton>
      </JobPostingsCard>
    </Col>
  );
};

export default JobPostOverviewColumn;
