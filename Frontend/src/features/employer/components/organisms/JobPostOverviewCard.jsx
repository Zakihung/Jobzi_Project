import React from "react";
import { List, Typography, Row, Col, Skeleton } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import styled from "styled-components";
import useGetNumberOfApplicationByJobPostId from "../../../application/hooks/useGetNumberOfApplicationByJobPostId";

const { Text } = Typography;

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
    padding: 12px 0;
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

  @media (max-width: 576px) {
    font-size: 20px;
    width: 40px;
    height: 40px;
  }
`;

const JobTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;

  @media (max-width: 576px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
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

  @media (max-width: 576px) {
    font-size: 11px;
    padding: 3px 10px;
  }
`;

const JobMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 576px) {
    gap: 2px;
  }
`;

const JobPostOverviewCard = ({ job }) => {
  const { data: applicationCount, isLoading } =
    useGetNumberOfApplicationByJobPostId(job?.id);

  const getStatusClass = (status) => {
    switch (status) {
      case "Đang tuyển":
        return "active";
      case "Đang ẩn":
        return "paused";
      case "Đã đóng":
        return "closed";
      case "Hết hạn":
        return "expired";
      default:
        return "";
    }
  };

  const createdAt = new Date(job?.createdAt);
  const expiredDate = new Date(job?.expired_date);
  const today = new Date();
  const daysLeft = Math.ceil((expiredDate - today) / (1000 * 60 * 60 * 24));
  const status = daysLeft <= 0 ? "Hết hạn" : job?.status;

  if (isNaN(createdAt.getTime())) {
    console.warn(`Invalid createdAt for job ${job?.id}`);
    return null;
  }

  if (isLoading) {
    return (
      <JobItem>
        <Row style={{ width: "100%" }}>
          <Col span={4}>
            <Skeleton.Avatar active size={48} />
          </Col>
          <Col span={20}>
            <Skeleton active title paragraph={{ rows: 2 }} />
          </Col>
        </Row>
      </JobItem>
    );
  }

  return (
    <JobItem>
      <Row style={{ width: "100%" }}>
        <Col span={4}>
          <JobIcon />
        </Col>
        <Col span={20}>
          <JobTitle>{job?.title || "Không có tiêu đề"}</JobTitle>
          <JobStatus className={getStatusClass(status)}>{status}</JobStatus>
          <JobMeta>
            <Text>
              Số lượng hồ sơ:{" "}
              {isLoading ? "Đang tải..." : applicationCount?.count || 0}
            </Text>
            <Text>Ngày đăng: {createdAt.toLocaleDateString("vi-VN")}</Text>
          </JobMeta>
        </Col>
      </Row>
    </JobItem>
  );
};

export default JobPostOverviewCard;
