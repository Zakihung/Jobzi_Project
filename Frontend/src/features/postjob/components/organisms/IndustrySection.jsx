import React, { useState, useEffect } from "react";
import { Card, Typography, Select, Row, Col } from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import useGetIndustryGroups from "../../hooks/Industry_Group/useGetIndustryGroups";
import useGetIndustries from "../../hooks/Industry/useGetIndustries";
import useGetJobPositions from "../../hooks/Job_Position/useGetJobPositions";
import useGetJobPositionById from "../../hooks/Job_Position/useGetJobPositionById";
import useGetIndustryById from "../../hooks/Industry/useGetIndustryById";
import useGetIndustryGroupById from "../../hooks/Industry_Group/useGetIndustryGroupById";

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
  disabled,
  jobData,
}) => {
  const [selectedIndustryGroup, setSelectedIndustryGroup] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const { data: industryGroups, isLoading: isLoadingIndustryGroups } =
    useGetIndustryGroups();

  const { data: industries, isLoading: isLoadingIndustries } = useGetIndustries(
    {
      enabled: !!selectedIndustryGroup,
    }
  );

  const { data: jobPositions, isLoading: isLoadingJobPositions } =
    useGetJobPositions({
      enabled: !!selectedIndustry,
    });

  const { data: jobPositionData, isLoading: isLoadingJobPosition } =
    useGetJobPositionById(jobData?.job_position_id?._id, {
      enabled: !!jobData?.job_position_id,
    });

  const { data: industryData, isLoading: isLoadingIndustry } =
    useGetIndustryById(jobPositionData?.industry_id?._id, {
      enabled: !!jobPositionData?.industry_id?._id,
    });

  const { data: industryGroupData, isLoading: isLoadingIndustryGroup } =
    useGetIndustryGroupById(industryData?.industry_group_id?._id, {
      enabled: !!industryData?.industry_group_id?._id,
    });

  useEffect(() => {
    if (
      jobData?.job_position_id?._id &&
      jobPositionData &&
      industryData &&
      industryGroupData
    ) {
      const industryGroupId = industryData?.industry_group_id?._id;
      const industryId = jobPositionData?.industry_id?._id;
      const positionId = jobData?.job_position_id?._id;

      if (industryGroupId && industryId && positionId) {
        setSelectedIndustryGroup(industryGroupId);
        setSelectedIndustry(industryId);
        setValue("industry", industryId);
        setValue("position", positionId);
        if (!completedSections.includes("Ngành nghề và vị trí")) {
          setCompletedSections([...completedSections, "Ngành nghề và vị trí"]);
        }
      }
    }
  }, [
    jobData,
    jobPositionData,
    industryData,
    industryGroupData,
    setValue,
    setCompletedSections,
    completedSections,
  ]);

  useEffect(() => {
    if (!selectedIndustryGroup) {
      setValue("industry", null);
      setValue("position", null);
      setSelectedIndustry(null);
    }
  }, [selectedIndustryGroup, setValue]);

  useEffect(() => {
    if (!selectedIndustry) {
      setValue("position", null);
    }
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
            loading={isLoadingIndustryGroups || isLoadingIndustryGroup}
            disabled={disabled || isLoadingIndustryGroup}
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
            disabled={
              disabled ||
              !selectedIndustryGroup ||
              isLoadingIndustries ||
              isLoadingIndustry
            }
            loading={isLoadingIndustries || isLoadingIndustry}
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
                disabled={
                  disabled ||
                  !selectedIndustry ||
                  isLoadingJobPositions ||
                  isLoadingJobPosition
                }
                loading={isLoadingJobPositions || isLoadingJobPosition}
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
