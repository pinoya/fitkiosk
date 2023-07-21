import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonNavLink, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';

import './Home.css';
import Exit from './exit';
import Entrance from './entrance';

const entrance: React.FC = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>입장</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <br>
              </br>
              <br>
              </br>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol id="frist">
              <div className="text_container">
                <h2>체육관 출결관리 시스템</h2>
                <p>현재 연동된 체육관 : 홀리데이 피트니스클럽(광주효천점)</p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>


        <IonGrid >
          <IonRow>
            <IonCol id="second"> <IonNavLink routerDirection="forward" component={() => <Entrance />}>
              <IonButton className="enumButton">회원번호로 입장</IonButton>
            </IonNavLink>
            </IonCol>
            <IonCol>
              <IonNavLink routerDirection="forward" component={() => <Exit />}>
                <IonButton className="pnumButton">전화번호로 입장</IonButton>
              </IonNavLink></IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </>

  );
};
export default entrance;