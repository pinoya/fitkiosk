import React from "react";
import Modal from "react-modal";

type ModalComponentProps = {
  isOpen: boolean;
  detectedLabel: string | null;
  onClose: () => void;
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  detectedLabel,
  onClose,
}) => {
  const modalStyles = {
    content: {
      width: "300px", // 모달 창의 너비를 300px로 설정
      height: "200px", // 모달 창의 높이를 200px로 설정
      margin: "auto", // 모달을 화면 가운데로 정렬
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Detected Label Modal"
      style={modalStyles} // 스타일 적용
    >
      <h2>{`환영합니다, ${detectedLabel}님!`}</h2>
      <button onClick={onClose}>Close Modal</button>
    </Modal>
  );
};

export default ModalComponent;



