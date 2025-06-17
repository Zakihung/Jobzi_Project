import React from "react";
import { Card, Typography, Button } from "antd";
import { EditorContent } from "@tiptap/react";
import styled from "styled-components";

const { Title } = Typography;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 16px;
  margin-bottom: 16px;
`;

const StyledTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;

  @media (max-width: 768px) {
    font-size: 20px !important;
  }

  @media (max-width: 576px) {
    font-size: 18px !important;
  }
`;

const EditorContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  padding: 12px;
  min-height: 200px;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;

  .ant-btn {
    border-radius: 12px;
    font-weight: 600;
  }

  .ant-btn-primary {
    background: #577cf6;
    border-color: #577cf6;
  }
`;

const EditorSection = ({ title, editor, renderToolbar }) => {
  return (
    <StyledCard>
      <StyledTitle level={3}>{title}</StyledTitle>
      {renderToolbar()}
      <EditorContainer>
        <EditorContent editor={editor} />
      </EditorContainer>
    </StyledCard>
  );
};

export default EditorSection;
