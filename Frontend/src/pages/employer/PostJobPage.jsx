import React, { useState, useRef } from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import NavPostJobMenu from "../../features/postjob/components/templates/NavPostJobMenu";
import PostJobForm from "../../features/postjob/components/templates/PostJobForm";
import SidebarProgress from "../../features/postjob/components/templates/SidebarProgress";

const PostJobContainer = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const ContentContainer = styled(Layout.Content)`
  background: #f8f9fa;
`;

const PostJobPage = () => {
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

  const handleLocationChange = (index, field, value) => {
    const newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setLocations(newLocations);
    if (
      newLocations[index].province &&
      newLocations[index].address &&
      !completedSections.includes("Thông tin chung")
    ) {
      setCompletedSections([...completedSections, "Thông tin chung"]);
    }
  };

  const addLocation = () => {
    setLocations([...locations, { province: "", address: "" }]);
  };

  const removeLocation = (index) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    } else {
      console.error("formRef không được khai báo");
    }
  };

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
                  isEditing={true}
                  disabled={false}
                />
              </Col>
              <Col xs={24} md={6} lg={5}>
                <SidebarProgress
                  completedSections={completedSections}
                  allSections={allSections}
                  onSubmit={handleSubmit}
                  onEdit={() =>
                    console.log("onEdit không dùng trong PostJobPage")
                  }
                  isEditing={true}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </ContentContainer>
    </PostJobContainer>
  );
};

export default PostJobPage;
