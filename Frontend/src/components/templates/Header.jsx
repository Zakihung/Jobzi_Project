import React, { useState } from "react";
import {
  Layout,
  Button,
  Avatar,
  Dropdown,
  Badge,
  Input,
  Space,
  Col,
  Row,
} from "antd";
import {
  SearchOutlined,
  BellOutlined,
  MessageOutlined,
  UserOutlined,
  MenuOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "../../styles/Header.css";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

  const menuItems = [
    { key: "home", label: "Trang chủ", path: "/" },
    { key: "search", label: "Tìm kiếm", path: "/search" },
    { key: "companies", label: "Công ty", path: "/companies" },
    { key: "about", label: "Về chúng tôi", path: "/about" },
  ];

  const userMenuItems = [
    {
      key: "profile",
      label: "Hồ sơ của tôi",
      icon: <UserOutlined />,
    },
    {
      key: "applied-jobs",
      label: "Việc làm đã ứng tuyển",
    },
    {
      key: "saved-jobs",
      label: "Việc làm đã lưu",
    },
    {
      key: "settings",
      label: "Cài đặt",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
    },
  ];

  const handleClick = (key, path) => {
    setCurrent(key);
    if (path) navigate(path);
  };

  const handleLogoClick = () => {
    setCurrent("home");
    navigate("/"); // 👈 Điều hướng về Trang chủ
  };

  return (
    <Row style={{ position: "sticky", top: 0, zIndex: 10000 }}>
      <Col span={2} />
      <Col span={20}>
        <AntHeader className="jobzi-header">
          <div className="header-container">
            {/* Logo */}
            <div className="logo-section">
              <div className="logo" onClick={handleLogoClick}>
                <img
                  src="/src/assets/logo/logo_ngang.png"
                  alt="Jobzi Logo"
                  className="logo-image"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="nav-section">
              <Space size="small">
                {menuItems.map((item) => (
                  <Button
                    key={item.key}
                    className={`nav-button ${
                      current === item.key ? "nav-button-active" : ""
                    }`}
                    onClick={() => handleClick(item.key, item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
              </Space>
            </div>

            {/* Right Actions */}
            <div className="actions-section">
              <Space size="middle">
                {/* User Menu */}
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <Button type="text" className="user-menu-btn">
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      className="user-avatar"
                    />
                    <span className="username">Nguyễn Văn A</span>
                    <DownOutlined className="dropdown-icon" />
                  </Button>
                </Dropdown>

                {/* Mobile Menu */}
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  className="mobile-menu-btn"
                />
              </Space>
            </div>
          </div>
        </AntHeader>
      </Col>
      <Col span={2} />
    </Row>
  );
};

export default Header;
