import React, { useContext } from "react";
import { Button, Typography, Result } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

const { Title, Text } = Typography;

const NotFoundPage = () => {
  const { auth } = useContext(AuthContext);
  const role = auth?.user?.role;
  const navigate = useNavigate();

  const handleGoHome = () => {
    role === "cadidate"
      ? navigate("/")
      : role === "employer"
      ? navigate("/employer")
      : navigate("/");
  };

  return (
    <div className="not-found-container">
      <Result
        icon={<FrownOutlined style={{ fontSize: 64, color: "#577cf6" }} />}
        status="404"
        title={
          <Title level={1} className="not-found-title">
            404
          </Title>
        }
        subTitle={
          <Text className="not-found-description">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </Text>
        }
        extra={
          <Button
            type="primary"
            size="large"
            onClick={handleGoHome}
            className="home-button"
          >
            Quay lại trang chủ
          </Button>
        }
      />
      <style jsx>{`
        .not-found-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8f9ff 0%, #f0f5ff 100%);
          padding: 24px;
        }

        .not-found-title {
          color: #1a1a1a !important;
          font-size: 72px !important;
          font-weight: 800 !important;
          margin-bottom: 16px !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .not-found-description {
          color: #666 !important;
          font-size: 18px !important;
          line-height: 1.6;
          max-width: 500px;
          margin: 0 auto 24px;
          display: block;
        }

        .home-button {
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

        .home-button:hover {
          background: #4c6ef5 !important;
          border-color: #4c6ef5 !important;
          box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
        }

        @media (max-width: 576px) {
          .not-found-title {
            font-size: 48px !important;
          }

          .not-found-description {
            font-size: 16px !important;
          }

          .home-button {
            height: 40px;
            font-size: 14px;
            padding: 0 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
