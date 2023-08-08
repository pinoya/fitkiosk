import React from "react";
import { IonLabel, IonModal, IonSegment, IonSegmentButton, setupIonicReact } from '@ionic/react'
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import './password.css';
import './allinone.css';
import Welcome from '../pages/welecome';

type ModalComponentProps = {
  id: string | null;
  idd: string | null;
  // detectedName: string | null;
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

  userpwd: string | null;
  onClose: () => void;


};

const Password: React.FC<ModalComponentProps> = ({
  id,
  idd,
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
  userpwd,
  onClose,
}) => {

  const [inputwhat, setinputwhat] = useState('비밀번호를 입력하세요.'); //어떤 숫자 쳤는지
  const addtext = (value) => {
    if (inputwhat === '비밀번호를 입력하세요.') {
      setinputwhat(value); // 첫번째 수로 바뀜
    } else {
      setinputwhat((prevInput) => prevInput + value); // 계속 더해줌
    }
  };

  const resettext = () => {
    setinputwhat('');
  }
  const deletetext = () => {
    if (inputwhat != null) {
      setinputwhat((prevInput) => prevInput.slice(0, -1));
    }
  };

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
    // if (userpwd === inputwhat) {
    //   console.log('패스워드 일치!');
    //   setIsNewModalOpen(true);
    // } else {
    //   console.log('패스워드 불일치!');
    // }

    setIsNewModalOpen(true);

    /*setTimeout(() => {
      setIsNewModalOpen(false);
      onClose();
      
    }, 5000);*/

  };

  const handleNewModalCancel = () => {

    setIsNewModalOpen(false);
    onClose();

  }

  return (
    <>
      {/* <IonModal isOpen={isopen}  > */}
        <IonGrid>
          <IonRow class="input_padd">
            <IonRow class="input_roww">
              <IonCol class="input_boxx">
                <IonButton class="input_btnn" onClick={() => addtext("1")}>1</IonButton>
                <IonButton class="input_btnn" onClick={() => addtext("2")}>2</IonButton>
                <IonButton class="input_btnn" onClick={() => addtext("3")}>3</IonButton>



              </IonCol>
            </IonRow>


            <IonRow class="input_roww">
              <IonCol class="input_boxx">
                <IonButton class="input_btnn" onClick={() => addtext("4")}>4</IonButton>
                <IonButton class="input_btnn" onClick={() => addtext("5")}>5</IonButton>
                <IonButton class="input_btnn" onClick={() => addtext("6")}>6</IonButton>
              </IonCol>

            </IonRow>
            <IonRow class="input_roww">
              <IonCol class="input_boxx">
                <IonButton class="input_btnn" onClick={() => addtext("7")}>7</IonButton>
                <IonButton class="input_btnn" onClick={() => addtext("8")}>8</IonButton>
                <IonButton class="input_btnn" onClick={() => addtext("9")}>9</IonButton>
              </IonCol>

            </IonRow>

            <IonRow class="input_roww">
              <IonCol class="input_boxx">
                <IonButton class="input_btnn" style={{ fontSize: '26px' }} onClick={resettext}>취소</IonButton>
                <IonButton class="input_btnn" onClick={() => addtext("0")}>0</IonButton>
                <IonButton class="input_btnn" onClick={deletetext}>X</IonButton>
              </IonCol>

            </IonRow>

          </IonRow>
          <IonRow>
            <IonRow className="pw_body">
              <IonCol className="pw_body2">
                <div className="pw_body3">
                  <div className="pw_body3_first">
                    <p className="pw_body3_first_p">회원번호</p>
                    <p className="pw_body3_first_p2">{mid}</p>
                  </div>

                  <div className="pw_body3_second">
                    <p className="pw_body3_second_p">{idd}</p>
                    <p className="pw_body3_second_p2">님, 출석 비밀번호를 입력해 주세요.</p>
                  </div>

                  <div className="pw_body3_box">
                    <p className="pw_body3_box_input">{inputwhat}</p>

                  </div>

                  <div className="pw_body3_last">
                    <div className="pw_body3_last_div1">
                      <button onClick={handleConfirm} className="pw_body3_last_button1">
                        출석
                      </button>
                    </div>

                    <div className="pw_body3_last_div2">
                      <button onClick={onClose} className="pw_body3_last_button2">취소</button>
                    </div>
                  </div>
                </div>
              </IonCol>
            </IonRow>
          </IonRow>
        </IonGrid>
      {/* </IonModal> */}

      {/* New Modal */}
      {isNewModalOpen && (
        <IonModal className="welcome" backdropDismiss = {false} isOpen={true} onRequestClose={() => setIsNewModalOpen(false)} contentLabel="New Modal" style={modalStyles}>
          <Welcome
            idd={idd}
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
  )
}

export default Password