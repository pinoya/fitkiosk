import React from 'react';
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
  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonGrid
  
} from '@ionic/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import PageThree from './page3';
import { FiMapPin } from "react-icons/fi";

function PageTwo() {
    const [width, setWidth] = useState(window.innerWidth);

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
        <div className='head1'>
          <IonButtons slot="start">
         <IonBackButton></IonBackButton>
            
          </IonButtons>
          
          <IonTitle className='title'>체육관 설정</IonTitle>
          
          </div>
          </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
      <div id="container">
      <IonGrid>
        <IonCard className='card'>
          
          <IonRow> 
          <IonCol size='12'>
            <img className='img'alt="Silhouette of mountains" src="https://www.lottehotel.com/content/dam/lotte-hotel/signiel/seoul/facilities/fitness-spa/hotel-gym/180708-29-2000-fac-seoul-signiel.jpg.thumb.768.768.jpg" />
          </IonCol>
          </IonRow>

        <IonCardHeader>
        <IonRow>
          <IonCol size='12'>
            <IonCardTitle className='cardTitle'>홀리데이 피트니스클럽(광주효천점)</IonCardTitle>
          </IonCol>
          </IonRow>
          <IonRow>
          <IonCol size='12'>
            <IonCardSubtitle className='cardgym'>현재 연동된 체육관</IonCardSubtitle>
         </IonCol>
         </IonRow>
        </IonCardHeader>

      <IonCardContent className='cardlocation'><FiMapPin/>&nbsp;광주 북구 첨단연신로 45</IonCardContent>
      
      <IonNavLink routerDirection="forward" component={() => <PageThree />}>
    
      <IonCol size='12'><IonButton id='login-form-submit' className='gym_submit' >체육관 변경</IonButton></IonCol>
          </IonNavLink>
      
    
    </IonCard>
    
    </IonGrid>
    </div>
      </IonContent>
    </>
  );
}

export default PageTwo;