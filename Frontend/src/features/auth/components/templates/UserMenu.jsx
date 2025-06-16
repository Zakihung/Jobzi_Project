import React, { useContext } from "react";
import { Dropdown, Avatar, Button, Space, message } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  HeartOutlined,
  DashboardOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { AuthContext } from "../../../../contexts/auth.context";
import AuthButtons from "../../../auth/components/templates/AuthButtons";
import { useNavigate } from "react-router-dom";

const UserMenuContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #577cf6;
    transform: scale(1.05);
  }
`;

const NotificationButton = styled(Button)`
  border: none;
  background: transparent;
  color: #595959;
  margin-right: 8px;

  &:hover {
    background-color: #f5f5f5;
    color: #1890ff;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserMenu = ({ onLogin, onSignup }) => {
  const { auth, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    logout();
    message.success("Đăng xuất thành công!");
  };

  const handleMenuClick = (key) => {
    switch (key) {
      case "cv-management":
        navigate("/profile");
        break;

      case "settings":
        console.log("Mở cài đặt");
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      key: "cv-management",
      icon: <ProfileOutlined />,
      label: "Quản lý CV",
      onClick: () => handleMenuClick("cv-management"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt",
      onClick: () => handleMenuClick("settings"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
      danger: true,
    },
  ];

  if (loading) {
    return (
      <UserMenuContainer>
        <Button loading size="small">
          Đang tải...
        </Button>
      </UserMenuContainer>
    );
  }

  // Nếu chưa đăng nhập, hiển thị nút đăng nhập/đăng ký
  if (!auth.isAuthenticated) {
    return (
      <UserMenuContainer>
        <AuthButtons onLogin={onLogin} onSignup={onSignup} />
      </UserMenuContainer>
    );
  }

  // Nếu đã đăng nhập, hiển thị menu người dùng
  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      arrow={true}
      trigger={["click"]}
    >
      <UserAvatar size={45} src={auth.user.avatar} icon={<UserOutlined />} />
    </Dropdown>
  );
};

export default UserMenu;
