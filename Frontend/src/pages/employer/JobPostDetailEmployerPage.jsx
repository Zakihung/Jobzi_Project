import React, { useState, useRef, useEffect } from "react";
import { Layout, Row, Col, Skeleton } from "antd";
import styled from "styled-components";
import NavPostJobMenu from "../../features/postjob/components/templates/NavPostJobMenu";
import PostJobForm from "../../features/postjob/components/templates/PostJobForm";
import SidebarProgress from "../../features/postjob/components/templates/SidebarProgress";
import useGetJobPostById from "../../features/postjob/hooks/Job_Post/useGetJobPostById";
import useUpdateJobPost from "../../features/postjob/hooks/Job_Post/useUpdateJobPost";
import { useParams } from "react-router-dom";

const PostJobContainer = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const ContentContainer = styled(Layout.Content)`
  background: #f8f9fa;
`;

const StyledSkeleton = styled(Skeleton)`
  padding: 16px;
  .ant-skeleton-title {
    border-radius: 8px;
  }
  .ant-skeleton-paragraph {
    margin-top: 12px;
  }
  .ant-skeleton-paragraph > li {
    border-radius: 8px;
  }
`;

const JobPostDetailEmployerPage = () => {
  const { id } = useParams();
  const { data: jobData, isLoading } = useGetJobPostById(id);
  const { mutate: updateJobPost } = useUpdateJobPost();
  const [isEditing, setIsEditing] = useState(false);
  const [locations, setLocations] = useState([{ province: "", address: "" }]);
  const [completedSections, setCompletedSections] = useState([]);
  const sectionRefs = {
    title: useRef(null),
    industry: useRef(null),
    generalInfo: useRef(null),
    description: useRef(null),
    requirements: useRef(null),
    benefits: useRef(null),
    cvInfo: useRef(null),
  };
  const formRef = useRef(null);

  const allSections = [
    "Tiêu đề tin tuyển dụng",
    "Ngành nghề và vị trí",
    "Thông tin chung",
    "Nội dung tuyển dụng chi tiết",
    "Yêu cầu ứng viên",
    "Quyền lợi ứng viên",
    "Thông tin nhận CV",
  ];

  useEffect(() => {
    if (jobData) {
      setLocations(
        jobData.locations?.map((loc) => ({
          province: loc.province || "",
          address: loc.address || "",
        })) || [{ province: "", address: "" }]
      );
      setCompletedSections(allSections); // Giả định tất cả section đã hoàn thành khi xem chi tiết
    }
  }, [jobData]);

  const handleLocationChange = (index, field, value) => {
    const newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setLocations(newLocations);
  };

  const addLocation = () => {
    setLocations([...locations, { province: "", address: "" }]);
  };

  const removeLocation = (index) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (isLoading) {
    return (
      <PostJobContainer>
        <ContentContainer>
          <Row
            gutter={[16, 16]}
            style={{
              background: "#ffffff",
            }}
            justify={"center"}
          >
            <Col
              xs={24}
              sm={22}
              md={21}
              style={{
                background: "#f8f9fa",
                borderRadius: "24px",
                padding: "16px",
              }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={0} md={6} lg={6}>
                  <StyledSkeleton active paragraph={{ rows: 7 }} />
                </Col>
                <Col xs={24} md={12} lg={13}>
                  <StyledSkeleton active paragraph={{ rows: 10 }} />
                </Col>
                <Col xs={24} md={6} lg={5}>
                  <StyledSkeleton active paragraph={{ rows: 5 }} />
                </Col>
              </Row>
            </Col>
          </Row>
        </ContentContainer>
      </PostJobContainer>
    );
  }

  return (
    <PostJobContainer>
      <ContentContainer>
        <Row
          gutter={[16, 16]}
          style={{
            background: "#ffffff",
          }}
          justify={"center"}
        >
          <Col
            xs={24}
            sm={22}
            md={21}
            style={{
              background: "#f8f9fa",
              borderRadius: "24px",
              padding: "16px",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={0} md={6} lg={6}>
                <NavPostJobMenu sectionRefs={sectionRefs} />
              </Col>
              <Col xs={24} md={12} lg={13}>
                <PostJobForm
                  sectionRefs={sectionRefs}
                  locations={locations}
                  handleLocationChange={handleLocationChange}
                  addLocation={addLocation}
                  removeLocation={removeLocation}
                  completedSections={completedSections}
                  setCompletedSections={setCompletedSections}
                  allSections={allSections}
                  formRef={formRef}
                  jobData={jobData}
                  isEditing={isEditing}
                  disabled={!isEditing}
                  updateJobPost={updateJobPost}
                />
              </Col>
              <Col xs={24} md={6} lg={5}>
                <SidebarProgress
                  completedSections={completedSections}
                  allSections={allSections}
                  onSubmit={() => {
                    if (formRef.current) {
                      formRef.current.dispatchEvent(
                        new Event("submit", { cancelable: true, bubbles: true })
                      );
                    }
                  }}
                  onEdit={handleEditToggle}
                  isEditing={isEditing}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </ContentContainer>
    </PostJobContainer>
  );
};

export default JobPostDetailEmployerPage;
