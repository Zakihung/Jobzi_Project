import React from "react";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import styled from "styled-components";

const ResetFilterBtn = styled(Button)`
  color: #577cf6 !important;
  border-color: #577cf6 !important;
  font-weight: 600;
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  &:hover {
    background: #577cf6 !important;
    color: #ffffff !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(87, 124, 246, 0.3);
  }
`;

const ResetFilterButton = ({ onClick }) => {
  return (
    <ResetFilterBtn type="primary" ghost onClick={onClick}>
      <ReloadOutlined />
    </ResetFilterBtn>
  );
};

export default ResetFilterButton;
