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
  return <NoResultsText>Không tìm thấy công việc phù hợp</NoResultsText>;
};

export default NoResults;
