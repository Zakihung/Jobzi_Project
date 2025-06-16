import React from "react";
import { Button, Dropdown } from "antd";
import { UserOutlined, LoginOutlined, DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Wrapper cho toàn bộ nút đăng nhập / đăng ký
const AuthButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Nút chính
const AuthButton = styled(Button)`
  color: #333333;
  border-radius: 16px;
  padding: 8px 16px;
  margin-right: 4px;
  font-size: 15px;
  font-weight: 700;
  border: 1px solid #577cf6;
  box-shadow: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;

  &:hover {
    background-color: #f5f9ff !important;
    color: #577cf6 !important;
    border: 1px solid #577cf6;
  }

  @media (max-width: 768px) {
    height: 36px;
    font-size: 14px;
    padding: 0 16px;
  }
`;

// Styled div dùng làm label trong menu items
const MenuItemLabel = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f9ff;
    color: #577cf6;
  }

  svg {
    margin-right: 8px;
  }
`;

const AuthButtons = ({ onLogin, onSignup }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (onLogin) onLogin();
    else navigate("/login");
  };

  const handleSignup = () => {
    if (onSignup) onSignup();
    else navigate("/signup");
  };

  const handleEmployerClick = () => {
    navigate("/employer");
  };

  // Menu items với styled label
  const menuItems = [
    {
      key: "login",
      label: (
        <MenuItemLabel onClick={handleLogin}>
          <LoginOutlined /> Đăng nhập
        </MenuItemLabel>
      ),
    },
    {
      key: "signup",
      label: (
        <MenuItemLabel onClick={handleSignup}>
          <UserOutlined /> Tạo tài khoản
        </MenuItemLabel>
      ),
    },
  ];

  return (
    <AuthButtonContainer>
      <AuthButton onClick={handleEmployerClick}>Nhà tuyển dụng</AuthButton>
      <Dropdown
        menu={{ items: menuItems }}
        placement="bottomRight"
        trigger={["click"]}
      >
        <AuthButton type="default" icon={<LoginOutlined />}>
          Tài khoản <DownOutlined />
        </AuthButton>
      </Dropdown>
    </AuthButtonContainer>
  );
};

export default AuthButtons;
