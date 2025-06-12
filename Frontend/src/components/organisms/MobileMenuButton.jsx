import React from "react";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";

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
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenuButton = () => {
  return <MobileMenuBtn type="text" icon={<MenuOutlined />} />;
};

export default MobileMenuButton;
