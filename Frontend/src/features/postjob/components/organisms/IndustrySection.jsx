import React from "react";
import { Card, Typography, Select, Row, Col } from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";

const { Title, Text } = Typography;
const { Option } = Select;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  background: #ffffff;
  padding: 16px 16px 0;
  margin-bottom: 16px;
`;

const StyledTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;

  @media (max-width: 768px) {
    font-size: 20px !important;
  }

  @media (max-width: 576px) {
    font-size: 18px !important;
  }
`;

const StyledSubTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  margin-bottom: 12px !important;

  @media (max-width: 768px) {
    font-size: 16px !important;
  }

  @media (max-width: 576px) {
    font-size: 14px !important;
  }
`;

const IndustrySection = ({
  control,
  errors,
  sectionRefs,
  completedSections,
  setCompletedSections,
}) => {
  return (
    <StyledCard ref={sectionRefs.industry}>
      <StyledTitle level={3}>Ngành nghề và lĩnh vực</StyledTitle>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <StyledSubTitle>Ngành nghề</StyledSubTitle>
          <Controller
            name="industry"
            control={control}
            rules={{ required: "Vui lòng chọn ngành nghề" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn ngành nghề"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
                onChange={(value) => {
                  field.onChange(value);
                  if (
                    value &&
                    !completedSections.includes("Ngành nghề và lĩnh vực")
                  ) {
                    setCompletedSections([
                      ...completedSections,
                      "Ngành nghề và lĩnh vực",
                    ]);
                  }
                }}
              >
                <Option value="Công nghệ thông tin">Công nghệ thông tin</Option>
                <Option value="Marketing">Marketing</Option>
                <Option value="Kinh doanh">Kinh doanh</Option>
              </Select>
            )}
          />
          {errors.industry && (
            <Text type="danger">{errors.industry.message}</Text>
          )}
        </Col>
        <Col span={12}>
          <StyledSubTitle>Vị trí tuyển</StyledSubTitle>
          <Controller
            name="position"
            control={control}
            rules={{ required: "Vui lòng chọn vị trí tuyển dụng" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn vị trí tuyển dụng"
                size="large"
                style={{ width: "100%" }}
                onChange={(value) => {
                  field.onChange(value);
                  if (
                    value &&
                    !completedSections.includes("Ngành nghề và lĩnh vực")
                  ) {
                    setCompletedSections([
                      ...completedSections,
                      "Ngành nghề và lĩnh vực",
                    ]);
                  }
                }}
              >
                <Option value="Frontend Developer">Frontend Developer</Option>
                <Option value="Backend Developer">Backend Developer</Option>
                <Option value="Product Manager">Product Manager</Option>
              </Select>
            )}
          />
          {errors.position && (
            <Text type="danger">{errors.position.message}</Text>
          )}
        </Col>
      </Row>
    </StyledCard>
  );
};

export default IndustrySection;
