import React, { useEffect, useRef } from "react";
import { Card, Typography, Select, Input, Button, Row, Col, Space } from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import {
  MinusOutlined,
  MinusSquareOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

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

const LocationItem = styled.div`
  margin-bottom: 16px;
`;

const NumberInputGroup = styled(Space.Compact)`
  display: flex;
  width: 100%;
  .ant-input {
    text-align: center;
    border-radius: 8px;
    &:hover {
      border-color: #577cf6;
    }
  }
  .ant-btn {
    &:first-child {
      border-radius: 8px;
    }
    &:last-child {
      border-radius: 8px;
    }
  }
`;

// Dữ liệu cho các Select
const jobTypeData = {
  "Full-time": "Full-time",
  "Part-time": "Part-time",
  Remote: "Remote",
};

const genderData = {
  Nam: "Nam",
  Nữ: "Nữ",
};

const levelData = {
  "Nhân viên": "Nhân viên",
  "Trưởng nhóm": "Trưởng nhóm",
  "Quản lý": "Quản lý",
};

const experienceData = {
  "Không yêu cầu": "Không yêu cầu",
  "1-2 năm": "1-2 năm",
  "3-5 năm": "3-5 năm",
};

const cityData = {
  "Hồ Chí Minh": "Hồ Chí Minh",
  "Hà Nội": "Hà Nội",
  "Đà Nẵng": "Đà Nẵng",
};

const salaryTypeData = {
  "Thỏa thuận": "Thỏa thuận",
  "Khoảng lương": "Khoảng lương",
};

const GeneralInfoSection = ({
  control,
  errors,
  sectionRefs,
  completedSections,
  setCompletedSections,
  locations,
  handleLocationChange,
  addLocation,
  removeLocation,
  salaryType,
  watch,
}) => {
  // Theo dõi tất cả các trường cần thiết
  const watchedFields = watch([
    "number",
    "jobType",
    "gender",
    "level",
    "experience",
    "salaryType",
    "salaryRange.min",
    "salaryRange.max",
  ]);

  // Sử dụng ref để lưu trạng thái trước đó của isLocationValid
  const prevIsLocationValidRef = useRef(null);

  // Kiểm tra xem tất cả các trường đã được điền đầy đủ chưa
  useEffect(() => {
    const [
      number,
      jobType,
      gender,
      level,
      experience,
      salaryType,
      salaryMin,
      salaryMax,
    ] = watchedFields;

    const isSalaryValid =
      salaryType === "Thỏa thuận" ||
      (salaryType === "Khoảng lương" && salaryMin && salaryMax);

    // Chỉ kiểm tra locations có dữ liệu hợp lệ, bỏ qua các location rỗng mới thêm
    const isLocationValid = locations.every(
      (loc) =>
        (!loc.city && !loc.address) ||
        (loc.city && loc.address && loc.address.trim() !== "")
    );

    const isSectionComplete =
      number &&
      jobType &&
      gender &&
      level &&
      experience &&
      salaryType &&
      isSalaryValid &&
      isLocationValid &&
      locations.some((loc) => loc.city && loc.address); // Đảm bảo ít nhất 1 location có dữ liệu

    // Chỉ cập nhật completedSections nếu trạng thái hoàn thành thay đổi
    if (isSectionComplete && !completedSections.includes("Thông tin chung")) {
      setCompletedSections([...completedSections, "Thông tin chung"]);
    } else if (
      !isSectionComplete &&
      completedSections.includes("Thông tin chung")
    ) {
      setCompletedSections(
        completedSections.filter((section) => section !== "Thông tin chung")
      );
    }

    // Cập nhật prevIsLocationValidRef
    prevIsLocationValidRef.current = isLocationValid;
  }, [watchedFields, locations, completedSections, setCompletedSections]);

  return (
    <StyledCard ref={sectionRefs.generalInfo}>
      <StyledTitle level={3}>Thông tin chung</StyledTitle>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <StyledSubTitle>Số lượng tuyển</StyledSubTitle>
          <Controller
            name="number"
            control={control}
            rules={{
              required: "Vui lòng nhập số lượng",
              pattern: {
                value: /^[1-9]\d*$/,
                message: "Vui lòng nhập số nguyên dương",
              },
            }}
            render={({ field }) => (
              <NumberInputGroup>
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => {
                    const value = parseInt(field.value) || 1;
                    if (value > 1) {
                      field.onChange(value - 1);
                    }
                  }}
                  size="large"
                />
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="Nhập số lượng"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      field.onChange(value ? parseInt(value) : "");
                    }
                  }}
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    const value = parseInt(field.value) || 0;
                    field.onChange(value + 1);
                  }}
                  size="large"
                />
              </NumberInputGroup>
            )}
          />
          {errors.number && <Text type="danger">{errors.number.message}</Text>}
        </Col>
        <Col span={8}>
          <StyledSubTitle>Loại công việc</StyledSubTitle>
          <Controller
            name="jobType"
            control={control}
            rules={{ required: "Vui lòng chọn loại công việc" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn loại công việc"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
              >
                {Object.keys(jobTypeData).map((type) => (
                  <Option key={type} value={type}>
                    {jobTypeData[type]}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.jobType && (
            <Text type="danger">{errors.jobType.message}</Text>
          )}
        </Col>
        <Col span={8} />
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <StyledSubTitle>Giới tính</StyledSubTitle>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn giới tính"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
              >
                {Object.keys(genderData).map((gender) => (
                  <Option key={gender} value={gender}>
                    {genderData[gender]}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.gender && <Text type="danger">{errors.gender.message}</Text>}
        </Col>
        <Col span={8}>
          <StyledSubTitle>Cấp bậc</StyledSubTitle>
          <Controller
            name="level"
            control={control}
            rules={{ required: "Vui lòng chọn cấp bậc" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn cấp bậc"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
              >
                {Object.keys(levelData).map((level) => (
                  <Option key={level} value={level}>
                    {levelData[level]}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.level && <Text type="danger">{errors.level.message}</Text>}
        </Col>
        <Col span={8}>
          <StyledSubTitle>Kinh nghiệm</StyledSubTitle>
          <Controller
            name="experience"
            control={control}
            rules={{ required: "Vui lòng chọn kinh nghiệm" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn kinh nghiệm"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
              >
                {Object.keys(experienceData).map((exp) => (
                  <Option key={exp} value={exp}>
                    {experienceData[exp]}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.experience && (
            <Text type="danger">{errors.experience.message}</Text>
          )}
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <StyledSubTitle>Kiểu lương</StyledSubTitle>
          <Controller
            name="salaryType"
            control={control}
            rules={{ required: "Vui lòng chọn kiểu lương" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn kiểu lương"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
              >
                {Object.keys(salaryTypeData).map((type) => (
                  <Option key={type} value={type}>
                    {salaryTypeData[type]}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.salaryType && (
            <Text type="danger">{errors.salaryType.message}</Text>
          )}
        </Col>
        <Col span={8}>
          <StyledSubTitle>&nbsp;</StyledSubTitle>
          <Controller
            name="salaryRange.min"
            control={control}
            rules={{
              validate: (value) =>
                salaryType !== "Khoảng lương" || value
                  ? true
                  : "Vui lòng nhập lương tối thiểu",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Lương tối thiểu (triệu)"
                size="large"
                disabled={salaryType !== "Khoảng lương"}
                style={{ width: "100%", marginBottom: 16 }}
              />
            )}
          />
          {errors.salaryRange?.min && (
            <Text type="danger">{errors.salaryRange.min.message}</Text>
          )}
        </Col>
        <Col span={8}>
          <StyledSubTitle>&nbsp;</StyledSubTitle>
          <Controller
            name="salaryRange.max"
            control={control}
            rules={{
              validate: (value) =>
                salaryType !== "Khoảng lương" || value
                  ? true
                  : "Vui lòng nhập lương tối đa",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Lương tối đa (triệu)"
                size="large"
                disabled={salaryType !== "Khoảng lương"}
                style={{ width: "100%", marginBottom: 16 }}
              />
            )}
          />
          {errors.salaryRange?.max && (
            <Text type="danger">{errors.salaryRange.max.message}</Text>
          )}
        </Col>
      </Row>
      <StyledSubTitle>Khu vực làm việc</StyledSubTitle>
      {locations.map((location, index) => (
        <LocationItem key={index}>
          <Row gutter={[12, 12]} align="middle">
            <Col span={8}>
              <Select
                placeholder="Chọn tỉnh/thành phố"
                value={location.city || null}
                onChange={(value) => handleLocationChange(index, "city", value)}
                size="large"
                style={{ width: "100%" }}
              >
                {Object.keys(cityData).map((city) => (
                  <Option key={city} value={city}>
                    {cityData[city]}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={index === 0 ? 16 : 14}>
              <Input
                placeholder="Nhập địa điểm làm việc cụ thể"
                value={location.address || ""}
                allowClear
                onChange={(e) =>
                  handleLocationChange(index, "address", e.target.value)
                }
                size="large"
                style={{ width: "100%" }}
              />
            </Col>
            {index > 0 && (
              <Col span={2}>
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => removeLocation(index)}
                  size="large"
                  danger
                />
              </Col>
            )}
          </Row>
        </LocationItem>
      ))}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={addLocation}
        disabled={locations.length >= 3}
      >
        Thêm khu vực làm việc
      </Button>
    </StyledCard>
  );
};

export default GeneralInfoSection;
