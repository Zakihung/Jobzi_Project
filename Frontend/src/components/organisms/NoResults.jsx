import React from "react";
import { Empty, Typography } from "antd";
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
  return (
    <NoResultsText>
      <Empty description={false} />
      Không tìm thấy kết quả phù hợp
    </NoResultsText>
  );
};

export default NoResults;
