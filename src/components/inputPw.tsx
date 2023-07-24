import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonNavLink, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './inputPw.css';
import { useState } from 'react';

interface ContainerProps { }

import NextPage from './page-three';

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


const confirmstyle = {
  width: "97%",
  height: "50%",
  marginLeft: "1.5%",
  marginRight: "1.5%",
  background: "#102B56"
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
      <IonInput class="float_window" inputmode="none" label-placement="floating" fill="solid" value={text}></IonInput>
      <table className='input_table'>
        <thead></thead>
        <tbody>
          <tr>
            <td className='input_td'><IonButton className='input_pw' onClick={addtext}>1</IonButton></td>
            <td className='input_td'><IonButton className='input_pw' onClick={addtext}>2</IonButton></td>
            <td className='input_td'><IonButton className='input_pw' onClick={addtext}>3</IonButton></td>
          </tr>
          <tr>
            <td className='input_td'><IonButton className='input_pw' onClick={addtext}>4</IonButton></td>
            <td className='input_td'><IonButton className='input_pw' onClick={addtext}>5</IonButton></td>
            <td className='input_td'><IonButton className='input_pw' onClick={addtext}>6</IonButton></td>
          </tr>
          <tr>
            <td className='input_td'><IonButton className='input_pw' onClick={addtext}>7</IonButton></td>
            <td className='input_td'><IonButton className='input_pw' onClick={addtext}>8</IonButton></td>
            <td className='input_td'><IonButton className='input_pw' onClick={addtext}>9</IonButton></td>
          </tr>
          <tr>
            <td className='input_td'><IonButton className='input_pw' onClick={addtext}>0</IonButton></td>
            <td colSpan={2} className='input_td'><IonButton className='input_pw_back' onClick={deletetext}>←</IonButton></td>
          </tr>
          <tr>
            <td colSpan={3}>
              {/* nav 누를 때 db에서 쿼리 날림과 동시에 인증되면 다음페이지
                없으면 등록되지 않은 회원 정보입니다를 화면에 띄울 생각입니다. */}
              <IonNavLink routerDirection="forward" component={() => <NextPage />}>
                <IonButton style={confirmstyle} color='#102B56'>확인</IonButton>
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
