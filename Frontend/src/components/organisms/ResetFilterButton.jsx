import React from "react";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import styled from "styled-components";

const ResetFilterBtn = styled(Button)`
  color: #1a1a1a !important;
  border: 2px solid #e8e8e8 !important;
  background: #ffffff;
  font-weight: 600;
  height: 44px;
  padding: 0 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  &:hover {
    border-color: #577cf6 !important;
    color: #577cf6 !important;
    background: #f6f8ff !important;
  }

  .anticon {
    transition: transform 0.3s ease;
  }

  &:hover {
    .anticon {
      transform: scale(1.3);
    }
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
