import React from "react";
import { Select, Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;
const { Option } = Select;

const jobStatusOptions = [
  "Sẵn sàng tìm việc",
  "Chưa có nhu cầu",
  "Nhận việc trong tháng này",
];

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

const JobStatus = ({ jobStatus, setJobStatus, sectionRefs }) => {
  return (
    <Section ref={sectionRefs.jobStatus}>
      <SectionTitle level={3}>Trạng thái tìm việc</SectionTitle>
      <StatusSelect value={jobStatus} onChange={setJobStatus}>
        {jobStatusOptions.map((status) => (
          <Option key={status} value={status}>
            {status}
          </Option>
        ))}
      </StatusSelect>
    </Section>
  );
};

export default JobStatus;
