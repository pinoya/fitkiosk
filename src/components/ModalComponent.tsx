import React, { useState, useEffect } from "react";
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
import { CapacitorHttp } from "@capacitor/core";

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
  recentTime : string | null;
  flag : string | null;
  gymcode: string | null;
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
  recentTime,
  flag,
  gymcode,
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


  const [timer, setTimer] = useState('');
  
  const currentTimer = async () => {
    
    var now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const years = now.getFullYear();
    const months = String(now.getMonth() + 1).padStart(2,"0");
    const days = String(now.getDate()).padStart(2,"0");

    const timerValue = `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`;
    setTimer(timerValue);
  };

  const startTimer = () => {
    currentTimer();

  };

  useEffect(() => {
    startTimer();
    console.log("실행횟수?");
  }, []);


  const handleEnterbutton = () => {
    setIsNewModalOpen(true);
    updateFlagTime(); 
  };

  const updateFlagTime = async () => {
    let url = 'http://dev.wisevill.com/kioskdb/update_in.php';
    const options = {
      url: url,
      data: {
        id: mid,
        code : gymcode,
        time: timer,
      },
    };
    const response = await CapacitorHttp.post(options);
    console.log(response);
  };
  
  const handleExitbutton = () => {
    setIsNewModalOpen(true);
    updateOutFlagTime(); 
  };


  const updateOutFlagTime = async () => {
    let url = 'http://dev.wisevill.com/kioskdb/update_out.php';
    const options = {
      url: url,
      data: {
        id: mid,
        code : gymcode,
        time: timer,
      },
    };
    const response = await CapacitorHttp.post(options);
    console.log(response);
  };

  const handleNewModalCancel = () => {
    onClose();
    setIsNewModalOpen(false);
  };
  

  let InOutbutton;
  
  if(flag == '0'){
    InOutbutton = <button className="btn_attandance" onClick={handleEnterbutton}>
    출석
  </button>
  }
  else if(flag == '1'){
    InOutbutton = <button className="btn_attandance" onClick={handleExitbutton}>
    퇴실
  </button>
  }

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
                  {InOutbutton}
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

        <IonModal className="welcome" backdropDismiss = {false} isOpen={true} onRequestClose={() => setIsNewModalOpen(false)} contentLabel="New Modal" style={modalStyles}>

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
            recentTime={recentTime}
            flag = {flag}
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
























