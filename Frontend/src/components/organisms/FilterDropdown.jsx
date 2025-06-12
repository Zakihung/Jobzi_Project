import React from "react";
import { Dropdown, Button, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";

const FilterDropdownBtn = styled(Button)`
  width: fit-content;
  height: 44px;
  border: 2px solid #e8e8e8;
  background: #ffffff;
  color: #666;
  font-weight: 500;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  transition: all 0.3s ease;
  text-align: left;
  &:hover {
    border-color: #577cf6;
    color: #577cf6;
    background: #f6f8ff;
  }
  &.active {
    border-color: #577cf6;
    background: #577cf6;
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(87, 124, 246, 0.2);
  }
  &.active:hover {
    background: #4c6ef5;
    border-color: #4c6ef5;
  }
  @media (max-width: 992px) {
    font-size: 13px;
    padding: 0 12px;
  }
`;

const FilterDropdownMenu = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  min-width: 220px;
  max-height: 300px;
  overflow-y: auto;
  @media (max-width: 768px) {
    min-width: 180px;
  }
`;

const FilterDropdownContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FilterDropdown = ({ filterKey, title, options, value, onChange }) => {
  const menu = (
    <FilterDropdownMenu>
      <FilterDropdownContent>
        <Checkbox.Group options={options} value={value} onChange={onChange} />
      </FilterDropdownContent>
    </FilterDropdownMenu>
  );

  const buttonText = value.length > 0 ? `${title} (${value.length})` : title;

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
      <FilterDropdownBtn className={value.length > 0 ? "active" : ""}>
        {buttonText} <DownOutlined />
      </FilterDropdownBtn>
    </Dropdown>
  );
};

export default FilterDropdown;
