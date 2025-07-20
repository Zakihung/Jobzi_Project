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

const ProjectCard = styled.div`
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e8e8e8;
  padding: 12px;
  margin-bottom: 16px;
  position: relative;
`;

const ProjectTitle = styled(Title)`
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

const Projects = ({
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

  const projectList = resume?.projects || [];

  // Mutations
  const addItemMutation = useAddItemToArray(candidateId);
  const updateItemMutation = useUpdateItemInArray(candidateId);
  const deleteItemMutation = useDeleteItemInArray(candidateId);

  const scrollTo = () => {
    const element = sectionRefs.projects?.current;
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
    const selected = projectList[index];
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
        projectName: values.projectName,
        role: values.role,
        projectLink: values.projectLink,
        startMonth: values.startMonth,
        startYear: values.startYear,
        endMonth: values.endMonth,
        endYear: values.endYear,
        description: values.description,
      };

      if (editingIndex !== null) {
        updateItemMutation.mutate(
          { field: "projects", index: editingIndex, item },
          {
            onSuccess: () => {
              message.success("Đã cập nhật dự án.");
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
          { field: "projects", item },
          {
            onSuccess: () => {
              message.success("Đã thêm dự án.");
              setIsAdding(false);
              addSection("Kinh nghiệm dự án");
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
      { field: "projects", index },
      {
        onSuccess: () => {
          message.success("Đã xóa dự án.");
          if (projectList.length - 1 === 0) {
            removeSection("Kinh nghiệm dự án");
          }
        },
        onError: (error) => {
          message.error(error.message || "Xóa thất bại.");
        },
      }
    );
  };

  return (
    <Section ref={sectionRefs.projects}>
      <SectionTitle level={3}>Kinh nghiệm dự án</SectionTitle>
      <AddButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={showForm}
        disabled={isAdding}
      >
        Thêm dự án
      </AddButton>

      {isAdding && (
        <FormContainer>
          <Form form={form} layout="vertical" onFinish={handleOk}>
            <Form.Item
              name="projectName"
              label="Tên dự án"
              rules={[{ required: true, message: "Vui lòng nhập tên dự án" }]}
            >
              <Input placeholder="VD: Hệ thống quản lý khách hàng" />
            </Form.Item>

            <Form.Item
              name="role"
              label="Vai trò đảm nhận"
              rules={[{ required: true, message: "Vui lòng nhập vai trò" }]}
            >
              <Input placeholder="VD: Lập trình viên chính" />
            </Form.Item>

            <Form.Item
              name="projectLink"
              label="Link dự án"
              rules={[
                { type: "url", message: "Vui lòng nhập URL hợp lệ" },
                { required: false },
              ]}
            >
              <Input placeholder="VD: https://example.com/project" />
            </Form.Item>

            <Form.Item label="Thời gian tham gia dự án" required>
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
              label="Mô tả dự án"
              rules={[{ required: true, message: "Vui lòng nhập mô tả dự án" }]}
            >
              <TextArea
                rows={4}
                placeholder="VD: Phát triển hệ thống CRM sử dụng React và Node.js"
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

      {projectList.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {projectList.map((item, index) => (
            <ProjectCard key={index}>
              <Row>
                <Col span={20}>
                  <ProjectTitle level={4}>{item.projectName}</ProjectTitle>
                  <InfoItem>Vai trò: {item.role}</InfoItem>
                  {item.projectLink && (
                    <InfoItem>
                      <a
                        href={item.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.projectLink}
                      </a>
                    </InfoItem>
                  )}
                  <InfoItem>
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
            </ProjectCard>
          ))}
        </div>
      )}

      <Modal
        title="Chỉnh sửa dự án"
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
            name="projectName"
            label="Tên dự án"
            rules={[{ required: true, message: "Vui lòng nhập tên dự án" }]}
          >
            <Input placeholder="VD: Hệ thống quản lý khách hàng" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai trò đảm nhận"
            rules={[{ required: true, message: "Vui lòng nhập vai trò" }]}
          >
            <Input placeholder="VD: Lập trình viên chính" />
          </Form.Item>

          <Form.Item
            name="projectLink"
            label="Link dự án"
            rules={[
              { type: "url", message: "Vui lòng nhập URL hợp lệ" },
              { required: false },
            ]}
          >
            <Input placeholder="VD: https://example.com/project" />
          </Form.Item>

          <Form.Item label="Thời gian tham gia dự án" required>
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
            label="Mô tả dự án"
            rules={[{ required: true, message: "Vui lòng nhập mô tả dự án" }]}
          >
            <TextArea
              rows={4}
              placeholder="VD: Phát triển hệ thống CRM sử dụng React và Node.js"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Section>
  );
};

export default Projects;
