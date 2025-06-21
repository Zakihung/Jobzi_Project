import React from "react";
import { Form, Input, Button, Typography } from "antd";
import styled from "styled-components";
import { ShopOutlined, GlobalOutlined } from "@ant-design/icons";

const { Text } = Typography;

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

const CompanyForm = ({ form, onFinish, isLoading }) => {
  return (
    <StyledForm
      form={form}
      name="companyForm"
      onFinish={onFinish}
      layout="vertical"
      size="large"
      scrollToFirstError
      disabled={isLoading}
    >
      <Form.Item
        name="company_name"
        label="Tên công ty"
        rules={[
          { required: true, message: "Vui lòng nhập tên công ty!" },
          {
            pattern: /^[a-zA-ZÀ-ỹ0-9\s.-]{2,100}$/,
            message:
              "Tên công ty chỉ được chứa chữ cái, số, khoảng trắng và chứa từ 2 đến 100 ký tự!",
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
        name="company_website"
        label="Website công ty"
        rules={[
          {
            pattern: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
            message: "Vui lòng nhập URL website hợp lệ!",
          },
        ]}
      >
        <StyledInput
          prefix={
            <GlobalOutlined style={{ color: "#64748b", marginRight: "5px" }} />
          }
          placeholder="Nhập URL website công ty (nếu có)"
        />
      </Form.Item>

      <Form.Item
        name="company_description"
        label="Mô tả công ty"
        rules={[
          { required: true, message: "Vui lòng nhập mô tả công ty!" },
          {
            min: 20,
            max: 500,
            message: "Mô tả công ty phải từ 20 đến 500 ký tự!",
          },
        ]}
      >
        <StyledInput.TextArea
          rows={4}
          placeholder="Mô tả ngắn gọn về công ty của bạn"
          style={{
            borderRadius: "12px",
            border: "2px solid #e2e8f0",
            fontSize: "0.95rem",
          }}
        />
      </Form.Item>

      <Form.Item>
        <StyledButton
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
        >
          {isLoading ? "Đang tạo tài khoản..." : "Hoàn tất"}
        </StyledButton>
      </Form.Item>
    </StyledForm>
  );
};

export default CompanyForm;
