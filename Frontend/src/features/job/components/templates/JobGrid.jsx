import React from "react";
import { Row, Col } from "antd";
import JobCard from "../organisms/JobCard";

const JobGrid = ({ jobs, fullWidth = false }) => {
  return (
    <Row gutter={[24, 24]}>
      {jobs.map((job) => (
        <Col
          xs={24}
          md={fullWidth ? 24 : 12}
          xl={fullWidth ? 24 : 8}
          key={job.id}
        >
          <JobCard
            job={{
              id: job.id,
              title: job.title,
              company: job.company,
              location: job.location,
              salary: job.salary,
              tags: job.tags,
              saved: job.saved,
              posted: job.posted,
              logo: job.logo,
            }}
          />
        </Col>
      ))}
    </Row>
  );
};

export default JobGrid;
