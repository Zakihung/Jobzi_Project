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

const skillsData = {
  React: "React",
  "Node.js": "Node.js",
  Python: "Python",
};

const RequirementsSection = ({
  control,
  editor,
  errors,
  sectionRefs,
  completedSections,
  setCompletedSections,
  watch,
}) => {
  const requirements = watch("requirements") || "";
  const sectionName = "Yêu cầu ứng viên";

  const updateSectionStatus = (skills, editorContent) => {
    if (skills.length > 0 && editorContent && editorContent !== "<p></p>") {
      if (!completedSections.includes(sectionName)) {
        setCompletedSections([...completedSections, sectionName]);
      }
    } else {
      if (completedSections.includes(sectionName)) {
        setCompletedSections(
          completedSections.filter((section) => section !== sectionName)
        );
      }
    }
  };

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
                updateSectionStatus(value, requirements);
              }}
            >
              {Object.keys(skillsData).map((type) => (
                <Select.Option key={type} value={type}>
                  {skillsData[type]}
                </Select.Option>
              ))}
            </Select>
          )}
        />
        {errors.skills && <Text type="danger">{errors.skills.message}</Text>}
      </Row>
    </StyledCard>
  );
};

export default RequirementsSection;
