import React from "react";
import { Button, Tooltip } from "antd";
import { EditorContent } from "@tiptap/react";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const EditorContainer = styled.div`
  background: #ffffff;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border: 1px solid #d8d9d9;
  border-top: none;
  padding: 20px;
  height: 300px;
  overflow-y: auto;
  position: relative;
  transition: all 0.3s ease;

  .ProseMirror {
    outline: none;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 15px;
    line-height: 1.3;
    color: #2c3e50;
    min-height: 200px;
    padding: 0;

    p {
      margin: 0 0 12px 0;
      &:last-child {
        margin-bottom: 0;
      }
    }

    strong {
      font-weight: 600;
      color: #1a1a1a;
    }

    em {
      font-style: italic;
      color: #34495e;
    }

    u {
      text-decoration: underline;
      text-decoration-color: #2c3e50;
      text-decoration-thickness: 1px;
      text-underline-offset: 1px;
    }

    ul,
    ol {
      padding-left: 24px;
      margin: 0;

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

    &:empty::before {
      content: "Bắt đầu viết nội dung của bạn...";
      color: #a0a0a0;
      pointer-events: none;
      position: absolute;
      font-style: italic;
    }
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 6px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border: 1px solid #d8d9d9;

  .ant-btn {
    border-radius: 12px;
    font-weight: 500;
    height: 36px;
    min-width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border: 1px solid #d8d9d9;
    background: #ffffff;
  }

  .ant-btn-primary {
    background: #577cf6;
    border-color: #577cf6;
    color: #ffffff;

    &:hover {
      background: #577cf6 !important;
      border-color: #577cf6 !important;
    }
  }

  .toolbar-divider {
    width: 1px;
    height: 24px;
    background: #d8d9d9;
    margin: 6px 4px;
  }
`;

const ToolbarGroup = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const EditorWrapper = styled.div`
  position: relative;
`;

const TextEditor = ({ editor, disabled }) => {
  if (!editor) return null;

  // Hàm xử lý nội dung dán vào
  const handlePaste = (editor, event, slice) => {
    const pastedContent = slice.content;

    // Chuyển đổi nội dung dán thành HTML
    const html = editor.storage.markdown.getMarkdown(pastedContent);

    // Tạo một DOM ảo để xử lý nội dung HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Loại bỏ các style inline liên quan đến font
    const elementsWithStyle = doc.querySelectorAll("[style]");
    elementsWithStyle.forEach((element) => {
      const style = element.getAttribute("style");
      if (style) {
        // Loại bỏ font-family, font-size và các thuộc tính liên quan
        const newStyle = style
          .split(";")
          .filter(
            (s) =>
              !s.includes("font-family") &&
              !s.includes("font-size") &&
              !s.includes("color") &&
              !s.includes("background-color")
          )
          .join(";");
        if (newStyle) {
          element.setAttribute("style", newStyle);
        } else {
          element.removeAttribute("style");
        }
      }
    });

    // Áp dụng font chữ mặc định của Tiptap
    const elements = doc.querySelectorAll("p, span, div, li, strong, em, u");
    elements.forEach((element) => {
      element.style.fontFamily =
        '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
      element.style.fontSize = "15px";
      element.style.lineHeight = "1.3";
    });

    // Chuyển đổi lại nội dung đã xử lý thành HTML
    const cleanedHtml = doc.body.innerHTML;

    // Chèn nội dung đã được làm sạch vào editor
    editor.commands.setContent(cleanedHtml, false, {
      preserveWhitespace: true,
    });

    // Ngăn chặn hành vi dán mặc định
    return true;
  };

  const toolbarButtons = [
    {
      group: "format",
      buttons: [
        {
          icon: <BoldOutlined />,
          action: () => editor.chain().focus().toggleBold().run(),
          isActive: () => editor.isActive("bold"),
          tooltip: "In đậm (Ctrl+B)",
        },
        {
          icon: <ItalicOutlined />,
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive("italic"),
          tooltip: "In nghiêng (Ctrl+I)",
        },
        {
          icon: <UnderlineOutlined />,
          action: () => editor.chain().focus().toggleUnderline().run(),
          isActive: () => editor.isActive("underline"),
          tooltip: "Gạch chân (Ctrl+U)",
        },
      ],
    },
    {
      group: "list",
      buttons: [
        {
          icon: <OrderedListOutlined />,
          action: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: () => editor.isActive("orderedList"),
          tooltip: "Danh sách có số",
        },
        {
          icon: <UnorderedListOutlined />,
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: () => editor.isActive("bulletList"),
          tooltip: "Danh sách gạch đầu dòng",
        },
      ],
    },
    {
      group: "history",
      buttons: [
        {
          icon: <UndoOutlined />,
          action: () => editor.chain().focus().undo().run(),
          isActive: () => false,
          tooltip: "Undo (Ctrl+Z)",
          disabled: () => !editor.can().undo(),
        },
        {
          icon: <RedoOutlined />,
          action: () => editor.chain().focus().redo().run(),
          isActive: () => false,
          tooltip: "Redo (Ctrl+Y)",
          disabled: () => !editor.can().redo(),
        },
      ],
    },
  ];

  const renderToolbar = () => (
    <Toolbar>
      {toolbarButtons.map((group, groupIndex) => (
        <React.Fragment key={group.group}>
          <ToolbarGroup>
            {group.buttons.map((button, buttonIndex) => (
              <Tooltip key={buttonIndex} title={button.tooltip} placement="top">
                <Button
                  onClick={button.action}
                  type={button.isActive() ? "primary" : "default"}
                  icon={button.icon}
                  disabled={disabled || (button.disabled && button.disabled())}
                  size="small"
                />
              </Tooltip>
            ))}
          </ToolbarGroup>
          {groupIndex < toolbarButtons.length - 1 && (
            <div className="toolbar-divider" />
          )}
        </React.Fragment>
      ))}
    </Toolbar>
  );

  return (
    <EditorWrapper>
      {renderToolbar()}
      <EditorContainer>
        <EditorContent
          editor={editor}
          editorProps={{ handlePaste, editable: !disabled }}
        />
      </EditorContainer>
    </EditorWrapper>
  );
};

export default TextEditor;
