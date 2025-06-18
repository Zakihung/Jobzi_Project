import React from "react";
import { Card, Typography, Select } from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import EditorSection from "../organisms/EditorSection";
import EditorToolbar from "../organisms/EditorToolbar";

const { Title, Text } = Typography;
const { Option } = Select;

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

const RequirementsSection = ({
  control,
  errors,
  sectionRefs,
  completedSections,
  setCompletedSections,
  requirementsEditor,
}) => {
  return (
    <StyledCard ref={sectionRefs.requirements}>
      <StyledTitle level={3}>Yêu cầu ứng viên</StyledTitle>
      <EditorToolbar editor={requirementsEditor} />
      <div style={{ padding: "-20px" }}>
        <EditorSection
          title=""
          editor={requirementsEditor}
          renderToolbar={() => null}
        />
      </div>
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
            style={{ width: "100%", marginTop: 16 }}
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
    </StyledCard>
  );
};

export default RequirementsSection;
