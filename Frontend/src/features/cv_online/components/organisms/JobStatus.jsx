import React from "react";
import { Select, Typography, App } from "antd";
import styled from "styled-components";
import useUpdateCandidateStatus from "../../../candidate/hooks/useUpdateCandidateStatus";

const { Title } = Typography;
const { Option } = Select;

// Styled Components
const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 24px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;
`;

const StatusSelect = styled(Select)`
  width: 15rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const JobStatus = ({ jobStatus, setJobStatus, sectionRefs, candidateId }) => {
  const jobStatusOptions = {
    ready: "Sẵn sàng tìm việc",
    not_available: "Chưa có nhu cầu",
    available_this_month: "Nhận việc trong tháng này",
  };

  const { message } = App.useApp();
  const { mutate } = useUpdateCandidateStatus();

  const handleChange = (value) => {
    setJobStatus(value);
    // Gửi cập nhật đến server
    mutate(
      { id: candidateId, data: { status: value } },
      {
        onSuccess: () => message.success("Cập nhật trạng thái thành công"),
        onError: () => message.error("Cập nhật trạng thái thất bại"),
      }
    );
  };
  return (
    <Section ref={sectionRefs.jobStatus}>
      <SectionTitle level={3}>Trạng thái tìm việc</SectionTitle>
      <StatusSelect value={jobStatus} onChange={handleChange}>
        {Object.entries(jobStatusOptions).map(([value, label]) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </StatusSelect>
    </Section>
  );
};

export default JobStatus;
