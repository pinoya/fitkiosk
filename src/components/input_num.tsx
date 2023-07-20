import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/react';
import './ExploreContainer.css';
import { HtmlHTMLAttributes, useState } from 'react';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [text, settext] = useState("010");
  const addtext = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (text.length == 3 || text.length == 8) {
      settext(text + '-' + e.target.textContent);
      // console.log(text + '-' + e.target.textContent);
    } else if (text.length == 13) {
      settext(text);
    }
    else {
      settext(text + e.target.textContent);
    }
  }

  const deletetext = () => {
    settext(text.slice(0, -1));
  }

  return (
    <div>
      <span>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonInput id="input_box" label={text} label-placement="floating" fill="solid" disabled></IonInput>
            </IonCol>
            <IonCol>
              <IonRow>
                <IonCol size="4"><IonButton onClick={addtext}>1</IonButton></IonCol>
                <IonCol size="4"><IonButton onClick={addtext}>2</IonButton></IonCol>
                <IonCol size="4"><IonButton onClick={addtext}>3</IonButton></IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4"><IonButton onClick={addtext}>4</IonButton></IonCol>
                <IonCol size="4"><IonButton onClick={addtext}>5</IonButton></IonCol>
                <IonCol size="4"><IonButton onClick={addtext}>6</IonButton></IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4"><IonButton onClick={addtext}>7</IonButton></IonCol>
                <IonCol size="4"><IonButton onClick={addtext}>8</IonButton></IonCol>
                <IonCol size="4"><IonButton onClick={addtext}>9</IonButton></IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4"><IonButton onClick={addtext}>0</IonButton></IonCol>
                <IonCol size="8"><IonButton onClick={deletetext}>←</IonButton></IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>

      </span>
    </div>
  );
};

export default ExploreContainer;
