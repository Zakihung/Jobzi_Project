import React, { useState } from "react";
import { Layout, Button, Avatar, Dropdown, Space, Col, Row } from "antd";
import { UserOutlined, MenuOutlined, DownOutlined } from "@ant-design/icons";
import styles from "../../styles/Header.module.css";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

  const menuItems = [
    { key: "home", label: "Trang chủ", path: "/" },
    { key: "search", label: "Tìm kiếm", path: "/search" },
    { key: "companies", label: "Công ty", path: "/companies" },
    { key: "about", label: "Về chúng tôi", path: "/about" },
    { key: "jobpostdetail", label: "Chi tiết tin", path: "/jobpostdetail" },
    { key: "companydetail", label: "Chi tiết cty", path: "/companydetail" },
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
    navigate("/");
  };

  return (
    <Row className={styles.headerRow}>
      <Col span={2} />
      <Col span={20}>
        <AntHeader className={styles.jobziHeader}>
          <div className={styles.headerContainer}>
            {/* Logo */}
            <div className={styles.logoSection}>
              <div className={styles.logo} onClick={handleLogoClick}>
                <img
                  src="/src/assets/logo/logo_ngang.png"
                  alt="Jobzi Logo"
                  className={styles.logoImage}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className={styles.navSection}>
              <Space size="small">
                {menuItems.map((item) => (
                  <Button
                    key={item.key}
                    className={`${styles.navButton} ${
                      current === item.key ? styles.navButtonActive : ""
                    }`}
                    onClick={() => handleClick(item.key, item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
              </Space>
            </div>

            {/* Right Actions */}
            <div className={styles.actionsSection}>
              <Space size="middle">
                {/* User Menu */}
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <Button type="text" className={styles.userMenuBtn}>
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      className={styles.userAvatar}
                    />
                    <span className={styles.username}>Nguyễn Phước Hưng</span>
                    <DownOutlined className={styles.dropdownIcon} />
                  </Button>
                </Dropdown>

                {/* Mobile Menu */}
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  className={styles.mobileMenuBtn}
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
