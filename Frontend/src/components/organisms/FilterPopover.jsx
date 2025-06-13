import React, { useRef } from "react";
import { Popover, Button, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";

const FilterPopoverBtn = styled(Button)`
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

const FilterPopoverMenu = styled.div`
  background: #ffffff;
  padding: 4px !important;
  border-radius: 12px;
  min-width: 220px;
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin; /* Cho Firefox */
  scrollbar-color: #577cf6 #f6f8ff; /* Màu thanh cuộn cho Firefox */

  /* Tùy chỉnh thanh cuộn cho Chrome, Safari */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f6f8ff;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #577cf6;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #4c6ef5;
  }

  @media (max-width: 768px) {
    min-width: 180px;
    padding: 8px 12px; /* Giảm padding trên màn hình nhỏ */
  }
`;

const FilterPopoverContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* Đảm bảo các checkbox hiển thị dọc */
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* Tùy chỉnh style cho mỗi checkbox */
  .ant-checkbox-wrapper {
    margin: 0;
    padding: 4px 0;
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
    flex-direction: row-reverse; /* Checkbox nằm sau chữ */
    justify-content: flex-end; /* Đẩy checkbox về bên phải */

    /* Đảm bảo label thẳng hàng */
    .ant-checkbox + span {
      flex-grow: 1; /* Label chiếm toàn bộ không gian còn lại */
      text-align: left; /* Căn trái label */
      min-width: 150px; /* Đặt chiều rộng tối thiểu để đảm bảo thẳng hàng */
    }
  }

  /* Tùy chỉnh để checkbox không bị lệch */
  .ant-checkbox {
    margin-left: 0;
    margin-right: 8px;
  }
`;

const FilterPopover = ({ filterKey, title, options, value, onChange }) => {
  const menuRef = useRef(null);

  const handleOpenChange = (open) => {
    if (!open && menuRef.current) {
      menuRef.current.scrollTop = 0; // Đặt lại vị trí cuộn khi đóng
    }
  };

  const content = (
    <FilterPopoverMenu ref={menuRef}>
      <FilterPopoverContent>
        <Checkbox.Group options={options} value={value} onChange={onChange} />
      </FilterPopoverContent>
    </FilterPopoverMenu>
  );

  const buttonText = value.length > 0 ? `${title} (${value.length})` : title;

  return (
    <Popover
      content={content}
      trigger="hover"
      placement="bottomLeft"
      arrow={false}
      onOpenChange={handleOpenChange}
    >
      <FilterPopoverBtn className={value.length > 0 ? "active" : ""}>
        {buttonText} <DownOutlined />
      </FilterPopoverBtn>
    </Popover>
  );
};

export default FilterPopover;
