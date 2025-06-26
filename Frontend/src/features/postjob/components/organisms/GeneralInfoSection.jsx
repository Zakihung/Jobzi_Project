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
  full_time: "Toàn thời gian",
  part_time: "Bán thời gian",
  internship: "Thực tập",
};

const genderData = {
  unspecified: "Không yêu cầu",
  male: "Nam",
  female: "Nữ",
};

const roleOrganizationData = {
  unspecified: "Không quy định",
  intern: "Thực tập sinh",
  staff: "Nhân viên",
  leader: "Tổ trưởng",
  manager: "Trưởng nhóm",
  head: "Trưởng phòng",
  deputy_director: "Phó giám đốc bộ phận",
  director: "Giám đốc bộ phận",
  ceo: "Giám đốc điều hành (CEO)",
  cto: "Giám đốc kỹ thuật (CTO)",
  cfo: "Giám đốc tài chính (CFO)",
};

const experienceLevelData = {
  none: "Không yêu cầu",
  intern: "Thực tập sinh",
  fresher: "Mới tốt nghiệp (Fresher)",
  junior: "Nhân viên mới (Junior)",
  mid: "Trung cấp (Mid-level)",
  senior: "Nhân viên cao cấp (Senior)",
  lead: "Trưởng nhóm kỹ thuật (Team Lead / Technical Lead)",
  architect: "Kiến trúc sư hệ thống (Architect / Solution Architect)",
  expert: "Chuyên gia cao cấp (Principal / Expert)",
};

const provinceData = {
  "Hồ Chí Minh": "Hồ Chí Minh",
  "Hà Nội": "Hà Nội",
  "Đà Nẵng": "Đà Nẵng",
  "Cần Thơ": "Cần Thơ",
};

const salaryTypeData = {
  negotiable: "Thỏa thuận",
  range: "Khoảng lương",
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
  setValue,
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

  useEffect(() => {
    if (salary_type === "negotiable") {
      setValue("min_salary_range", "");
      setValue("max_salary_range", "");
    }
  }, [salary_type, setValue]);

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
      salary_type === "negotiable" ||
      (salary_type === "range" &&
        min_salary_range !== undefined &&
        min_salary_range !== null &&
        min_salary_range !== "" &&
        max_salary_range !== undefined &&
        max_salary_range !== null &&
        max_salary_range !== "" &&
        max_salary_range > min_salary_range);

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
                {Object.entries(workTypeData).map(([value, label]) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
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
                {Object.entries(genderData).map(([value, label]) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
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
                {Object.entries(roleOrganizationData).map(([value, label]) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          {errors.role_organization && (
            <Text type="danger">{errors.role_organization.message}</Text>
          )}
        </Col>
        <Col span={8}>
          <StyledSubTitle>Cấp độ chuyên môn</StyledSubTitle>
          <Controller
            name="experience_level"
            control={control}
            rules={{ required: "Vui lòng chọn cấp độ" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn cấp độ"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
              >
                {Object.entries(experienceLevelData).map(([value, label]) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
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
                {Object.entries(salaryTypeData).map(([value, label]) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
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
                salary_type !== "range" || value
                  ? true
                  : "Vui lòng nhập lương tối thiểu",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Lương tối thiểu (triệu)"
                size="large"
                disabled={salary_type !== "range"}
                style={{ width: "100%", marginBottom: 16 }}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    field.onChange(value ? parseInt(value) : 0);
                  }
                }}
                value={field.value ?? ""}
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
              validate: (value, formValues) => {
                if (salary_type !== "range") return true;
                if (value === undefined || value === null || value === "") {
                  return "Vui lòng nhập lương tối đa";
                }
                // Sửa: Kiểm tra max_salary_range > min_salary_range
                if (
                  formValues.min_salary_range !== undefined &&
                  formValues.min_salary_range !== null &&
                  value <= formValues.min_salary_range
                ) {
                  return "Lương tối đa phải lớn hơn lương tối thiểu";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Lương tối đa (triệu)"
                size="large"
                disabled={salary_type !== "range"}
                style={{ width: "100%", marginBottom: 16 }}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    field.onChange(value ? parseInt(value) : 0);
                  }
                }}
                value={field.value ?? ""}
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
