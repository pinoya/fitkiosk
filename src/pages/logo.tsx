import React, { useEffect, useState } from 'react';
import { IonCol, IonGrid, IonRow, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

import Home from './Home';
import Test from '../../public/test.svg';

function Logo() {

  /*체육관 코드 번호, 비밀번호*/ 
  const [width, setWidth] = useState(window.innerWidth);
  const [Height, setHeight] = useState(window.innerHeight);
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
      {window.innerWidth <= window.innerHeight ? (
        <IonContent class="ion-padding">
          <IonGrid>
              <IonRow>
                <IonCol size='12'>
                  <img style={{
                  width: '8.50vw',
                  height: '7.74vw',
                  marginTop : '12.75vw',
                  marginLeft : '45.75vw',
                  marginRight : '45.75vw'
                 }} src={Test} alt="Logo" />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <div style={{
                    textAlign: 'center',
                    color : 'black',
                    fontWeight: '700',
                    fontSize: '4.00vw',
                    lineHeight : '4.51vw',
                    letterSpacing : '-0.5px',
                    marginTop : '2.5vw'
                  }}>홀리데이 피트니스클럽(광주효천점)</div>
                 </IonCol>
              </IonRow>
          </IonGrid>
        </IonContent>
      ) : (
        <IonContent class="ion-padding">
          <IonGrid>
              <IonRow>
                <IonCol size='auto'>
                  <img style={{
                     width: '5.31vw',
                     height: '4.84vw',
                     marginTop : '6.64vw',
                     marginLeft : '7.53vw'
                  }} src={Test} alt="Logo" />
                </IonCol>
                <IonCol size='auto'>
                  <div style={{
                     textAlign: 'center',
                     color : 'black',
                     fontWeight: '700',
                     fontSize: '2.22vw',
                     lineHeight: '3.62vw',
                     marginTop : '7vw',
                     marginLeft : '1vw'
                  }}>홀리데이 피트니스클럽(광주효천점)</div>
                </IonCol>
              </IonRow>
          </IonGrid>
        </IonContent>
      )}
    </>
  );
}

export default Logo;

