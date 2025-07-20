import React from "react";
import { Modal, Avatar, Typography, Divider, Row, Col, Space } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Text, Title, Paragraph } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-header {
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 24px;
  }
`;

const ModalContent = styled.div`
  padding: 24px;
`;

const SectionTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;
  margin-top: 24px !important;

  &:first-child {
    margin-top: 0 !important;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;

  .anticon {
    margin-right: 8px;
    color: #577cf6;
  }
`;

const ExperienceCard = styled.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  border-left: 4px solid #577cf6;
`;

const formatDate = (month, year) => {
  const formattedMonth = month < 10 ? `0${month}` : month;
  return `${formattedMonth}/${year}`;
};

const formatSalary = (min, max, type) => {
  if (type === "Thỏa thuận") return "Thỏa thuận";
  return `${min?.toLocaleString()} - ${max?.toLocaleString()} triệu VND`;
};

const PreviewResumeModal = ({
  isModalVisible,
  handleCancel,
  resumeData,
  isLoadingResumeData,
  isErrorResumeData,
}) => {
  const resume = resumeData?.data;

  const renderPersonalInfo = () => {
    if (!resume?.personalInfo) return;

    const { personalInfo } = resume;
    return (
      <Row>
        <Col span={24} style={{ textAlign: "center", marginBottom: 16 }}>
          <Avatar
            size={100}
            src={personalInfo.avatar}
            icon={<UserOutlined />}
          />
          <Title level={3} style={{ marginTop: 16, marginBottom: 8 }}>
            {personalInfo.full_name}
          </Title>
        </Col>
        <Col span={12}>
          <InfoItem>
            <PhoneOutlined />
            <Text>{personalInfo.phone_number}</Text>
          </InfoItem>
          <InfoItem>
            <MailOutlined />
            <Text>{personalInfo.email}</Text>
          </InfoItem>
        </Col>
        <Col span={12}>
          {personalInfo.date_of_birth && (
            <InfoItem>
              <CalendarOutlined />
              <Text>
                {new Intl.DateTimeFormat("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).format(new Date(personalInfo.date_of_birth))}
              </Text>
            </InfoItem>
          )}
          {personalInfo.address && (
            <InfoItem>
              <EnvironmentOutlined />
              <Text>{personalInfo.address}</Text>
            </InfoItem>
          )}
        </Col>
        <Col span={12}>
          {personalInfo.zalo && (
            <InfoItem>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ flexShrink: 0 }}
              >
                <path
                  fill="#577cf6"
                  d="M12.49 10.272v-.45h1.347v6.322h-.77a.576.576 0 0 1-.577-.573v.001a3.27 3.27 0 0 1-1.938.632a3.284 3.284 0 0 1-3.284-3.282a3.284 3.284 0 0 1 3.284-3.282a3.27 3.27 0 0 1 1.937.632zM6.919 7.79v.205c0 .382-.051.694-.3 1.06l-.03.034a8 8 0 0 0-.242.285L2.024 14.8h4.895v.768a.576.576 0 0 1-.577.576H0v-.362c0-.443.11-.641.25-.847L4.858 9.23H.192V7.79zm8.551 8.354a.48.48 0 0 1-.48-.48V7.79h1.441v8.354zM20.693 9.6a3.306 3.306 0 1 1 .002 6.612a3.306 3.306 0 0 1-.002-6.612m-10.14 5.253a1.932 1.932 0 1 0 0-3.863a1.932 1.932 0 0 0 0 3.863m10.14-.003a1.945 1.945 0 1 0 0-3.89a1.945 1.945 0 0 0 0 3.89"
                />
              </svg>
              <Text
                style={{
                  marginLeft: 8,
                }}
              >
                {personalInfo.zalo}
              </Text>
            </InfoItem>
          )}
        </Col>
        <Col span={12}>
          {personalInfo.facebook && (
            <InfoItem>
              <FacebookOutlined />
              <Text>{personalInfo.facebook}</Text>
            </InfoItem>
          )}
        </Col>
      </Row>
    );
  };

  const renderJobExpectations = () => {
    if (!resume?.jobExpectations?.length) return;

    return resume.jobExpectations.map((job, index) => (
      <ExperienceCard key={index}>
        <Title level={5}>{job.position}</Title>
        <Space direction="vertical" size="small">
          <Text>
            <strong>Hình thức:</strong> {job.jobType}
          </Text>
          <Text>
            <strong>Mức lương:</strong>{" "}
            {formatSalary(
              job.min_salary_range,
              job.max_salary_range,
              job.salary_type
            )}
          </Text>
          <Text>
            <strong>Địa điểm:</strong> {job.province}
          </Text>
        </Space>
      </ExperienceCard>
    ));
  };

  const renderEducation = () => {
    if (!resume?.education?.length) return;

    return resume.education.map((edu, index) => (
      <ExperienceCard key={index}>
        <Title level={5}>{edu.school}</Title>
        <Space direction="vertical" size="small">
          <Text>
            <strong>Bằng cấp:</strong> {edu.education}
          </Text>
          <Text>
            <strong>Chuyên ngành:</strong> {edu.major}
          </Text>
          <Text>
            <strong>Thời gian:</strong>{" "}
            {formatDate(edu.startMonth, edu.startYear)} -{" "}
            {formatDate(edu.endMonth, edu.endYear)}
          </Text>
        </Space>
      </ExperienceCard>
    ));
  };

  const renderHighlights = () => {
    if (!resume?.highlights?.length) return;

    return resume.highlights.map((highlight, index) => (
      <ExperienceCard key={index}>
        <Title level={5}>{highlight.title}</Title>
        <Paragraph>{highlight.description}</Paragraph>
      </ExperienceCard>
    ));
  };

  const renderWorkExperience = () => {
    if (!resume?.workExperience?.length) return;

    return resume.workExperience.map((work, index) => (
      <ExperienceCard key={index}>
        <Title level={5}>
          {work.position} tại {work.company}
        </Title>
        <Space direction="vertical" size="small">
          <Text>
            <strong>Ngành:</strong> {work.industry}
          </Text>
          <Text>
            <strong>Thời gian:</strong>{" "}
            {formatDate(work.startMonth, work.startYear)} -{" "}
            {formatDate(work.endMonth, work.endYear)}
          </Text>
          <Paragraph>
            <strong>Mô tả:</strong> {work.description}
          </Paragraph>
        </Space>
      </ExperienceCard>
    ));
  };

  const renderProjects = () => {
    if (!resume?.projects?.length) return;

    return resume.projects.map((project, index) => (
      <ExperienceCard key={index}>
        <Title level={5}>{project.projectName}</Title>
        <Space direction="vertical" size="small">
          <Text>
            <strong>Vai trò:</strong> {project.role}
          </Text>
          {project.projectLink && (
            <Text>
              <strong>Link:</strong>{" "}
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.projectLink}
              </a>
            </Text>
          )}
          <Text>
            <strong>Thời gian:</strong>{" "}
            {formatDate(project.startMonth, project.startYear)} -{" "}
            {formatDate(project.endMonth, project.endYear)}
          </Text>
          <Paragraph>
            <strong>Mô tả:</strong> {project.description}
          </Paragraph>
        </Space>
      </ExperienceCard>
    ));
  };

  const renderSkills = () => {
    if (!resume?.skills?.length) return;

    return (
      <Row gutter={[16, 16]}>
        {resume.skills.map((skill, index) => (
          <Col span={12} key={index}>
            <ExperienceCard>
              <Title level={5}>{skill.skillName}</Title>
              <Space direction="vertical" size="small">
                <Text>
                  <strong>Kinh nghiệm:</strong> {skill.experience}
                </Text>
                <Text>
                  <strong>Mức độ:</strong> {skill.proficiency}
                </Text>
              </Space>
            </ExperienceCard>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <StyledModal
      title={
        <div style={{ textAlign: "center" }}>Xem trước hồ sơ trực tuyến</div>
      }
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
    >
      <ModalContent>
        {isLoadingResumeData ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Text>Đang tải thông tin...</Text>
          </div>
        ) : isErrorResumeData ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Text type="danger">Có lỗi xảy ra khi tải thông tin</Text>
          </div>
        ) : (
          <>
            {renderPersonalInfo()}

            <Divider />
            <SectionTitle level={3}>Mong muốn tìm việc</SectionTitle>
            {renderJobExpectations()}

            <Divider />
            <SectionTitle level={3}>Học vấn</SectionTitle>
            {renderEducation()}

            <Divider />
            <SectionTitle level={3}>Điểm nổi bật</SectionTitle>
            {renderHighlights()}

            <Divider />
            <SectionTitle level={3}>Kinh nghiệm làm việc</SectionTitle>
            {renderWorkExperience()}

            <Divider />
            <SectionTitle level={3}>Kinh nghiệm dự án</SectionTitle>
            {renderProjects()}

            <Divider />
            <SectionTitle level={3}>Năng lực chuyên môn</SectionTitle>
            {renderSkills()}
          </>
        )}
      </ModalContent>
    </StyledModal>
  );
};

export default PreviewResumeModal;
