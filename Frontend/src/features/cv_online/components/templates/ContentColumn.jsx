import React, { useEffect, useState } from "react";
import { Card, Col } from "antd";
import styled from "styled-components";
import PersonalInfo from "../organisms/PersonalInfo";
import JobStatus from "../organisms/JobStatus";
import JobExpectation from "../organisms/JobExpectation";
import Education from "../organisms/Education";
import Highlights from "../organisms/Highlights";
import WorkExperience from "../organisms/WorkExperience";
import Projects from "../organisms/Projects";
import Skills from "../organisms/Skills";

// Styled Components
const ContentCard = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 16px;
  height: 100%;
`;

const ContentColumn = ({
  sectionRefs,
  completedSections,
  setCompletedSections,
}) => {
  const [jobStatus, setJobStatus] = useState("Sẵn sàng tìm việc");
  useEffect(() => {
    setPersonalInfo((prev) => ({ ...prev, jobStatus }));
  }, [jobStatus]);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Nguyễn Phước Hưng",
    phone: "0123 456 789",
    age: 22,
    education: "Sinh viên",
    experience: "0 năm",
    email: "hung@example.com",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    jobStatus,
  });

  const addSection = (section) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
  };

  const removeSection = (section) => {
    setCompletedSections(completedSections.filter((s) => s !== section));
  };

  return (
    <ContentCard>
      <PersonalInfo
        sectionRefs={sectionRefs}
        personalInfo={personalInfo}
        setPersonalInfo={setPersonalInfo}
      />
      <JobStatus
        sectionRefs={sectionRefs}
        jobStatus={jobStatus}
        setJobStatus={setJobStatus}
      />
      <JobExpectation
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
      />
      <Education
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
      />
      <Highlights
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
      />
      <WorkExperience
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
      />
      <Projects
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
      />
      <Skills
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
      />
    </ContentCard>
  );
};

export default ContentColumn;
