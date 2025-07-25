import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import HeaderAdmin from "./components/templates/HeaderAdmin.jsx";
import {
  UserOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  PieChartOutlined,
  DashboardOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledSider = styled(Sider)`
  background: #ffffff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  border-right: 1px solid #f0f0f0;
  position: sticky;
  top: 60px;
  height: 100vh;
  overflow: auto;
  z-index: 100;

  .ant-layout-sider-trigger {
    background: #f8f9fa;
    border-top: 1px solid #e8e9ea;
    color: #595959;
    transition: all 0.2s;

    &:hover {
      background: #e6f7ff;
      color: #1890ff;
    }
  }

  .ant-menu {
    background: transparent;
    border-right: none;
    padding: 16px 0;
  }

  .ant-menu-item {
    margin: 4px 12px;
    border-radius: 8px;
    height: 48px;
    line-height: 48px;
    transition: all 0.3s ease;
    color: #595959;

    &:hover {
      background: #f0f7ff;
      color: #577cf6;
    }

    &.ant-menu-item-selected {
      background: #577cf6;
      color: #ffffff;

      &::after {
        display: none;
      }
    }

    .ant-menu-item-icon {
      font-size: 16px;
      margin-right: ${(props) => (props.collapsed ? "0" : "12px")};
      transition: margin-right 0.3s;
    }
  }

  .ant-menu-item-collapsed-tooltip {
    .ant-tooltip-inner {
      background: #ffffff;
      border: 1px solid #e8e9ea;
      color: #595959;
    }

    .ant-tooltip-arrow::before {
      background: #ffffff;
      border: 1px solid #e8e9ea;
    }
  }
`;

const StyledContent = styled(Content)`
  margin: 24px;
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
`;

const LogoSection = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.collapsed ? "center" : "flex-start")};
  padding: 0 ${(props) => (props.collapsed ? "0" : "24px")};
  margin-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s;
`;

const LogoText = styled.h2`
  color: #262626;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: ${(props) => (props.collapsed ? "none" : "block")};
  transition: all 0.3s;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #1890ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-right: ${(props) => (props.collapsed ? "0" : "12px")};
  transition: all 0.3s;
`;

const AdminApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Xác định menu item được chọn dựa trên URL hiện tại
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/admin" || path === "/admin/") return ["dashboard"];
    if (path.includes("/admin/accounts")) return ["accounts"];
    if (path.includes("/admin/jobposts")) return ["jobposts"];
    if (path.includes("/admin/industries")) return ["industries"];
    if (path.includes("/admin/positions")) return ["positions"];
    if (path.includes("/admin/statistics")) return ["statistics"];
    return ["dashboard"];
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Tổng quan",
      onClick: () => navigate("/admin"),
    },
    {
      key: "accounts",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      onClick: () => navigate("/admin/accounts"),
    },
    {
      key: "jobposts",
      icon: <FileTextOutlined />,
      label: "Quản lý tin tuyển dụng",
      onClick: () => navigate("/admin/jobposts"),
    },
    {
      key: "industries",
      icon: <AppstoreOutlined />,
      label: "Quản lý ngành nghề",
      onClick: () => navigate("/admin/industries"),
    },
    {
      key: "positions",
      icon: <SolutionOutlined />,
      label: "Quản lý vị trí tuyển dụng",
      onClick: () => navigate("/admin/positions"),
    },
    {
      key: "statistics",
      icon: <PieChartOutlined />,
      label: "Thống kê",
      onClick: () => navigate("/admin/statistics"),
    },
  ];

  return (
    <StyledLayout>
      <HeaderAdmin />
      <Layout>
        <StyledSider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={260}
          collapsedWidth={80}
        >
          <Menu
            mode="inline"
            selectedKeys={getSelectedKey()}
            items={menuItems}
            theme="light"
            style={{
              height: "calc(100% - 80px)",
              borderRight: 0,
              background: "transparent",
            }}
          />
        </StyledSider>
        <StyledContent>
          <Outlet />
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default AdminApp;
