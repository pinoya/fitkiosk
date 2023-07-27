import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
=======
import { IonCol, IonGrid, IonRow, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
>>>>>>> 1723b2510f5a0514f58cf0da96fc08df7e2ec3c3

import { IonCol, IonGrid, IonRow, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import Test from '../pages/test.svg';
import Home from './Home';


function Logo() {
<<<<<<< HEAD
 /*체육관 코드 번호, 비밀번호*/ 
=======

  /*체육관 코드 번호, 비밀번호*/ 
>>>>>>> 1723b2510f5a0514f58cf0da96fc08df7e2ec3c3
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

          <IonGrid>
              <IonRow>
                <IonCol size='12'>
                  <img style={{
                    width : '13%',
                 }} src={Test} alt="Logo" />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <div style={{
                    textAlign : 'center',
                    fontSize : '180%',
                    fontWeight : 700,
                    letterSpacing : '-3.12%',
                    color : 'white',
                    marginTop : '3%',
                    marginBottom : '5%',
                    
                  }}>홀리데이 피트니스클럽(광주효천점)</div>
                 </IonCol>
              </IonRow>
          </IonGrid>

      ) : (

          <IonGrid >
              <IonRow >
                <IonCol size='auto' style={{marginLeft:'3%', marginBottom :'18%' ,border:'0px'}}>
                  <img style={{
                    width : '100%',
                    marginLeft : '5%'
                  }} src={Test} alt="Logo" />
                </IonCol>
                <IonCol size='auto' style={{marginLeft:'0.7%', marginBottom :'18%',border:'0px'}}>
                  <div style={{
                     textAlign: 'center',
                     color : 'white',
                     fontWeight: 700,
                     letterSpacing : '-3.12%',
                     fontSize : '190%',
                     marginTop : '3.3%',

                  }}>홀리데이 피트니스클럽(광주효천점)</div>
                </IonCol>
              </IonRow>
          </IonGrid>

      )}
<<<<<<< HEAD


=======
>>>>>>> 1723b2510f5a0514f58cf0da96fc08df7e2ec3c3
    </>
  );
}

export default Logo;
