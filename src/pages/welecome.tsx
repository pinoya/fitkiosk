import React, { useEffect, useState } from 'react';
import { IonGrid, IonButtons, IonButton, IonContent, IonTitle, IonToolbar, IonRow, IonCol, IonModal, IonHeader } from '@ionic/react';
import './allinone.css';
import './welcome.css';
import DefalutImg from "./DefalutImg.png"
import { CapacitorHttp } from '@capacitor/core';




function Welcome(props: any) {
  const [timer, setTimer] = useState('0000년 00월 00일() 00:00:00');
  const [dday, setDdday] = useState('D-'); //디데이1 표시하려고  
  const [dday2, setDdday2] = useState('D-');
  const [dday3, setDdday3] = useState('D-');
  const [use, setUse] = useState('');
  const [restday, setRestday] = useState('');
  const [restday2, setRestday2] = useState('');
  const [restday3, setRestday3] = useState('');

  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

  const [jsondata, setjsondata] = useState([]);

  const [mid, setmid] = useState(''); //jsondata 이름
  const [mile, setmile] = useState('');
  const [come, setcome] = useState('');
  const [product, setproduct] = useState('');
  const [have, sethave] = useState('');
  const [locker, setlocker] = useState(''); //락커
  const [duclass, setduclass] = useState('');
  const [left, setleft] = useState('');
  const [inclass, setinclass] = useState('');
  const [img, setimg] = useState('');
  const [recentTime, setrecentTime] = useState('');





  const currentTimer = async () => {

    var now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const years = now.getFullYear();
    const months = String(now.getMonth() + 1).padStart(2, "0");
    const days = String(now.getDate()).padStart(2, "0");

    //요일 저장
    const week = ['일', '월', '화', '수', '목', '금', '토']

    //now.getDay()==0은 일요일 week[0]은 배열에 저장해둔 일요일
    let dayofweeks = week[now.getDay()];

    const timerValue = `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`;
    setTimer(timerValue);




    // //디데이1 - 회원권 만료일
    var dday = new Date((props.product).substring(0, 4), (props.product).substring(5, 7) - 1, (props.product).substring(8, 10));

    const dyear = String(dday.getFullYear());
    const dmonth = String(dday.getMonth() + 1).padStart(2, "0");
    const date = String(dday.getDate()).padStart(2, "0");

    // //디데이 계산 로직
    var gap = dday.getTime() - now.getTime();
    var result = Math.ceil(gap / (1000 * 60 * 60 * 24));
    setRestday(`${dyear}년 ${dmonth}월 ${date}일`);

    setDdday(`D-${result}`);
    if (result > 0) {
      setUse('사용중');
    }
    else {
      setUse('미사용');
    }


    //디데이2 - 개인락커

    var dday2 = new Date((props.locker).substring(0, 4), (props.locker).substring(5, 7) - 1, (props.locker).substring(8, 10));
    const dyear2 = String(dday2.getFullYear());
    const dmonth2 = String(dday2.getMonth() + 1).padStart(2, "0");
    const date2 = String(dday2.getDate()).padStart(2, "0");

    // //디데이 계산 로직
    var gap2 = dday2.getTime() - now.getTime();
    var result2 = Math.ceil(gap2 / (1000 * 60 * 60 * 24));
    setRestday2(`${dyear2}년 ${dmonth2}월 ${date2}일`);

    setDdday2(`D-${result2}`);
    if (result2 > 0) {
      setUse('사용중');
    }
    else {
      setUse('미사용');
    }


    //디데이3

    var dday3 = new Date((props.duclass).substring(0, 4), (props.duclass).substring(5, 7) - 1, (props.duclass).substring(8, 10));

    const dyear3 = String(dday3.getFullYear());
    const dmonth3 = String(dday3.getMonth() + 1).padStart(2, "0");
    const date3 = String(dday3.getDate()).padStart(2, "0");

    //디데이 계산 로직
    var gap3 = dday3.getTime() - now.getTime();
    var result3 = Math.ceil(gap3 / (1000 * 60 * 60 * 24));
    setRestday3(`${dyear3}년 ${dmonth3}월 ${date3}일`);

    setDdday3(`D-${result3}`);

    const url = 'http://dev.wisevill.com/kioskdb/get_data_from_db.php';




  };






  const startTimer = () => {
    currentTimer();

    //currentLocal();
  };

  useEffect(() => {
    startTimer();

  }, []);

  // console.log(props.onRequestClose);
  // console.log(props.onCancelButtonClick);

  //useEffect// get_userinfo();
  // print_jsondata();


  let name;

  //이름값이 넘어오지 않으면 번호로 이름을 일단 대신
  //인식 -> 회원 아이디가 넘어옴 
  if (props.detectedName == null) {

    name = <p style={{ fontSize: '27px', color: '#FF6300', marginTop: '4.9%', fontWeight: '700' }}>{props.Name}</p>
  }
  else if (props.detectedName) {
    name = <p style={{ fontSize: '27px', color: '#FF6300', marginTop: '4.9%', fontWeight: '700' }}>{props.detectedName}</p>

  }


  //1. 연결
  // 2. ui 2-1 사진 서버에  
  let selfie;

  // console.log(props.profile_img);
  //사진값이 넘어오지 않았을때 일단 대체 이미지로
  if (props.profileImg == null) {
    if (props.profile_img != null) { //프로필 이미지가 있을때
      selfie = 
      <div className='profile2'>
      <img style={{ width: '230px', height: '180px', borderRadius: '10px' }}
        src={props.profile_img}
      ></img>
      </div>
      // style={{ width: '230px', height: '180px', borderRadius: '10px' }}
    }
    else { //프로필 이미지가 없을때
      selfie = 
      <div className='profile2'>
      <img style={{ width: '230px', height: '180px', borderRadius: '10px' }}
        src={DefalutImg}
      ></img>
      </div>
    }
  }
  else if (props.profileImg) {
    selfie = 
    <div className="profile2">
    <img 
      src={props.profileImg}></img>
      </div>
  }

  let OkBtn;



  //얼굴 인식이 안 됐을 경우의 확인 버튼
  if (props.onCancelButtonClick == null) {
    OkBtn = <IonButton size='large' expand='block' onClick={() => props.onCancelButtonClick()}>확인</IonButton>
  } //얼굴 인식이 됐을 경우의 확인 버튼
  else if (props.onCancelButtonClick) {
    OkBtn = <IonButton size='large' expand='block' onClick={() => props.onCancelButtonClick()}>확인</IonButton>
  }

  // console.log(props.detectedName);
  // console.log(props.mile);


  let hiBye;

  if (props.flag == '0') {
    hiBye = <p className='body2_welcome'>환영합니다.</p>

  }
  else if (props.flag == '1') {
    hiBye = <p className='body2_welcome'>안녕히가십시오.</p>

  }

  let time;

  if (props.flag == '0') {
    time = <div className='body2_time'>입장시간 : {timer}<br />
    </div>

  }
  else if (props.flag == '1') {
    time = <div className='body2_time'>입장시간 : {props.recentTime}<br />
      퇴장시간 : {timer}</div>
  }

  return (

    <>
      <div className="welcome-box">
        <div className="one-box">    <IonGrid>
          <IonRow>
            <IonCol size='auto'>

                {selfie}

            </IonCol>
          </IonRow>
        </IonGrid></div>
        <div className="two-box"><IonGrid>
          <IonRow>
            <IonCol size='auto'>
              <div className='body2_background-block'></div>
              <div className='body2'>
                <div className='body2_name'>
                  {name}
                  <p className='body2_nim'>님,</p>
                  {hiBye}
                </div>
                <div className='row3'>
               <div className='row1'>
                {time}
                </div>
                <div className = "row2">
                <div className='body2_p1'>
                  <p className='body2_mil'>보유 마일리지</p>
                  <p className='body2_score'>
                    {
                      props.mile.length > 3
                        ? props.mile.substring(0, 1) + ',' + props.mile.substring(1)
                        : props.mile
                    }점</p>
                </div>

                <div className='body2_p2'>
                  <p className='body2_mil'>이달 출석횟수</p>
                  <p className='body2_score'>{props.come}회</p>
                </div>
                </div>
              </div>
              </div>
            </IonCol>
            {/* </div> */}
          </IonRow>
          <IonRow>
        
            <IonCol size='auto'>
              {/*왼쪽 마진 0.3고정*/}
              <div className='background-block2'></div>
              <div className='body3'> {/*박스*/}
                <div className='body3_circle'></div> {/* 원*/}

                <div className='body3_p1'>{/*회원권 만료일 줄*/}
                  <p className='body3_p1_finish'>회원권 만료일</p>

                  <div className='body3_p1_r'>{/*오른쪽 날짜 부분*/}
                    <p className='body3_p1_r_date'> {/*날짜*/}
                      {restday}</p>
                    <p className='dday'> {/*디데이*/}
                      {dday}</p>
                  </div>
                </div>

                <div className='body3_p2'> {/*회원권 상품명 줄*/}
                  <p className='body3_p2_product'>회원권 상품명</p>
                  <div className='body3_p2_r'> {/*오른쪽 부분*/}
                    <p className='body3_p1_r_date'>
                      {props.have}</p>
                  </div>
                </div>


              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size='auto'>
            <div className='background-block3'></div>
              <div className ="box3">
              <div className='body3'> {/*박스*/}
                <div className='body3_circle'></div> {/* 원*/}

                <div className='body3_p1'>{/*개인 락커 줄*/}
                  <p className='body3_p1_finish'>개인 락커</p>

                  <div className='body3_p1_r'>{/*오른쪽 날짜 부분*/}
                    <p className='use'>
                      {use}</p>
                    <p style={{ marginTop: '4.2%' }} className='body4_date'> {/*날짜*/}
                      {restday2}</p>
                    <p className='dday' style={{ marginTop: '4%' }}> {/*디데이*/}
                      {dday2}</p>
                  </div>
                </div>

                <div className='body3_p2'> {/*운동복 줄*/}
                  <p className='body3_p2_product' style={{ marginTop: '4%' }}>운동복</p>
                  <div className='body3_p2_r'> {/*오른쪽 부분*/}
                    <p className='use' style={{ marginTop: '6.7%' }}>
                      {use}</p>
                    <p className='body4_date' style={{ marginTop: '5.7%' }}>
                      운동복이용권</p>
                  </div>
                </div>
                </div>

              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size='auto'>
            <div className='background-block4'></div>
              <div className='body5'>
                <div className='body5_circle'></div> {/* 원*/}

                <div className='body5_p1'>
                  <p className='body3_p1_finish'>수강권 만료일</p>
                  <div className='body3_p1_r'>
                    <p className='body3_p1_r_date'>
                      {restday3}</p>
                    <p className='dday'>
                      {dday3}</p>
                  </div>
                </div>

                <div className='body5_p2'>
                  <p className='body3_p1_finish'>남은 횟수</p>
                  <div className='body3_p1_r'>
                    <p className='body5_left'>
                      {props.left}회</p>
                    <p className='body5_left2'>
                      남음</p>
                  </div>
                </div>


                <div className='body5_p2'>
                  <p className='body3_p1_finish'>수강권 상품권</p>
                  <div className='body3_p1_r'>
                    <p className='body3_p1_r_date' style={{ marginTop: '5%' }}>

                      {props.inclass}</p>
                  </div>
                </div>

              </div>


            </IonCol>
          </IonRow>

        </IonGrid></div>
        <div className="three-box">
          <IonGrid>
            <div className='btnn'>

              {OkBtn}

            </div>
          </IonGrid>
          </div>

      
        </div>







    </>
  );
}

export default Welcome;