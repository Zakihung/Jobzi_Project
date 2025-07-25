import React, { useState } from "react";
import {
  Button,
  Typography,
  Form,
  Input,
  Modal,
  Row,
  Col,
  App,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

import useAddItemToArray from "../../hooks/useAddItemToArray";
import useUpdateItemInArray from "../../hooks/useUpdateItemInArray";
import useDeleteItemInArray from "../../hooks/useDeleteItemInArray";

const { Title, Text } = Typography;
const { TextArea } = Input;

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

const WorkExperienceCard = styled.div`
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

const WorkExperience = ({
  addSection,
  removeSection,
  sectionRefs,
  candidateId,
  resume,
}) => {
  const { message } = App.useApp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form] = Form.useForm();

  const workExperienceList = resume?.workExperience || [];

  // Mutations
  const addItemMutation = useAddItemToArray(candidateId);
  const updateItemMutation = useUpdateItemInArray(candidateId);
  const deleteItemMutation = useDeleteItemInArray(candidateId);

  const scrollTo = () => {
    const element = sectionRefs.workExperience?.current;
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const showForm = () => {
    form.resetFields();
    setIsAdding(true);
  };

  const showEditModal = (index) => {
    const selected = workExperienceList[index];
    form.setFieldsValue({
      ...selected,
      startMonth: Number(selected.startMonth),
      startYear: Number(selected.startYear),
      endMonth: Number(selected.endMonth),
      endYear: Number(selected.endYear),
    });
    setIsAdding(false);
    setEditingIndex(index);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (
        values.endYear < values.startYear ||
        (values.endYear === values.startYear &&
          values.endMonth <= values.startMonth)
      ) {
        message.error("Thời gian kết thúc phải lớn hơn thời gian bắt đầu.");
        return;
      }
      const item = {
        company: values.company,
        position: values.position,
        industry: values.industry,
        startMonth: values.startMonth,
        startYear: values.startYear,
        endMonth: values.endMonth,
        endYear: values.endYear,
        description: values.description,
      };

      if (editingIndex !== null) {
        updateItemMutation.mutate(
          { field: "workExperience", index: editingIndex, item },
          {
            onSuccess: () => {
              message.success("Đã cập nhật kinh nghiệm làm việc.");
              setIsModalVisible(false);
              setEditingIndex(null);
              form.resetFields();
              scrollTo();
            },
            onError: (error) => {
              message.error(error.message || "Cập nhật thất bại.");
            },
          }
        );
      } else {
        addItemMutation.mutate(
          { field: "workExperience", item },
          {
            onSuccess: () => {
              message.success("Đã thêm kinh nghiệm làm việc.");
              setIsAdding(false);
              addSection("Kinh nghiệm làm việc");
              form.resetFields();
              scrollTo();
            },
            onError: (error) => {
              message.error(error.message || "Thêm thất bại.");
            },
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
      { field: "workExperience", index },
      {
        onSuccess: () => {
          message.success("Đã xóa kinh nghiệm làm việc.");
          if (workExperienceList.length - 1 === 0) {
            removeSection("Kinh nghiệm làm việc");
          }
        },
        onError: (error) => {
          message.error(error.message || "Xóa thất bại.");
        },
      }
    );
  };

  return (
    <Section ref={sectionRefs.workExperience}>
      <SectionTitle level={3}>Kinh nghiệm làm việc</SectionTitle>
      {workExperienceList.length === 0 && (
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary" style={{ fontWeight: 500 }}>
            Chi tiết kinh nghiệm làm việc là thông tin nhà tuyển dụng quan tâm
            nhất
          </Text>
        </div>
      )}
      <AddButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={showForm}
        disabled={isAdding}
      >
        Thêm kinh nghiệm làm việc
      </AddButton>

      {isAdding && (
        <FormContainer>
          <Form form={form} layout="vertical" onFinish={handleOk}>
            <Form.Item
              name="company"
              label="Tên công ty"
              rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
            >
              <Input placeholder="VD: Trung tâm CNPM Đại học Cần Thơ" />
            </Form.Item>

            <Form.Item
              name="position"
              label="Vị trí công việc"
              rules={[
                { required: true, message: "Vui lòng nhập vị trí công việc" },
              ]}
            >
              <Input placeholder="VD: Kỹ sư phần mềm" />
            </Form.Item>

            <Form.Item
              name="industry"
              label="Ngành nghề"
              rules={[{ required: true, message: "Vui lòng nhập ngành nghề" }]}
            >
              <Input placeholder="VD: Công nghệ thông tin" />
            </Form.Item>

            <Form.Item label="Thời gian tại chức" required>
              <Row gutter={8}>
                <Col span={5}>
                  <Form.Item
                    name="startMonth"
                    noStyle
                    rules={[{ required: true, message: "Chọn tháng bắt đầu" }]}
                  >
                    <Select placeholder="Tháng bắt đầu">
                      {Array.from({ length: 12 }, (_, i) => (
                        <Select.Option key={i + 1} value={i + 1}>
                          Tháng {i + 1}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="startYear"
                    noStyle
                    rules={[{ required: true, message: "Nhập năm bắt đầu" }]}
                    getValueFromEvent={(e) => parseInt(e.target.value)}
                  >
                    <Input type="number" placeholder="Năm bắt đầu" />
                  </Form.Item>
                </Col>
                <Col span={2} style={{ textAlign: "center" }}>
                  -
                </Col>
                <Col span={5}>
                  <Form.Item
                    name="endMonth"
                    noStyle
                    rules={[{ required: true, message: "Chọn tháng kết thúc" }]}
                  >
                    <Select placeholder="Tháng kết thúc">
                      {Array.from({ length: 12 }, (_, i) => (
                        <Select.Option key={i + 1} value={i + 1}>
                          Tháng {i + 1}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="endYear"
                    noStyle
                    rules={[{ required: true, message: "Nhập năm kết thúc" }]}
                    getValueFromEvent={(e) => parseInt(e.target.value)}
                  >
                    <Input type="number" placeholder="Năm kết thúc" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả công việc"
              rules={[
                { required: true, message: "Vui lòng nhập mô tả công việc" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="VD: Phát triển ứng dụng web sử dụng React"
              />
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

      {workExperienceList.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {workExperienceList.map((item, index) => (
            <WorkExperienceCard key={index}>
              <Row>
                <Col span={20}>
                  <PositionTitle level={4}>
                    {item.position} - {item.company}
                  </PositionTitle>
                  <InfoItem>
                    {item.industry} •{" "}
                    {`${item.startMonth.toString().padStart(2, "0")}/${
                      item.startYear
                    } - ${item.endMonth.toString().padStart(2, "0")}/${
                      item.endYear
                    }`}
                  </InfoItem>
                  <InfoItem>{item.description}</InfoItem>
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
            </WorkExperienceCard>
          ))}
        </div>
      )}

      <Modal
        title="Chỉnh sửa kinh nghiệm làm việc"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
        width={500}
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="company"
            label="Tên công ty"
            rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
          >
            <Input placeholder="VD: Công ty TNHH ABC" />
          </Form.Item>

          <Form.Item
            name="position"
            label="Vị trí công việc"
            rules={[
              { required: true, message: "Vui lòng nhập vị trí công việc" },
            ]}
          >
            <Input placeholder="VD: Kỹ sư phần mềm" />
          </Form.Item>

          <Form.Item
            name="industry"
            label="Ngành nghề"
            rules={[{ required: true, message: "Vui lòng nhập ngành nghề" }]}
          >
            <Input placeholder="VD: Công nghệ thông tin" />
          </Form.Item>

          <Form.Item label="Thời gian tại chức" required>
            <Row gutter={8}>
              <Col span={5}>
                <Form.Item
                  name="startMonth"
                  rules={[{ required: true, message: "Chọn tháng bắt đầu" }]}
                >
                  <Select placeholder="Tháng">
                    {Array.from({ length: 12 }, (_, i) => (
                      <Select.Option key={i + 1} value={i + 1}>
                        {i + 1}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="startYear"
                  rules={[{ required: true, message: "Nhập năm bắt đầu" }]}
                  getValueFromEvent={(e) => parseInt(e.target.value)}
                >
                  <Input type="number" placeholder="Năm bắt đầu" />
                </Form.Item>
              </Col>
              <Col span={2} style={{ textAlign: "center" }}>
                -
              </Col>
              <Col span={5}>
                <Form.Item
                  name="endMonth"
                  rules={[{ required: true, message: "Chọn tháng kết thúc" }]}
                >
                  <Select placeholder="Tháng">
                    {Array.from({ length: 12 }, (_, i) => (
                      <Select.Option key={i + 1} value={i + 1}>
                        {i + 1}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="endYear"
                  rules={[{ required: true, message: "Nhập năm kết thúc" }]}
                  getValueFromEvent={(e) => parseInt(e.target.value)}
                >
                  <Input type="number" placeholder="Năm kết thúc" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả công việc"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả công việc" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="VD: Phát triển ứng dụng web sử dụng React"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Section>
  );
};

export default WorkExperience;
