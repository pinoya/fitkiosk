import React, { useEffect, useState } from 'react';
import { IonGrid, IonButtons, IonButton, IonContent, IonTitle, IonToolbar,IonRow, IonCol, IonModal, IonHeader } from '@ionic/react';
import './allinone.css';
import './welcome.css';




function Welcome(props:any) {
  const [timer, setTimer] = useState('0000년 00월 00일() 00:00:00');
  const [ddday, setDdday] = useState('D-'); //디데이 표시하려고 
  const [use, setUse] = useState('');
  const [restday, setRestday] = useState('');

  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  

  

  
  const currentTimer = () => {
    var now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2,"0");
    const seconds = now.getSeconds();
    const years = now.getFullYear();
    const months = now.getMonth()+1;
    const days = now.getDate();
  
     //요일 저장
    const week = ['일','월','화','수','목','금','토']

    //now.getDay()==0은 일요일 week[0]은 배열에 저장해둔 일요일
    let dayofweeks = week[now.getDay()];
    
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



    //로컬스토리지
      const time = [
      {
        id : '22223', //임의로
        hour : hours,
        minute : minutes
      },
      
    ];

    const matchedTime = time.find((item) => item.id === props.id); //아이디값 비교
    if (matchedTime) {
      // 객체를 json 문자열로 변환
      const timeString = JSON.stringify(time);
      // setitem(로컬 스토리지에 저장)
      window.localStorage.setItem('times', timeString);
      console.log(timeString);
    }
    else { 
      const newTimeEntry = {
        id: props.id,
        hour: hours,
        minute: minutes,
      };

      const timesString = window.localStorage.getItem('times');
      let existingTimes = timesString ? JSON.parse(timesString) : []; 
      console.log(existingTimes);
      existingTimes.push(newTimeEntry);

      // 로컬스토리지 업데이트
      window.localStorage.setItem('times', JSON.stringify(existingTimes));
    }
    if(window.localStorage.length>=200){
      window.localStorage.clear();
    }
  };
  const startTimer = () => {
    currentTimer();
    //currentLocal();
  };

  useEffect(() => {
    startTimer(); 
  }, []);

  // console.log(props.onRequestClose);
  console.log(props.onCancelButtonClick);


let name;

//이름값이 넘어오지 않으면 번호로 이름을 일단 대신
if(props.detectedLabel == null){
  name = <p style={{fontSize:'28.5px', color:'#FF6300',marginTop:'4.5%'}}>{props.id}</p>
}
else if(props.detectedLabel){
  name = <p style={{fontSize:'28.5px', color:'#FF6300',marginTop:'4.5%'}}>{props.detectedLabel}</p>
}

let selfie;

//사진값이 넘어오지 않았을때 일단 대체 이미지로
if (props.selfieURL == null){
  selfie =  <img style={{width:'230px',height:'180px',borderRadius:'10px'}} 
  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-MfxvSj7ZuZ6YhKYLnZAUlRuyF21-BlozWQ&usqp=CAU'></img>
}
else if(props.selfieURL){
  selfie =  <img style={{width:'230px',height:'180px',borderRadius:'10px'}} 
  src={props.selfieURL}></img>
}

let OkBtn;

//얼굴 인식이 안 됐을 경우의 확인 버튼
if(props.onCancelButtonClick == null){
  OkBtn = <IonButton size='large' expand='block' onClick={() => props.handleClosebtnModal()}>확인</IonButton>
} //얼굴 인식이 됐을 경우의 확인 버튼
else if (props.onCancelButtonClick){
  OkBtn = <IonButton size='large' expand='block' onClick={() => props.onCancelButtonClick()}>확인</IonButton>
}

  return (

    <>

     
        <IonGrid>
          <IonRow>
            <div style={{display:'flex', marginLeft:'0.3%',marginTop:'3%'}}>
              <IonCol size='auto'>
                <div style={{backgroundColor:'red', width:'230px', height:'180px', borderRadius:'10px'}}>
                  {selfie}
                </div>
              </IonCol>
              <IonCol size='auto'>
              <div style={{backgroundColor:'#313131', width:'360px', height:'180px', borderRadius:'10px',
              paddingLeft:'26px'}}>

                <div style={{fontSize:'20px', color : 'white', fontWeight:'700',display:'flex'}}>
                  {name}
                  <p style={{marginTop:'7%',marginLeft:'0.8%'}}>님,</p>
                  <p style={{fontSize:'26px',marginTop:'5.2%',marginLeft:'2.2%'}}>환영합니다.</p>
                </div>

                <div style={{marginTop : '-6.5%', fontSize:'18px', color : '#B1AEAF'}}>{timer}</div>
                <div style={{fontSize:'18px', color : '#B1AEAF',display:'flex'}}>
                  <p style={{letterSpacing:'-0.5px'}}>보유 마일리지</p>
                  <p style={{marginLeft:'5%',fontWeight:'700'}}>2,500점</p>
                </div>
                <div style={{marginTop:'-9%',fontSize:'18px', color : '#B1AEAF',display:'flex'}}>
                  <p style={{letterSpacing:'-0.5px'}}>이달 출석횟수</p>
                  <p style={{marginLeft:'5%',fontWeight:'700'}}>12회</p>
                </div>
              </div>
              </IonCol>
            </div>
          </IonRow>

          <IonRow>
            <IonCol size='auto'>
              {/*왼쪽 마진 0.3고정*/}
            <div style={{width:'600px', height:'100px', backgroundColor:'#313131',borderRadius:'10px', 
            paddingLeft:'20px', paddingTop:'17px',marginLeft:'0.3%'}}> {/*박스*/}
              <div style={{width:'65px',height:'65px', borderRadius:'100px',backgroundColor:'#FDEFE5'}}></div> {/* 원*/ }

              <div style={{marginLeft:'14%',marginTop:'-13.8%'}}>{/*회원권 만료일 줄*/}
                <p style={{fontWeight:'700',fontSize:'18px',color:'#848484',letterSpacing:'-0.5px'}}>회원권 만료일</p>
                
                <div style={{display:'flex', marginLeft:'28%', marginTop:'-12.2%'}}>{/*오른쪽 날짜 부분*/}
                  <p style={{fontSize:'18px', color : '#B1AEAF'}}> {/*날짜*/}
                        {restday}</p>
                  <p style={{width:'70px', height:'25px', borderRadius:'3px', backgroundColor:'#FF6300',
                    color : 'white', fontSize:'18px', textAlign:'center',marginLeft:'2%'}}> {/*디데이*/}
                      {ddday}</p>
                </div>
              </div>

              <div style={{marginLeft:'14%',marginTop:'-4.5%'}}> {/*회원권 상품명 줄*/}
                <p style={{fontWeight:'700',fontSize:'18px',color:'#848484',letterSpacing:'-0.5px'}}>회원권 상품명</p>
                <div style={{display:'flex',marginLeft:'28%',marginTop:'-12.2%'}}> {/*오른쪽 부분*/}
                  <p style={{fontSize:'18px', color : '#B1AEAF', fontWeight:'400'}}>
                        필라테스 6개월 체험권</p>
                </div>
              </div>

              
            </div>
          </IonCol>
        </IonRow> 

        <IonRow>
            <IonCol size='auto'>
            <div style={{width:'600px', height:'100px', backgroundColor:'#313131',borderRadius:'10px', 
            paddingLeft:'20px', paddingTop:'17px',marginLeft:'0.3%'}}> {/*박스*/}
              <div style={{width:'65px',height:'65px', borderRadius:'100px',backgroundColor:'#FDEFE5'}}></div> {/* 원*/ }

              <div style={{marginLeft:'14%',marginTop:'-13.8%'}}>{/*개인 락커 줄*/}
                <p style={{fontWeight:'700',fontSize:'18px',color:'#848484',letterSpacing:'-0.5px'}}>개인 락커</p>
                
                <div style={{display:'flex', marginLeft:'28%', marginTop:'-12.2%'}}>{/*오른쪽 날짜 부분*/}
                  <p style={{backgroundColor:'#DDEBF8', width:'53px',height:'19px',borderRadius:'3px',fontSize:'13px',
                    color:'#232323',textAlign:'center',marginTop:'6%'}}>
                      {use}</p>
                  <p style={{fontSize:'18px', color : '#B1AEAF',marginLeft:'2%'}}> {/*날짜*/}
                        {restday}</p>
                  <p style={{width:'70px', height:'25px', borderRadius:'3px', backgroundColor:'#FF6300',
                    color : 'white', fontSize:'18px', textAlign:'center',marginLeft:'2%'}}> {/*디데이*/}
                      {ddday}</p>
                </div>
              </div>

              <div style={{marginLeft:'14%',marginTop:'-4.5%'}}> {/*운동복 줄*/}
                <p style={{fontWeight:'700',fontSize:'18px',color:'#848484',letterSpacing:'-0.5px'}}>운동복</p>
                <div style={{display:'flex',marginLeft:'28%',marginTop:'-12.2%'}}> {/*오른쪽 부분*/}
                  <p style={{backgroundColor:'#DDEBF8', width:'53px',height:'19px',borderRadius:'3px',fontSize:'13px',
                    color:'#232323',textAlign:'center',marginTop:'6%'}}>
                      {use}</p>
                  <p style={{fontSize:'18px', color : '#B1AEAF', fontWeight:'400',marginLeft:'2%'}}>
                        운동복이용권</p>
                </div>
              </div>

              
            </div>
          </IonCol>
        </IonRow> 

        <IonRow>
            <IonCol size='auto'>
            <div style={{width:'600px', height:'140px', backgroundColor:'#313131',borderRadius:'10px', 
            paddingLeft:'20px', paddingTop:'17px',marginLeft:'0.3%'}}>
              <div style={{width:'65px',height:'65px', borderRadius:'100px',backgroundColor:'#FDEFE5',marginTop:'4%'}}></div> {/* 원*/ }
              
              <div style={{marginLeft:'14%',marginTop:'-16.8%'}}>
                <p style={{fontWeight:'700',fontSize:'18px',color:'#848484',letterSpacing:'-0.5px'}}>수강권 만료일</p>
                <div style={{display:'flex',marginLeft:'28%',marginTop:'-12.2%'}}>
                 <p style={{fontSize:'18px', color : '#B1AEAF'}}>
                        {restday}</p>
                <p style={{width:'70px', height:'25px', borderRadius:'3px', backgroundColor:'#FF6300',
                    color : 'white', fontSize:'18px', textAlign:'center',marginLeft:'3%'}}>
                      {ddday}</p>
                </div>
              </div>

              <div style={{marginLeft:'14%',marginTop:'-4.8%'}}>
                <p style={{fontWeight:'700',fontSize:'18px',color:'#848484',letterSpacing:'-0.5px'}}>남은 횟수</p>
                <div style={{display:'flex',marginLeft:'28%',marginTop:'-12.2%'}}>
                 <p style={{fontSize:'18px', color : '#FF6300',fontWeight:'700'}}>
                        12회</p>
                  <p style={{fontSize:'18px', color : '#B1AEAF',fontWeight:'400',marginLeft:'1.5%'}}>
                        남음</p>
                </div>
              </div>

              <div style={{marginLeft:'14%',marginTop:'-4.8%'}}>
                <p style={{fontWeight:'700',fontSize:'18px',color:'#848484',letterSpacing:'-0.5px'}}>수강권 상품권</p>
                <div style={{display:'flex',marginLeft:'28%',marginTop:'-12.2%'}}>
                  <p style={{fontSize:'18px', color : '#B1AEAF',fontWeight:'400'}}>
                        [PT권] 1:1 PT 3개월 풀코스 체험권</p>
                </div>
              </div>

              <div style={{marginLeft:'28%',marginRight:'31%',marginTop:'9%'}}>
               {OkBtn}


              </div>

              </div>
             
           
          </IonCol>
        </IonRow> 
        </IonGrid>
      

    </>
  );
}

export default Welcome;