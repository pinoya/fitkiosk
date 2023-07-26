import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonCol, IonGrid, IonRow, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './gym_change.css';
import Home from './Home';
import Test from '../../public/test.svg';

function Logo() {
  /*체육관 코드 번호, 비밀번호*/ 
  const [width, setWidth] = useState(window.innerWidth);
  
  /*브라우저 크기 조절 */ 
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className='title'></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size='12'>
              <img style={{width:'4.7222vw', height:'4.2979vw'}}src={Test}></img>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <div style={{ fontWeight: '700', fontSize: '2.2222vw', color: 'black', textAlign: 'center', letterSpacing: '-0.0347vw' }}>홀리데이 피트니스클럽(광주효천점)
              </div>
            </IonCol>  
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
}

export default Logo;

