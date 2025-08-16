import React, { useContext, useEffect, useMemo, useState } from "react";
import { Alert, Card, Spin, Skeleton } from "antd";
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
  padding: 12px; /* Giảm padding trên màn hình nhỏ */
  height: 100%;

  @media (max-width: 576px) {
    padding: 8px;
  }
`;

const SectionWrapper = styled.div`
  margin-bottom: 16px;

  @media (max-width: 576px) {
    margin-bottom: 12px;
  }
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

  const resume = useMemo(() => {
    return resumeData?.data
      ? {
          ...resumeData.data,
          jobExpectations: resumeData.data.jobExpectations || [],
          education: resumeData.data.education || [],
          highlights: resumeData.data.highlights || [],
          workExperience: resumeData.data.workExperience || [],
          projects: resumeData.data.projects || [],
          skills: resumeData.data.skills || [],
          personalInfo: resumeData.data.personalInfo || {},
        }
      : {
          personalInfo: {},
          jobExpectations: [],
          education: [],
          highlights: [],
          workExperience: [],
          projects: [],
          skills: [],
        };
  }, [resumeData]);

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
  }, [jobStatus]);

  const checkCompletedSections = (resume) => {
    const completed = ["Thông tin cá nhân", "Trạng thái tìm việc"];

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
        <SectionWrapper>
          <Skeleton active title={{ width: "30%" }} paragraph={{ rows: 2 }} />
        </SectionWrapper>
        <SectionWrapper>
          <Skeleton active title={{ width: "30%" }} paragraph={{ rows: 1 }} />
        </SectionWrapper>
        <SectionWrapper>
          <Skeleton active title={{ width: "30%" }} paragraph={{ rows: 3 }} />
        </SectionWrapper>
        <SectionWrapper>
          <Skeleton active title={{ width: "30%" }} paragraph={{ rows: 2 }} />
        </SectionWrapper>
        <SectionWrapper>
          <Skeleton active title={{ width: "30%" }} paragraph={{ rows: 2 }} />
        </SectionWrapper>
        <SectionWrapper>
          <Skeleton active title={{ width: "30%" }} paragraph={{ rows: 4 }} />
        </SectionWrapper>
        <SectionWrapper>
          <Skeleton active title={{ width: "30%" }} paragraph={{ rows: 3 }} />
        </SectionWrapper>
        <SectionWrapper>
          <Skeleton active title={{ width: "30%" }} paragraph={{ rows: 2 }} />
        </SectionWrapper>
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
      <SectionWrapper ref={sectionRefs.personalInfo}>
        <PersonalInfo
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          candidateId={candidateId}
        />
      </SectionWrapper>
      <SectionWrapper ref={sectionRefs.jobStatus}>
        <JobStatus
          jobStatus={jobStatus}
          setJobStatus={setJobStatus}
          candidateId={candidateId}
        />
      </SectionWrapper>
      <SectionWrapper ref={sectionRefs.jobExpectation}>
        <JobExpectation
          addSection={addSection}
          removeSection={removeSection}
          completedSections={completedSections}
          candidateId={candidateId}
          resume={resume}
        />
      </SectionWrapper>
      <SectionWrapper ref={sectionRefs.education}>
        <Education
          addSection={addSection}
          removeSection={removeSection}
          completedSections={completedSections}
          candidateId={candidateId}
          resume={resume}
        />
      </SectionWrapper>
      <SectionWrapper ref={sectionRefs.highlights}>
        <Highlights
          addSection={addSection}
          removeSection={removeSection}
          completedSections={completedSections}
          candidateId={candidateId}
          resume={resume}
        />
      </SectionWrapper>
      <SectionWrapper ref={sectionRefs.workExperience}>
        <WorkExperience
          addSection={addSection}
          removeSection={removeSection}
          completedSections={completedSections}
          candidateId={candidateId}
          resume={resume}
        />
      </SectionWrapper>
      <SectionWrapper ref={sectionRefs.projects}>
        <Projects
          addSection={addSection}
          removeSection={removeSection}
          completedSections={completedSections}
          candidateId={candidateId}
          resume={resume}
        />
      </SectionWrapper>
      <SectionWrapper ref={sectionRefs.skills}>
        <Skills
          addSection={addSection}
          removeSection={removeSection}
          completedSections={completedSections}
          candidateId={candidateId}
          resume={resume}
        />
      </SectionWrapper>
    </ContentCard>
  );
};

export default ContentColumn;
