import React, { useEffect, useRef } from "react";
import { Card, Typography, Select, Input, Button, Row, Col, Space } from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

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
const workTypeData = {
  "Toàn thời gian": "Toàn thời gian",
  "Bán thời gian": "Bán thời gian",
  "Thực tập": "Thực tập",
};

const genderData = {
  "Không yêu cầu": "Không yêu cầu",
  Nam: "Nam",
  Nữ: "Nữ",
};

const roleOrganizationData = {
  "Không quy định": "Không quy định",
  "Thực tập sinh": "Thực tập sinh",
  "Nhân viên": "Nhân viên",
  "Tổ trưởng": "Tổ trưởng",
  "Trưởng nhóm": "Trưởng nhóm",
  "Trưởng phòng": "Trưởng phòng",
  "Phó giám đốc bộ phận": "Phó giám đốc bộ phận",
  "Giám đốc bộ phận": "Giám đốc bộ phận",
  "Giám đốc điều hành (CEO)": "Giám đốc điều hành (CEO)",
  "Giám đốc kỹ thuật (CTO)": "Giám đốc kỹ thuật (CTO)",
  "Giám đốc tài chính (CFO)": "Giám đốc tài chính (CFO)",
};

const experienceLevelData = {
  "Không yêu cầu": "Không yêu cầu",
  "Thực tập sinh": "Thực tập sinh",
  "Mới tốt nghiệp (Fresher)": "Mới tốt nghiệp (Fresher)",
  "Nhân viên mới (Junior)": "Nhân viên mới (Junior)",
  "Trung cấp (Mid-level)": "Trung cấp (Mid-level)",
  "Nhân viên cao cấp (Senior)": "Nhân viên cao cấp (Senior)",
  "Trưởng nhóm kỹ thuật (Team Lead / Technical Lead)":
    "Trưởng nhóm kỹ thuật (Team Lead / Technical Lead)",
  "Kiến trúc sư hệ thống (Architect / Solution Architect)":
    "Kiến trúc sư hệ thống (Architect / Solution Architect)",
  "Chuyên gia cao cấp (Principal / Expert)":
    "Chuyên gia cao cấp (Principal / Expert)",
};

const provinceData = {
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
  salary_type,
  watch,
}) => {
  // Theo dõi tất cả các trường cần thiết
  const watchedFields = watch([
    "number",
    "work_type",
    "gender",
    "experience_level",
    "min_years_experience",
    "role_organization",
    "salary_type",
    "min_salary_range",
    "max_salary_range",
  ]);

  // Sử dụng ref để lưu trạng thái trước đó của isLocationValid
  const prevIsLocationValidRef = useRef(null);

  // Kiểm tra xem tất cả các trường đã được điền đầy đủ chưa
  useEffect(() => {
    const [
      number,
      work_type,
      gender,
      experience_level,
      min_years_experience,
      role_organization,
      salary_type,
      min_salary_range,
      max_salary_range,
    ] = watchedFields;

    const isSalaryValid =
      salary_type === "Thỏa thuận" ||
      (salary_type === "Khoảng lương" && min_salary_range && max_salary_range);

    // Chỉ kiểm tra locations có dữ liệu hợp lệ, bỏ qua các location rỗng mới thêm
    const isLocationValid = locations.every(
      (loc) =>
        (!loc.province && !loc.address) ||
        (loc.province && loc.address && loc.address.trim() !== "")
    );

    const isSectionComplete =
      number &&
      work_type &&
      gender &&
      experience_level &&
      min_years_experience !== undefined &&
      min_years_experience !== null &&
      role_organization &&
      salary_type &&
      isSalaryValid &&
      isLocationValid &&
      locations.some((loc) => loc.province && loc.address); // Đảm bảo ít nhất 1 location có dữ liệu

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
          <StyledSubTitle>Hình thức làm việc</StyledSubTitle>
          <Controller
            name="work_type"
            control={control}
            rules={{ required: "Vui lòng chọn hình thức" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn hình thức"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
              >
                {Object.keys(workTypeData).map((type) => (
                  <Option key={type} value={type}>
                    {workTypeData[type]}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.work_type && (
            <Text type="danger">{errors.work_type.message}</Text>
          )}
        </Col>
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
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <StyledSubTitle>Chức vụ tuyển</StyledSubTitle>
          <Controller
            name="role_organization"
            control={control}
            rules={{ required: "Vui lòng chọn chức vụ" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn chức vụ"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
              >
                {Object.keys(roleOrganizationData).map((role_organization) => (
                  <Option key={role_organization} value={role_organization}>
                    {[role_organization]}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.role_organization && (
            <Text type="danger">{errors.role_organization.message}</Text>
          )}
        </Col>
        <Col span={8}>
          <StyledSubTitle>Trình độ chuyên môn</StyledSubTitle>
          <Controller
            name="experience_level"
            control={control}
            rules={{ required: "Vui lòng chọn trình độ" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn trình độ"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
              >
                {Object.keys(experienceLevelData).map((experience_level) => (
                  <Option key={experience_level} value={experience_level}>
                    {experienceLevelData[experience_level]}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.experience_level && (
            <Text type="danger">{errors.experience_level.message}</Text>
          )}
        </Col>
        <Col span={8}>
          <StyledSubTitle>Số năm kinh nghiệm tối thiểu</StyledSubTitle>
          <Controller
            name="min_years_experience"
            control={control}
            rules={{
              required: "Vui lòng nhập số năm",
              pattern: {
                value: /^\d+$/,
                message: "Vui lòng nhập số nguyên không âm",
              },
            }}
            render={({ field }) => (
              <NumberInputGroup>
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => {
                    const value = parseInt(field.value) || 0;
                    if (value > 0) {
                      field.onChange(value - 1);
                    }
                  }}
                  size="large"
                />
                <Input
                  {...field}
                  value={
                    field.value === undefined || field.value === null
                      ? ""
                      : field.value
                  }
                  placeholder="Nhập số năm tối thiểu"
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
          {errors.min_years_experience && (
            <Text type="danger">{errors.min_years_experience.message}</Text>
          )}
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <StyledSubTitle>Kiểu lương</StyledSubTitle>
          <Controller
            name="salary_type"
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
          {errors.salary_type && (
            <Text type="danger">{errors.salary_type.message}</Text>
          )}
        </Col>
        <Col span={8}>
          <StyledSubTitle>&nbsp;</StyledSubTitle>
          <Controller
            name="min_salary_range"
            control={control}
            rules={{
              validate: (value) =>
                salary_type !== "Khoảng lương" || value
                  ? true
                  : "Vui lòng nhập lương tối thiểu",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Lương tối thiểu (triệu)"
                size="large"
                disabled={salary_type !== "Khoảng lương"}
                style={{ width: "100%", marginBottom: 16 }}
              />
            )}
          />
          {errors.min_salary_range && (
            <Text type="danger">{errors.min_salary_range.message}</Text>
          )}
        </Col>
        <Col span={8}>
          <StyledSubTitle>&nbsp;</StyledSubTitle>
          <Controller
            name="max_salary_range"
            control={control}
            rules={{
              validate: (value) =>
                salary_type !== "Khoảng lương" || value
                  ? true
                  : "Vui lòng nhập lương tối đa",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Lương tối đa (triệu)"
                size="large"
                disabled={salary_type !== "Khoảng lương"}
                style={{ width: "100%", marginBottom: 16 }}
              />
            )}
          />
          {errors.max_salary_range && (
            <Text type="danger">{errors.max_salary_range.message}</Text>
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
                value={location.province || null}
                onChange={(value) =>
                  handleLocationChange(index, "province", value)
                }
                size="large"
                style={{ width: "100%" }}
              >
                {Object.keys(provinceData).map((province) => (
                  <Option key={province} value={province}>
                    {provinceData[province]}
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
