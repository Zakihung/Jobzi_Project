import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Typography,
  Select,
  Input,
  Button,
  Row,
  Col,
  Space,
  Popover,
} from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import useGetAllProvinceAlphabet from "../../../company/hooks/Province/useGetAllProvinceAlphabet";

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

const LocationTrigger = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  width: 100%;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  transition: all 0.3s ease;

  .location-text {
    flex: 1;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.88);
  }

  .arrow-icon {
    margin-left: 8px;
    font-size: 12px;
    transition: transform 0.3s ease;
  }

  &.open .arrow-icon {
    transform: rotate(180deg);
  }
`;

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

const salaryTypeData = {
  negotiable: "Thỏa thuận",
  range: "Khoảng lương",
};

const formatCurrency = (value) => {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const parseCurrency = (value) => {
  return parseInt(value.replace(/,/g, ""), 10) || 0;
};

const isValidMoney = (value) => {
  const number = parseCurrency(value);
  return number >= 1000 && number % 1000 === 0;
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
  disabled,
}) => {
  const { data: provincesData, isLoading: isProvinceLoading } =
    useGetAllProvinceAlphabet();
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

  const prevIsLocationValidRef = useRef(null);
  const [popoverVisible, setPopoverVisible] = useState(
    locations.map(() => false)
  ); // State để quản lý Popover cho từng location

  useEffect(() => {
    if (salary_type === "negotiable") {
      setValue("min_salary_range", "");
      setValue("max_salary_range", "");
    }
  }, [salary_type, setValue]);

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

    const isLocationValid = locations.every(
      (loc) => loc.province && loc.address
    );

    const isComplete =
      number > 0 &&
      work_type &&
      gender &&
      experience_level &&
      min_years_experience >= 0 &&
      role_organization &&
      salary_type &&
      isSalaryValid &&
      isLocationValid;

    if (
      isComplete &&
      !completedSections.includes("Thông tin chung") &&
      isLocationValid
    ) {
      setCompletedSections([...completedSections, "Thông tin chung"]);
    } else if (
      (!isComplete || !isLocationValid) &&
      completedSections.includes("Thông tin chung")
    ) {
      setCompletedSections(
        completedSections.filter((section) => section !== "Thông tin chung")
      );
    }

    prevIsLocationValidRef.current = isLocationValid;
  }, [watchedFields, locations, completedSections, setCompletedSections]);

  const locationContent = (index) => (
    <div
      style={{
        width: 520,
        maxHeight: 300,
        overflowY: "auto",
        padding: "4px 12px",
      }}
    >
      {provincesData?.map((group) => (
        <div
          key={group.letter}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 12px",
            paddingLeft: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{group.letter}</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 12px",
              paddingLeft: 12,
            }}
          >
            {group.provinces.map((province) => (
              <div
                key={province.name}
                style={{
                  cursor: "pointer",
                  color:
                    locations[index].province === province.name
                      ? "#577cf6"
                      : "inherit",
                  fontWeight:
                    locations[index].province === province.name ? 600 : 400,
                }}
                onClick={() =>
                  handleLocationChange(index, "province", province.name)
                }
                onMouseEnter={(e) => {
                  if (locations[index].province !== province.name) {
                    e.target.style.color = "#577cf6";
                  }
                }}
                onMouseLeave={(e) => {
                  if (locations[index].province !== province.name) {
                    e.target.style.color = "inherit";
                  }
                }}
              >
                {province.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (isProvinceLoading) {
    return (
      <StyledCard ref={sectionRefs.generalInfo}>
        <StyledTitle level={3}>Thông tin chung</StyledTitle>
        <Input
          size="large"
          placeholder="Đang tải dữ liệu..."
          disabled
          style={{ width: "100%", marginBottom: 16 }}
        />
      </StyledCard>
    );
  }

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
              required: "Vui lòng nhập số lượng tuyển",
              min: { value: 1, message: "Số lượng phải lớn hơn 0" },
            }}
            render={({ field }) => (
              <NumberInputGroup>
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => field.onChange(Math.max(1, field.value - 1))}
                  disabled={disabled || field.value <= 1}
                />
                <Input
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      field.onChange(value ? parseInt(value) : 1);
                    }
                  }}
                  disabled={disabled}
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => field.onChange(field.value + 1)}
                  disabled={disabled}
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
            rules={{ required: "Vui lòng chọn hình thức làm việc" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn hình thức làm việc"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
                disabled={disabled}
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
            rules={{ required: "Vui lòng chọn giới tính" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn giới tính"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
                disabled={disabled}
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
          <StyledSubTitle>Cấp bậc</StyledSubTitle>
          <Controller
            name="role_organization"
            control={control}
            rules={{ required: "Vui lòng chọn cấp bậc" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn cấp bậc"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
                disabled={disabled}
              >
                {Object.keys(roleOrganizationData).map((role) => (
                  <Option key={role} value={role}>
                    {roleOrganizationData[role]}
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
          <StyledSubTitle>Kinh nghiệm</StyledSubTitle>
          <Controller
            name="experience_level"
            control={control}
            rules={{ required: "Vui lòng chọn cấp độ kinh nghiệm" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn cấp độ kinh nghiệm"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
                disabled={disabled}
              >
                {Object.keys(experienceLevelData).map((level) => (
                  <Option key={level} value={level}>
                    {experienceLevelData[level]}
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
          <StyledSubTitle>Số năm kinh nghiệm</StyledSubTitle>
          <Controller
            name="min_years_experience"
            control={control}
            rules={{
              required: "Vui lòng nhập số năm kinh nghiệm",
              min: { value: 0, message: "Số năm kinh nghiệm không được âm" },
            }}
            render={({ field }) => (
              <NumberInputGroup>
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => field.onChange(Math.max(0, field.value - 1))}
                  disabled={disabled || field.value <= 0}
                />
                <Input
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      field.onChange(value ? parseInt(value) : 0);
                    }
                  }}
                  disabled={disabled}
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => field.onChange(field.value + 1)}
                  disabled={disabled}
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
          <StyledSubTitle>Loại lương</StyledSubTitle>
          <Controller
            name="salary_type"
            control={control}
            rules={{ required: "Vui lòng chọn loại lương" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn loại lương"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
                disabled={disabled}
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
          <StyledSubTitle>Lương tối thiểu</StyledSubTitle>
          <Controller
            name="min_salary_range"
            control={control}
            rules={{
              validate: (value, formValues) => {
                if (salary_type !== "range") return true;
                if (value === undefined || value === null || value === "") {
                  return "Vui lòng nhập lương tối thiểu";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Lương tối thiểu (đ/tháng)"
                size="large"
                disabled={disabled || salary_type !== "range"}
                style={{ width: "100%", marginBottom: 16 }}
                value={formatCurrency(field.value ?? "")}
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, "");
                  if (/^\d*$/.test(raw)) {
                    const number = parseInt(raw, 10) || 0;
                    if (number % 1000 === 0 || raw === "") {
                      field.onChange(number);
                    }
                  }
                }}
              />
            )}
          />
          {errors.min_salary_range && (
            <Text type="danger">{errors.min_salary_range.message}</Text>
          )}
        </Col>
        <Col span={8}>
          <StyledSubTitle>Lương tối đa</StyledSubTitle>
          <Controller
            name="max_salary_range"
            control={control}
            rules={{
              validate: (value, formValues) => {
                if (salary_type !== "range") return true;
                if (value === undefined || value === null || value === "") {
                  return "Vui lòng nhập lương tối đa";
                }
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
                placeholder="Lương tối đa (đ/tháng)"
                size="large"
                disabled={disabled || salary_type !== "range"}
                style={{ width: "100%", marginBottom: 16 }}
                value={formatCurrency(field.value ?? "")}
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, "");
                  if (/^\d*$/.test(raw)) {
                    const number = parseInt(raw, 10) || 0;
                    if (number % 1000 === 0 || raw === "") {
                      field.onChange(number);
                    }
                  }
                }}
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
              <Popover
                content={locationContent(index)}
                trigger="click"
                placement="bottomLeft"
                arrow={false}
                getPopupContainer={() => document.body}
                open={popoverVisible[index]} // Sử dụng state để quản lý trạng thái mở
                onOpenChange={(visible) => {
                  setPopoverVisible((prev) => {
                    const newVisible = [...prev];
                    newVisible[index] = visible; // Cập nhật trạng thái Popover
                    return newVisible;
                  });
                }}
                disabled={disabled} // Thêm disabled cho Popover
              >
                <LocationTrigger
                  style={
                    disabled ? { pointerEvents: "none", opacity: 0.6 } : {}
                  }
                >
                  <span className="location-text">
                    {location.province || "Chọn tỉnh/thành phố"}
                  </span>
                  <DownOutlined className="arrow-icon" />
                </LocationTrigger>
              </Popover>
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
                disabled={disabled}
              />
            </Col>
            {index > 0 && (
              <Col span={2}>
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => removeLocation(index)}
                  size="large"
                  danger
                  disabled={disabled}
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
        disabled={disabled || locations.length >= 3}
      >
        Thêm khu vực làm việc
      </Button>
    </StyledCard>
  );
};

export default GeneralInfoSection;
