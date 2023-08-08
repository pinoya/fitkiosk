import React, { useState } from "react";
import Modal from "react-modal";
import './ModalComponent.css';
import {
  IonRow,
  IonCol,
  IonGrid,
  IonModal
} from '@ionic/react';

import Check from './check.svg';
import Welcome from "../pages/welecome";

type ModalComponentProps = {
  // isOpen: boolean;
  detectedName: string | null;
  mid: string | null;
  tel: string | null;
  selfieURL: string | null;
  mile: string | null;
  come: string | null;
  product: string | null;
  have: string | null;
  locker: string | null;
  duclass: string | null;
  left: string | null;
  inclass: string | null;
  onClose: () => void;

  
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  // isOpen,
  detectedName,
  mid,
  tel,
  selfieURL,
  mile,
  come,
  product,
  have,
  locker,
  duclass,
  left,
  inclass,
  onClose,
}) => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const modalStyles = {
    content: {
      width: "640px",
      height: "710px",
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
      {/* Original Modal style={modalStyles} */ }
      
        <IonGrid>
          <IonRow>
            <IonCol>
              <img className="Check_logo" src={Check} />
              <div className="modal_text">
                <h2 className="modal_h2"> {detectedName}{'님'}</h2>
              
                <h2 className="modal_h2">{`인증 완료되었습니다.`}</h2>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow>
            <IonCol>
              {selfieURL && <img src={selfieURL} className = "selfie"alt="Captured Selfie" style={{ width: "100%",  height: "310px" }} />}
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
                    <div className="real_num">{mid}</div>
                  </div>
                  <div className="Member_Number">
                    <div className="num_text">{'전화번호'}</div>
                    <div className="real_num"> {tel}</div>
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

      {/* New Modal */}
      {isNewModalOpen && (

        <IonModal  backdropDismiss = {false} isOpen={true} onRequestClose={() => setIsNewModalOpen(false)} contentLabel="New Modal" style={modalStyles}>

          <Welcome
          
            detectedName={detectedName}
            selfieURL={selfieURL}
            mile={mile}
            come={come}
            product={product}
            have={have}
            locker={locker}
            duclass={duclass}
            left={left}
            inclass={inclass}
            onRequestClose={() => setIsNewModalOpen(false)}
            onCancelButtonClick={handleNewModalCancel} // Pass the function here
          />

          {/* <button className="btn_cancel" onClick={handleNewModalCancel}>
            확인(이지만 아직은 취소)
          </button> */}


        </IonModal>
      )}
    </>
  );
};

export default ModalComponent;
























