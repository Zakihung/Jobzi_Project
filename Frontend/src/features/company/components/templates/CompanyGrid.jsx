import React from "react";
import { Row, Col } from "antd";
import CompanyCard from "../organisms/CompanyCard";

const CompanyGrid = ({ companies }) => {
  return (
    <Row gutter={[24, 24]}>
      {companies.map((company) => (
        <Col xs={24} md={12} xl={8} key={company._id}>
          <CompanyCard company={company} />
        </Col>
      ))}
    </Row>
  );
};

export default CompanyGrid;
