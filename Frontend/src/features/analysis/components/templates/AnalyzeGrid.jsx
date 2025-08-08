import React from "react";
import { Row, Col } from "antd";
import AnalyzeCard from "../organisms/AnalyzeCard";

const AnalyzeGrid = ({ analyses, fullWidth = false }) => {
  return (
    <Row gutter={[24, 24]}>
      {analyses.map((analysis) => (
        <Col
          xs={24}
          md={fullWidth ? 24 : 12}
          xl={fullWidth ? 24 : 8}
          key={analysis._id}
        >
          <AnalyzeCard analysis={analysis} />
        </Col>
      ))}
    </Row>
  );
};

export default AnalyzeGrid;
