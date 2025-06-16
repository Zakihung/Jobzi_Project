import React from "react";
import { Button, Space } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AuthButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const LoginButton = styled(Button)`
  border-radius: 6px;
  font-weight: 500;
  height: 36px;

  &:hover {
    background-color: #f0f2f5;
    border-color: #d9d9d9;
  }
`;

const RegisterButton = styled(Button)`
  border-radius: 6px;
  font-weight: 500;
  height: 36px;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border: none;

  &:hover {
    background: linear-gradient(135deg, #096dd9 0%, #0050b3 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MobileAuthButtons = styled.div`
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
    gap: 4px;
  }
`;

const DesktopAuthButtons = styled.div`
  @media (max-width: 768px) {
    display: none;
  }

  @media (min-width: 769px) {
    display: flex;
    gap: 8px;
  }
`;

const AuthButtons = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      navigate("/login");
    }
  };

  const handleRegister = () => {
    if (onRegister) {
      onRegister();
    } else {
      navigate("/signup");
    }
  };

  return (
    <AuthButtonsContainer>
      {/* Desktop Version */}
      <DesktopAuthButtons>
        <LoginButton
          type="default"
          icon={<LoginOutlined />}
          onClick={handleLogin}
        >
          Đăng nhập
        </LoginButton>
        <RegisterButton
          type="primary"
          icon={<UserOutlined />}
          onClick={handleRegister}
        >
          Đăng ký
        </RegisterButton>
      </DesktopAuthButtons>

      {/* Mobile Version */}
      <MobileAuthButtons>
        <LoginButton
          type="default"
          size="small"
          icon={<LoginOutlined />}
          onClick={handleLogin}
        >
          Đăng nhập
        </LoginButton>
        <RegisterButton
          type="primary"
          size="small"
          icon={<UserOutlined />}
          onClick={handleRegister}
        >
          Đăng ký
        </RegisterButton>
      </MobileAuthButtons>
    </AuthButtonsContainer>
  );
};

export default AuthButtons;
