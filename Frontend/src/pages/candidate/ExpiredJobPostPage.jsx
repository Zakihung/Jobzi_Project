import React from "react";
import { Button, Typography, Result } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ExpiredJobPostPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <div className="expired-job-container">
      <Result
        icon={
          <ClockCircleOutlined style={{ fontSize: 64, color: "#577cf6" }} />
        }
        status="info"
        title={
          <Title level={1} className="expired-job-title">
            404
          </Title>
        }
        subTitle={
          <Text className="expired-job-description">
            Xin lỗi, việc làm này không tồn tại do đã hết hạn hoặc đã được ẩn
            đi.
          </Text>
        }
        extra={
          <Button
            type="primary"
            size="large"
            onClick={handleGoBack}
            className="back-button"
          >
            Quay lại
          </Button>
        }
      />
      <style jsx>{`
        .expired-job-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8f9ff 0%, #f0f5ff 100%);
          padding: 24px;
        }

        .expired-job-title {
          color: #1a1a1a !important;
          font-size: 48px !important;
          font-weight: 800 !important;
          margin-bottom: 16px !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .expired-job-description {
          color: #666 !important;
          font-size: 18px !important;
          line-height: 1.6;
          max-width: 500px;
          margin: 0 auto 24px;
          display: block;
        }

        .back-button {
          background: #577cf6 !important;
          border-color: #577cf6 !important;
          border-radius: 8px;
          font-weight: 600;
          height: 48px;
          padding: 0 24px;
          text-align: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: #4c6ef5 !important;
          border-color: #4c6ef5 !important;
          box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
        }

        @media (max-width: 576px) {
          .expired-job-title {
            font-size: 36px !important;
          }

          .expired-job-description {
            font-size: 16px !important;
          }

          .back-button {
            height: 40px;
            font-size: 14px;
            padding: 0 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ExpiredJobPostPage;
