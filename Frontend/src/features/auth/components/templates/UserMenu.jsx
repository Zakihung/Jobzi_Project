import React from "react";
import { Dropdown, Button, Avatar, Space } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import styled from "styled-components";

const UserMenuBtn = styled(Button)`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  height: 36px;
  transition: all 0.2s ease;
  &:hover {
    background-color: rgba(87, 124, 246, 0.1);
  }
  @media (max-width: 480px) {
    padding: 4px 8px;
  }
`;

const UserAvatar = styled(Avatar)`
  margin-right: 6px;
  background-color: #577cf6;
  color: #ffffff;
`;

const Username = styled.span`
  font-weight: 500;
  color: #2d3748;
  margin-right: 4px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const DropdownIcon = styled(DownOutlined)`
  font-size: 10px;
  color: #718096;
`;

const UserMenu = () => {
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

  return (
    <Dropdown
      menu={{ items: userMenuItems }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <UserMenuBtn type="text">
        <UserAvatar size="small" icon={<UserOutlined />} />
        <Username>Nguyễn Phước Hưng</Username>
        <DropdownIcon />
      </UserMenuBtn>
    </Dropdown>
  );
};

export default UserMenu;
