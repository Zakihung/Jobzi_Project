import React, { useState } from "react";
import {
  Card,
  Tag,
  Avatar,
  Space,
  Rate,
  Typography,
  Modal,
  App,
  Image,
  Button,
  Upload,
} from "antd";
import {
  EnvironmentOutlined,
  UserOutlined,
  StarOutlined,
  CameraOutlined,
  UploadOutlined,
  LoadingOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import useUploadLogoCompany from "../../hooks/Company/useUploadLogoCompany";

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  margin-bottom: 24px;
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 24px;

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const LogoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  flex-shrink: 0;
  margin-bottom: 16px;
  position: relative;
  &:hover ${LogoOverlay} {
    opacity: 1;
  }
`;

const LogoSpace = styled(Avatar)`
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
`;

const CompanyLogo = styled(Avatar)`
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  @media (max-width: 992px) {
    margin-bottom: 16px;
  }
`;

const CompanyInfoSection = styled.div`
  flex: 1;
`;

const CompanyName = styled(Title)`
  &.ant-typography {
    color: #1a1a1a !important;
    font-size: 28px !important;
    font-weight: 700 !important;
    margin-bottom: 20px !important;

    @media (max-width: 768px) {
      font-size: 24px !important;
    }

    @media (max-width: 576px) {
      font-size: 20px !important;
    }
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TagItem = styled.span`
  background-color: #e6f0ff;
  color: #1a73e8;
  font-size: 14px;
  padding: 4px 14px;
  border-radius: 16px;
  font-weight: 500;
`;

const CompanyBasicInfo = ({ company, role }) => {
  const { message } = App.useApp();
  const [isChangeAvatarModalVisible, setIsChangeAvatarModalVisible] =
    useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  // State mới cho preview avatar
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadAvatarMutation = useUploadLogoCompany();

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
        company_id: company?.id,
        logo: selectedFile,
      },
      {
        onSuccess: () => {
          // Reset modal state
          setIsUploadingAvatar(false);
          setIsChangeAvatarModalVisible(false);
          setPreviewImage(null);
          setSelectedFile(null);
          message.success("Đăng tải ảnh Logo thành công!");
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message ||
              "Đã có lỗi xảy ra khi đăng tải ảnh Logo!"
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
  return (
    <StyledCard>
      <CompanyHeader>
        {role === "employer" ? (
          <LogoContainer>
            <LogoSpace
              size={120}
              src={company.logo}
              onClick={() => setIsChangeAvatarModalVisible(true)}
            />
            <LogoOverlay onClick={() => setIsChangeAvatarModalVisible(true)}>
              <CameraOutlined style={{ color: "#fff", fontSize: "24px" }} />
            </LogoOverlay>
          </LogoContainer>
        ) : (
          <CompanyLogo src={company.logo} size={120} />
        )}
        <CompanyInfoSection>
          <CompanyName level={2}>{company.name}</CompanyName>
          <TagList>
            <TagItem>
              <StarOutlined /> {company.company_industry}
            </TagItem>
            {company.max_size === 0 ? (
              <></>
            ) : (
              <TagItem>
                <UserOutlined /> {company.min_size} - {company.max_size} nhân
                viên
              </TagItem>
            )}
            {company.website_url && (
              <TagItem>
                <GlobalOutlined />{" "}
                <a
                  href={
                    company.website_url.startsWith("http")
                      ? company.website_url
                      : `https://${company.website_url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1a73e8" }}
                >
                  {company.website_url}
                </a>
              </TagItem>
            )}
            <TagItem>
              <EnvironmentOutlined /> {company.address}, {company.province}
            </TagItem>
          </TagList>
        </CompanyInfoSection>
      </CompanyHeader>

      {/* Change Avatar Modal */}
      <Modal
        title="Đổi ảnh Logo"
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
                {isUploadingAvatar ? "Đang tải lên..." : "Cập nhật ảnh Logo"}
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
              <Text type="secondary">Ảnh Logo mới của bạn</Text>
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
    </StyledCard>
  );
};

export default CompanyBasicInfo;
