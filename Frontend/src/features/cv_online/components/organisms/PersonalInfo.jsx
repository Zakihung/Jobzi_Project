import React, { useContext, useState } from "react";
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
  DatePicker,
  App,
  Upload,
  Image,
} from "antd";
import {
  EditOutlined,
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  CalendarOutlined,
  CameraOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import dayjs from "dayjs";
import useUpdateOnlineResume from "../../hooks/useUpdateOnlineResume";
import useUploadAvatar from "../../../auth/hooks/useUploadAvatar";
import { AuthContext } from "../../../../contexts/auth.context";
import useGetUserById from "../../../auth/hooks/useGetUserById";

const { Title, Text } = Typography;

// Styled Components
const Section = styled.div`
  margin-bottom: 24px;
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

const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
  margin-bottom: 16px;
  position: relative;
  &:hover ${AvatarOverlay} {
    opacity: 1;
  }
`;

const AvatarSpace = styled(Avatar)`
  cursor: pointer;
  border: 1px solid #577cf6;
  transition: all 0.3s ease;
  position: relative;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
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

const PersonalInfo = ({
  personalInfo,
  setPersonalInfo,
  sectionRefs,
  candidateId,
}) => {
  const { auth, setAuth } = useContext(AuthContext);
  const userId = auth?.user?.id;
  const { data: userData } = useGetUserById(userId);
  const { message } = App.useApp();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate, isLoading: isUpdating } = useUpdateOnlineResume(candidateId);

  const [isChangeAvatarModalVisible, setIsChangeAvatarModalVisible] =
    useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  // State mới cho preview avatar
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadAvatarMutation = useUploadAvatar();

  // Hàm xử lý khi chọn file để preview
  const handleFileSelect = (info) => {
    const { fileList } = info;

    if (fileList.length > 0) {
      const selectedFile = fileList[0];

      // Kiểm tra file có hợp lệ
      if (!selectedFile.originFileObj) {
        message.error("File không hợp lệ!");
        return;
      }

      // Kiểm tra loại file
      const isImage =
        selectedFile.type && selectedFile.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ được chọn file ảnh!");
        return;
      }

      // Kiểm tra kích thước file (giới hạn 5MB)
      const isLt5M = selectedFile.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Kích thước file phải nhỏ hơn 5MB!");
        return;
      }

      // Tạo URL để preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile.originFileObj);
      setSelectedFile(selectedFile.originFileObj);
    }
  };

  // Hàm xử lý upload avatar
  const handleAvatarUpload = () => {
    if (!selectedFile) {
      message.error("Vui lòng chọn ảnh trước khi tải lên!");
      return;
    }

    setIsUploadingAvatar(true);

    uploadAvatarMutation.mutate(
      {
        user_id: userData?._id,
        file: selectedFile,
      },
      {
        onSuccess: (response) => {
          // Cập nhật avatar trong context
          const avatarUrl =
            response?.data?.data?.avatar || response?.data?.avatar;
          if (avatarUrl) {
            setAuth({
              ...auth,
              user: { ...auth.user, avatar: avatarUrl },
            });
            // Reset modal state
            setIsUploadingAvatar(false);
            setIsChangeAvatarModalVisible(false);
            setPreviewImage(null);
            setSelectedFile(null);
            message.success("Đăng tải ảnh đại diện thành công!");
          } else {
            console.error("Unexpected API response structure:", response);
            message.error("Phản hồi từ server không đúng định dạng!");
          }
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message ||
              "Đã có lỗi xảy ra khi đăng tải ảnh đại diện!"
          );
          setIsUploadingAvatar(false);
        },
      }
    );
  };

  // Hàm reset modal avatar
  const handleCancelAvatarModal = () => {
    setIsChangeAvatarModalVisible(false);
    setPreviewImage(null);
    setSelectedFile(null);
  };

  // Hàm chuyển đổi date string sang dayjs object
  const parseDateToDayjs = (dateValue) => {
    if (!dateValue) return null;

    // Nếu đã là dayjs object
    if (dayjs.isDayjs(dateValue)) {
      return dateValue;
    }

    // Nếu là moment object (để tương thích ngược)
    if (
      dateValue &&
      typeof dateValue === "object" &&
      dateValue._isAMomentObject
    ) {
      return dayjs(dateValue.toISOString());
    }

    // Nếu là string, thử parse với nhiều format
    if (typeof dateValue === "string") {
      // Thử parse ISO format trước
      let parsed = dayjs(dateValue);
      if (parsed.isValid()) {
        return parsed;
      }

      // Thử các format khác
      const formats = ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"];
      for (const format of formats) {
        parsed = dayjs(dateValue, format);
        if (parsed.isValid()) {
          return parsed;
        }
      }
    }

    return null;
  };

  const showEditModal = () => {
    const dateOfBirth = parseDateToDayjs(personalInfo.date_of_birth);

    form.setFieldsValue({
      full_name: personalInfo.full_name,
      phone_number: personalInfo.phone_number,
      date_of_birth: dateOfBirth,
      email: personalInfo.email,
      address: personalInfo.address,
      zalo: personalInfo.zalo,
      facebook: personalInfo.facebook,
    });
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    form.validateFields().then((values) => {
      const updatedPersonalInfo = {
        full_name: values.full_name,
        phone_number: values.phone_number,
        date_of_birth: values.date_of_birth
          ? values.date_of_birth.format("YYYY-MM-DD")
          : "",
        email: personalInfo.email, // Không cập nhật email
        address: values.address || "",
        zalo: values.zalo || "",
        facebook: values.facebook || "",
        avatar: personalInfo.avatar || "",
      };

      mutate(
        { personalInfo: updatedPersonalInfo },
        {
          onSuccess: () => {
            setPersonalInfo({
              ...personalInfo,
              ...updatedPersonalInfo,
              jobStatus: personalInfo.jobStatus,
            });
            setIsEditModalVisible(false);
            message.success("Cập nhật thông tin cá nhân thành công");
          },
          onError: (error) => {
            message.error(
              error.message || "Cập nhật thông tin cá nhân thất bại"
            );
          },
        }
      );
    });
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const validateDateOfBirth = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Ngày sinh là bắt buộc"));
    }

    const dob = value.toDate(); // Chuyển từ dayjs -> Date
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age < 15) {
      return Promise.reject(new Error("Bạn phải từ 15 tuổi trở lên"));
    }

    if (age > 60) {
      return Promise.reject(new Error("Tuổi không được vượt quá 60"));
    }

    return Promise.resolve();
  };

  // Format date để hiển thị
  const formatDateForDisplay = (dateValue) => {
    if (!dateValue) return "---";

    const parsed = parseDateToDayjs(dateValue);
    return parsed ? parsed.format("DD/MM/YYYY") : "---";
  };

  return (
    <Section ref={sectionRefs.personalInfo}>
      <SectionTitle level={3}>Thông tin cá nhân</SectionTitle>

      {/* Hàng 1 */}
      <TopRow>
        <AvatarContainer>
          <AvatarSpace
            size={80}
            src={personalInfo.avatar}
            onClick={() => setIsChangeAvatarModalVisible(true)}
          />
          <AvatarOverlay onClick={() => setIsChangeAvatarModalVisible(true)}>
            <CameraOutlined style={{ color: "#fff", fontSize: "24px" }} />
          </AvatarOverlay>
        </AvatarContainer>

        <InfoRight>
          <NameAndStatus>
            <Title level={4} style={{ marginBottom: 4 }}>
              {personalInfo.full_name || "---"}
            </Title>
            <Text type="secondary" style={{ fontWeight: 500 }}>
              Trạng thái: {personalInfo.jobStatus || "---"}
            </Text>
          </NameAndStatus>

          <EditButton
            type="primary"
            icon={<EditOutlined />}
            onClick={showEditModal}
            loading={isUpdating}
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
            <InfoValue>{personalInfo.phone_number || "---"}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem span={12}>
          <InfoIcon>
            <CalendarOutlined />
          </InfoIcon>
          <InfoContent>
            <InfoTitle>Ngày sinh</InfoTitle>
            <InfoValue>
              {formatDateForDisplay(personalInfo.date_of_birth)}
            </InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem span={12}>
          <InfoIcon>
            <MailOutlined />
          </InfoIcon>
          <InfoContent>
            <InfoTitle>Email</InfoTitle>
            <InfoValue>{personalInfo.email || "---"}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem span={12}>
          <InfoIcon>
            <MailOutlined />
          </InfoIcon>
          <InfoContent>
            <InfoTitle>Địa chỉ</InfoTitle>
            <InfoValue>{personalInfo.address || "---"}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem span={12}>
          <InfoIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              style={{ flexShrink: 0 }}
            >
              <path
                fill="#577cf6"
                d="M12.49 10.272v-.45h1.347v6.322h-.77a.576.576 0 0 1-.577-.573v.001a3.27 3.27 0 0 1-1.938.632a3.284 3.284 0 0 1-3.284-3.282a3.284 3.284 0 0 1 3.284-3.282a3.27 3.27 0 0 1 1.937.632zM6.919 7.79v.205c0 .382-.051.694-.3 1.06l-.03.034a8 8 0 0 0-.242.285L2.024 14.8h4.895v.768a.576.576 0 0 1-.577.576H0v-.362c0-.443.11-.641.25-.847L4.858 9.23H.192V7.79zm8.551 8.354a.48.48 0 0 1-.48-.48V7.79h1.441v8.354zM20.693 9.6a3.306 3.306 0 1 1 .002 6.612a3.306 3.306 0 0 1-.002-6.612m-10.14 5.253a1.932 1.932 0 1 0 0-3.863a1.932 1.932 0 0 0 0 3.863m10.14-.003a1.945 1.945 0 1 0 0-3.89a1.945 1.945 0 0 0 0 3.89"
              />
            </svg>
          </InfoIcon>
          <InfoContent>
            <InfoTitle>Zalo</InfoTitle>
            <InfoValue>{personalInfo.zalo || "---"}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem span={12}>
          <InfoIcon>
            <FacebookOutlined />
          </InfoIcon>
          <InfoContent>
            <InfoTitle>Facebook</InfoTitle>
            <InfoValue>{personalInfo.facebook || "---"}</InfoValue>
          </InfoContent>
        </InfoItem>
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
        confirmLoading={isUpdating}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="full_name"
            label="Họ và tên"
            rules={[
              { required: true, message: "Họ và tên là bắt buộc" },
              {
                pattern: /^[a-zA-ZÀ-ỹ\s.-]{1,100}$/,
                message:
                  "Họ tên chỉ được chứa chữ cái, khoảng trắng, dấu chấm hoặc dấu gạch nối, tối đa 100 ký tự",
              },
            ]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone_number"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Số điện thoại là bắt buộc" },
                  {
                    pattern: /^0\d{9}$/,
                    message:
                      "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date_of_birth"
                label="Ngày tháng năm sinh"
                rules={[{ required: true, validator: validateDateOfBirth }]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày sinh"
                  disabledDate={(current) =>
                    current &&
                    current.isAfter(dayjs().subtract(15, "years"), "day")
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                max: 200,
                message: "Địa chỉ không được vượt quá 200 ký tự",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="zalo"
                label="Zalo"
                rules={[
                  {
                    max: 50,
                    message: "Zalo không được vượt quá 50 ký tự",
                  },
                ]}
              >
                <Input prefix={"+"} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="facebook"
                label="Facebook"
                rules={[
                  {
                    max: 100,
                    message: "Facebook không được vượt quá 100 ký tự",
                  },
                  {
                    pattern: /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/,
                    message: "Facebook phải là một URL hợp lệ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Change Avatar Modal */}
      <Modal
        title="Đổi ảnh đại diện"
        open={isChangeAvatarModalVisible}
        onCancel={handleCancelAvatarModal}
        width={600}
        footer={
          previewImage ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleCancelAvatarModal}
                disabled={uploadAvatarMutation.isLoading}
              >
                Hủy
              </Button>
              <Upload
                accept="image/*"
                maxCount={1}
                beforeUpload={() => false}
                onChange={handleFileSelect}
                showUploadList={false}
                disabled={uploadAvatarMutation.isLoading}
              >
                <Button
                  icon={<UploadOutlined />}
                  disabled={uploadAvatarMutation.isLoading}
                >
                  Đăng tải ảnh khác
                </Button>
              </Upload>

              <Button
                type="primary"
                onClick={handleAvatarUpload}
                loading={isUploadingAvatar}
                disabled={isUploadingAvatar}
                icon={
                  isUploadingAvatar ? <LoadingOutlined /> : <UploadOutlined />
                }
                style={{ minWidth: "200px" }}
              >
                {isUploadingAvatar
                  ? "Đang tải lên..."
                  : "Cập nhật ảnh đại diện"}
              </Button>
            </div>
          ) : null
        }
      >
        <div style={{ textAlign: "center" }}>
          {previewImage ? (
            <div>
              <div style={{ marginBottom: 16 }}>
                <Image
                  src={previewImage}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    borderRadius: "8px",
                  }}
                  preview={false}
                />
              </div>
              <Text type="secondary">Ảnh đại diện mới của bạn</Text>
            </div>
          ) : (
            <Upload.Dragger
              name="avatar"
              accept="image/*"
              maxCount={1}
              beforeUpload={() => false}
              onChange={handleFileSelect}
              showUploadList={false}
              disabled={uploadAvatarMutation.isLoading}
              style={{
                lineHeight: "50px",
                padding: "40px 0",
              }}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">
                Kéo và thả ảnh tại đây hoặc nhấn để chọn
              </p>
              <p className="ant-upload-hint">
                Hỗ trợ định dạng JPG, PNG, GIF. Kích thước tối đa 5MB
              </p>
            </Upload.Dragger>
          )}
        </div>
      </Modal>
    </Section>
  );
};

export default PersonalInfo;
