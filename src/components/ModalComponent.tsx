import React, { useState } from "react";
import Modal from "react-modal";
import './ModalComponent.css';

import {
  IonRow,
  IonCol,
  IonGrid
} from '@ionic/react';

import Check from './check.svg';

type ModalComponentProps = {
  isOpen: boolean;
  detectedLabel: string | null;
  selfieURL: string | null;
  onClose: () => void;
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  detectedLabel,
  selfieURL,
  onClose,
}) => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const modalStyles = {
    content: {
      width: "500px",
      height: "800px",
      margin: "auto",
      background: "#232323",
    },
  };

  const handleConfirm = () => {
    setIsNewModalOpen(true);
  };

  const handleNewModalCancel = () => {
    setIsNewModalOpen(false);
    onClose();
  };

  return (
    <>
      {/* Original Modal */}
      <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detected Label Modal" style={modalStyles}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <img className="Check_logo" src={Check} />
              <div className="modal_text">
                <h2 className="modal_h2">{`${detectedLabel}님`}</h2>
                <h2 className="modal_h2">{`인증 완료되었습니다.`}</h2>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow>
            <IonCol>
              {selfieURL && <img src={selfieURL} alt="Captured Selfie" style={{ width: "100%", height: "350px" }} />}
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow>
            <IonCol>
              <div className="btn_block">
                <div className="modal_text">
                  <div className="Member_Number">
                    <div className="num_text">{'회원번호'}</div>
                    <div className="real_num">{'20230315'}</div>
                  </div>
                  <div className="Member_Number">
                    <div className="num_text">{'전화번호'}</div>
                    <div className="real_num"> {'010-2143-5287'}</div>
                  </div>
                </div>
                <div className="modal_button">
                  <button className="btn_attandance" onClick={handleConfirm}>
                    출석
                  </button>
                  <button className="btn_cancel" onClick={onClose}>
                    취소
                  </button>
                </div>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </Modal>

      {/* New Modal */}
      {isNewModalOpen && (
        <Modal isOpen={true} onRequestClose={() => setIsNewModalOpen(false)} contentLabel="New Modal" style={modalStyles}>
          {selfieURL && <img src={selfieURL} alt="Captured Selfie" style={{ width: "100%", height: "350px" }} />}
          <h2>New Modal Content</h2>
          <p>This is the content of the new modal.</p>
          <button className="btn_cancel" onClick={handleNewModalCancel}>
            확인(이지만 아직은 취소)
          </button>
        </Modal>
      )}
    </>
  );
};

export default ModalComponent;



