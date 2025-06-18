import React, { useState } from "react";
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
  setCompletedSections,
}) => {
  const [selectedGeneralIndustry, setSelectedGeneralIndustry] = useState(null);
  const [selectedDetailedIndustry, setSelectedDetailedIndustry] =
    useState(null);

  const handleGeneralIndustryChange = (
    value,
    field,
    detailedField,
    positionField
  ) => {
    field.onChange(value);
    setSelectedGeneralIndustry(value);
    setSelectedDetailedIndustry(null);
    detailedField.onChange(null); // Reset detailed industry
    positionField.onChange(null); // Reset position
  };

  const handleDetailedIndustryChange = (value, field, positionField) => {
    field.onChange(value);
    setSelectedDetailedIndustry(value);
    positionField.onChange(null); // Reset position
  };

  const handlePositionChange = (value, field) => {
    field.onChange(value);
    if (value && !completedSections.includes("Ngành nghề và vị trí")) {
      setCompletedSections([...completedSections, "Ngành nghề và vị trí"]);
    }
  };

  return (
    <StyledCard ref={sectionRefs.industry}>
      <StyledTitle level={3}>Ngành nghề và vị trí</StyledTitle>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <StyledSubTitle>Ngành nghề chung</StyledSubTitle>
          <Controller
            name="generalIndustry"
            control={control}
            rules={{ required: "Vui lòng chọn ngành nghề chung" }}
            render={({ field }) => (
              <Controller
                name="detailedIndustry"
                control={control}
                render={({ field: detailedField }) => (
                  <Controller
                    name="position"
                    control={control}
                    render={({ field: positionField }) => (
                      <Select
                        {...field}
                        placeholder="Chọn ngành nghề chung"
                        size="large"
                        style={{ width: "100%", marginBottom: 16 }}
                        onChange={(value) =>
                          handleGeneralIndustryChange(
                            value,
                            field,
                            detailedField,
                            positionField
                          )
                        }
                      >
                        {Object.keys(industryData).map((industry) => (
                          <Option key={industry} value={industry}>
                            {industry}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                )}
              />
            )}
          />
          {errors.generalIndustry && (
            <Text type="danger">{errors.generalIndustry.message}</Text>
          )}
        </Col>
        <Col span={12}></Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <StyledSubTitle>Ngành nghề chi tiết</StyledSubTitle>
          <Controller
            name="detailedIndustry"
            control={control}
            rules={{ required: "Vui lòng chọn ngành nghề chi tiết" }}
            render={({ field }) => (
              <Controller
                name="position"
                control={control}
                render={({ field: positionField }) => (
                  <Select
                    {...field}
                    placeholder="Chọn ngành nghề chi tiết"
                    size="large"
                    style={{ width: "100%", marginBottom: 16 }}
                    onChange={(value) =>
                      handleDetailedIndustryChange(value, field, positionField)
                    }
                    disabled={!selectedGeneralIndustry}
                  >
                    {selectedGeneralIndustry &&
                      industryData[
                        selectedGeneralIndustry
                      ].detailedIndustries.map((detailed) => (
                        <Option key={detailed} value={detailed}>
                          {detailed}
                        </Option>
                      ))}
                  </Select>
                )}
              />
            )}
          />
          {errors.detailedIndustry && (
            <Text type="danger">{errors.detailedIndustry.message}</Text>
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
                onChange={(value) => handlePositionChange(value, field)}
                disabled={!selectedDetailedIndustry}
              >
                {selectedGeneralIndustry &&
                  selectedDetailedIndustry &&
                  industryData[selectedGeneralIndustry].positions[
                    selectedDetailedIndustry
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
