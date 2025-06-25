import React, { useState } from "react";
import { Card, Typography, Select, Row, Col } from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { useEffect } from "react";

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

const industryData = {
  "Công nghệ thông tin": {
    detailedIndustries: ["Software Engineer", "Data Science", "Cybersecurity"],
    positions: {
      "Software Engineer": [
        "Fullstack Developer",
        "Frontend Developer",
        "Backend Developer",
      ],
      "Data Science": [
        "Data Analyst",
        "Machine Learning Engineer",
        "Data Engineer",
      ],
      Cybersecurity: [
        "Security Analyst",
        "Penetration Tester",
        "Security Engineer",
      ],
    },
  },
  Marketing: {
    detailedIndustries: [
      "Digital Marketing",
      "Content Marketing",
      "Brand Management",
    ],
    positions: {
      "Digital Marketing": [
        "SEO Specialist",
        "PPC Specialist",
        "Social Media Manager",
      ],
      "Content Marketing": [
        "Content Writer",
        "Content Strategist",
        "Copywriter",
      ],
      "Brand Management": [
        "Brand Manager",
        "Marketing Coordinator",
        "Brand Strategist",
      ],
    },
  },
  "Kinh doanh": {
    detailedIndustries: [
      "Sales",
      "Business Development",
      "Operations Management",
    ],
    positions: {
      Sales: ["Sales Manager", "Account Executive", "Sales Representative"],
      "Business Development": [
        "Business Development Manager",
        "Partnership Manager",
        "Market Research Analyst",
      ],
      "Operations Management": [
        "Operations Manager",
        "Supply Chain Manager",
        "Logistics Coordinator",
      ],
    },
  },
};

const IndustrySection = ({
  control,
  errors,
  sectionRefs,
  completedSections,
  setValue,
  setCompletedSections,
}) => {
  const [selectedIndustryGroup, setSelectedIndustryGroup] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  useEffect(() => {
    // Reset position nếu industry group thay đổi
    setValue("position", null);
  }, [selectedIndustryGroup]);

  useEffect(() => {
    // Reset position nếu industry (ngành nghề) thay đổi
    setValue("position", null);
  }, [selectedIndustry]);

  return (
    <StyledCard ref={sectionRefs.industry}>
      <StyledTitle level={3}>Ngành nghề và vị trí</StyledTitle>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <StyledSubTitle>Nhóm ngành nghề</StyledSubTitle>
          <Select
            placeholder="Chọn nhóm ngành nghề"
            size="large"
            style={{ width: "100%", marginBottom: 16 }}
            value={selectedIndustryGroup}
            onChange={(value) => {
              setSelectedIndustryGroup(value);
              setSelectedIndustry(null);
              setValue("position", null);

              if (completedSections.includes("Ngành nghề và vị trí")) {
                setCompletedSections(
                  completedSections.filter(
                    (section) => section !== "Ngành nghề và vị trí"
                  )
                );
              }
            }}
          >
            {Object.keys(industryData).map((industry) => (
              <Option key={industry} value={industry}>
                {industry}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={12}></Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <StyledSubTitle>Ngành nghề</StyledSubTitle>
          <Select
            placeholder="Chọn ngành nghề"
            size="large"
            style={{ width: "100%", marginBottom: 16 }}
            value={selectedIndustry}
            onChange={(value) => {
              setSelectedIndustry(value);
              setValue("position", null);

              if (completedSections.includes("Ngành nghề và vị trí")) {
                setCompletedSections(
                  completedSections.filter(
                    (section) => section !== "Ngành nghề và vị trí"
                  )
                );
              }
            }}
            disabled={!selectedIndustryGroup}
          >
            {selectedIndustryGroup &&
              industryData[selectedIndustryGroup].detailedIndustries.map(
                (detailed) => (
                  <Option key={detailed} value={detailed}>
                    {detailed}
                  </Option>
                )
              )}
          </Select>
        </Col>
        <Col span={12}>
          <StyledSubTitle>Vị trí tuyển</StyledSubTitle>
          <Controller
            name="position"
            control={control}
            rules={{ required: "Vui lòng chọn vị trí cần tuyển" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn vị trí cần tuyển"
                size="large"
                style={{ width: "100%" }}
                disabled={!selectedIndustry}
                onChange={(value) => {
                  field.onChange(value);
                  if (
                    value &&
                    !completedSections.includes("Ngành nghề và vị trí")
                  ) {
                    setCompletedSections([
                      ...completedSections,
                      "Ngành nghề và vị trí",
                    ]);
                  }
                }}
              >
                {selectedIndustryGroup &&
                  selectedIndustry &&
                  industryData[selectedIndustryGroup].positions[
                    selectedIndustry
                  ].map((position) => (
                    <Option key={position} value={position}>
                      {position}
                    </Option>
                  ))}
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
