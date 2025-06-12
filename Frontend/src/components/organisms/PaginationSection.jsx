import React from "react";
import { Pagination } from "antd";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #f0f0f0;
`;

const PaginationSection = ({
  currentPage,
  pageSize,
  totalJobs,
  onPageChange,
}) => {
  return (
    <PaginationContainer>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalJobs}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </PaginationContainer>
  );
};

export default PaginationSection;
