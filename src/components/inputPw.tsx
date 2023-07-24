import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonInput, IonNavLink, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './inputPw.css';
import { useState } from 'react';

interface ContainerProps { }

import NextPage from './page-three';

const input_num: React.FC<ContainerProps> = () => {
  const [text, settext] = useState("");

  const addtext = (e: any) => {
    settext(text + e.target.textContent);
  }

  const deletetext = () => {
    settext(text.slice(0, -1));
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle><IonText>비밀번호 입력</IonText></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className='input_table ion-float-right'>
          <IonRow class="screen">
            <IonCol class="screen"><IonInput class="float_window ion-float-left ion-align-self-center" inputmode="none" label-placement="floating" fill="solid" value={text}></IonInput></IonCol>
            <IonCol class="screen">
              <IonRow class="inputNum">
                <IonCol size="12" class='input_td'><IonButton className='input_pw' onClick={addtext}>1</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_pw' onClick={addtext}>4</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_pw' onClick={addtext}>7</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_pw' onClick={addtext}>0</IonButton></IonCol>
              </IonRow>
              <IonRow class="inputNum">
                <IonCol size="12" class='input_td'><IonButton className='input_pw' onClick={addtext}>2</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_pw' onClick={addtext}>5</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_pw' onClick={addtext}>8</IonButton></IonCol>
                <IonCol size="24" class='input_td'><IonButton className='input_pw_back' onClick={deletetext}>←</IonButton></IonCol>
              </IonRow>
              <IonRow class="inputNum">
                <IonCol size="12" class='input_td'><IonButton className='input_pw' onClick={addtext}>3</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_pw' onClick={addtext}>6</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_pw' onClick={addtext}>9</IonButton></IonCol>
                <IonCol size="12" class='input_td' onClick={deletetext}><br /></IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonNavLink class="" routerDirection="forward" component={() => <NextPage />}>
          <IonButton class="confirmbtn">확인</IonButton>
        </IonNavLink>
      </IonFooter>
    </>
  );
};

export default input_num;
