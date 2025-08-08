import React from "react";
import { Card, Avatar, Typography, Button } from "antd";
import {
  CalendarOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useDeleteResumeAnalysis from "../../hooks/useDeleteResumeAnalysis";

const { Title, Text } = Typography;

const AnalyzeCardWrapper = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  padding: 16px;
  height: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  &:hover {
    .analyze-title {
      color: #577cf6 !important;
    }
    border: 1px solid #577cf6;
    box-shadow: 0 0 0 3px rgba(87, 124, 246, 0.2);
  }
`;

const AnalyzeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const CompanyLogo = styled(Avatar)`
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  justify: flex-start;
`;

const AnalyzeContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const AnalyzeTitle = styled(Title)`
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

const AnalyzeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
`;

const ResumeFileName = styled(Text)`
  font-size: 14px;
  color: #666;
  display: flex;
  gap: 6px;
  align-item: center;
`;

const ViewDetailBtn = styled(Button)`
  color: #1677ff !important;
  border: 1px solid #1677ff !important;
  background: #ffffff;
  font-weight: 600;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    background: #e6f4ff !important;
    color: #0958d9 !important;
    border-color: #0958d9 !important;
  }
`;

const DeleteBtn = styled(Button)`
  color: #ff4d4f !important;
  border: 1px solid #ff4d4f !important;
  background: #ffffff;
  font-weight: 600;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    background: #fff1f0 !important;
    color: #cf1322 !important;
    border-color: #cf1322 !important;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f0f0;
  margin: 0 -4px;
`;

const AnalyzeCard = ({ analysis }) => {
  const navigate = useNavigate();
  const { mutate: deleteAnalysis, isLoading: isDeleting } =
    useDeleteResumeAnalysis();

  const handleNavigate = () => {
    navigate(
      `/review-resume-analysis/${analysis.job_post_id?._id}/${analysis.resume_file_id?._id}`
    );
  };

  const handleDelete = () => {
    deleteAnalysis(analysis._id);
  };

  return (
    <AnalyzeCardWrapper>
      <AnalyzeHeader>
        <AnalyzeContent>
          <AnalyzeTitle className="analyze-title">
            {analysis.job_post_id?.title || "Không xác định"}
          </AnalyzeTitle>
        </AnalyzeContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-end",
          }}
        >
          <ViewDetailBtn onClick={handleNavigate}>Xem chi tiết</ViewDetailBtn>
          <DeleteBtn onClick={handleDelete} disabled={isDeleting}>
            <DeleteOutlined /> {isDeleting ? "Đang xóa..." : "Xóa"}
          </DeleteBtn>
        </div>
      </AnalyzeHeader>

      <AnalyzeDetails>
        <DateInfo>
          <CalendarOutlined style={{ color: "#577cf6" }} />
          <Text strong>Ngày phân tích:</Text>
          <Text>
            {new Date(analysis.createdAt).toLocaleDateString("vi-VN")}
          </Text>
        </DateInfo>
        <ResumeFileName>
          <InfoCircleOutlined style={{ color: "#577cf6" }} />
          <Text strong>File phân tích:</Text>
          <Text>{analysis.resume_file_id?.name || "Không xác định"}</Text>
        </ResumeFileName>
      </AnalyzeDetails>
    </AnalyzeCardWrapper>
  );
};

export default AnalyzeCard;
