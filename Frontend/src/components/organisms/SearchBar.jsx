import React, { useState } from "react";
import { Input, Popover, Button, Divider, List } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  DownOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const SearchContainer = styled.div`
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 4px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const LocationInputGroup = styled.div`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SearchInputGroup = styled.div`
  flex: 5;
`;

const SearchInput = styled(Input)`
  && {
    border: none !important;
    background: transparent !important;
    height: 40px;
  }
  &:focus {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }
`;

const DividerVer = styled(Divider)`
  && {
    margin: 0 2px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    height: 40px;
  }
`;

const LocationTrigger = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  cursor: pointer;
  background: transparent;
  border: none;
  width: 100%;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  transition: all 0.3s ease;
  .location-prefix {
    transition: transform 0.3s ease;
  }
  &:hover {
    color: #577cf6;
    .location-prefix {
      transform: scale(1.3);
    }
  }

  .location-text {
    flex: 1;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.88);
  }

  .location-prefix {
    color: #577cf6;
    margin-right: 8px;
    font-size: 18px;
    font-weight: 700;
  }

  .arrow-icon {
    margin-left: 8px;
    font-size: 12px;
    transition: transform 0.3s ease;
  }

  &.open .arrow-icon {
    transform: rotate(180deg);
  }
`;

const LocationList = styled(List)`
  && {
    .ant-list-item {
      padding: 8px 16px;
      cursor: pointer;
      border-bottom: none;
      transition: background-color 0.2s ease;

      &:hover {
        color: #577cf6;
      }
    }
  }
`;

const SearchButton = styled(Button)`
  height: 40px;
  padding: 0 15px;
  border-radius: 12px;
  color: #577cf6 !important;
  background: transparent !important;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: none;

  .anticon {
    transition: transform 0.3s ease;
  }

  &:hover {
    .anticon {
      transform: scale(1.4);
    }
  }
`;

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Toàn quốc");
  const [popoverVisible, setPopoverVisible] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const locationOptions = [
    { value: "toan-quoc", label: "Toàn quốc" },
    { value: "ho-chi-minh", label: "Hồ Chí Minh" },
    { value: "ha-noi", label: "Hà Nội" },
    { value: "da-nang", label: "Đà Nẵng" },
    { value: "can-tho", label: "Cần Thơ" },
    { value: "ba-ria", label: "Bà Rịa - Vũng Tàu" },
  ];

  const handleSearch = () => {
    console.log("Search:", searchKeyword, selectedLocation);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.label);
    setPopoverVisible(false);
  };

  const locationContent = (
    <div style={{ width: 250 }}>
      <LocationList
        size="small"
        dataSource={locationOptions}
        renderItem={(item) => (
          <List.Item
            className={selectedLocation === item.label ? "selected" : ""}
            onClick={() => handleLocationSelect(item)}
          >
            {item.label}
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <SearchContainer>
      {!isHomePage && (
        <>
          <LocationInputGroup>
            <Popover
              content={locationContent}
              trigger="hover"
              placement="bottomLeft"
              open={popoverVisible}
              onOpenChange={setPopoverVisible}
              arrow={false}
              styles={{ body: { zIndex: 1000 } }}
              getPopupContainer={() => document.body}
            >
              <LocationTrigger className={popoverVisible ? "open" : ""}>
                <EnvironmentOutlined className="location-prefix" />
                <span className="location-text">{selectedLocation}</span>
                <DownOutlined className="arrow-icon" />
              </LocationTrigger>
            </Popover>
          </LocationInputGroup>
          <DividerVer type="vertical" />
        </>
      )}
      <SearchInputGroup>
        <SearchInput
          size="large"
          placeholder="Nhập vị trí công việc, kỹ năng..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onPressEnter={handleSearch}
        />
      </SearchInputGroup>
      <DividerVer type="vertical" />
      <SearchButton type="primary" size="large" onClick={handleSearch}>
        <SearchOutlined /> Tìm kiếm
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
