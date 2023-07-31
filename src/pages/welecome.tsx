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



function Welcome(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [timer, setTimer] = useState('0000년 00월 00일() 00:00:00');
  const [ddday, setDdday] = useState('D-'); //디데이 표시하려고 
  const [use, setUse] = useState('');
  const [restday, setRestday] = useState('');
  //시간 구하기
  const currentTimer = () => {
  var now = new Date();
  const years = now.getFullYear();
  const months = now.getMonth()+1;
  const days = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  //요일 저장
  const week = ['일','월','화','수','목','금','토']

  //now.getDay()==0은 일요일 week[0]은 배열에 저장해둔 일요일
  let dayofweeks = week[now.getDay()];

  //화면에 표시할 setTimer
  setTimer(`${years}년 ${months}월 ${days}일(${dayofweeks}) ${hours}:${minutes}:${seconds}`);


  //디데이
  //임의로 설정한 값
  var dday = new Date(2023, 11, 30); //월은 -1로 생각해야함 0부터 시작하는듯.. 사실 7월이였던것 입력할때 -1월로 입력하기 (ex 12월 -> 11월)
  const dyear = String(dday.getFullYear());
  const dmonth = String(dday.getMonth()+1).padStart(2,"0");
  const ddate = String(dday.getDate()).padStart(2,"0");
  //디데이 계산 로직
  var gap = dday.getTime()-now.getTime(); 
  var result = Math.ceil(gap / (1000 * 60 * 60 * 24));
  setRestday(`${dyear}년 ${dmonth}월 ${ddate}일`);
  setDdday(`D-${result}`);
  if(result>0){
    setUse('사용중');
  }

  //time 객체 생성
  const time = {
    year : years,
    month : months,
    day : days,
    dayofweek :dayofweeks,
    hour: hours,
    minute: minutes,
    seconds:seconds
  };
  //객체를 json 문자열로 변환
  const timeString = JSON.stringify(time);
  //setitem(로컬 스토리지에 저장)
  window.localStorage.setItem('times',timeString);
  console.log(timeString); 
  };

  
  useEffect(() => { //컴포넌트가 랜더링(요청?리로드?) 될 때마다 특정 작업을 실행할 수 있도록 하는 훅
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


        <div id="container">
          <IonGrid>
                  <IonRow>
                    <IonCol size="12">
                      <div style={{color : 'black'}}>최민희 님 환영합니다.</div>
                    </IonCol>
                    </IonRow>
                  <IonRow>
                    <IonCol size="12">
                    
                        <div style={{color : 'black'}}>입장시간 :{timer} </div>
                    </IonCol>
                  </IonRow>

                  <IonRow>

                    <IonCol size="12">
                    <div style={{ color: 'black', display: 'flex'}}>
                      <p style={{backgroundColor:'#DDEBF8', width:'53px',height:'19px',borderRadius:'3px',fontSize:'13px',
                    color:'#232323',marginTop:'1.3rem'}}>
                      {use}</p>&nbsp;
                      <p style={{fontSize:'18px', color : '#B1AEAF'}}>
                        {restday}</p>&nbsp;
                      <p style={{width:'70px', height:'25px', borderRadius:'3px', backgroundColor:'#FF6300',
                    color : 'white', fontSize:'18px', textAlign:'center'}}>
                      {ddday}</p>
                    </div>

                    </IonCol>
                  </IonRow>

          </IonGrid>
         
        </div>

    </>
  );
}

export default Welcome;