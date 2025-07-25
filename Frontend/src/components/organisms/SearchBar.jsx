import React, { useState } from "react";
import { Input, Popover, Button, Divider, List } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  DownOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import useGetAllProvinceAlphabet from "../../features/company/hooks/Province/useGetAllProvinceAlphabet";

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

const SearchBar = ({
  searchKeyword,
  setSearchKeyword,
  selectedLocation,
  setSelectedLocation,
  handleSearch,
}) => {
  const { data: provincesData, isLoading: isProvinceLoading } =
    useGetAllProvinceAlphabet();

  const locationOptions = [
    {
      items: [{ label: "Toàn quốc", value: "toan-quoc" }],
    },
    ...(provincesData || []).map((group) => ({
      group: group.letter,
      items: group.provinces.map((province) => ({
        label: province.name,
        value: province.name.toLowerCase().replace(/\s/g, "-"),
      })),
    })),
  ];
  const [popoverVisible, setPopoverVisible] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCompaniesPage = location.pathname === "/companies";

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.label);
    setPopoverVisible(false);
  };

  const locationContent = (
    <div
      style={{
        width: 520,
        maxHeight: 300,
        overflowY: "auto",
        padding: "4px 12px",
      }}
    >
      {locationOptions.map((group) => (
        <div
          key={group.group}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 12px",
            paddingLeft: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{group.group}</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 12px",
              paddingLeft: 12,
            }}
          >
            {group.items.map((item) => (
              <div
                key={item.value}
                style={{
                  cursor: "pointer",
                  color:
                    selectedLocation === item.label ? "#577cf6" : "inherit",
                  fontWeight: selectedLocation === item.label ? 600 : 400,
                }}
                onClick={() => handleLocationSelect(item)}
                onMouseEnter={(e) => {
                  if (selectedLocation !== item.label) {
                    e.target.style.color = "#577cf6";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedLocation !== item.label) {
                    e.target.style.color = "inherit";
                  }
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (isProvinceLoading) {
    return (
      <SearchContainer>
        <LocationInputGroup>
          <Input
            size="large"
            placeholder="Đang tải vị trí..."
            disabled
            style={{ width: "100%" }}
          />
        </LocationInputGroup>
        <DividerVer type="vertical" />
        <SearchInputGroup>
          <SearchInput size="large" placeholder="Nhập từ khóa..." disabled />
        </SearchInputGroup>
        <DividerVer type="vertical" />
        <SearchButton type="primary" size="large" disabled>
          <SearchOutlined /> Tìm kiếm
        </SearchButton>
      </SearchContainer>
    );
  }

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
          placeholder={
            isCompaniesPage ? "Nhập tên công ty" : "Nhập tên việc làm"
          }
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
