import React, { useEffect, useState } from 'react';

import { IonCol, IonGrid, IonRow, IonContent, IonHeader, IonToolbar, IonTitle, IonModal, IonButton } from '@ionic/react';
import { CapacitorHttp } from '@capacitor/core';

import Test from './test.svg';
import Home from './Home';


const Logo = (props:any) => {


  /*체육관 코드 번호, 비밀번호*/

  const [width, setWidth] = useState(window.innerWidth);
  const [Height, setHeight] = useState(window.innerHeight);
  /*브라우저 크기 조절 */
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const [name, setname] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 컴포넌트 안에 들어갈 것 여기서 가져온 code 값은 localstorage 안에 있어야 한다. 그래야 다음에 어플 다시 켤 때도 저장될 것이기 때문
  const [code, setcode] = useState("");
  const [pw, setpw] = useState("");
  const get_code = async () => {
    let url = 'http://dev.wisevill.com/kioskdb/check_gym.php';
    const options = {
      url: url,
      data: { code: code, pw: pw },
      headers: { "Content-type": "application/json" }
    }
    const response = await CapacitorHttp.post(options);
    const data = JSON.parse(response.data);
    console.log(data[0].code, data[0].name, data[0].tel);
    props.setcode(data[0].code);
    setname(data[0].name);
    return 0;
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <IonModal isOpen={isModalOpen}>
        {/* props로 넘겨줄 것 : setname*/}
      </IonModal>
      <IonButton onClick={()=>{setIsModalOpen(true)}}></IonButton>
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

              }}>{name}</div> {/* 홀리데이 피트니스클럽(광주효천점) */}
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
