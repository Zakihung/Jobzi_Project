import React from "react";
import { Button, Tooltip } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  UndoOutlined,
  RedoOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

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

const EditorToolbar = ({ editor }) => {
  if (!editor) return null;

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

  return (
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
                  disabled={button.disabled ? button.disabled() : false}
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
};

export default EditorToolbar;
