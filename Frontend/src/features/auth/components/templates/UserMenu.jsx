import React, { useContext } from "react";
import { Dropdown, Avatar, Button, Space, message, Badge } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { AuthContext } from "../../../../contexts/auth.context";
import AuthButtons from "../../../auth/components/templates/AuthButtons";
import { useNavigate } from "react-router-dom";

const UserMenuContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  border: 2px solid #f0f0f0;

  &:hover {
    border-color: #577cf6;
  }
`;

const PostJobButton = styled(Button)`
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

const NotificationButton = styled(Button)`
  border: none;
  border-radius: 50%;
  width: 45px !important;
  height: 45px;
  padding: 20px;
  background: transparent;
  color: #333333;
  margin-right: 16px;

  &:hover {
    background-color: #f5f9ff !important;
    border: none;
    .anticon {
      color: #577cf6;
    }
  }

  @media (max-width: 768px) {
    display: none;
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

const MenuItemLabelLogout = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fff5f5;
    color: #f65757;
  }

  svg {
    margin-right: 8px;
  }
`;

const UserMenu = ({ onSignin, onSignup }) => {
  const { auth, logout, loading } = useContext(AuthContext);
  const role = auth?.user?.role;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (role === "candidate") {
      window.location.href = "/";
    } else if (role === "employer") {
      window.location.href = "/";
    }
    logout();
    message.success("Đăng xuất thành công!");
  };

  const handleMenuClick = (key) => {
    switch (key) {
      case "cv-management":
        navigate("/profile");
        break;

      case "accountE":
        navigate("/employer/account");
        break;

      case "account":
        navigate("/account");
        break;
      default:
        break;
    }
  };

  const handlePostJobClick = () => {
    navigate("/employer/postjob");
  };

  // Menu items với styled label
  const menuItems = [
    ...(role !== "employer"
      ? [
          {
            key: "cv-management",
            label: (
              <MenuItemLabel onClick={() => handleMenuClick("cv-management")}>
                <ProfileOutlined /> Quản lý CV
              </MenuItemLabel>
            ),
          },
          {
            key: "account",
            label: (
              <MenuItemLabel onClick={() => handleMenuClick("account")}>
                <SettingOutlined /> Cài đặt
              </MenuItemLabel>
            ),
          },
        ]
      : []),
    ...(role !== "candidate"
      ? [
          {
            key: "accountE",
            label: (
              <MenuItemLabel onClick={() => handleMenuClick("accountE")}>
                <SettingOutlined /> Cài đặt
              </MenuItemLabel>
            ),
          },
        ]
      : []),
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <MenuItemLabelLogout onClick={handleLogout}>
          <LogoutOutlined /> Đăng xuất
        </MenuItemLabelLogout>
      ),
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
        <AuthButtons onSignin={onSignin} onSignup={onSignup} />
      </UserMenuContainer>
    );
  }

  // Nếu đã đăng nhập, hiển thị menu người dùng
  return (
    <UserMenuContainer>
      {role === "employer" && (
        <PostJobButton onClick={handlePostJobClick}>
          Đăng tuyển dụng
        </PostJobButton>
      )}
      <NotificationButton
        icon={
          <Badge
            count={5} // Example notification count
            style={{
              backgroundColor: "#ff0000",
              top: "-3px",
              right: "-3px",
            }}
          >
            <BellOutlined style={{ fontSize: "24px" }} />
          </Badge>
        }
        onClick={() => handleMenuClick("notifications")}
      />
      <Dropdown
        menu={{ items: menuItems }}
        placement="bottomRight"
        arrow={true}
        trigger={["hover"]}
      >
        <UserAvatar size={45} src={auth.user?.avatar} icon={<UserOutlined />} />
      </Dropdown>
    </UserMenuContainer>
  );
};

export default UserMenu;
