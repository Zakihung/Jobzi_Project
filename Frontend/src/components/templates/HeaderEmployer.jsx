import React, { useState } from "react";
import { Layout, Menu, Drawer, Button, Typography, Avatar, Space } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  DashboardOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/HeaderEmployer.module.css";

const { Header } = Layout;
const { Text } = Typography;

const HeaderEmployer = () => {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  // Sample employer data
  const employer = {
    name: "Công ty ABC",
    avatar: "https://via.placeholder.com/40",
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleDrawerMenuClick = (path) => {
    navigate(path);
    closeDrawer();
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleUserMenuClick = ({ key }) => {
    if (key === "logout") {
      // Xử lý đăng xuất (ví dụ: xóa token)
      localStorage.removeItem("token");
      navigate("/employer-signin");
    } else if (key === "settings") {
      navigate("/employer/settings");
    }
    setUserMenuVisible(false);
  };

  const userMenu = (
    <Menu
      onClick={handleUserMenuClick}
      className={styles.userMenu}
      items={[
        {
          key: "settings",
          icon: <SettingOutlined />,
          label: "Cài đặt",
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Đăng xuất",
        },
      ]}
    />
  );

  return (
    <Header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Left Section: Hamburger Menu and Logo */}
        <Space className={styles.leftSection}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            className={styles.menuButton}
          />
          <img
            src="/src/assets/logo/logo.png"
            alt="Logo"
            className={styles.logo}
            onClick={() => navigate("/employer/dashboard")}
          />
        </Space>

        {/* Right Section: Navigation and User Profile */}
        <Space className={styles.rightSection}>
          <Menu
            mode="horizontal"
            className={styles.navMenu}
            items={[
              {
                key: "candidates",
                label: "Ứng viên",
                icon: <TeamOutlined />,
                onClick: () => handleNavClick("/employer/candidates"),
              },
              {
                key: "search",
                label: "Tìm kiếm",
                icon: <SearchOutlined />,
                onClick: () => handleNavClick("/employer/search"),
              },
              {
                key: "jobs",
                label: "Tin tuyển dụng",
                icon: <FileTextOutlined />,
                onClick: () => handleNavClick("/employer/jobs"),
              },
            ]}
          />
          <div
            className={styles.userProfile}
            onClick={() => setUserMenuVisible(!userMenuVisible)}
          >
            <Avatar src={employer.avatar} icon={<UserOutlined />} size={32} />
            <Text className={styles.userName}>{employer.name}</Text>
            <Menu
              mode="vertical"
              className={`${styles.userMenu} ${
                userMenuVisible ? styles.userMenuVisible : ""
              }`}
              items={userMenu.props.items}
              onClick={handleUserMenuClick}
            />
          </div>
        </Space>
      </div>

      {/* Drawer for Mobile Menu */}
      <Drawer
        title={
          <div className={styles.drawerHeader}>
            <Avatar src={employer.avatar} size={48} icon={<UserOutlined />} />
            <Text className={styles.drawerUserName}>{employer.name}</Text>
          </div>
        }
        placement="left"
        onClose={closeDrawer}
        visible={drawerVisible}
        className={styles.drawer}
      >
        <Menu
          mode="vertical"
          className={styles.drawerMenu}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
              onClick: () => handleDrawerMenuClick("/employer/dashboard"),
            },
            {
              key: "jobs",
              icon: <FileTextOutlined />,
              label: "Tin tuyển dụng",
              onClick: () => handleDrawerMenuClick("/employer/jobs"),
            },
            {
              key: "settings",
              icon: <SettingOutlined />,
              label: "Cài đặt tài khoản",
              onClick: () => handleDrawerMenuClick("/employer/settings"),
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Đăng xuất",
              onClick: () => {
                localStorage.removeItem("token");
                navigate("/employer-signin");
                closeDrawer();
              },
            },
          ]}
        />
      </Drawer>
    </Header>
  );
};

export default HeaderEmployer;
