import React, { useEffect, useState } from 'react';

import { IonCol, IonGrid, IonRow, IonContent, IonHeader, IonToolbar, IonTitle, IonModal, IonButton, IonIcon } from '@ionic/react';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { settingsSharp, personAdd } from 'ionicons/icons';



import Test from './test.svg';
import Home from './Home';
// import './logo.css';

const Logo = (props: any) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [Height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const [name, setname] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setcode] = useState("");
  const [gymcode, setGymcode] = useState("");
  const [inputpw, setInputPw] = useState("");
  // const [pw, setpw] = useState("123456");




  const setPreference = async () => {

    console.log(gymcode);
    let url = 'http://dev.wisevill.com/kioskdb/check_gym.php';
    const options = {
      url: url,
      data: { code: gymcode, pw: inputpw },
      headers: { "Content-type": "application/json" }
    }
    const response = await CapacitorHttp.post(options);
    const data = JSON.parse(response.data);
    console.log(data);



    if (data[0] != null) {
      console.log("실행됩니다.");
      await Preferences.set({
        key: 'code',
        value: data[0].code,
      });
      await Preferences.set({
        key: 'name',
        value: data[0].name,
      });
      props.setcode(code);
      setname(data[0].name);
      checkCode(); //지우면 안됨....
      setIsModalOpen(false);
    }
    else {
      alert('체육관 코드나 비밀번호가 틀렸습니다.');
    }

  };

  //입력된 값 X -> 모달창 띄워놓기
  //패스워드

  const checkCode = async () => {
    // const storedCode = await Preferences.get({ key: 'code' });
    // console.log(`Hello ${storedCode}!`);
    // const storedName = await Preferences.get({ key: 'name' });

    const storedCodeResult = await Preferences.get({ key: 'code' });
    const storedNameResult = await Preferences.get({ key: 'name' });
    console.log(`Hello ${storedCodeResult}!`);
    const storedCode = storedCodeResult.value;
    const storedName = storedNameResult.value;
    if (storedCode && storedName) {
      props.setcode(storedCode);
      setname(storedName);
    }
    else {
      setIsModalOpen(true);
    }
  };


  useEffect(() => {
    // 여기서 초기에 한 번 값을 가져오는 부분을 추가할 수 있습니다.
    checkCode();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const CloseGymCode = async () => {
    if (gymcode.length >= 6 && inputpw.length >= 1) {
      await setPreference();
    }
    else {
      alert('다시 입력해주세요');
    }
  }

  const handleChange = (e: any) => {
    setGymcode(e.target.value);
  }

  const handlePassWord = (e: any) => {
    setInputPw(e.target.value);
  }

  const ChangeGymCode = () => {
      setIsModalOpen(true);
      console.log("눌립니다");
  }
  const OpenJoinModal = () => {
    props.setisJoinModalOpen(true);
    console.log("눌립니다");
    console.log(props.isJoinModalOpen);
  }



  return (
    <>


      {/* 체육관 이름 설정   */}
      {/* <IonButton onClick={() => { setIsModalOpen(true) }}></IonButton> */}

      <button style={{
             float : 'right',
             backgroundColor: 'transparent',
              }} onClick={() => { ChangeGymCode() }}><IonIcon icon={settingsSharp} size="large"></IonIcon></button>

      {/* <button style={{
        float: 'right',
        backgroundColor: 'transparent',
      }} onClick={() => {OpenJoinModal()}}><IonIcon icon={settingsSharp} size="large"></IonIcon></button> */}


<button style={{
        float: 'left',
        backgroundColor: 'transparent',
      }} onClick={() => {OpenJoinModal()}}><IonIcon icon={personAdd} size="large"></IonIcon>회원가입</button>




      


      <IonModal isOpen={isModalOpen} backdropDismiss={false}>
        <p>체육관 코드</p>
        <input type='text' onChange={handleChange} />
        <p>비밀번호</p>
        <input type='text' onChange={handlePassWord} />
        <div style={{ textAlign: 'center', }}>
          <IonButton onClick={CloseGymCode}>확인</IonButton>
          {/* <IonButton>취소</IonButton> */}
        </div>
      </IonModal>




      {window.innerWidth <= window.innerHeight ? (

        <IonGrid style={{ border: '0px' }}>
          <IonRow style={{ border: '0px' }}>
            <IonCol size='12' style={{ border: '0px' }}>
              <img style={{
                width: '13%',
                marginLeft: '45%',
                marginTop: '7.5%'
              }} src={Test} alt="Logo" />

            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol style={{ border: '0px' }}>
              <div style={{
                textAlign: 'center',
                fontSize: '180%',
                fontWeight: 700,
                letterSpacing: '-3.12%',
                color: 'white',
                marginTop: '2%',
                marginBottom: '5%',
              }}>{name}</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      ) : (
        <IonGrid style={{ border: '0px' }} >
          <IonRow style={{ border: '0px' }}>
            <IonCol size='auto' style={{ marginLeft: '3%', marginBottom: '18%', border: '0px' }}>
              <img style={{
                width: '100%',
                marginLeft: '5%'
              }} src={Test} alt="Logo" />

            </IonCol>
            <IonCol size='auto' style={{ marginLeft: '0.7%', marginBottom: '18%', border: '0px' }}>
              <div style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 700,
                letterSpacing: '-3.12%',
                fontSize: '190%',
                marginTop: '6%',
              }}>{name}</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
    </>
  );
}

export default Logo;
