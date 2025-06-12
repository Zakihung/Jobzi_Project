import React from "react";
import { Slider, Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

const SalaryFilterGroup = styled.div`
  width: 100%;
  @media (max-width: 992px) {
    padding: 0 8px;
  }
`;

const SalaryFilterLabel = styled(Text)`
  color: #577cf6;
  font-size: 14px;
  display: block;
  margin-bottom: 12px;
`;

const SalarySliderContainer = styled.div`
  padding: 0 8px;
`;

const SalaryFilter = ({ value, onChange }) => {
  return (
    <SalaryFilterGroup>
      <SalaryFilterLabel strong>Mức lương (triệu VNĐ)</SalaryFilterLabel>
      <SalarySliderContainer>
        <Slider
          range
          min={0}
          max={100}
          value={value}
          onChange={onChange}
          marks={{
            0: "0",
            25: "25",
            50: "50",
            75: "75",
            100: "100+",
          }}
        />
      </SalarySliderContainer>
    </SalaryFilterGroup>
  );
};

export default SalaryFilter;
