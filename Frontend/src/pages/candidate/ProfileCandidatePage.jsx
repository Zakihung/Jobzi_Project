import React, { useContext, useEffect, useState } from "react";
import { Layout, Row, Col, App } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/auth.context";

import useGetResumeFilesByCandidateId from "../../features/resume_file/hooks/useGetResumeFilesByCandidateId";
import useCreateResumeFile from "../../features/resume_file/hooks/useCreateResumeFile";
import useUpdateResumeFile from "../../features/resume_file/hooks/useUpdateResumeFile";
import useDeleteResumeFile from "../../features/resume_file/hooks/useDeleteResumeFile";
import useUpdateCandidateStatus from "../../features/candidate/hooks/useUpdateCandidateStatus";
import useGetCandidateById from "../../features/candidate/hooks/useGetCandidateById";

import ProfileCard from "../../features/candidate/components/templates/ProfileCard";
import CVManagementCard from "../../features/candidate/components/templates/CVManagementCard";
import JobMenuCard from "../../features/candidate/components/templates/JobMenuCard";
import UploadCVModal from "../../features/candidate/components/organisms/UploadCVModal";
import EditCVModal from "../../features/candidate/components/organisms/EditCVModal";
import DeleteCVModal from "../../features/candidate/components/organisms/DeleteCVModal";
import PreviewCVModal from "../../features/candidate/components/organisms/PreviewCVModal";

const { Content } = Layout;

const ProfileLayout = styled(Layout)`
  min-height: 100vh;
  background: #fff;
  padding: 0;
`;

const ContentRow = styled(Row)`
  background: #f8f9fa;
  padding: 16px 0;
  border-radius: 24px;

  @media (max-width: 576px) {
    padding: 0 16px;
  }
`;

const ProfileCandidatePage = () => {
  const { message } = App.useApp();
  const { auth } = useContext(AuthContext);
  const userData = auth?.user;
  const candidateId = userData?.candidate_id;
  const navigate = useNavigate();

  // Menu state
  const [selectedMenu, setSelectedMenu] = useState("applied");

  // Modal states
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);

  // Form states
  const [editFileId, setEditFileId] = useState(null);
  const [editFileName, setEditFileName] = useState("");
  const [previewFileUrl, setPreviewFileUrl] = useState("");
  const [deleteFileId, setDeleteFileId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // Loading states
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Profile state
  const [candidateStatus, setCandidateStatus] = useState("");
  const { data: candidateProfile, isLoading: isLoadingCandidateProfile } =
    useGetCandidateById(candidateId);

  useEffect(() => {
    if (candidateProfile?.status) {
      setCandidateStatus(candidateProfile.status);
    }
  }, [candidateProfile]);

  const { mutate: updateCandidateStatus } = useUpdateCandidateStatus();

  // State để kiểm soát Popover trong ProfileCard
  const [, setIsPopoverVisible] = useState(false);

  // Hooks
  const { data: resumeFiles, isLoading: isLoadingResumeFiles } =
    useGetResumeFilesByCandidateId(candidateId);
  const createResumeFile = useCreateResumeFile();
  const updateResumeFile = useUpdateResumeFile();
  const deleteResumeFile = useDeleteResumeFile();

  // Handlers
  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  const handleViewOnlineResume = () => {
    navigate("/online-resume");
  };

  const handleStatusChange = (status) => {
    setCandidateStatus(status);
    setIsPopoverVisible(true); // Mở Popover nếu cần (tùy thuộc vào UX)
    updateCandidateStatus(
      { id: candidateId, data: { status } },
      {
        onSuccess: () => {
          message.success(`Cập nhật trạng thái thành công`);
          setIsPopoverVisible(false); // Đóng Popover khi cập nhật thành công
        },
        onError: () => {
          message.error("Cập nhật trạng thái thất bại!");
        },
      }
    );
  };

  // Upload Modal Handlers
  const showUploadModal = () => {
    if (resumeFiles?.length >= 3) {
      message.warning("Bạn chỉ có thể đăng tải tối đa 3 tệp CV!");
      return;
    }
    setIsUploadModalVisible(true);
    setSelectedFile(null);
    setFileName("");
  };

  const handleUploadModalCancel = () => {
    setIsUploadModalVisible(false);
    setSelectedFile(null);
    setFileName("");
    setIsUploading(false);
  };

  const handleUploadChange = ({ file }) => {
    if (file.status === "done") {
      message.success(`${file.name} đã được đăng tải thành công!`);
      setIsUploadModalVisible(false);
      setSelectedFile(null);
      setFileName("");
      setIsUploading(false);
    } else if (file.status === "error") {
      message.error(`${file.name} đăng tải thất bại.`);
      setIsUploading(false);
    } else {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleUploadFile = () => {
    if (!selectedFile) {
      message.error("Vui lòng chọn tệp trước khi đăng tải!");
      return;
    }
    setIsUploading(true);
    createResumeFile.mutate(
      {
        candidateId,
        data: { name: fileName || selectedFile.name },
        file: selectedFile,
      },
      {
        onSuccess: () => {
          message.success(`${selectedFile.name} đã được đăng tải thành công!`);
          setIsUploadModalVisible(false);
          setSelectedFile(null);
          setFileName("");
          setIsUploading(false);
        },
        onError: () => {
          message.error(`${selectedFile.name} đăng tải thất bại.`);
          setIsUploading(false);
          setSelectedFile(null);
          setFileName("");
        },
      }
    );
  };

  // Edit Modal Handlers
  const showEditModal = (file) => {
    setEditFileId(file._id);
    setEditFileName(file.name);
    setIsEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setEditFileId(null);
    setEditFileName("");
  };

  const handleEditFile = () => {
    if (!editFileName.trim()) {
      message.error("Tên tệp không được để trống!");
      return;
    }
    updateResumeFile.mutate(
      {
        id: editFileId,
        data: { name: editFileName },
        file: null,
      },
      {
        onSuccess: () => {
          message.success("Cập nhật tên tệp thành công!");
          setIsEditModalVisible(false);
          setEditFileId(null);
          setEditFileName("");
        },
        onError: () => {
          message.error("Cập nhật tên tệp thất bại!");
        },
      }
    );
  };

  // Delete Modal Handlers
  const showDeleteModal = (fileId) => {
    setDeleteFileId(fileId);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteFile = () => {
    if (!deleteFileId) return;
    setIsDeleting(true);
    deleteResumeFile.mutate(deleteFileId, {
      onSuccess: () => {
        message.success("Xóa tệp CV thành công!");
        setIsDeleteModalVisible(false);
        setDeleteFileId(null);
        setIsDeleting(false);
      },
      onError: () => {
        message.error("Xóa tệp CV thất bại!");
        setIsDeleting(false);
      },
    });
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
    setDeleteFileId(null);
  };

  // Preview Modal Handlers
  const handlePreviewFile = (file) => {
    setPreviewFileUrl(file.path);
    setIsPreviewModalVisible(true);
  };

  const handlePreviewModalCancel = () => {
    setIsPreviewModalVisible(false);
    setPreviewFileUrl("");
  };

  if (isLoadingCandidateProfile) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileLayout>
      <Row justify="center">
        <Col span={21}>
          <ContentRow gutter={[24, 24]}>
            {/* Left Section: Job Menu */}
            <Col xs={24} lg={15}>
              <JobMenuCard
                selectedMenu={selectedMenu}
                onMenuClick={handleMenuClick}
              />
            </Col>
            {/* Right Section: Profile & CV Management */}
            <Col span={9}>
              <ProfileCard
                userData={userData}
                candidateStatus={candidateStatus}
                onStatusChange={handleStatusChange}
                onStatusChangeSuccess={() => setIsPopoverVisible(false)}
                onViewOnlineResume={handleViewOnlineResume}
              />
              <CVManagementCard
                resumeFiles={resumeFiles}
                isLoading={isLoadingResumeFiles}
                onPreviewFile={handlePreviewFile}
                onEditFile={showEditModal}
                onDeleteFile={showDeleteModal}
                onUploadFile={showUploadModal}
              />
            </Col>
          </ContentRow>
        </Col>
      </Row>
      {/* Modals */}
      <UploadCVModal
        visible={isUploadModalVisible}
        onCancel={handleUploadModalCancel}
        selectedFile={selectedFile}
        fileName={fileName}
        onFileNameChange={setFileName}
        onUploadChange={handleUploadChange}
        onUploadFile={handleUploadFile}
        isUploading={isUploading}
      />
      <EditCVModal
        visible={isEditModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditFile}
        fileName={editFileName}
        onFileNameChange={setEditFileName}
      />
      <DeleteCVModal
        visible={isDeleteModalVisible}
        onCancel={handleDeleteModalCancel}
        onOk={handleDeleteFile}
        isDeleting={isDeleting}
      />
      <PreviewCVModal
        visible={isPreviewModalVisible}
        onCancel={handlePreviewModalCancel}
        previewUrl={previewFileUrl}
      />
    </ProfileLayout>
  );
};

export default ProfileCandidatePage;
