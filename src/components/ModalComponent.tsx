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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Detected Label Modal"
    >
      <h2>{`환영합니다, ${detectedLabel}님!`}</h2>
      <button onClick={onClose}>Close Modal</button>
    </Modal>
  );
};

export default ModalComponent;
