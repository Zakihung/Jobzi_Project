import React from "react";
import { Button } from "antd";
import styled from "styled-components";

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

const EditorToolbar = ({ editor }) => {
  if (!editor) return null;
  return (
    <Toolbar>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        type={editor.isActive("bold") ? "primary" : "default"}
      >
        B
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        type={editor.isActive("italic") ? "primary" : "default"}
      >
        I
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        type={editor.isActive("underline") ? "primary" : "default"}
      >
        U
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        type={editor.isActive("orderedList") ? "primary" : "default"}
      >
        1.
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        type={editor.isActive("bulletList") ? "primary" : "default"}
      >
        •
      </Button>
    </Toolbar>
  );
};

export default EditorToolbar;
