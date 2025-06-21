import { Modal, Button, Typography, Row, Col, Divider } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

// Styled container cho modal content
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// Styled button
const RoleButton = styled(Button)`
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &.employer {
    background-color: #577cf6;
    border-color: #577cf6;
    color: #fff;

    &:hover {
      background-color: #4667d1 !important;
      border-color: #4667d1 !important;
    }
  }

  &.candidate {
    background-color: #fff;
    border-color: #577cf6;
    color: #577cf6;

    &:hover {
      background-color: #f5f9ff !important;
      color: #4667d1 !important;
    }
  }
`;

const RoleSelectionModal = ({ visible, onClose }) => {
  const navigate = useNavigate();

  const handleEmployerSelect = () => {
    onClose(); // Đóng modal và ở lại trang hiện tại
  };

  const handleCandidateSelect = () => {
    onClose(); // Đóng modal
    navigate("/signup"); // Điều hướng đến trang đăng ký ứng viên
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false} // Không cho đóng bằng nút X
      maskClosable={false} // Không cho đóng bằng cách click bên ngoài
      centered
      style={{ minWidth: "40rem" }}
    >
      <ModalContent>
        <Title level={4} style={{ padding: "36px 36px 0px", margin: 0 }}>
          Chào bạn,
        </Title>
        <Text style={{ padding: "0 36px 36px", margin: 0 }}>
          Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!
        </Text>
        <Divider type="horizontal" />
        <Title level={5} style={{ padding: "16px 36px 0px", margin: 0 }}>
          Để tối ưu tốt nhất trải nghiệm của bạn với Jobzi,
        </Title>
        <Title level={5} style={{ padding: "0px 36px 36px", margin: 0 }}>
          vui lòng lựa chọn nhóm phù hợp nhất với bạn.
        </Title>
        <Row gutter={[36, 36]} style={{ margin: "36px 0 36px" }}>
          <Col>
            <RoleButton
              className="employer"
              type="primary"
              onClick={handleEmployerSelect}
            >
              Tôi là nhà tuyển dụng
            </RoleButton>
          </Col>
          <Col>
            <RoleButton
              className="candidate"
              type="default"
              onClick={handleCandidateSelect}
            >
              Tôi là ứng viên tìm việc
            </RoleButton>
          </Col>
        </Row>
      </ModalContent>
    </Modal>
  );
};

export default RoleSelectionModal;
