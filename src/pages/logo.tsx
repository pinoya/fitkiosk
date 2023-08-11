import React, { useEffect, useState } from 'react';

import { IonCol, IonGrid, IonRow, IonContent, IonHeader, IonToolbar, IonTitle, IonModal, IonButton } from '@ionic/react';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

import Test from './test.svg';
import Home from './Home';

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
  const [pw, setpw] = useState("123456");

  const setPreference = async () => {

    if (gymcode === null) {
      return; // 또는 다른 처리 방식을 선택할 수 있습니다.
    }

    console.log(gymcode);
    let url = 'http://dev.wisevill.com/kioskdb/check_gym.php';
    const options = {
      url: url,
      data: { code: gymcode, pw: pw },
      headers: { "Content-type": "application/json" }
    }
    const response = await CapacitorHttp.post(options);
    const data = JSON.parse(response.data);
    console.log(data);
    
    if (data[0] != null) {
      setname(data[0].name);
      console.log("실행됩니다.");
      await Preferences.set({
        key: 'code',
        value: data[0].code,
      });
    }
    props.setcode(code);
    checkCode(); //나중에는 지워도 됨 일단 확인하기 위함.

  };



  
  
  const checkCode = async () => {
    const { value } = await Preferences.get({ key: 'code' });
    console.log(`Hello ${value}!`);
    if(value){
      props.setcode(value); 
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

  const CloseGymCode = () => {
    setPreference();
    setIsModalOpen(false);
  }

  const handleChange = (e: any) => {
    setGymcode(e.target.value);
  }

  

  return (
    <>
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <input type='text' onChange={handleChange} />
        <IonButton onClick={CloseGymCode}></IonButton>
      </IonModal>
      <IonButton onClick={() => { setIsModalOpen(true) }}></IonButton>
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
