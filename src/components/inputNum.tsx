import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonNavLink, IonText, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/react';
import './inputNum.css';
import { useState } from 'react';


// import PageThree from './page-three';

const input_num: React.FC = () => {
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
        <IonGrid>
          <IonRow>
            <IonCol>  <IonInput inputmode="none" label-placement="floating" fill="solid" value={text}></IonInput></IonCol>
            <IonCol>
              <table>
                <thead></thead>
                <tbody>
                  <tr>
                    <td><IonButton className="numbutton" onClick={addtext}>1</IonButton></td>
                    <td><IonButton className="numbutton" onClick={addtext}>2</IonButton></td>
                    <td><IonButton className="numbutton" onClick={addtext}>3</IonButton></td>
                  </tr>
                  <tr>
                    <td><IonButton className="numbutton" onClick={addtext}>4</IonButton></td>
                    <td><IonButton className="numbutton" onClick={addtext}>5</IonButton></td>
                    <td><IonButton className="numbutton" onClick={addtext}>6</IonButton></td>
                  </tr>
                  <tr>
                    <td><IonButton className="numbutton" onClick={addtext}>7</IonButton></td>
                    <td><IonButton className="numbutton" onClick={addtext}>8</IonButton></td>
                    <td><IonButton className="numbutton" onClick={addtext}>9</IonButton></td>
                  </tr>
                  <tr>
                    <td><IonButton className="numbutton" onClick={addtext}>0</IonButton></td>
                    <td colSpan={2}><IonButton className="numbutton" onClick={deletetext} style={backbtnstyle}>←</IonButton></td>
                  </tr>
                  {/* <tr><td colSpan={3}><IonInput inputmode="none" label-placement="floating" fill="solid"></IonInput></td></tr> */}
                  <tr>
                  </tr>
                </tbody>
                <tfoot></tfoot>
              </table></IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol>  <IonButton className="numbutton" style={confirmstyle} color='danger'>확인</IonButton></IonCol>

          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default input_num;
