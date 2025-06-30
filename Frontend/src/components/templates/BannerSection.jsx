import React from "react";
import { Typography } from "antd";
import styled from "styled-components";
import SearchBar from "../organisms/SearchBar";

const { Title, Text } = Typography;

const BannerSectionWrapper = styled.section`
  background: linear-gradient(135deg, #577cf6 0%, #667eea 50%, #764ba2 100%);
  padding: 18px 0;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  @media (max-width: 576px) {
    padding: 40px 0;
  }
`;

const BannerBackground = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 80%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
  z-index: 1;
`;

const BannerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  text-align: center;
`;

const BannerTitle = styled(Title)`
  && {
    color: #ffffff !important;
    font-size: 48px !important;
    font-weight: 800 !important;
    margin-bottom: 16px !important;
    line-height: 1.2 !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
      font-size: 36px !important;
    }
    @media (max-width: 576px) {
      font-size: 28px !important;
    }
  }
`;

const Highlight = styled.span`
  background: linear-gradient(45deg, #ffd700, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BannerDescription = styled(Text)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 24px;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const BannerSection = ({
  searchKeyword,
  setSearchKeyword,
  selectedLocation,
  setSelectedLocation,
  handleSearch,
  page,
}) => {
  return (
    <BannerSectionWrapper>
      <BannerBackground />
      <BannerContainer>
        {page === "jobs" ? (
          <>
            <BannerTitle level={1}>
              Tìm kiếm việc làm <Highlight>phù hợp</Highlight>
            </BannerTitle>
            <BannerDescription>
              Khám phá nhiều cơ hội việc làm với bộ lọc chi tiết
            </BannerDescription>
          </>
        ) : (
          <>
            <BannerTitle level={1}>
              Khám phá công ty <Highlight>hàng đầu</Highlight>
            </BannerTitle>
            <BannerDescription>
              Tìm hiểu về các công ty uy tín với môi trường làm việc chuyên
              nghiệp
            </BannerDescription>
          </>
        )}
        <SearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          handleSearch={handleSearch}
        />
      </BannerContainer>
    </BannerSectionWrapper>
  );
};

export default BannerSection;
