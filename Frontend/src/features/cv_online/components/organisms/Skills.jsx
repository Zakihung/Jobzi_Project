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
  Radio,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title, Text } = Typography;

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

const SkillCard = styled.div`
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e8e8e8;
  padding: 12px;
  margin-bottom: 16px;
  position: relative;
`;

const SkillTitle = styled(Title)`
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

const Skills = ({ addSection, removeSection, sectionRefs }) => {
  const { message } = App.useApp();
  const [skillList, setSkillList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form] = Form.useForm();

  const experienceOptions = Array.from(
    { length: 10 },
    (_, i) => `${i + 1} năm`
  ).concat("Trên 10 năm kinh nghiệm");

  const proficiencyOptions = [
    { label: "Cơ bản", value: "Cơ bản" },
    { label: "Độc lập", value: "Độc lập" },
    { label: "Thành thạo", value: "Thành thạo" },
  ];

  const scrollTo = () => {
    const element = sectionRefs.skills?.current;
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
    form.setFieldsValue(skillList[index]);
    setIsAdding(false);
    setEditingIndex(index);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingIndex !== null) {
        const updatedSkills = [...skillList];
        updatedSkills[editingIndex] = values;
        setSkillList(updatedSkills);
        message.success("Đã cập nhật kỹ năng.");
        setIsModalVisible(false);
      } else {
        setSkillList([...skillList, values]);
        message.success("Đã thêm kỹ năng.");
        setIsAdding(false);
        addSection("Năng lực chuyên môn");
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
    const updatedSkills = skillList.filter((_, i) => i !== index);
    setSkillList(updatedSkills);
    message.success("Đã xóa kỹ năng.");

    if (updatedSkills.length === 0) {
      removeSection("Năng lực chuyên môn");
    }
  };

  return (
    <Section ref={sectionRefs.skills}>
      <SectionTitle level={3}>Năng lực chuyên môn</SectionTitle>
      <AddButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={showForm}
        disabled={isAdding}
      >
        Thêm kỹ năng
      </AddButton>

      {isAdding && (
        <FormContainer>
          <Form form={form} layout="vertical" onFinish={handleOk}>
            <Form.Item
              name="skillName"
              label="Tên kỹ năng"
              rules={[{ required: true, message: "Vui lòng nhập tên kỹ năng" }]}
            >
              <Input placeholder="VD: Lập trình JavaScript" />
            </Form.Item>

            <Form.Item
              name="experience"
              label="Thời gian sử dụng"
              rules={[
                { required: true, message: "Vui lòng chọn thời gian sử dụng" },
              ]}
            >
              <Select placeholder="Chọn thời gian">
                {experienceOptions.map((exp) => (
                  <Select.Option key={exp} value={exp}>
                    {exp}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="proficiency"
              label="Mức độ thành thạo"
              rules={[
                { required: true, message: "Vui lòng chọn mức độ thành thạo" },
              ]}
            >
              <Radio.Group options={proficiencyOptions} />
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

      {skillList.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {skillList.map((item, index) => (
            <SkillCard key={index}>
              <Row>
                <Col span={20}>
                  <SkillTitle level={4}>{item.skillName}</SkillTitle>
                  <InfoItem>Thời gian sử dụng: {item.experience}</InfoItem>
                  <InfoItem>Mức độ thành thạo: {item.proficiency}</InfoItem>
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
            </SkillCard>
          ))}
        </div>
      )}

      <Modal
        title="Chỉnh sửa kỹ năng"
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
            name="skillName"
            label="Tên kỹ năng"
            rules={[{ required: true, message: "Vui lòng nhập tên kỹ năng" }]}
          >
            <Input placeholder="VD: Lập trình JavaScript" />
          </Form.Item>

          <Form.Item
            name="experience"
            label="Thời gian sử dụng"
            rules={[
              { required: true, message: "Vui lòng chọn thời gian sử dụng" },
            ]}
          >
            <Select placeholder="Chọn thời gian">
              {experienceOptions.map((exp) => (
                <Select.Option key={exp} value={exp}>
                  {exp}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="proficiency"
            label="Mức độ thành thạo"
            rules={[
              { required: true, message: "Vui lòng chọn mức độ thành thạo" },
            ]}
          >
            <Radio.Group options={proficiencyOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </Section>
  );
};

export default Skills;
