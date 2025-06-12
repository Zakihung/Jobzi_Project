import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Option } = Select;

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SearchInputGroup = styled.div`
  flex: 2;
`;

const LocationInputGroup = styled.div`
  flex: 1;
`;

const SearchInput = styled(Input)`
  && {
    border: none !important;
    background: transparent !important;
    height: 56px;
  }
`;

const LocationSelect = styled(Select)`
  && {
    border: none !important;
    background: transparent !important;
    height: 56px;
    .ant-select-selector {
      background: transparent !important;
      border: none !important;
    }
  }
`;

const SearchButton = styled(Button)`
  height: 56px;
  padding: 0 32px;
  border-radius: 12px;
  background: #577cf6;
  border-color: #577cf6;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(87, 124, 246, 0.3);
  transition: all 0.3s ease;
  &:hover {
    background: #4c6ef5;
    border-color: #4c6ef5;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(87, 124, 246, 0.4);
  }
`;

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSearch = () => {
    console.log("Search:", searchKeyword, selectedLocation);
  };

  return (
    <SearchContainer>
      <SearchInputGroup>
        <SearchInput
          size="large"
          placeholder="Nhập vị trí công việc, kỹ năng..."
          prefix={<SearchOutlined />}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </SearchInputGroup>
      <LocationInputGroup>
        <LocationSelect
          size="large"
          placeholder="Chọn địa điểm"
          value={selectedLocation}
          onChange={setSelectedLocation}
          allowClear
          suffixIcon={<EnvironmentOutlined />}
        >
          <Option value="ho-chi-minh">Hồ Chí Minh</Option>
          <Option value="ha-noi">Hà Nội</Option>
          <Option value="da-nang">Đà Nẵng</Option>
          <Option value="can-tho">Cần Thơ</Option>
          <Option value="remote">Remote</Option>
        </LocationSelect>
      </LocationInputGroup>
      <SearchButton type="primary" size="large" onClick={handleSearch}>
        <SearchOutlined /> Tìm kiếm
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
