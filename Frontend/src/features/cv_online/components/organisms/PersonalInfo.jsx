import React, { useState } from "react";
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Typography,
  Divider,
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  CalendarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Title, Text } = Typography;

// Styled Components
const Section = styled.div`
  margin-bottom: 0px;
`;

const SectionTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 24px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
  margin-bottom: 16px;
`;

const InfoRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 16px;
`;

const NameAndStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EditButton = styled(Button)`
  background: #577cf6;
  border-radius: 12px;
  font-weight: 600;
  height: 40px;
  padding: 0 20px;

  &:hover {
    background: #4c6ef5;
    box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
  }
`;

const InfoGrid = styled(Row)`
  margin-top: 16px;
`;

const InfoItem = styled(Col)`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const InfoIcon = styled.div`
  font-size: 20px;
  color: #577cf6;
  background: rgba(87, 124, 246, 0.1);
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const InfoTitle = styled(Text)`
  font-weight: 600;
  font-size: 13px;
  color: #999;
`;

const InfoValue = styled(Text)`
  font-size: 15px;
  color: #333;
`;

const PersonalInfo = ({ personalInfo, setPersonalInfo, sectionRefs }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showEditModal = () => {
    form.setFieldsValue(personalInfo);
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    form.validateFields().then((values) => {
      setPersonalInfo(values);
      setIsEditModalVisible(false);
    });
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  return (
    <Section ref={sectionRefs.personalInfo}>
      <SectionTitle level={3}>Thông tin cá nhân</SectionTitle>

      {/* Hàng 1 */}
      <TopRow>
        <AvatarContainer>
          <Avatar size={80} src={personalInfo.avatar} icon={<UserOutlined />} />
        </AvatarContainer>

        <InfoRight>
          <NameAndStatus>
            <Title level={4} style={{ marginBottom: 4 }}>
              {personalInfo.fullName}
            </Title>
            <Text type="secondary" style={{ fontWeight: 500 }}>
              Trạng thái: {personalInfo.jobStatus}
            </Text>
          </NameAndStatus>

          <EditButton
            type="primary"
            icon={<EditOutlined />}
            onClick={showEditModal}
          >
            Chỉnh sửa
          </EditButton>
        </InfoRight>
      </TopRow>

      {/* Dấu phân cách */}
      <Divider />

      {/* Hàng 2 */}
      <InfoGrid gutter={[24, 16]}>
        <InfoItem span={12}>
          <InfoIcon>
            <PhoneOutlined />
          </InfoIcon>
          <InfoContent>
            <InfoTitle>Số điện thoại</InfoTitle>
            <InfoValue>{personalInfo.phone}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem span={12}>
          <InfoIcon>
            <CalendarOutlined />
          </InfoIcon>
          <InfoContent>
            <InfoTitle>Tuổi</InfoTitle>
            <InfoValue>{personalInfo.age}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem span={12}>
          <InfoIcon>
            <MailOutlined />
          </InfoIcon>
          <InfoContent>
            <InfoTitle>Email</InfoTitle>
            <InfoValue>{personalInfo.email}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem span={12}>
          <InfoIcon>
            <MailOutlined />
          </InfoIcon>
          <InfoContent>
            <InfoTitle>Địa chỉ</InfoTitle>
            <InfoValue>
              {personalInfo.address ? personalInfo.address : "---"}
            </InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem span={12}>
          <InfoIcon>
            <MessageOutlined />
          </InfoIcon>
          <InfoContent>
            <InfoTitle>Zalo</InfoTitle>
            <InfoValue>
              {personalInfo.zalo ? personalInfo.zalo : "---"}
            </InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem span={12}>
          <InfoIcon>
            <FacebookOutlined />
          </InfoIcon>
          <InfoContent>
            <InfoTitle>Facebook</InfoTitle>
            <InfoValue>
              {personalInfo.facebook ? personalInfo.facebook : "---"}
            </InfoValue>
          </InfoContent>
        </InfoItem>
        <InfoItem span={12} />
      </InfoGrid>

      {/* Modal chỉnh sửa */}
      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        open={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Lưu"
        cancelText="Hủy"
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Tuổi" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="zalo" label="Zalo">
            <Input />
          </Form.Item>
          <Form.Item name="facebook" label="Facebook">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Section>
  );
};

export default PersonalInfo;
