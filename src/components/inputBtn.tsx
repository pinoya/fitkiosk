import './inputBtn.css';

import { IonButton, IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';

function click_check() {
    console.log("check");
}

function InputBtn() {

    return (
        <>
            <IonGrid class="btns">
                <IonRow>
                    <IonCol class="out_btn">
                        <IonButton class="out_btn" onClick={click_check}>퇴소하기</IonButton>
                    </IonCol>
                    <IonCol class="call_btn">
                        <IonButton class="call_btn" onClick={click_check}>직원호출</IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol class="in_btn">
                        <IonButton class="in_btn" onClick={click_check}>출석하기</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </>
    );
}

export default InputBtn;