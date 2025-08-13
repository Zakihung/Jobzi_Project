import React, { useState, useEffect } from "react";
import { Card, Menu } from "antd";
import {
  FileTextOutlined,
  BulbOutlined,
  StarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const StickyMenu = styled.div`
  position: sticky;
  top: 76px;
  z-index: 100;

  @media (max-width: 768px) {
    display: none; /* Ẩn trên màn hình nhỏ */
  }
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 5px;
  margin-bottom: 16px;

  @media (max-width: 576px) {
    padding: 4px;
  }
`;

const StyledMenu = styled(Menu)`
  border: none !important;

  .ant-menu-item {
    font-size: 14px;
    font-weight: 500;
    color: #666;
    border-radius: 12px;
    transition: all 0.3s ease;
    padding: 8px 12px; /* Tối ưu khoảng cách */

    display: flex;
    align-items: center;
    text-align: center;
  }

  .ant-menu-item:not(.ant-menu-item-selected):hover {
    background-color: #f5f9ff !important;
    color: #577cf6 !important;
  }

  .ant-menu-item-selected {
    background: #577cf6 !important;
    color: #ffffff !important;
  }

  .ant-menu-item-icon {
    font-size: 18px;
    color: #577cf6;
  }

  .ant-menu-item-selected .ant-menu-item-icon {
    color: #ffffff;
  }

  @media (max-width: 992px) {
    .ant-menu-item {
      font-size: 13px;
      padding: 6px 10px;
    }
  }

  @media (max-width: 576px) {
    .ant-menu-item {
      font-size: 12px;
      padding: 5px 8px;
    }
  }
`;

const NavPostJobMenu = ({ sectionRefs }) => {
  const [selectedKey, setSelectedKey] = useState("title");

  const handleMenuClick = ({ key }) => {
    const section = sectionRefs[key].current;
    if (section) {
      const topOffset = 76;
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setSelectedKey(key);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const topOffset = 76;
      let currentSection = "title";

      for (const key in sectionRefs) {
        const section = sectionRefs[key].current;
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= topOffset + 100 && rect.bottom >= topOffset) {
            currentSection = key;
            break;
          }
        }
      }

      setSelectedKey(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  return (
    <StickyMenu>
      <StyledCard>
        <StyledMenu
          mode="vertical"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="title" icon={<FileTextOutlined />}>
            Tiêu đề tin tuyển dụng
          </Menu.Item>
          <Menu.Item key="industry" icon={<BulbOutlined />}>
            Ngành nghề và vị trí
          </Menu.Item>
          <Menu.Item key="generalInfo" icon={<StarOutlined />}>
            Thông tin chung
          </Menu.Item>
          <Menu.Item key="description" icon={<FileTextOutlined />}>
            Nội dung tuyển dụng chi tiết
          </Menu.Item>
          <Menu.Item key="requirements" icon={<TeamOutlined />}>
            Yêu cầu ứng viên
          </Menu.Item>
          <Menu.Item key="benefits" icon={<StarOutlined />}>
            Quyền lợi ứng viên
          </Menu.Item>
          <Menu.Item key="cvInfo" icon={<FileTextOutlined />}>
            Thông tin nhận CV
          </Menu.Item>
        </StyledMenu>
      </StyledCard>
    </StickyMenu>
  );
};

export default NavPostJobMenu;
