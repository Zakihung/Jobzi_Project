import React, { useState, useEffect } from "react";
import { UpOutlined } from "@ant-design/icons";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className="scroll-to-top-button"
      style={{ display: visible ? "block" : "none" }}
    >
      <button onClick={scrollToTop} className="scroll-to-top-btn">
        <UpOutlined />
      </button>
      <style jsx>{`
        .scroll-to-top-button {
          position: fixed;
          bottom: 130px;
          right: 15px;
          z-index: 1006;
        }

        .scroll-to-top-btn {
          width: 50px;
          height: 50px;
          background: #577cf6;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
          transition: all 0.3s ease;
        }

        .scroll-to-top-btn:hover {
          background: #4c6ef5;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(87, 124, 246, 0.4);
        }

        @media (max-width: 576px) {
          .scroll-to-top-button {
            bottom: 75px;
            right: 12px;
          }

          .scroll-to-top-btn {
            width: 48px;
            height: 48px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollToTopButton;
