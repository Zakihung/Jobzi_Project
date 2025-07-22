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
          key={job._id}
        >
          <JobCard
            job={{
              id: job._id,
              title: job.title,
              company: job.employer_id?.company_id,
              location: `${job.locations[0]?.province}`,
              salary: `${(job.min_salary_range / 1000000).toFixed(0)}-${(
                job.max_salary_range / 1000000
              ).toFixed(0)} triệu`,
              tags: job.skills,
              saved: false,
              posted: job.createdAt,
            }}
          />
        </Col>
      ))}
    </Row>
  );
};

export default JobGrid;
