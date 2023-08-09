import { IonLabel, IonModal, IonSegment, IonSegmentButton, setupIonicReact } from '@ionic/react'

setupIonicReact({ mode: 'md' })

import {IonButton, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './inputNum.css';
import { useEffect, useRef, useState } from 'react';


//딱 5자리 되거나 13자리 됐을때만 플레그값 고치는걸로 수정하면 좋을듯함.

const input_num = (props: any) => {
  const [inputwhat, setinputwhat] = useState(false);
  const [inputtext, setinputtext] = useState("회원번호 입력 (5자리)");
  const [input_flag, setinput_flag] = useState(false);

  const check_inputtext = (e: string) => {
    if (e == "clubID") {
      setinputwhat(false);
      setinputtext("회원번호 입력 (5자리)");
    }
    else if (e == "Tel") {
      setinputwhat(true);
      setinputtext("010-");
    }
    setinput_flag(false);
  }

  const description = "만약 얼굴인식이 안되는 경우, \n본인의 회원번호(5자리) 혹은 휴대폰번호를 입력해주세요.";

  // const alertIdFail = "\n다시 입력해주세요."

  const addtext = (e: any) => {
    if (inputwhat == false) {
      props.settypeid(false);
      ifclubid(e);
    } else if (inputwhat == true) {
      props.settypeid(true);
      iftel(e);
    }
  }

  const ifclubid = (e: any) => {
    if (input_flag == false && inputtext.length >= 6) {
      setinputtext("" + e.target.textContent);
      setinput_flag(true);
    }
    if (inputtext.length == 5) {
    } else if (inputtext.length > 5) {
      setinputtext(e.target.textContent);
    } else {
      setinputtext(inputtext + e.target.textContent);
    }
  }

  const iftel = (e: any) => {
    if (input_flag == false) {
      setinputtext("" + e.target.textContent);
      setinput_flag(true);
    }
    if (inputtext.length == 3 || inputtext.length == 8) {
      setinputtext(inputtext + '-' + e.target.textContent);
    } else if (inputtext.length >= 13) {
      if (inputtext.length > 13) {
        setinputtext(e.target.textContent);
      }
      else {

      }
    }
    else {
      setinputtext(inputtext + e.target.textContent);
    }
    props.AlertFunc(inputtext);
  }

  const deletetext = () => {
    if (inputwhat == true && (inputtext.length == 5 || inputtext.length == 10)) {
      setinputtext(inputtext.slice(0, -2));
    } else setinputtext(inputtext.slice(0, -1));
  }

  const resettext = () => {
    setinputtext("");
  }

  useEffect(() => {
    props.AlertFunc(inputtext);
  })

  return (
    <>
      <IonHeader />

      <IonContent>
        <IonGrid class="input_box">
          <IonRow class="input_segment">
            {/* 여기서 segment 상태 입력 받을 수 있다. */}
            <IonSegment class="input_segment" onIonChange={(e: any) => check_inputtext(e.target.value)}>
              <IonSegmentButton class="input_segment" value="clubID">
                <IonLabel>회원번호</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton class="input_segment" value="Tel">
                <IonLabel>휴대폰번호</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonRow>

          <IonRow class="input_div_row">
            <IonCol class="input_box"><div className="input_div ion-text-center">{inputtext}</div></IonCol>
          </IonRow>

          <IonRow class="input_desc">
            <div className="hr" />
            <div className="input_desc">
              {description}
              {/* {idFail} */}
            </div>
          </IonRow>

          <IonRow class="input_pad">
            <IonRow class="input_row">
              <IonCol class="input_box">
                <IonButton class="input_btn" onClick={addtext}>1</IonButton>
                <IonButton class="input_btn" onClick={addtext}>2</IonButton>
                <IonButton class="input_btn" onClick={addtext}>3</IonButton>
              </IonCol>
            </IonRow>
            <IonRow class="input_row">
              <IonCol class="input_box">
                <IonButton class="input_btn" onClick={addtext}>4</IonButton>
                <IonButton class="input_btn" onClick={addtext}>5</IonButton>
                <IonButton class="input_btn" onClick={addtext}>6</IonButton>
              </IonCol>
            </IonRow>
            <IonRow class="input_row">
              <IonCol class="input_box">
                <IonButton class="input_btn" onClick={addtext}>7</IonButton>
                <IonButton class="input_btn" onClick={addtext}>8</IonButton>
                <IonButton class="input_btn" onClick={addtext}>9</IonButton>
              </IonCol>
            </IonRow>
            <IonRow class="input_row">
              <IonCol class="input_box">
                <IonButton class="input_btn" onClick={resettext}>취소</IonButton>
                <IonButton class="input_btn" onClick={addtext}>0</IonButton>
                <IonButton class="input_btn" onClick={deletetext}>←</IonButton>
              </IonCol>
            </IonRow>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default input_num;
