import { useState } from 'react';
import './inputBtn.css';

import { IonButton, IonCol, IonGrid, IonRow, IonToast } from '@ionic/react';

const InputBtn = (props: any) => {
    function btn_in() {
        if (props.typeid == false) { //회원번호 typeid = {false}
            if (props.id.length != 5) {
                // console.log("id를 다시 확인해주세요.");
                settoastopen(true);
            } else {
                console.log(props.id + "님 입장 하셨습니다.");
                //props.setisbtnOpen(true);
                props.setisbtnOpen(true);

            }
        } else { //전화번호 typeid = {ture}
            if (props.id.length != 13) {
                // console.log("id를 다시 확인해주세요.");
                settoastopen(true);
            } else {
                console.log(props.id + "님 입장 하셨습니다.");
                props.setisbtnOpen(true);
            }
        }
    }

    function btn_out() {
        if (props.typeid == false) {
            if (props.id.length != 5) {
                // console.log("id를 다시 확인해주세요.");
                settoastopen(true);
            } else {
                console.log(props.id + "님 퇴장 하셨습니다.");
                props.setisbtnoutOpen(true);
            }
        } else {
            if (props.id.length != 13) {
                // console.log("id를 다시 확인해주세요.");
                settoastopen(true);
            } else {
                console.log(props.id + "님 퇴장 하셨습니다.");
                props.setisbtnoutOpen(true);
            }
        }
    }

    function btn_call() {
        console.log("직원 호출 중입니다.");
    }

    const [toastopen, settoastopen] = useState(false);

    return (
        <>
            <IonToast isOpen={toastopen} message={"ID/TEL 을 다시 확인해 주세요."} duration={1500} onDidDismiss={() => settoastopen(false)} color={"light"} layout='stacked'></IonToast>
            <IonGrid class="btns">
                <IonRow>
                    <IonCol class="out_btn">
                        <IonButton className="out_btn" onClick={btn_out}>퇴소하기</IonButton>
                    </IonCol>
                    <IonCol class="call_btn">
                        <IonButton className="call_btn" onClick={btn_call}>직원호출</IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol class="in_btn">
                        <IonButton className="in_btn" onClick={btn_in}>출석하기</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </>
    );
}

export default InputBtn;