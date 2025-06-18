import React from "react";
import { Card, Row, Select, Typography } from "antd";
import styled from "styled-components";
import TextEditor from "../molecules/TextEditor";
import { Controller } from "react-hook-form";

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  background: #ffffff;
  padding: 16px;
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

const RequirementsSection = ({
  control,
  editor,
  errors,
  sectionRefs,
  completedSections,
  setCompletedSections,
}) => {
  return (
    <StyledCard ref={sectionRefs.requirements}>
      <StyledTitle level={3}>Yêu cầu ứng viên</StyledTitle>
      <StyledSubTitle>Mô tả yêu cầu ứng viên</StyledSubTitle>
      <TextEditor editor={editor} />
      {errors.requirements && (
        <Text type="danger">{errors.requirements.message}</Text>
      )}
      <br />
      <Row>
        <StyledSubTitle>Kỹ năng liên quan</StyledSubTitle>
        <Controller
          name="skills"
          control={control}
          rules={{ required: "Vui lòng chọn ít nhất một kỹ năng" }}
          render={({ field }) => (
            <Select
              {...field}
              mode="tags"
              placeholder="Chọn kỹ năng liên quan"
              size="large"
              style={{ width: "100%" }}
              onChange={(value) => {
                field.onChange(value);
                if (
                  value.length > 0 &&
                  !completedSections.includes("Yêu cầu ứng viên")
                ) {
                  setCompletedSections([
                    ...completedSections,
                    "Yêu cầu ứng viên",
                  ]);
                }
              }}
            >
              <Option value="React">React</Option>
              <Option value="Node.js">Node.js</Option>
              <Option value="Python">Python</Option>
            </Select>
          )}
        />
        {errors.skills && <Text type="danger">{errors.skills.message}</Text>}
      </Row>
    </StyledCard>
  );
};

export default RequirementsSection;
