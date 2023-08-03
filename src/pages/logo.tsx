import React, { useEffect, useState } from 'react';

import { IonCol, IonGrid, IonRow, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';


import Test from './test.svg';
import Home from './Home';


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
          <IonGrid style={{border: '0px'}}>
              <IonRow style={{border: '0px'}}>
                <IonCol size='12' style={{border: '0px'}}>
                  <img style={{
                    width : '13%',
                    marginLeft : '45%',
                    marginTop : '7.5%'
                 }} src={Test} alt="Logo" />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol style={{border: '0px'}}>
                  <div style={{
                    textAlign : 'center',
                    fontSize : '180%',
                    fontWeight : 700,
                    letterSpacing : '-3.12%',
                    color : 'white',
                    marginTop : '2%',
                    marginBottom : '5%',
                    
                  }}>홀리데이 피트니스클럽(광주효천점)</div>
                 </IonCol>
              </IonRow>
          </IonGrid>

      ) : (

          <IonGrid style={{border: '0px'}} >
              <IonRow style={{border: '0px'}}>
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
                     marginTop : '6%',

                  }}>홀리데이 피트니스클럽(광주효천점)</div>
                </IonCol>
              </IonRow>
          </IonGrid>

      )}
    </>
  );
}

export default Logo;
