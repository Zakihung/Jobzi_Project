import React from "react";
import { Button, Dropdown, Space } from "antd";
import { MenuOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

const MobileMenuBtn = styled(Button)`
  display: none;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  color: #4a5568;
  &:hover {
    background-color: rgba(87, 124, 246, 0.1);
    color: #577cf6;
  }
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const NavButton = styled(Button)`
  color: #333333;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  box-shadow: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  cursor: pointer;
  &:hover {
    background-color: #f5f9ff !important;
    color: #577cf6 !important;
    border: none;
  }
  &.active {
    background-color: #f5f9ff;
    color: #577cf6;
    border: none;
  }
`;

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

const MobileMenuButton = ({ onClick }) => {
  const { auth } = React.useContext(AuthContext);
  const role = auth?.user?.role;
  const navigate = useNavigate();
  const location = useLocation();

  const menuCandidateItems = [
    { key: "home", label: "Trang chủ", path: "/" },
    { key: "jobs", label: "Việc làm", path: "/jobs" },
    { key: "companies", label: "Công ty", path: "/companies" },
  ];

  const menuEmployerItems = [
    { key: "dashboard", label: "Tổng quan", path: "/employer" },
    { key: "jobs", label: "Việc làm", path: "/employer/jobs" },
    { key: "candidates", label: "Ứng viên", path: "/employer/candidates" },
    { key: "company", label: "Công ty", path: "/employer/company" },
  ];

  const authItems = !auth?.isAuthenticated
    ? [
        {
          key: "signin",
          label: (
            <MenuItemLabel
              onClick={() => {
                navigate("/signin");
                onClick();
              }}
            >
              <LoginOutlined /> Đăng nhập
            </MenuItemLabel>
          ),
        },
        {
          key: "signup",
          label: (
            <MenuItemLabel
              onClick={() => {
                navigate("/signup");
                onClick();
              }}
            >
              <UserOutlined /> Tạo tài khoản
            </MenuItemLabel>
          ),
        },
        {
          key: "employer-signup",
          label: (
            <MenuItemLabel
              onClick={() => {
                navigate("/employer-signup", {
                  state: { showRoleModal: true },
                });
                onClick();
              }}
            >
              <UserOutlined /> Tôi muốn tuyển dụng
            </MenuItemLabel>
          ),
        },
      ]
    : [];

  const handleClick = (path) => {
    navigate(path);
    onClick();
  };

  const menuItems = [
    ...(role === "candidate"
      ? menuCandidateItems
      : role === "employer"
      ? menuEmployerItems
      : menuCandidateItems
    ).map((item) => ({
      key: item.key,
      label: (
        <NavButton
          className={location.pathname === item.path ? "active" : ""}
          onClick={() => handleClick(item.path)}
        >
          {item.label}
        </NavButton>
      ),
    })),
    ...(authItems.length > 0 ? [{ type: "divider" }] : []),
    ...authItems,
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <MobileMenuBtn type="text" icon={<MenuOutlined />} />
    </Dropdown>
  );
};

export default MobileMenuButton;
