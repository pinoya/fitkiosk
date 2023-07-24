import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonNavLink,
  IonToolbar,
  IonTitle,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid
} from '@ionic/react';
import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';

import PageOne from './page1';


function PageFour() {
  const [width, setWidth] = useState(window.innerWidth);
  const [timer, setTimer] = useState('00시 00분');
  const [local,setLocal] = useState('00시 00분');


  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    setTimer(`${hours}시 ${minutes}분`);
  };

  const currentLocal = () =>{
    const timesString = window.localStorage.getItem('times');
    const localHour = timesString?.slice(8,10);
    const localMinut = timesString?.slice(20,22);
    setLocal(`${localHour}시 ${localMinut}분`);
  }

  const startTimer = () => {
    currentTimer();
    currentLocal(); 
    setInterval(currentTimer, 60000); // 1분마다 한번씩 함수 돌게
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    startTimer(); 
  }, []);


  const handleResize = () => {
    setWidth(window.innerWidth);
  };


  return (
    <>
    <IonHeader>
    <IonToolbar>
        <div className='head1'>
          <IonButtons slot="start">
         <IonBackButton></IonBackButton>
            
          </IonButtons>
          
          <IonTitle className='title'></IonTitle>
          </div>
          </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
      <div id="container">
      <IonGrid>
        <IonCard className='page3_card'>
        <IonCardHeader>
        </IonCardHeader>
      <div>
      <IonCardContent className=''>
        <IonRow>
          <IonCol size='12'>
            <div className='client'>최민희 님 환영합니다.</div>
          </IonCol>
          <IonCol size='12'>
            <div className='come'>입장시간 : {local}</div>
          </IonCol>
          <IonCol size='12'>
            <div className='come'>퇴장시간 : {timer}</div>
          </IonCol>
          <IonCol size='12'>
            <div className='checkplz'>퇴장하실 때도 꼭 체크해주시길 바랍니다.</div>
          </IonCol>
        </IonRow>
       
      
        </IonCardContent>
      
        <IonNavLink routerDirection="forward" component={() => <PageOne />}>
    
      <IonCol size='12'><IonButton id='login-form-submit' className='page3_submit' >확인</IonButton></IonCol>
      </IonNavLink>
      </div>
    
    </IonCard>
    
    </IonGrid>
    </div>
      </IonContent>
    </>
  );
}

export default PageFour;