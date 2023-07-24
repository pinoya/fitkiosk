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
import PageFour from './page4';


function PageThree() {
  const [width, setWidth] = useState(window.innerWidth);
  const [timer, setTimer] = useState('00시 00분');
  
  //시간 구하기
  const currentTimer = () => {
  var now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  setTimer(`${hours}시 ${minutes}분`);

  //time 객체 생성
  const time = {
    hour: hours,
    minute: minutes
  };
  //객체를 json 문자열로 변환
  const timeString = JSON.stringify(time);
  //setitem(로컬 스토리지에 저장)
  window.localStorage.setItem('times',timeString);
  //console.log(timeString); {"hour":13,"minute":54}이렇게 출력됨 
  };

  
  useEffect(() => { //컴포넌트가 랜더링 될 때마다 특정 작업을 실행할 수 있도록 하는 훅
    startTimer(); 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const startTimer = () => {
    currentTimer(); // 현재 시간 불러오기, setinterval을 지우니 계속 출력안함
  };


  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <div className="head1">
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle className="title"></IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <div id="container">
          <IonGrid>
            <IonCard className="page3_card">
              <IonCardHeader></IonCardHeader>
              <div>
                <IonCardContent className="">
                  <IonRow>
                    <IonCol size="12">
                      <div className="client">최민희 님 환영합니다.</div>
                    </IonCol>
                    <IonCol size="12">
                      
                        <div className="come">입장시간 :{timer} </div>
                    </IonCol>
                    <IonCol size="12">
                      <div className="checkplz">퇴장하실 때도 꼭 체크해주시길 바랍니다.</div>
                    </IonCol>
                  </IonRow>
                </IonCardContent>

                <IonNavLink routerDirection="forward" component={() => <PageFour />}>
                  <IonCol size="12">
                    <IonButton id="login-form-submit" className="page3_submit">
                      확인
                    </IonButton>
                  </IonCol>
                </IonNavLink>
              </div>
            </IonCard>
          </IonGrid>
         
        </div>
      </IonContent>
    </>
  );
}

export default PageThree;