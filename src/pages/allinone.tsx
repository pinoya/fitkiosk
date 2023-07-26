import './allinone.css';
import MainImg from './testimg.jpg';

import Input_Box from '../components/inputNum';
import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';

function Kiosk() {
    return (
        <>
            <IonContent>
                <div className='background-image-init' />
                <div className='background-image-img' />
                <div className='background-image-gradient' />

                <div className='content'>
                    <IonGrid class="window">
                        <IonRow class="title">
                            <IonCol>
                                체육관 이름<br/>및<br/>체육관 정보
                            </IonCol>
                        </IonRow>
                        <IonRow class="announcement">
                            <IonCol class="announcement">
                                <div className='announcement'>공지사항</div>
                            </IonCol>
                        </IonRow>
                        <IonRow class="bottom_side">
                            <IonCol size="8" class="main_input_box">
                                <div className='main_input_box'><Input_Box /></div>
                            </IonCol>
                            <IonCol size="4" class="btn_and_face">
                                <IonRow class="face">1</IonRow>
                                <IonRow class="btn">2</IonRow>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </>
    );
}

export default Kiosk;