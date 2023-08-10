import React, { useEffect, useState } from 'react';

import { IonCol, IonGrid, IonRow, IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import { CapacitorHttp } from '@capacitor/core';
import Home from './Home';


const Announcement = (props:any) => {
 /*체육관 코드 번호, 비밀번호*/ 
  const [width, setWidth] = useState(window.innerWidth);
  const [Height, setHeight] = useState(window.innerHeight);
  const [content, setcontent] = useState("");
  /*브라우저 크기 조절 */ 
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [props.code]);

  const get_content = async () => {
        let url = 'http://dev.wisevill.com/kioskdb/get_gym_announcement.php';
        const options = {
            url: url,
            data: { code: props.code },
            headers: { "Content-type": "application/json" }
        }
        const response = await CapacitorHttp.post(options);
        const data = JSON.parse(response.data);
        setcontent(data[0].content);
        return 0;
    }

  return (
    <>
      {window.innerWidth <= window.innerHeight ? (

          <IonGrid>
             <IonRow style={{ height: '280px'}} >
                <IonCol style={{ border:'0px', margin : '0px auto', padding : '5px 5px'}}>
                   <div style={{
                        width : '710px',
                        height: '300px',
                        backgroundColor: 'white',
                        borderRadius: '1.2%',
                        color : 'black',
                        textAlign: 'left',
                        paddingLeft: '6%',
                        paddingTop : '5%',
                        fontSize: '125%',
                        fontWeight : 400,
                        lineHeight: '190%',
                        marginTop:'-5.5%',
                        marginLeft:'-1%'
                   
                   }}>
                    <IonButton onClick={get_content}></IonButton>
                    {content == ""?(
                      <p>공지사항이 없습니다.</p>
                    ):(
                      <div>{content}</div>
                    )}
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