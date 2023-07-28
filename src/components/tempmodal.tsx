import { IonButton, IonContent, IonTitle, IonToolbar } from '@ionic/react';
import './inputBtn.css';

const InputBtn = (props: any) => {
    return (
        <>
            <IonContent>
                <IonToolbar>
                    <IonTitle>Title</IonTitle>
                    <IonButton color="light" onClick={() => props.dismiss()}>
                        Close
                    </IonButton>
                </IonToolbar>
                {props.id} 님 어서오세요.
            </IonContent>
        </>
    );
}

export default InputBtn;