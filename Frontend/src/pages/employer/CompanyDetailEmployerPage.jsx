import React, { useContext, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Tabs,
  Spin,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  App,
  Skeleton,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import CompanyBasicInfo from "../../features/company/components/templates/CompanyBasicInfo";
import CompanyInfo from "../../features/company/components/templates/CompanyInfo";
import useGetCompanyById from "../../features/company/hooks/Company/useGetCompanyById";
import useGetEmployerById from "../../features/employer/hooks/useGetEmployerById";
import useUpdateCompany from "../../features/company/hooks/Company/useUpdateCompany";
import useGetListCompanyIndustry from "../../features/company/hooks/Company_Industry/useGetListCompanyIndustry";
import useGetAllProvinceAlphabet from "../../features/company/hooks/Province/useGetAllProvinceAlphabet";
import { AuthContext } from "../../contexts/auth.context";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const ErrorText = styled(Text)`
  color: #ff4d4f;
  font-size: 16px;
  text-align: center;
  display: block;
  margin: 40px 0;
`;

const EditButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const StyledEditButton = styled(Button)`
  border-radius: 8px;
  height: 40px;
  font-weight: 600;

  &:hover {
    background: #4f46e5 !important;
    border-color: #4f46e5 !important;
    box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
  }
`;

const SkeletonContainer = styled.div`
  padding: 16px;
  background: #f8f9fa;
  border-radius: 24px;
`;

const CompanyDetailEmployerPage = () => {
  const { message } = App.useApp();
  const { auth } = useContext(AuthContext);
  const employerId = auth?.user?.employer_id;
  const { data: employerData, isLoading: isLoadingEmployer } =
    useGetEmployerById(employerId);
  const company_id = employerData?.company_id?._id;
  const {
    data: companyData,
    isLoading: isLoadingCompany,
    error,
  } = useGetCompanyById(company_id);

  // States for edit modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const updateCompanyMutation = useUpdateCompany();

  // Get company industries and provinces data
  const { data: companyIndustries, isLoading: isLoadingIndustries } =
    useGetListCompanyIndustry();
  const { data: provincesData, isLoading: isLoadingProvinces } =
    useGetAllProvinceAlphabet();

  // Tạo danh sách tỉnh/thành phố từ provincesData
  const provinces =
    provincesData
      ?.flatMap((group) => group.provinces)
      .map((province) => ({ id: province._id, name: province.name })) || [];

  // Xử lý dữ liệu công ty từ API
  const company = companyData
    ? {
        id: companyData._id,
        name: companyData.name,
        logo:
          companyData.logo ||
          "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png",
        company_industry: companyData.company_industry_id?.name || "",
        company_industry_id: companyData.company_industry_id?._id || "",
        website_url: companyData.website_url || "",
        min_size: companyData.min_size || 0,
        max_size: companyData.max_size || 0,
        address: companyData.address || "",
        province: companyData.province_id?.name || "",
        province_id: companyData.province_id?._id || "",
        introduction: companyData.introduction || "",
        businessOperations: companyData.businessOperations || [],
        regulations: companyData.regulations || [],
        benefits: companyData.benefits || [],
      }
    : null;

  // Handle edit button click
  const handleEditClick = () => {
    if (company) {
      editForm.setFieldsValue({
        name: company.name,
        company_industry_id: company.company_industry_id,
        website_url: company.website_url,
        min_size: company.min_size,
        max_size: company.max_size,
        address: company.address,
        province_id: company.province_id,
        introduction: company.introduction,
        businessOperations: company.businessOperations,
        regulations: company.regulations,
        benefits: company.benefits,
      });
      setIsEditModalVisible(true);
    }
  };

  // Handle edit form submission
  const handleEditSubmit = async (values) => {
    try {
      await updateCompanyMutation.mutateAsync({
        id: company.id,
        data: values,
      });
      message.success("Cập nhật thông tin công ty thành công!");
      setIsEditModalVisible(false);
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Có lỗi xảy ra khi cập nhật thông tin công ty!"
      );
    }
  };

  // Handle cancel edit
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  return (
    <StyledLayout>
      <Row justify="center">
        <Col span={21}>
          {isLoadingCompany || isLoadingEmployer ? (
            <SkeletonContainer>
              <Skeleton active paragraph={{ rows: 2 }} />
              <Skeleton
                active
                paragraph={{ rows: 6 }}
                style={{ marginTop: 16 }}
              />
            </SkeletonContainer>
          ) : error || !company ? (
            <ErrorText>
              {error?.response?.data?.message ||
                "Không tìm thấy thông tin công ty"}
            </ErrorText>
          ) : (
            <Row
              style={{
                background: "#f8f9fa",
                padding: "16px",
                borderRadius: "24px",
              }}
            >
              {/* Edit Button */}
              <Col span={24}>
                <EditButtonContainer>
                  <StyledEditButton
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={handleEditClick}
                    size="large"
                  >
                    Chỉnh sửa thông tin công ty
                  </StyledEditButton>
                </EditButtonContainer>
              </Col>

              {/* Basic Company Info */}
              <Col span={24}>
                {isLoadingCompany || isLoadingEmployer ? (
                  <Skeleton active paragraph={{ rows: 4 }} />
                ) : (
                  <CompanyBasicInfo company={company} role={"employer"} />
                )}
              </Col>

              {/* Tabs and Content */}
              <Col span={24}>
                {isLoadingCompany || isLoadingEmployer ? (
                  <Skeleton active paragraph={{ rows: 6 }} />
                ) : (
                  <CompanyInfo company={company} />
                )}
              </Col>
            </Row>
          )}
        </Col>
      </Row>

      {/* Edit Company Modal */}
      <Modal
        title="Chỉnh sửa thông tin công ty"
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        width={900}
        footer={null}
        centered
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubmit}
          style={{ maxHeight: "70vh", overflowY: "auto", padding: "0 8px" }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Tên công ty"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên công ty!" },
                ]}
              >
                <Input placeholder="Nhập tên công ty" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Lĩnh vực công ty"
                name="company_industry_id"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn lĩnh vực công ty!",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn hoặc tìm kiếm lĩnh vực công ty"
                  showSearch
                  filterOption={(input, option) =>
                    option?.children
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  loading={isLoadingIndustries}
                >
                  {companyIndustries?.map((industry) => (
                    <Option key={industry._id} value={industry._id}>
                      {industry.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Website" name="website_url">
                <Input placeholder="Nhập địa chỉ website" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Số nhân viên tối thiểu" name="min_size">
                <InputNumber
                  placeholder="Số nhân viên tối thiểu"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Số nhân viên tối đa" name="max_size">
                <InputNumber
                  placeholder="Số nhân viên tối đa"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Địa chỉ" name="address">
                <Input placeholder="Nhập địa chỉ công ty" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Tỉnh/Thành phố"
                name="province_id"
                rules={[
                  { required: true, message: "Vui lòng chọn tỉnh/thành phố!" },
                ]}
              >
                <Select
                  placeholder="Chọn hoặc tìm kiếm tỉnh/thành phố"
                  showSearch
                  filterOption={(input, option) =>
                    option?.children
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  loading={isLoadingProvinces}
                >
                  {provinces.map((province) => (
                    <Option key={province.id} value={province.id}>
                      {province.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Giới thiệu công ty" name="introduction">
                <TextArea rows={4} placeholder="Nhập giới thiệu về công ty" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Hoạt động kinh doanh" name="businessOperations">
                <Select
                  mode="tags"
                  placeholder="Nhập các hoạt động kinh doanh"
                  style={{ width: "100%" }}
                ></Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Quy định công ty" name="regulations">
                <Select
                  mode="tags"
                  placeholder="Nhập các quy định của công ty"
                  style={{ width: "100%" }}
                ></Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Phúc lợi" name="benefits">
                <Select
                  mode="tags"
                  placeholder="Nhập các phúc lợi của công ty"
                  style={{ width: "100%" }}
                ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "right", marginTop: 24 }}>
            <Button
              onClick={handleEditCancel}
              style={{ marginRight: 8 }}
              disabled={updateCompanyMutation.isLoading}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateCompanyMutation.isLoading}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </StyledLayout>
  );
};

export default CompanyDetailEmployerPage;
