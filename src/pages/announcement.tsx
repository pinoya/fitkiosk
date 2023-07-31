import React, { useEffect, useState } from 'react';

import { IonCol, IonGrid, IonRow, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

import Home from './Home';


function Announcement() {
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

          <IonGrid>
             <IonRow style={{ height: '280px'}} >
                <IonCol style={{ border:'0px', margin : '0px auto', padding : '5px 5px'}}>
                   <div style={{
                        width : '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        borderRadius: '1.2%',
                        color : 'black',
                        textAlign: 'left',
                        paddingLeft: '6%',
                        paddingTop : '5%',
                        fontSize: '125%',
                        fontWeight : 400,
                        lineHeight: '190%',
                   
                   }}>
                     ∙ 여름시즌 다이어트 프로그램 안내
                    <br></br>
                     ∙ 이번달 회원 등록시 운동복 무료 이용권 증정
                   </div>
                  </IonCol>
            </IonRow>
          </IonGrid>

      ) : (
        <IonGrid>
        </IonGrid>
        



      )}


    </>
  );
}

export default Announcement;