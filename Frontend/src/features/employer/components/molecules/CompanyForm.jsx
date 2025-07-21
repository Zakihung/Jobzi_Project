import React, { useEffect } from "react";
import { Form, Input, Select, Button, Typography, Row, Col } from "antd";
import styled from "styled-components";
import {
  ShopOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useGetListCompanyIndustry from "../../../../features/company/hooks/Company_Industry/useGetListCompanyIndustry";
import useGetAllProvinceAlphabet from "../../../../features/company/hooks/Province/useGetAllProvinceAlphabet";

const { Text } = Typography;
const { Option } = Select;

const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    font-weight: 500;
    color: #1e293b;
  }
`;

const StyledInput = styled(Input)`
  height: 46px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #818cf8;
  }
`;

const StyledSelect = styled(Select)`
  .ant-select-selector {
    height: 46px !important;
    border-radius: 12px !important;
    border: 2px solid #e2e8f0 !important;
    font-size: 0.95rem !important;
  }

  &:hover .ant-select-selector {
    border-color: #818cf8 !important;
  }
`;

const StyledButton = styled(Button)`
  height: 46px;
  border-radius: 12px;
  background: #577cf6;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.5rem;

  &:hover {
    background: var(--primary-dark) !important;
    color: var(--white) !important;
    box-shadow: none;
  }
`;

const CompanyForm = ({ onFinish, isLoading, setFormRef }) => {
  const [form] = Form.useForm();
  const { data: industriesData, isLoading: isIndustriesLoading } =
    useGetListCompanyIndustry();
  const { data: provincesData, isLoading: isProvincesLoading } =
    useGetAllProvinceAlphabet();

  // Gửi tham chiếu form ra ngoài
  useEffect(() => {
    if (setFormRef) {
      setFormRef(form);
    }
  }, [form, setFormRef]);

  // Tạo danh sách tỉnh/thành phố từ provincesData
  const provinces =
    provincesData
      ?.flatMap((group) => group.provinces)
      .map((province) => ({ id: province._id, name: province.name })) || [];

  return (
    <StyledForm
      form={form}
      name="companyForm"
      onFinish={onFinish}
      layout="vertical"
      size="large"
      scrollToFirstError
      disabled={isLoading || isIndustriesLoading || isProvincesLoading}
    >
      <Form.Item
        name="company_name"
        label="Tên công ty"
        rules={[
          { required: true, message: "Vui lòng nhập tên công ty!" },
          {
            pattern: /^[\p{L}0-9\s.,&@/()+\-'"!%*#]{2,100}$/u,
            message:
              "Tên công ty chứa từ 2 đến 100 ký tự, bao gồm chữ cái, số, khoảng trắng và ký tự đặc biệt hợp lệ!",
          },
        ]}
      >
        <StyledInput
          prefix={
            <ShopOutlined style={{ color: "#64748b", marginRight: "5px" }} />
          }
          placeholder="Nhập tên công ty"
        />
      </Form.Item>

      <Form.Item
        name="company_industry"
        label="Lĩnh vực công ty"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn lĩnh vực công ty!",
          },
        ]}
      >
        <StyledSelect
          showSearch
          placeholder="Chọn lĩnh vực công ty"
          prefix={
            <AppstoreOutlined
              style={{ color: "#64748b", marginRight: "5px" }}
            />
          }
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {industriesData?.map((industry) => (
            <Option key={industry._id} value={industry.name}>
              {industry.name}
            </Option>
          ))}
        </StyledSelect>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="company_location"
            label="Địa chỉ công ty"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ công ty!" },
              {
                min: 10,
                max: 255,
                message: "Địa chỉ phải từ 10 đến 255 ký tự!",
              },
              {
                pattern: /^[a-zA-ZÀ-ỹ0-9\s,./\-()]+$/,
                message:
                  "Địa chỉ chỉ được chứa chữ, số và các ký tự: , . / - ( )",
              },
            ]}
          >
            <StyledInput
              prefix={
                <EnvironmentOutlined
                  style={{ color: "#64748b", marginRight: "5px" }}
                />
              }
              placeholder="Nhập địa chỉ công ty"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="province_id"
            label="Tỉnh/Thành phố"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tỉnh/thành phố!",
              },
            ]}
          >
            <StyledSelect
              showSearch
              placeholder="Chọn tỉnh/thành phố"
              prefix={
                <EnvironmentOutlined
                  style={{ color: "#64748b", marginRight: "5px" }}
                />
              }
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {provinces.map((province) => (
                <Option key={province.id} value={province.id}>
                  {province.name}
                </Option>
              ))}
            </StyledSelect>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="position"
        label="Vị trí của bạn trong công ty"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập vị trí của bạn trong công ty!",
          },
          {
            pattern: /^[a-zA-ZÀ-ỹ0-9\s.-]{2,100}$/,
            message:
              "Vị trí chỉ được chứa chữ cái, số, khoảng trắng và chứa từ 2 đến 100 ký tự!",
          },
        ]}
      >
        <StyledInput
          prefix={
            <UserOutlined style={{ color: "#64748b", marginRight: "5px" }} />
          }
          placeholder="Nhập vị trí của bạn trong công ty (ví dụ: HR)"
        />
      </Form.Item>

      <Form.Item>
        <StyledButton
          type="primary"
          htmlType="submit"
          block
          loading={isLoading || isIndustriesLoading || isProvincesLoading}
        >
          {isLoading || isIndustriesLoading || isProvincesLoading
            ? "Đang tạo tài khoản..."
            : "Hoàn tất"}
        </StyledButton>
      </Form.Item>
    </StyledForm>
  );
};

export default CompanyForm;
