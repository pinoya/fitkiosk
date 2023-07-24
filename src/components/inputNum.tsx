import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonInput, IonNavLink, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './inputNum.css';
import { useState } from 'react';

interface ContainerProps { }

import NextPage from './page-two';

const input_num: React.FC<ContainerProps> = () => {
  const [text, settext] = useState("010");

  const addtext = (e: any) => {
    if (text.length == 3 || text.length == 8) {
      settext(text + '-' + e.target.textContent);
    } else if (text.length >= 12) {
      if (text.length > 12) {
        console.log(text);
      }
      else {
        settext(text + e.target.textContent);
      }
    }
    else {
      settext(text + e.target.textContent);
    }
  }

  const deletetext = () => {
    if (text.length == 5 || text.length == 10) {
      settext(text.slice(0, -2));
    } else settext(text.slice(0, -1));
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle><IonText>전화번호 입력</IonText></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className='input_table ion-float-right'>
          <IonRow class="screen">
            <IonCol class="screen"><IonInput class="float_window ion-float-left ion-align-self-center" inputmode="none" label-placement="floating" fill="solid" value={text}></IonInput></IonCol>
            <IonCol class="screen">
              <IonRow class="inputNum">
                <IonCol size="12" class='input_td'><IonButton className='input_num' onClick={addtext}>1</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_num' onClick={addtext}>4</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_num' onClick={addtext}>7</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_num' onClick={addtext}>0</IonButton></IonCol>
              </IonRow>
              <IonRow class="inputNum">
                <IonCol size="12" class='input_td'><IonButton className='input_num' onClick={addtext}>2</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_num' onClick={addtext}>5</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_num' onClick={addtext}>8</IonButton></IonCol>
                <IonCol size="24" class='input_td'><IonButton className='input_back' onClick={deletetext}>←</IonButton></IonCol>
              </IonRow>
              <IonRow class="inputNum">
                <IonCol size="12" class='input_td'><IonButton className='input_num' onClick={addtext}>3</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_num' onClick={addtext}>6</IonButton></IonCol>
                <IonCol size="12" class='input_td'><IonButton className='input_num' onClick={addtext}>9</IonButton></IonCol>
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
