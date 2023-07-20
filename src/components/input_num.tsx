import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonNavLink, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './input_num.css';
import { useState } from 'react';

interface ContainerProps { }

import PageThree from './page-three';

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

  const backbtnstyle = {
    width: "95%",
    height: "90%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    marginTop: "5%"
  }

  const confirmstyle = {
    width: "97%",
    height: "90%",
    marginLeft: "1.5%",
    marginRight: "1.5%"

  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle><IonText>회원번호 입력</IonText></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput inputmode="none" label-placement="floating" fill="solid" value={text}></IonInput>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td><IonButton onClick={addtext}>1</IonButton></td>
              <td><IonButton onClick={addtext}>2</IonButton></td>
              <td><IonButton onClick={addtext}>3</IonButton></td>
            </tr>
            <tr>
              <td><IonButton onClick={addtext}>4</IonButton></td>
              <td><IonButton onClick={addtext}>5</IonButton></td>
              <td><IonButton onClick={addtext}>6</IonButton></td>
            </tr>
            <tr>
              <td><IonButton onClick={addtext}>7</IonButton></td>
              <td><IonButton onClick={addtext}>8</IonButton></td>
              <td><IonButton onClick={addtext}>9</IonButton></td>
            </tr>
            <tr>
              <td><IonButton onClick={addtext}>0</IonButton></td>
              <td colSpan={2}><IonButton onClick={deletetext} style={backbtnstyle}>←</IonButton></td>
            </tr>
            <tr><td colSpan={3}><IonInput inputmode="none" label-placement="floating" fill="solid"></IonInput></td></tr>
            <tr>
              <td colSpan={3}>
                <IonNavLink routerDirection="forward" component={() => <PageThree />}>
                  <IonButton style={confirmstyle} color='danger'>확인</IonButton>
                </IonNavLink>
              </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
      </IonContent>
    </>
  );
};

export default input_num;
