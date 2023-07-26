import React from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons,
  IonNav, IonBackButton, IonGrid, IonRow, IonCol, IonInput,
  IonList, IonItem, IonCheckbox, IonLabel, IonNote, IonBadge, IonFab, IonFabButton, IonIcon, IonNavLink
} from '@ionic/react';
// import { settingsSharp } from 'ionicons/icons';
import Setlocation from "../page/page1";

import { RouteComponentProps } from 'react-router';

import './Home.css';
import Exit from './exit';
import Entrance from './entrance';



const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div id="title">
            <IonTitle>체육관 출결 관리</IonTitle>
          </div>
          <div id="setting-container">
            <IonNavLink routerDirection="forward" component={() => <Setlocation />}>
              <button><IonIcon name='heart' size="large"></IonIcon>
              </button>
            </IonNavLink>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">


        <IonGrid>
          <IonRow>
            <IonCol>
              <br>
              </br>

            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow>
            <IonCol>
              <div className="text_container">
                <h2>체육관 출결관리 시스템</h2>
                <p>현재 연동된 체육관 : 홀리데이 피트니스클럽(광주효천점)</p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid >
          <IonRow>
            <IonCol> <IonNavLink routerDirection="forward" component={() => <Entrance />}>
              <IonButton className="button1">입장</IonButton>
            </IonNavLink>
            </IonCol>
            <IonCol>
              <IonNavLink routerDirection="forward" component={() => <Exit />}>
                <IonButton className="button2">퇴장</IonButton>
              </IonNavLink></IonCol>
          </IonRow>
        </IonGrid>



        {/* <div id="container">
          <div className="text_container">
            <h2>체육관 출결관리 시스템</h2>
            <p>현재 연동된 체육관 : 홀리데이 피트니스클럽(광주효천점)</p>
          </div>
          <div className="button-container">
            <IonNavLink routerDirection="forward" component={() => <Entrance />}>
              <IonButton className="button1">입장</IonButton>
            </IonNavLink>

            <IonNavLink routerDirection="forward" component={() => <Exit />}>
              <IonButton className="button2">퇴장</IonButton>
            </IonNavLink>
          </div>
        </div> */}


        {/* <div id = "setting-container">
      <button onClick={() => props.history.push('/entrance')}>
      <IonIcon icon={settingsSharp}size="large"></IonIcon>
      </button>
      </div>
        <div id="container">
          <div className="block">
            <div className='text-container'>
              <h2 >체육관 출결 관리 시스템</h2>
              <p >현재 연동된 체육관 : 홀리데이 피트니스 클럽(광주효천점)</p>
            </div>
            <div className="button-container">
              <IonButton className="button1" onClick={() => props.history.push('/entrance')}> 입장</IonButton>
              <IonButton className="button2" onClick={() => props.history.push('/exit')}> 퇴장</IonButton>
            </div>
          </div>
        </div> */}

        {/* {/* <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => props.history.push('/new')}> 
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab> */}



      </IonContent>
    </IonPage>
  );
};

export default Home;


