import React, { useState } from "react";
import { Card, Typography, Select, Row, Col } from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { useEffect } from "react";
import useGetIndustryGroups from "../../hooks/Industry_Group/useGetIndustryGroups";
import useGetIndustries from "../../hooks/Industry/useGetIndustries";
import useGetJobPositions from "../../hooks/Job_Position/useGetJobPositions";

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
  setValue,
  setCompletedSections,
}) => {
  const [selectedIndustryGroup, setSelectedIndustryGroup] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  // Lấy danh sách nhóm ngành
  const { data: industryGroups, isLoading: isLoadingIndustryGroups } =
    useGetIndustryGroups();

  // Lấy danh sách ngành dựa trên industry_group_id
  const { data: industries, isLoading: isLoadingIndustries } = useGetIndustries(
    {
      enabled: !!selectedIndustryGroup,
    }
  );

  // Lấy danh sách vị trí công việc dựa trên industry_id
  const { data: jobPositions, isLoading: isLoadingJobPositions } =
    useGetJobPositions({
      enabled: !!selectedIndustry,
    });

  useEffect(() => {
    // Reset ngành và vị trí khi nhóm ngành thay đổi
    setValue("industry", null);
    setValue("position", null);
    setSelectedIndustry(null);
  }, [selectedIndustryGroup, setValue]);

  useEffect(() => {
    // Reset vị trí khi ngành thay đổi
    setValue("position", null);
  }, [selectedIndustry, setValue]);

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
              setValue("industry", null);
              setValue("position", null);

              if (completedSections.includes("Ngành nghề và vị trí")) {
                setCompletedSections(
                  completedSections.filter(
                    (section) => section !== "Ngành nghề và vị trí"
                  )
                );
              }
            }}
            loading={isLoadingIndustryGroups}
          >
            {industryGroups?.map((group) => (
              <Option key={group._id} value={group._id}>
                {group.name}
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
              setValue("industry", value);
              setValue("position", null);

              if (completedSections.includes("Ngành nghề và vị trí")) {
                setCompletedSections(
                  completedSections.filter(
                    (section) => section !== "Ngành nghề và vị trí"
                  )
                );
              }
            }}
            disabled={!selectedIndustryGroup || isLoadingIndustries}
            loading={isLoadingIndustries}
          >
            {industries
              ?.filter(
                (industry) =>
                  industry.industry_group_id._id === selectedIndustryGroup
              )
              .map((industry) => (
                <Option key={industry._id} value={industry._id}>
                  {industry.name}
                </Option>
              ))}
          </Select>
        </Col>
        <Col span={12}></Col>
      </Row>
      <Row>
        <Col span={12} style={{ paddingRight: "6px" }}>
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
                style={{ width: "100%", marginBottom: 16 }}
                disabled={!selectedIndustry || isLoadingJobPositions}
                loading={isLoadingJobPositions}
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
                {jobPositions
                  ?.filter(
                    (position) => position.industry_id._id === selectedIndustry
                  )
                  .map((position) => (
                    <Option key={position._id} value={position._id}>
                      {position.name}
                    </Option>
                  ))}
              </Select>
            )}
          />
          {errors.position && (
            <Text type="danger">{errors.position.message}</Text>
          )}
        </Col>
        <Col span={12}></Col>
      </Row>
    </StyledCard>
  );
};

export default IndustrySection;
