import React from "react";
import { Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

const NoResultsText = styled(Text)`
  color: #666;
  font-size: 16px;
  text-align: center;
  display: block;
  margin: 40px 0;
`;

const NoResults = () => {
  const isCompaniesPage = location.pathname === "/companies";
  return (
    <NoResultsText>
      {isCompaniesPage
        ? "Không tìm thấy công ty phù hợp"
        : "Không tìm thấy công việc phù hợp"}
    </NoResultsText>
  );
};

export default NoResults;
