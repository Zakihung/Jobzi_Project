import React, { useEffect, useState } from "react";
import { Card, Menu, Skeleton } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  BulbOutlined,
  StarOutlined,
  TeamOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

// Styled Components
const StickyMenu = styled.div`
  position: sticky;
  top: 76px;
  z-index: 100;

  @media (max-width: 768px) {
    position: static;
  }
`;

const MenuCard = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 4px; /* Giảm padding */
  margin-bottom: 12px;

  @media (max-width: 768px) {
    padding: 3px;
  }
`;

const NavMenu = styled(Menu)`
  border: none !important;

  .ant-menu-item {
    font-size: 13px; /* Giảm font-size */
    font-weight: 500;
    color: #666;
    border-radius: 10px;
    transition: all 0.3s ease;
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
    font-size: 16px; /* Giảm kích thước icon */
    color: #577cf6;
  }

  .ant-menu-item-selected .ant-menu-item-icon {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    .ant-menu-item {
      font-size: 12px;
    }
    .ant-menu-item-icon {
      font-size: 14px;
    }
  }
`;

const NavigationColumn = ({ sectionRefs }) => {
  const [currentSection, setCurrentSection] = useState("personalInfo");

  useEffect(() => {
    const handleScroll = () => {
      const topOffset = 76;
      let closestSection = null;
      let minDistance = Infinity;

      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref?.current) {
          const rect = ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.top - topOffset);
          if (rect.top <= topOffset + 100 && distance < minDistance) {
            closestSection = key;
            minDistance = distance;
          }
        }
      });

      if (closestSection && closestSection !== currentSection) {
        setCurrentSection(closestSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection, sectionRefs]);

  const handleMenuClick = ({ key }) => {
    const section = sectionRefs[key].current;
    if (section) {
      const topOffset = 76;
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <StickyMenu>
      <MenuCard>
        <NavMenu
          mode="vertical"
          selectedKeys={[currentSection]}
          defaultSelectedKeys={["personalInfo"]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="personalInfo" icon={<UserOutlined />}>
            Thông tin cá nhân
          </Menu.Item>
          <Menu.Item key="jobStatus" icon={<SearchOutlined />}>
            Trạng thái tìm việc
          </Menu.Item>
          <Menu.Item key="jobExpectation" icon={<BulbOutlined />}>
            Mong muốn tìm việc
          </Menu.Item>
          <Menu.Item key="education" icon={<StarOutlined />}>
            Học vấn
          </Menu.Item>
          <Menu.Item key="highlights" icon={<StarOutlined />}>
            Điểm nổi bật
          </Menu.Item>
          <Menu.Item key="workExperience" icon={<TeamOutlined />}>
            Kinh nghiệm làm việc
          </Menu.Item>
          <Menu.Item key="projects" icon={<ProjectOutlined />}>
            Kinh nghiệm dự án
          </Menu.Item>
          <Menu.Item key="skills" icon={<CheckCircleOutlined />}>
            Năng lực chuyên môn
          </Menu.Item>
        </NavMenu>
      </MenuCard>
    </StickyMenu>
  );
};

export default NavigationColumn;
