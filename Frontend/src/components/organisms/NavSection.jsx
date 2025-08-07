import React, { useContext } from "react";
import { Button, Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/auth.context";

const NavSectionWrapper = styled.div`
  flex: 1;
  margin-left: 15px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavButton = styled(Button)`
  color: #333333;
  border-radius: 6px;
  padding: 8px 16px;
  margin-right: 4px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  box-shadow: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  display: flex;
  align-items: center;
  height: 100%;
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

const NavSection = () => {
  const { auth } = useContext(AuthContext);
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
    {
      key: "jobs",
      label: "Việc làm",
      path: "/employer/jobs",
    },
    { key: "candidates", label: "Ứng viên", path: "/employer/candidates" },
    { key: "company", label: "Công ty", path: "/employer/company" },
  ];

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <NavSectionWrapper>
      <Space size="small">
        {(role === "candidate"
          ? menuCandidateItems
          : role === "employer"
          ? menuEmployerItems
          : menuCandidateItems
        ).map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavButton
              key={item.key}
              className={isActive ? "active" : ""}
              onClick={() => handleClick(item.path)}
            >
              {item.label}
            </NavButton>
          );
        })}
      </Space>
    </NavSectionWrapper>
  );
};

export default NavSection;
