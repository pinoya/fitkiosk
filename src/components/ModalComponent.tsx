import React from "react";
import Modal from "react-modal";

type ModalComponentProps = {
  isOpen: boolean;
  detectedLabel: string | null;
  selfieURL: string | null; // Add selfieURL prop
  onClose: () => void;
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  detectedLabel,
  selfieURL,
  onClose,
}) => {
  const modalStyles = {
    content: {
      width: "500px", // 모달 창의 너비를 300px로 설정
      height: "800px", // 모달 창의 높이를 200px로 설정
      margin: "auto", // 모달을 화면 가운데로 정렬
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Detected Label Modal"
      style={modalStyles}
    >


      <h2>{`${detectedLabel}님\n인증 완료되었습니다.`}</h2>
      {/* Display the selfie image */}
      {selfieURL && <img src={selfieURL} alt="Captured Selfie" style={{ width: "100%", height: "auto" }} />}
      <p>{'회원번호 20230315'}</p>
      <p>{'전화번호 010-2143-5287'}</p>

      <button style={{background: "#FF6300" }}>출석</button>
      <button style={{background: "#A8B1CE" }} onClick={onClose}>취소</button>
    </Modal>
  );
};

export default ModalComponent;



