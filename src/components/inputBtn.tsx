import './inputBtn.css';

import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';

const InputBtn = (props: any) => {
    function btn_in() {
        if(props.typeid == false) {
            if (props.id.length != 5) {
                console.log("id를 다시 확인해주세요.");
            } else {
                console.log(props.id + "님 입장 하셨습니다.");
                //props.setisbtnOpen(true);
                props.setisbtnOpen(true);
                
            }    
        } else {
            if (props.id.length != 13) {
                console.log("id를 다시 확인해주세요.");
            } else {
                console.log(props.id + "님 입장 하셨습니다.");
               props.setisbtnOpen(true);
            }    
        }    
    }

    function btn_out() {
        if(props.typeid == false) {
            if (props.id.length != 5) {
                console.log("id를 다시 확인해주세요.");
            } else {
                console.log(props.id + "님 퇴장 하셨습니다.");
                props.setisoutOpen(true);
            }    
        } else {
            if (props.id.length != 13) {
                console.log("id를 다시 확인해주세요.");
            } else {
                console.log(props.id + "님 퇴장 하셨습니다.");
                props.setisoutOpen(true);
            }    
        }    
    }

    function btn_call() {
        console.log("직원 호출 중입니다.");
    }

    return (
        <>
            <IonGrid class="btns">
                <IonRow>
                    <IonCol class="out_btn">
                        <IonButton class="out_btn" onClick={btn_out}>퇴소하기</IonButton>
                    </IonCol>
                    <IonCol class="call_btn">
                        <IonButton class="call_btn" onClick={btn_call} trigger={props.trigger}>직원호출</IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol class="in_btn">
                        <IonButton class="in_btn" onClick={btn_in}  trigger={props.trigger}>출석하기</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </>
    );
}

export default InputBtn;