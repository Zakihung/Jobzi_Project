import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Typography,
  Card,
  App,
  Row,
  Col,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

import useAddItemToArray from "../../hooks/useAddItemToArray";
import useUpdateItemInArray from "../../hooks/useUpdateItemInArray";
import useDeleteItemInArray from "../../hooks/useDeleteItemInArray";

const { Title, Text } = Typography;
const { Option } = Select;

const jobTypeOptions = ["Toàn thời gian", "Bán thời gian", "Thực tập"];
const positionOptions = [
  "Lập trình viên",
  "Kỹ sư phần mềm",
  "Quản lý dự án",
  "Nhà phân tích dữ liệu",
];
const provinceOptions = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"];

// Styled Components
const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 24px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;
`;

const AddButton = styled(Button)`
  background: #577cf6;
  border-radius: 8px;
  font-weight: 500;
  height: 36px;
  padding: 0 16px;

  &:disabled {
    background: #f0f0f0;
    border-color: #f0f0f0;
    color: #666;
    cursor: not-allowed;

    &:hover {
      background: #f0f0f0;
    }
  }

  &:hover {
    background: #4c6ef5;
  }
`;

const JobExpectationCard = styled(Card)`
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e8e8e8;
  padding: 12px;
  margin-bottom: 16px;
  position: relative;
`;

const PositionTitle = styled(Title)`
  font-size: 18px !important;
  font-weight: 600 !important;
  margin-bottom: 8px !important;
  color: #262626 !important;
`;

const InfoItem = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #595959;
  margin-bottom: 8px;
`;

const ActionButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;
  position: absolute;
  top: 16px;

  &.edit-btn {
    color: #1890ff;
    border-color: #1890ff;
    right: 60px;

    &:hover {
      color: #1890ff !important;
      border-color: #1890ff !important;
      background: #e6f7ff !important;
    }
  }

  &.delete-btn {
    color: #ff4d4f;
    border-color: #ff4d4f;
    right: 16px;

    &:hover {
      color: #ff4d4f !important;
      border-color: #ff4d4f !important;
      background: #fff2f0 !important;
    }
  }
`;

const FormContainer = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
`;

const JobExpectation = ({
  sectionRefs,
  addSection,
  removeSection,
  candidateId,
  resume,
}) => {
  const { message } = App.useApp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSalaryModalVisible, setIsSalaryModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [salaryType, setSalaryType] = useState(null);
  const [form] = Form.useForm();
  const [salaryForm] = Form.useForm();

  const jobExpectations = resume?.jobExpectations || [];

  // Mutations
  const addItemMutation = useAddItemToArray(candidateId);
  const updateItemMutation = useUpdateItemInArray(candidateId);
  const deleteItemMutation = useDeleteItemInArray(candidateId);

  const showForm = () => {
    if (jobExpectations.length >= 3) {
      message.warning("Bạn chỉ có thể thêm tối đa 3 mong muốn tìm việc.");
      return;
    }
    form.resetFields();
    setIsAdding(true);
  };

  const scrollTo = () => {
    const element = sectionRefs.jobExpectation?.current;
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const showEditModal = (index) => {
    const item = jobExpectations[index];
    let salary;
    if (item.salary_type === "Khoảng lương") {
      salary = `${item.min_salary_range} - ${item.max_salary_range} triệu`;
    } else {
      salary = item.salary_type;
    }
    form.setFieldsValue({ ...item, salary });
    setIsAdding(false);
    setEditingIndex(index);
    setIsModalVisible(true);
  };

  const showSalaryModal = () => {
    const currentValues = form.getFieldsValue([
      "salary_type",
      "min_salary_range",
      "max_salary_range",
    ]);

    const { salary_type, min_salary_range, max_salary_range } = currentValues;

    salaryForm.setFieldsValue({
      salaryType: salary_type || "Thỏa thuận",
      minSalary: min_salary_range || undefined,
      maxSalary: max_salary_range || undefined,
    });

    setSalaryType(salary_type || "Thỏa thuận");
    setIsSalaryModalVisible(true);
  };

  const handleSalaryOk = () => {
    salaryForm.validateFields().then((values) => {
      if (values.salaryType === "Khoảng lương") {
        if (parseFloat(values.maxSalary) <= parseFloat(values.minSalary)) {
          message.error("Lương tối đa phải lớn hơn lương tối thiểu.");
          return;
        }
        const salary = `${values.minSalary} - ${values.maxSalary} triệu`;
        form.setFieldsValue({
          salary,
          salary_type: "Khoảng lương",
          min_salary_range: parseFloat(values.minSalary),
          max_salary_range: parseFloat(values.maxSalary),
        });
      } else {
        form.setFieldsValue({
          salary: "Thỏa thuận",
          salary_type: "Thỏa thuận",
          min_salary_range: 0,
          max_salary_range: 0,
        });
      }
      setIsSalaryModalVisible(false);
    });
  };

  const handleSalaryCancel = () => {
    setIsSalaryModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const salary_type = form.getFieldValue("salary_type") || "Thỏa thuận";
      const min_salary_range = form.getFieldValue("min_salary_range") || 0;
      const max_salary_range = form.getFieldValue("max_salary_range") || 0;

      const item = {
        jobType: values.jobType,
        position: values.position,
        province: values.province,
        salary_type,
        min_salary_range,
        max_salary_range,
      };

      if (editingIndex !== null) {
        updateItemMutation.mutate(
          { field: "jobExpectations", index: editingIndex, item },
          {
            onSuccess: () => {
              message.success("Đã cập nhật mong muốn tìm việc.");
              setIsModalVisible(false);
              setEditingIndex(null);
              form.resetFields();
              scrollTo();
            },
            // onError: (error) => {
            //   message.error(error.message || "Cập nhật thất bại.");
            // },
          }
        );
      } else {
        addItemMutation.mutate(
          { field: "jobExpectations", item },
          {
            onSuccess: () => {
              message.success("Đã thêm mong muốn tìm việc.");
              setIsAdding(false);
              addSection("Mong muốn tìm việc");
              form.resetFields();
              scrollTo();
            },
            // onError: (error) => {
            //   message.error(error.message || "Thêm thất bại.");
            // },
          }
        );
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAdding(false);
    form.resetFields();
    setEditingIndex(null);
    scrollTo();
  };

  const handleDelete = (index) => {
    deleteItemMutation.mutate(
      { field: "jobExpectations", index },
      {
        onSuccess: () => {
          message.success("Đã xóa mong muốn tìm việc.");
          if (jobExpectations.length - 1 === 0) {
            removeSection("Mong muốn tìm việc");
          }
        },
        onError: (error) => {
          message.error(error.message || "Xóa thất bại.");
        },
      }
    );
  };

  return (
    <Section ref={sectionRefs?.jobExpectation}>
      <SectionTitle level={3}>
        Mong muốn tìm việc ({jobExpectations.length}/3)
      </SectionTitle>
      {jobExpectations.length === 0 && (
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary" style={{ fontWeight: 500 }}>
            Trình bày hình thức làm việc, vị trí, mức lương mong muốn và địa
            điểm làm việc phù hợp.
          </Text>
        </div>
      )}
      {jobExpectations.length < 3 && (
        <AddButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={showForm}
          disabled={jobExpectations.length >= 3 || isAdding}
        >
          Thêm mong muốn
        </AddButton>
      )}

      {isAdding && (
        <FormContainer>
          <Form form={form} layout="vertical" onFinish={handleOk}>
            <Form.Item
              name="jobType"
              label="Hình thức làm việc"
              rules={[
                { required: true, message: "Vui lòng chọn hình thức làm việc" },
              ]}
            >
              <Radio.Group>
                {jobTypeOptions.map((type) => (
                  <Radio key={type} value={type}>
                    {type}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="position"
              label="Vị trí tuyển dụng"
              rules={[{ required: true, message: "Vui lòng chọn vị trí" }]}
            >
              <Select placeholder="Chọn vị trí tuyển dụng">
                {positionOptions.map((position) => (
                  <Option key={position} value={position}>
                    {position}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="salary"
              label="Mức lương"
              rules={[{ required: true, message: "Vui lòng chọn mức lương" }]}
            >
              <Input
                placeholder="Nhấp để chọn mức lương"
                onClick={showSalaryModal}
                readOnly
              />
            </Form.Item>
            <Form.Item
              name="province"
              label="Địa điểm làm việc"
              rules={[{ required: true, message: "Vui lòng chọn địa điểm" }]}
            >
              <Select placeholder="Chọn tỉnh/thành phố làm việc">
                {provinceOptions.map((province) => (
                  <Option key={province} value={province}>
                    {province}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button onClick={handleCancel} style={{ width: "5rem" }}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "1rem", width: "5rem" }}
              >
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </FormContainer>
      )}

      {jobExpectations.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {jobExpectations.map((item, index) => (
            <JobExpectationCard key={index}>
              <Row>
                <Col span={20}>
                  <PositionTitle level={4}>{item.position}</PositionTitle>
                  <InfoItem>
                    {item.jobType} •{" "}
                    {item.salary_type === "Thỏa thuận" ? (
                      item.salary_type
                    ) : (
                      <>
                        {item.min_salary_range} - {item.max_salary_range} triệu
                      </>
                    )}{" "}
                    • {item.province}
                  </InfoItem>
                </Col>
                <Col span={4}>
                  <ActionButton
                    className="edit-btn"
                    icon={<EditOutlined />}
                    onClick={() => showEditModal(index)}
                  />
                  <ActionButton
                    className="delete-btn"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(index)}
                  />
                </Col>
              </Row>
            </JobExpectationCard>
          ))}
        </div>
      )}

      <Modal
        title="Chỉnh sửa mong muốn"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="jobType"
            label="Hình thức làm việc"
            rules={[
              { required: true, message: "Vui lòng chọn hình thức làm việc" },
            ]}
          >
            <Radio.Group>
              {jobTypeOptions.map((type) => (
                <Radio key={type} value={type}>
                  {type}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="position"
            label="Vị trí tuyển dụng"
            rules={[{ required: true, message: "Vui lòng chọn vị trí" }]}
          >
            <Select placeholder="Chọn vị trí tuyển dụng">
              {positionOptions.map((position) => (
                <Option key={position} value={position}>
                  {position}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="salary_type"
            label="Loại lương"
            rules={[{ required: true, message: "Vui lòng chọn loại lương" }]}
          >
            <Input
              placeholder="Nhấp để chọn loại lương"
              onClick={showSalaryModal}
              readOnly
            />
          </Form.Item>
          <Form.Item
            name="province"
            label="Địa điểm làm việc"
            rules={[{ required: true, message: "Vui lòng chọn địa điểm" }]}
          >
            <Select placeholder="Chọn tỉnh/thành phố làm việc">
              {provinceOptions.map((province) => (
                <Option key={province} value={province}>
                  {province}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Chọn loại lương"
        open={isSalaryModalVisible}
        onOk={handleSalaryOk}
        onCancel={handleSalaryCancel}
        okText="Lưu"
        cancelText="Hủy"
        width={500}
        centered
        zIndex={2000}
      >
        <Form form={salaryForm} layout="vertical">
          <Form.Item
            name="salaryType"
            label="Loại lương"
            rules={[{ required: true, message: "Vui lòng chọn loại lương" }]}
          >
            <Radio.Group onChange={(e) => setSalaryType(e.target.value)}>
              <Radio value="Thỏa thuận">Thỏa thuận</Radio>
              <Radio value="Khoảng lương">Khoảng lương</Radio>
            </Radio.Group>
          </Form.Item>
          {salaryType === "Thỏa thuận" && <></>}
          {salaryType === "Khoảng lương" && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="minSalary"
                  label="Lương tối thiểu (triệu)"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập lương tối thiểu",
                    },
                    {
                      type: "number",
                      min: 0.1,
                      message: "Lương phải lớn hơn 0",
                    },
                  ]}
                  getValueFromEvent={(e) => parseFloat(e.target.value)}
                >
                  <Input type="number" placeholder="VD: 10" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="maxSalary"
                  label="Lương tối đa (triệu)"
                  rules={[
                    { required: true, message: "Vui lòng nhập lương tối đa" },
                    {
                      type: "number",
                      min: 0.1,
                      message: "Lương phải lớn hơn 0",
                    },
                  ]}
                  getValueFromEvent={(e) => parseFloat(e.target.value)}
                >
                  <Input type="number" placeholder="VD: 20" />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </Modal>
    </Section>
  );
};

export default JobExpectation;
