import React, { useContext, useEffect, useState } from "react";
import { Alert, Card, Spin } from "antd";
import styled from "styled-components";
import { AuthContext } from "../../../../contexts/auth.context";
import PersonalInfo from "../organisms/PersonalInfo";
import JobStatus from "../organisms/JobStatus";
import JobExpectation from "../organisms/JobExpectation";
import Education from "../organisms/Education";
import Highlights from "../organisms/Highlights";
import WorkExperience from "../organisms/WorkExperience";
import Projects from "../organisms/Projects";
import Skills from "../organisms/Skills";
import useGetCandidateById from "../../../candidate/hooks/useGetCandidateById";
import useGetOnlineResume from "../../hooks/useGetOnlineResume";

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
  const jobStatusLabels = {
    ready: "Sẵn sàng tìm việc",
    not_available: "Chưa có nhu cầu",
    available_this_month: "Nhận việc trong tháng này",
  };

  const { auth } = useContext(AuthContext);
  const candidateId = auth?.user?.candidate_id;
  const { data: candidateProfile } = useGetCandidateById(candidateId);
  const {
    data: resumeData,
    isLoading: isLoadingResumeData,
    isError: isErrorResumeData,
    error,
  } = useGetOnlineResume(candidateId);

  const resume = resumeData?.data;

  const [jobStatus, setJobStatus] = useState("");

  const [personalInfo, setPersonalInfo] = useState({
    full_name: "",
    phone_number: "",
    date_of_birth: "",
    email: "",
    address: "",
    zalo: "",
    facebook: "",
    jobStatus: "",
    avatar: "",
  });

  // Cập nhật personalInfo từ resumeData
  useEffect(() => {
    if (resume?.personalInfo) {
      const { personalInfo } = resume;
      setPersonalInfo({
        full_name: personalInfo.full_name || "",
        phone_number: personalInfo.phone_number || "",
        date_of_birth: personalInfo.date_of_birth || "",
        email: personalInfo.email || "",
        address: personalInfo.address || "",
        zalo: personalInfo.zalo || "",
        facebook: personalInfo.facebook || "",
        jobStatus: jobStatusLabels[jobStatus] || "",
        avatar: personalInfo.avatar || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeData, jobStatus]);

  useEffect(() => {
    if (candidateProfile?.status) {
      setJobStatus(candidateProfile.status);
    }
  }, [candidateProfile]);

  useEffect(() => {
    setPersonalInfo((prev) => ({
      ...prev,
      jobStatus: jobStatusLabels[jobStatus] || "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobStatus]);

  const checkCompletedSections = (resume) => {
    const completed = ["Thông tin cá nhân", "Trạng thái tìm việc"]; // Mặc định

    if (resume?.jobExpectations && resume.jobExpectations.length > 0) {
      completed.push("Mong muốn tìm việc");
    }
    if (resume?.education && resume.education.length > 0) {
      completed.push("Học vấn");
    }
    if (resume?.highlights && resume.highlights.length > 0) {
      completed.push("Điểm nổi bật");
    }
    if (resume?.workExperience && resume.workExperience.length > 0) {
      completed.push("Kinh nghiệm làm việc");
    }
    if (resume?.projects && resume.projects.length > 0) {
      completed.push("Kinh nghiệm dự án");
    }
    if (resume?.skills && resume.skills.length > 0) {
      completed.push("Năng lực chuyên môn");
    }

    return completed;
  };

  useEffect(() => {
    if (resume && candidateProfile) {
      const completed = checkCompletedSections(resume);
      setCompletedSections(completed);
    }
  }, [resume, candidateProfile, setCompletedSections]);

  const addSection = (section) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
  };

  const removeSection = (section) => {
    setCompletedSections(completedSections.filter((s) => s !== section));
  };

  // Xử lý trạng thái tải và lỗi
  if (isLoadingResumeData) {
    return (
      <ContentCard>
        <Spin tip="Đang tải hồ sơ..." />
      </ContentCard>
    );
  }

  if (isErrorResumeData) {
    return (
      <ContentCard>
        <Alert
          message="Lỗi"
          description={error?.message || "Không thể tải hồ sơ"}
          type="error"
          showIcon
        />
      </ContentCard>
    );
  }

  return (
    <ContentCard>
      <PersonalInfo
        sectionRefs={sectionRefs}
        personalInfo={personalInfo}
        setPersonalInfo={setPersonalInfo}
        candidateId={candidateId}
      />
      <JobStatus
        sectionRefs={sectionRefs}
        jobStatus={jobStatus}
        setJobStatus={setJobStatus}
        candidateId={candidateId}
      />
      <JobExpectation
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
        candidateId={candidateId}
        resume={resume}
      />
      <Education
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
        candidateId={candidateId}
        resume={resume}
      />
      <Highlights
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
        candidateId={candidateId}
        resume={resume}
      />
      <WorkExperience
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
        candidateId={candidateId}
        resume={resume}
      />
      <Projects
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
        candidateId={candidateId}
        resume={resume}
      />
      <Skills
        sectionRefs={sectionRefs}
        addSection={addSection}
        removeSection={removeSection}
        completedSections={completedSections}
        candidateId={candidateId}
        resume={resume}
      />
    </ContentCard>
  );
};

export default ContentColumn;
