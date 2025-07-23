import React from "react";
import { Row, Col } from "antd";
import ApplicationCard from "../organisms/ApplicationCard";

const ApplicationGrid = ({ applications, fullWidth = false }) => {
  return (
    <Row gutter={[24, 24]}>
      {applications.map((application) => (
        <Col
          xs={24}
          md={fullWidth ? 24 : 12}
          xl={fullWidth ? 24 : 8}
          key={application._id}
        >
          <ApplicationCard application={application} />
        </Col>
      ))}
    </Row>
  );
};

export default ApplicationGrid;
