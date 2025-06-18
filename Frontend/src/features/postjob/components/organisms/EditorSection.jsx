import React from "react";
import { Card, Typography } from "antd";
import { EditorContent } from "@tiptap/react";
import styled from "styled-components";

const { Title } = Typography;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
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
    font-size: 18px !important;
  }

  @media (max-width: 576px) {
    font-size: 16px !important;
  }
`;

const EditorContainer = styled.div`
  background: #ffffff;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border: 1px solid #d8d9d9;
  border-top: none;
  padding: 20px;
  min-height: 240px;
  position: relative;
  transition: all 0.3s ease;

  /* Styling cho EditorContent */
  .ProseMirror {
    outline: none;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 15px;
    line-height: 1.3;
    color: #2c3e50;
    min-height: 200px;
    padding: 0;

    /* Styling cho các elements */
    p {
      margin: 0 0 12px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }

    /* Bold text */
    strong {
      font-weight: 600;
      color: #1a1a1a;
    }

    /* Italic text */
    em {
      font-style: italic;
      color: #34495e;
    }

    /* Underline text */
    u {
      text-decoration: underline;
      text-decoration-color: #2c3e50;
      text-decoration-thickness: 1px;
      text-underline-offset: 1px;
    }

    /* Headings */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 600;
      color: #1a1a1a;
      margin: 20px 0 12px 0;
      line-height: 1.3;
    }

    h1 {
      font-size: 28px;
    }
    h2 {
      font-size: 24px;
    }
    h3 {
      font-size: 20px;
    }
    h4 {
      font-size: 18px;
    }
    h5 {
      font-size: 16px;
    }
    h6 {
      font-size: 14px;
    }

    /* Lists */
    ul,
    ol {
      padding-left: 24px;
      margin: 0s;

      li {
        margin: 0;
        line-height: 1.5;

        p {
          margin: 0;
        }
      }
    }

    ul {
      list-style-type: disc;

      li::marker {
        color: #1a1a1a;
      }
    }

    ol {
      list-style-type: decimal;

      li::marker {
        color: #1a1a1a;
        font-weight: 600;
      }
    }

    /* Nested lists */
    ul ul,
    ol ol,
    ul ol,
    ol ul {
      margin: 4px 0;
    }

    /* Blockquote */
    blockquote {
      border-left: 4px solid #577cf6;
      padding-left: 16px;
      margin: 16px 0;
      background: #f8faff;
      padding: 12px 16px;
      border-radius: 8px;
      font-style: italic;
      color: #5a6c7d;
    }

    /* Code */
    code {
      background: #f1f3f4;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: "Courier New", Courier, monospace;
      font-size: 13px;
      color: #d73a49;
    }

    /* Pre-formatted text */
    pre {
      background: #1a1a1a;
      color: #ffffff;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 16px 0;

      code {
        background: transparent;
        padding: 0;
        color: #ffffff;
      }
    }

    /* Links */
    a {
      color: #577cf6;
      text-decoration: underline;
      text-decoration-color: rgba(87, 124, 246, 0.4);
      text-underline-offset: 2px;
      transition: all 0.2s ease;

      &:hover {
        color: #4a69e2;
        text-decoration-color: #4a69e2;
      }
    }

    /* Placeholder */
    &.ProseMirror-focused::before {
      display: none;
    }

    &:empty::before {
      content: "Bắt đầu viết nội dung của bạn...";
      color: #a0a0a0;
      pointer-events: none;
      position: absolute;
      font-style: italic;
    }
  }

  /* Scrollbar styling */
  .ProseMirror::-webkit-scrollbar {
    width: 6px;
  }

  .ProseMirror::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .ProseMirror::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;

    &:hover {
      background: #a8a8a8;
    }
  }
`;

const EditorWrapper = styled.div`
  position: relative;
`;

const EditorSection = ({ title, editor, renderToolbar }) => {
  return (
    <StyledCard>
      <StyledTitle level={3}>{title}</StyledTitle>
      <EditorWrapper>
        {renderToolbar()}
        <EditorContainer>
          <EditorContent editor={editor} />
        </EditorContainer>
      </EditorWrapper>
    </StyledCard>
  );
};

export default EditorSection;
