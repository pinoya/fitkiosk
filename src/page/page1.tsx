import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { IonCol, IonGrid, IonRow, IonNavLink, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonInput, IonButton } from '@ionic/react';
import { AiFillHome } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import './page.css';
import PageTwo from './page2';

function PageOne() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogin = (event: any) => {
    event.preventDefault();
    if (username === "user" && password === "0000") {
      
    } else {

      window.location.replace("/"); 
      event.returnValue = "";
      
      
    }
  };


  return (
    <>
      <IonHeader>
        
        
    
      </IonHeader>
      <IonContent class="ion-padding">
      <IonGrid>
        
        <div id="container">
        <IonRow>
          <IonCol size='12'>
            <CgGym className='gym'/>
          {/*<p className='hello' id='name'>{greeting}</p> {/*안녕하세요->아이디 혹은 비밀번호 잘못*/}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size='12'>
            <div className="gymstart">체육관 출결관리 시스템</div>
            </IonCol>  
        </IonRow>

          {/*<IonRow>
            <IonCol size='12'>
            <div className="gymstart2">체육관 연동</div>
            </IonCol>
  </IonRow>*/}
            
      

            <form id='login-form' onSubmit={handleLogin} className='codeName'>
          <input placeholder='&nbsp;&nbsp;체육관 코드 번호' name="username" className='codeText' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br></br>
            <input placeholder='&nbsp;&nbsp;비밀번호' name="password" className='codeText2' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          </form>
   

          <IonNavLink routerDirection="forward" component={() => <PageTwo />}>
            <IonButton id='login-form-submit' className='home_submit' onClick={handleLogin}>확인</IonButton>
          </IonNavLink>

        </div>
        
        </IonGrid>
      </IonContent>
    </>
  );
}

export default PageOne;

