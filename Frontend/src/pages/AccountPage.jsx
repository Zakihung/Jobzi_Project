import React, { useContext, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Menu,
  Card,
  Typography,
  Avatar,
  Button,
  Input,
  Form,
  DatePicker,
  Select,
  Modal,
  Upload,
  App,
  Space,
  Popconfirm,
  Image,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  CameraOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import styles from "../styles/AccountPage.module.css";
import useChangePassword from "../features/auth/hooks/useChangePassword";
import useUpdateUser from "../features/auth/hooks/useUpdateUser";
import useUploadAvatar from "../features/auth/hooks/useUploadAvatar";
import { AuthContext } from "../contexts/auth.context";
import useGetUserById from "../features/auth/hooks/useGetUserById";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const AccountPage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const userId = auth?.user?.id;
  const { data: userData, isLoading: isLoadingUser } = useGetUserById(userId);
  const { message } = App.useApp();
  const [selectedMenu, setSelectedMenu] = useState("account");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false);
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] =
    useState(false);
  const [isChangeAvatarModalVisible, setIsChangeAvatarModalVisible] =
    useState(false);

  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSaveInfo, setIsSaveInfo] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // State mới cho preview avatar
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const changePasswordMutation = useChangePassword();
  const updateUserMutation = useUpdateUser();
  const uploadAvatarMutation = useUploadAvatar();

  const formattedUserData = {
    ...userData,
    gender: userData?.gender == "male" ? "Nam" : "Nữ",
    date_of_birth: userData?.date_of_birth
      ? dayjs(userData?.date_of_birth)
      : null,
  };

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
    setIsEditMode(false);
    form.setFieldsValue(formattedUserData); // Reset form khi chuyển menu
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      form.setFieldsValue(formattedUserData);
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }
  };

  const handleSavePersonalInfo = async () => {
    try {
      const values = await form.validateFields();
      setIsSaveInfo(true);
      const formattedValues = {
        ...values,
        date_of_birth: values.date_of_birth
          ? dayjs(values.date_of_birth).format("YYYY-MM-DD")
          : undefined,
        gender: values.gender === "Nam" ? "male" : "female",
      };

      // console.log("Sending data to API:", {
      //   user_id: userData?._id,
      //   data: formattedValues,
      // }); // Debug dữ liệu gửi đi

      updateUserMutation.mutate(
        { user_id: userData?._id, data: formattedValues },
        {
          onSuccess: (response) => {
            // console.log("API response:", response); // Debug phản hồi API

            // Kiểm tra xem response.data có tồn tại không
            if (response?.data) {
              setAuth({
                ...auth,
                user: { ...auth.user, ...response.data },
              });
              setIsSaveInfo(false);
              setIsEditMode(false);
              form.setFieldsValue({
                ...response.data,
                gender: response.data.gender === "male" ? "Nam" : "Nữ",
                date_of_birth: response.data.date_of_birth
                  ? dayjs(response.data.date_of_birth)
                  : null,
              });
              message.success("Cập nhật thông tin cá nhân thành công!");
            } else {
              // console.error("Unexpected API response structure:", response);
              message.error("Phản hồi từ server không đúng định dạng!");
            }
          },
          onError: (error) => {
            // console.error("API error:", error); // Debug lỗi API
            message.error(
              error.response?.data?.message ||
                "Đã có lỗi xảy ra khi cập nhật thông tin!"
            );
            setIsSaveInfo(false);
          },
        }
      );
    } catch {
      // console.error("Form validation error:", error); // Debug lỗi validation
      message.error("Vui lòng kiểm tra lại thông tin nhập vào!");
    }
  };

  const handleChangePassword = async () => {
    try {
      const values = await passwordForm.validateFields();

      if (values.newPassword !== values.confirmPassword) {
        passwordForm.setFields([
          {
            name: "confirmPassword",
            errors: ["Mật khẩu xác nhận không khớp!"],
          },
        ]);
        return;
      }

      setIsChangingPassword(true); // Bắt đầu loading

      changePasswordMutation.mutate(
        {
          oldPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        {
          onSuccess: () => {
            setIsChangePasswordModalVisible(false);
            passwordForm.resetFields();
            message.success("Đổi mật khẩu thành công!");
            setIsChangingPassword(false); // Kết thúc loading
          },
          onError: (error) => {
            message.error(
              error.response?.data?.message ||
                "Đã có lỗi xảy ra khi đổi mật khẩu!"
            );
            setIsChangingPassword(false); // Kết thúc loading
          },
        }
      );
    } catch {
      message.error("Vui lòng kiểm tra lại thông tin!");
      setIsChangingPassword(false); // Dù lỗi cũng nên tắt loading
    }
  };

  const handleDeleteAccount = () => {
    // Call API to delete account
    // Example: await axios.delete("/api/user/account");
    message.success("Tài khoản đã được xóa thành công!");
    setIsDeleteAccountModalVisible(false);
    // Redirect to login page or home page
  };

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

    // console.log("Uploading file:", {
    //   user_id: userData?._id,
    //   file: selectedFile,
    // });

    uploadAvatarMutation.mutate(
      {
        user_id: userData?._id,
        file: selectedFile,
      },
      {
        onSuccess: (response) => {
          // console.log("API response:", response);

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
          // console.error("API error:", error);
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

  const renderAccountManagement = () => (
    <div className={styles.contentSection}>
      <Title level={4} className={styles.sectionTitle}>
        Quản lý tài khoản
      </Title>

      <div className={styles.formGroup}>
        <Text className={styles.label}>Email:</Text>
        <Input
          value={userData?.email}
          disabled
          className={styles.disabledInput}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          icon={<LockOutlined />}
          onClick={() => setIsChangePasswordModalVisible(true)}
          className={styles.actionButton}
          loading={changePasswordMutation.isLoading}
          disabled={changePasswordMutation.isLoading}
        >
          Đổi mật khẩu
        </Button>

        {/* <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => setIsDeleteAccountModalVisible(true)}
          className={styles.deleteButton}
        >
          Xóa tài khoản
        </Button> */}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className={styles.contentSection}>
      <div className={styles.personalInfoHeader}>
        <Title level={4} className={styles.sectionTitle}>
          Thông tin cá nhân
        </Title>
        <Button
          type={isEditMode ? "default" : "primary"}
          icon={isEditMode ? <CloseOutlined /> : <EditOutlined />}
          onClick={handleEditToggle}
          className={styles.editButton}
          loading={updateUserMutation.isLoading}
          disabled={updateUserMutation.isLoading}
        >
          {isEditMode ? "Hủy" : "Chỉnh sửa thông tin"}
        </Button>
      </div>

      <div className={styles.avatarSection}>
        <Avatar
          src={formattedUserData?.avatar}
          size={120}
          // icon={<UserOutlined />}
          className={styles.avatar}
          onClick={() => setIsChangeAvatarModalVisible(true)}
        />
        <div
          className={styles.avatarOverlay}
          onClick={() => setIsChangeAvatarModalVisible(true)}
        >
          <CameraOutlined className={styles.cameraIcon} />
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={formattedUserData}
        className={styles.personalInfoForm}
      >
        <Form.Item
          label="Họ và tên"
          name="full_name"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input
            disabled={!isEditMode}
            className={!isEditMode ? styles.disabledInput : ""}
          />
        </Form.Item>

        <Form.Item
          label="Ngày tháng năm sinh"
          name="date_of_birth"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
        >
          <DatePicker
            disabled={!isEditMode}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày sinh"
            className={`${styles.fullWidth} ${
              !isEditMode ? styles.disabledInput : ""
            }`}
          />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Select
            disabled={!isEditMode}
            placeholder="Chọn giới tính"
            className={!isEditMode ? styles.disabledInput : ""}
          >
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone_number"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^[0-9]{10,11}$/,
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
        >
          <Input
            disabled={!isEditMode}
            className={!isEditMode ? styles.disabledInput : ""}
          />
        </Form.Item>

        {isEditMode && (
          <Form.Item>
            <Button
              type="primary"
              onClick={handleSavePersonalInfo}
              className={styles.saveButton}
              block
              loading={isSaveInfo}
              disabled={isSaveInfo}
              icon={isUploadingAvatar ? <LoadingOutlined /> : <SaveOutlined />}
            >
              Lưu thông tin
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case "account":
        return renderAccountManagement();
      case "personal":
        return renderPersonalInfo();
      default:
        return null;
    }
  };

  if (isLoadingUser || !userData) {
    return (
      <Layout className={styles.accountLayout}>
        <Content className={styles.accountContent}>
          <Row justify="center" style={{ padding: "40px" }}>
            <LoadingOutlined style={{ fontSize: 36 }} spin />
          </Row>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className={styles.accountLayout}>
      <Content className={styles.accountContent}>
        <Row justify={"center"}>
          <Col
            span={21}
            style={{ backgroundColor: "#f8f9fa", borderRadius: 24 }}
          >
            <Row
              gutter={[24, 24]}
              className={styles.accountRow}
              justify="center"
            >
              {/* Left Section: Menu */}
              <Col xs={24} md={8} lg={6}>
                <Card className={styles.menuCard}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      padding: "8px 16px",
                    }}
                  >
                    Cài đặt
                  </div>
                  <Menu
                    mode="vertical"
                    selectedKeys={[selectedMenu]}
                    onClick={handleMenuClick}
                    className={styles.accountMenu}
                  >
                    <Menu.Item key="account" icon={<LockOutlined />}>
                      Quản lý tài khoản
                    </Menu.Item>
                    <Menu.Item key="personal" icon={<UserOutlined />}>
                      Quản lý thông tin cá nhân
                    </Menu.Item>
                  </Menu>
                </Card>
              </Col>

              {/* Right Section: Content */}
              <Col xs={24} md={16} lg={18}>
                <Card className={styles.contentCard}>{renderContent()}</Card>
              </Col>
            </Row>

            {/* Change Password Modal */}
            <Modal
              title="Đổi mật khẩu"
              open={isChangePasswordModalVisible}
              onOk={handleChangePassword}
              onCancel={() => {
                setIsChangePasswordModalVisible(false);
                passwordForm.resetFields();
              }}
              okText={isChangingPassword ? "Đang đổi..." : "Đổi mật khẩu"}
              cancelText="Hủy"
              className={styles.modal}
              okButtonProps={{
                loading: isChangingPassword,
                disabled: isChangingPassword,
              }}
            >
              <Form form={passwordForm} layout="vertical">
                <Form.Item
                  label="Mật khẩu hiện tại"
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu hiện tại!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu mới"
                  name="newPassword"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                    {
                      pattern:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$#!%*?&]{8,}$/,
                      message:
                        "Mật khẩu phải có chữ hoa, số, ký tự đặc biệt và dài hơn 8 ký tự!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Nhập mật khẩu mới" />
                </Form.Item>
                <Form.Item
                  label="Xác nhận mật khẩu mới"
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng xác nhận mật khẩu mới!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu xác nhận không khớp!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Xác nhận mật khẩu mới" />
                </Form.Item>
              </Form>
            </Modal>

            {/* Delete Account Modal */}
            <Modal
              title="Xác nhận xóa tài khoản"
              open={isDeleteAccountModalVisible}
              onOk={handleDeleteAccount}
              onCancel={() => setIsDeleteAccountModalVisible(false)}
              okText="Xác nhận xóa"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
              className={styles.modal}
            >
              <Space direction="vertical" size={16}>
                <Text strong style={{ color: "#ff4d4f" }}>
                  Cảnh báo: Hành động này không thể hoàn tác!
                </Text>
                <Text>
                  Bạn có chắc chắn muốn xóa tài khoản của mình không? Tất cả dữ
                  liệu của bạn sẽ bị xóa vĩnh viễn.
                </Text>
              </Space>
            </Modal>

            {/* Change Avatar Modal */}
            <Modal
              title="Đổi ảnh đại diện"
              open={isChangeAvatarModalVisible}
              onCancel={handleCancelAvatarModal}
              width={500}
              className={styles.modal}
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
                        isUploadingAvatar ? (
                          <LoadingOutlined />
                        ) : (
                          <UploadOutlined />
                        )
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
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AccountPage;
