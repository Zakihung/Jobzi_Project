import React from "react";
import { Card, Typography, Select, Input, Button, Row, Col } from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

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

const GeneralInfoSection = ({
  control,
  errors,
  sectionRefs,
  completedSections,
  setCompletedSections,
  locations,
  handleLocationChange,
  addLocation,
  salaryType,
}) => {
  return (
    <StyledCard ref={sectionRefs.generalInfo}>
      <StyledTitle level={3}>Thông tin chung</StyledTitle>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <StyledSubTitle>Số lượng tuyển</StyledSubTitle>
          <Controller
            name="number"
            control={control}
            rules={{ required: "Vui lòng nhập số lượng" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập số lượng"
                size="large"
                onChange={(e) => {
                  field.onChange(e);
                  if (
                    e.target.value &&
                    !completedSections.includes("Thông tin chung")
                  ) {
                    setCompletedSections([
                      ...completedSections,
                      "Thông tin chung",
                    ]);
                  }
                }}
              />
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
                onChange={(value) => {
                  field.onChange(value);
                  if (value && !completedSections.includes("Thông tin chung")) {
                    setCompletedSections([
                      ...completedSections,
                      "Thông tin chung",
                    ]);
                  }
                }}
              >
                <Option value="Full-time">Full-time</Option>
                <Option value="Part-time">Part-time</Option>
                <Option value="Remote">Remote</Option>
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
                onChange={(value) => {
                  field.onChange(value);
                  if (value && !completedSections.includes("Thông tin chung")) {
                    setCompletedSections([
                      ...completedSections,
                      "Thông tin chung",
                    ]);
                  }
                }}
              >
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
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
                onChange={(value) => {
                  field.onChange(value);
                  if (value && !completedSections.includes("Thông tin chung")) {
                    setCompletedSections([
                      ...completedSections,
                      "Thông tin chung",
                    ]);
                  }
                }}
              >
                <Option value="Nhân viên">Nhân viên</Option>
                <Option value="Trưởng nhóm">Trưởng nhóm</Option>
                <Option value="Quản lý">Quản lý</Option>
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
                onChange={(value) => {
                  field.onChange(value);
                  if (value && !completedSections.includes("Thông tin chung")) {
                    setCompletedSections([
                      ...completedSections,
                      "Thông tin chung",
                    ]);
                  }
                }}
              >
                <Option value="Không yêu cầu">Không yêu cầu</Option>
                <Option value="1-2 năm">1-2 năm</Option>
                <Option value="3-5 năm">3-5 năm</Option>
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
                onChange={(value) => {
                  field.onChange(value);
                  if (value && !completedSections.includes("Thông tin chung")) {
                    setCompletedSections([
                      ...completedSections,
                      "Thông tin chung",
                    ]);
                  }
                }}
              >
                <Option value="Thỏa thuận">Thỏa thuận</Option>
                <Option value="Khoảng lương">Khoảng lương</Option>
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
                onChange={(e) => {
                  field.onChange(e);
                  if (
                    e.target.value &&
                    !completedSections.includes("Thông tin chung")
                  ) {
                    setCompletedSections([
                      ...completedSections,
                      "Thông tin chung",
                    ]);
                  }
                }}
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
                onChange={(e) => {
                  field.onChange(e);
                  if (
                    e.target.value &&
                    !completedSections.includes("Thông tin chung")
                  ) {
                    setCompletedSections([
                      ...completedSections,
                      "Thông tin chung",
                    ]);
                  }
                }}
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
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <Select
                placeholder="Chọn tỉnh/thành phố"
                value={location.city || null}
                onChange={(value) => handleLocationChange(index, "city", value)}
                size="large"
                style={{ width: "100%" }}
              >
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
                <Option value="Hà Nội">Hà Nội</Option>
                <Option value="Đà Nẵng">Đà Nẵng</Option>
              </Select>
            </Col>
            <Col span={16}>
              <Input
                placeholder="Nhập địa điểm làm việc cụ thể"
                value={location.address || null}
                onChange={(e) =>
                  handleLocationChange(index, "address", e.target.value)
                }
                size="large"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </LocationItem>
      ))}
      <Button type="primary" icon={<PlusOutlined />} onClick={addLocation}>
        Thêm khu vực làm việc
      </Button>
    </StyledCard>
  );
};

export default GeneralInfoSection;
