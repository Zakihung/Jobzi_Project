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

const { Title, Text } = Typography;
const { Option } = Select;

const jobTypeOptions = ["Toàn thời gian", "Bán thời gian", "Thực tập"];
const positionOptions = [
  "Lập trình viên",
  "Kỹ sư phần mềm",
  "Quản lý dự án",
  "Nhà phân tích dữ liệu",
];
const cityOptions = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"];
const predefinedSalaryOptions = [
  "Dưới 10 triệu",
  "10-15 triệu",
  "15-20 triệu",
  "Trên 20 triệu",
];

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

const JobExpectation = ({ sectionRefs, addSection, removeSection }) => {
  const { message } = App.useApp();
  const [jobExpectations, setJobExpectations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSalaryModalVisible, setIsSalaryModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [salaryType, setSalaryType] = useState(null);
  const [form] = Form.useForm();
  const [salaryForm] = Form.useForm();

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
    form.setFieldsValue(jobExpectations[index]);
    setIsAdding(false);
    setEditingIndex(index);
    setIsModalVisible(true);
  };

  const showSalaryModal = () => {
    salaryForm.resetFields();
    setSalaryType(null);
    setIsSalaryModalVisible(true);
  };

  const handleSalaryOk = () => {
    salaryForm.validateFields().then((values) => {
      if (values.salaryType === "custom") {
        if (parseFloat(values.maxSalary) <= parseFloat(values.minSalary)) {
          message.error("Lương tối đa phải lớn hơn lương tối thiểu.");
          return;
        }
      }
      let salary;
      if (values.salaryType === "predefined") {
        salary = values.predefinedSalary;
      } else {
        salary = `${values.minSalary} - ${values.maxSalary} triệu`;
      }
      form.setFieldsValue({ salary });
      setIsSalaryModalVisible(false);
    });
  };

  const handleSalaryCancel = () => {
    setIsSalaryModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingIndex !== null) {
        const updatedExpectations = [...jobExpectations];
        updatedExpectations[editingIndex] = values;
        setJobExpectations(updatedExpectations);
        message.success("Đã cập nhật mong muốn tìm việc.");
        setIsModalVisible(false);
      } else {
        setJobExpectations([...jobExpectations, values]);
        message.success("Đã thêm mong muốn tìm việc.");
        setIsAdding(false);
        addSection("Mong muốn tìm việc");
      }
      form.resetFields();
      setEditingIndex(null);
      scrollTo();
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
    const updatedExpectations = jobExpectations.filter((_, i) => i !== index);
    setJobExpectations(updatedExpectations);
    message.success("Đã xóa mong muốn tìm việc.");

    if (updatedExpectations.length === 0) {
      removeSection("Mong muốn tìm việc");
    }
  };

  return (
    <Section ref={sectionRefs.jobExpectation}>
      <SectionTitle level={3}>
        Mong muốn tìm việc ({jobExpectations.length}/3)
      </SectionTitle>
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
              name="city"
              label="Địa điểm làm việc"
              rules={[{ required: true, message: "Vui lòng chọn địa điểm" }]}
            >
              <Select placeholder="Chọn tỉnh/thành phố làm việc">
                {cityOptions.map((city) => (
                  <Option key={city} value={city}>
                    {city}
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
                    {item.jobType} • {item.salary} • {item.city}
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
            name="city"
            label="Địa điểm làm việc"
            rules={[{ required: true, message: "Vui lòng chọn địa điểm" }]}
          >
            <Select placeholder="Chọn tỉnh/thành phố làm việc">
              {cityOptions.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Chọn mức lương"
        open={isSalaryModalVisible}
        onOk={handleSalaryOk}
        onCancel={handleSalaryCancel}
        okText="Lưu"
        cancelText="Hủy"
        width={500}
        centered
      >
        <Form form={salaryForm} layout="vertical">
          <Form.Item
            name="salaryType"
            label="Loại mức lương"
            rules={[
              { required: true, message: "Vui lòng chọn loại mức lương" },
            ]}
          >
            <Radio.Group onChange={(e) => setSalaryType(e.target.value)}>
              <Radio value="predefined">Mức lương có sẵn</Radio>
              <Radio value="custom">Nhập khoảng lương</Radio>
            </Radio.Group>
          </Form.Item>
          {salaryType === "predefined" && (
            <Form.Item
              name="predefinedSalary"
              label="Mức lương"
              rules={[{ required: true, message: "Vui lòng chọn mức lương" }]}
            >
              <Select placeholder="Chọn mức lương có sẵn">
                {predefinedSalaryOptions.map((salary) => (
                  <Option key={salary} value={salary}>
                    {salary}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {salaryType === "custom" && (
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
