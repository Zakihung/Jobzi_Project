import React, { useState } from "react";
import { Button, Typography, Form, Input, Modal, App, Row, Col } from "antd";
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

const HighlightCard = styled.div`
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e8e8e8;
  padding: 12px;
  margin-bottom: 16px;
  position: relative;
`;

const HighlightTitle = styled(Title)`
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

const Highlights = ({
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

  const highlightsList = resume?.highlights || [];

  // Mutations
  const addItemMutation = useAddItemToArray(candidateId);
  const updateItemMutation = useUpdateItemInArray(candidateId);
  const deleteItemMutation = useDeleteItemInArray(candidateId);

  const scrollTo = () => {
    const element = sectionRefs.highlights?.current;
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const showForm = () => {
    form.resetFields();
    setIsAdding(true);
    setIsModalVisible(false);
  };

  const showEditModal = (index) => {
    const item = highlightsList[index];
    form.setFieldsValue(item);
    setIsAdding(false);
    setEditingIndex(index);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const item = { title: values.title, description: values.description };

      if (editingIndex !== null) {
        updateItemMutation.mutate(
          { field: "highlights", index: editingIndex, item },
          {
            onSuccess: () => {
              message.success("Đã cập nhật điểm nổi bật.");
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
          { field: "highlights", item },
          {
            onSuccess: () => {
              message.success("Đã thêm điểm nổi bật.");
              setIsAdding(false);
              addSection("Điểm nổi bật");
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
      { field: "highlights", index },
      {
        onSuccess: () => {
          message.success("Đã xóa điểm nổi bật.");
          if (highlightsList.length - 1 === 0) {
            removeSection("Điểm nổi bật");
          }
        },
        onError: (error) => {
          message.error(error.message || "Xóa thất bại.");
        },
      }
    );
  };

  return (
    <Section ref={sectionRefs.highlights}>
      <SectionTitle level={3}>Điểm nổi bật</SectionTitle>
      {highlightsList.length === 0 && (
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary" style={{ fontWeight: 500 }}>
            Sơ lược bản thân, nêu bật thành tựu và kỹ năng cốt lõi
          </Text>
        </div>
      )}
      <AddButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={showForm}
        disabled={isAdding}
      >
        Thêm điểm nổi bật
      </AddButton>

      {isAdding && (
        <FormContainer>
          <Form form={form} layout="vertical" onFinish={handleOk}>
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input placeholder="VD: Giải thưởng xuất sắc" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea
                rows={4}
                placeholder="VD: Nhận giải thưởng về lập trình năm 2023"
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

      {highlightsList.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {highlightsList.map((item, index) => (
            <HighlightCard key={index}>
              <Row>
                <Col span={20}>
                  <HighlightTitle level={4}>{item.title}</HighlightTitle>
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
            </HighlightCard>
          ))}
        </div>
      )}

      <Modal
        title={
          editingIndex !== null ? "Chỉnh sửa điểm nổi bật" : "Thêm điểm nổi bật"
        }
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
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input placeholder="VD: Giải thưởng xuất sắc" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea
              rows={4}
              placeholder="VD: Nhận giải thưởng về lập trình năm 2023"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Section>
  );
};

export default Highlights;
