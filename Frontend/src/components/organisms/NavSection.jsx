import React from "react";
import { Button, Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

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
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "home", label: "Trang chủ", path: "/" },
    { key: "search", label: "Tìm kiếm", path: "/search" },
    { key: "companies", label: "Công ty", path: "/companies" },
    { key: "about", label: "Về chúng tôi", path: "/about" },
  ];

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <NavSectionWrapper>
      <Space size="small">
        {menuItems.map((item) => {
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
