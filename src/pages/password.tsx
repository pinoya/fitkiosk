import React from "react";
import { IonLabel, IonModal, IonSegment, IonSegmentButton, setupIonicReact } from '@ionic/react'
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import './password.css';
import './allinone.css';
import Welcome from '../pages/welecome';
import { CapacitorHttp } from "@capacitor/core";

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
  recentTime: string | null;
  userpassword: string | null;
  flag: string | null;
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
  userpassword,
  recentTime,
  flag,
  onClose,
}) => {

  const [inputwhat, setinputwhat] = useState('비밀번호를 입력하세요.'); //어떤 숫자 쳤는지

  const addtext = (value: any) => {
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



  const [timer, setTimer] = useState('');

  const currentTimer = async () => {

    var now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const years = now.getFullYear();
    const months = String(now.getMonth() + 1).padStart(2, "0");
    const days = String(now.getDate()).padStart(2, "0");

    const timerValue = `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`;
    setTimer(timerValue);
  };


  const startTimer = () => {
    currentTimer();

  };

  useEffect(() => {
    startTimer();

  }, []);

  const inner_pw = document.getElementById("inner_pw");

  const handleConfirm = () => {
    if (userpassword === inputwhat) {
      updateFlagTime();
      console.log('패스워드 일치!');
      setIsNewModalOpen(true);
      // setTimeout(() => {
      //   handleNewModalCancel();
      // }, 10000);
    }
    else {
      if (inner_pw) {
        inner_pw.innerText = `비밀번호를 잘못 입력했습니다.
      입력하신 내용을 다시 확인해주세요.`;
        console.log('패스워드 불일치!');
        setIsNewModalOpen(false);
      }
    }
  };


  const updateFlagTime = async () => {
    let url = 'http://dev.wisevill.com/kioskdb/update_in.php';
    const options = {
      url: url,
      data: {
        id: mid,
        time: timer,
      },
    };
    const response = await CapacitorHttp.post(options);
    console.log(response);
  };

  const [iswelcomeOpen, setIsWelcomeOpen] = useState(false);

  const handleExitbutton = () => {
    if (userpassword === inputwhat) {
      updateOutFlagTime();
      console.log('패스워드 일치!');
      setIsNewModalOpen(true);
      // setTimeout(() => {
      //   handleNewModalCancel();
      // }, 10000);


    }
    else {
      if (inner_pw) {
        inner_pw.innerText = `비밀번호를 잘못 입력했습니다.
      입력하신 내용을 다시 확인해주세요.`;
        console.log('패스워드 불일치!');
        setIsNewModalOpen(false);
      }
    }
  };



  const updateOutFlagTime = async () => {
    let url = 'http://dev.wisevill.com/kioskdb/update_out.php';
    const options = {
      url: url,
      data: {
        id: mid,
        time: timer,
      },
    };
    const response = await CapacitorHttp.post(options);
    console.log(response);
  };

  const handleNewModalCancel = () => {

    onClose();
    setIsNewModalOpen(false);

  }


  let InOutbutton;

  if (flag == '0') {
    InOutbutton = <button onClick={handleConfirm} className="pw_body3_last_button1">
      출석
    </button>
  }
  else if (flag == '1') {
    InOutbutton = <button onClick={handleExitbutton} className="pw_body3_last_button1">
      퇴실
    </button>
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
                  <p className="pw_body3_second_p2">님, 비밀번호를 입력해 주세요.</p>
                </div>

                <div className="pw_body3_box">
                  <p className="pw_body3_box_input">{inputwhat}</p>

                </div>
                <p id='inner_pw' style={{ color: '#ff6300', fontSize: '12px' }}></p>



                <div className="pw_body3_last">
                  <div className="pw_body3_last_div1">
                    {/* <button onClick={handleConfirm} className="pw_body3_last_button1">
                      퇴실
                    </button> */}
                    {InOutbutton}
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
        <IonModal className="welcome" backdropDismiss={false} isOpen={true} onRequestClose={() => setIsNewModalOpen(false)} contentLabel="New Modal" style={modalStyles}>
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
            recentTime={recentTime}
            flag={flag}
            iswelcomeOpen={iswelcomeOpen}
            setIsWelcomeOpen={setIsWelcomeOpen}
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