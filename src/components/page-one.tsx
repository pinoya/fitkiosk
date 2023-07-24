import React from 'react';
import { IonButton, IonHeader, IonContent, IonNavLink, IonToolbar, IonTitle } from '@ionic/react';

import PageTwo from './inputNum';

const tempstyle = {
  width:"30vw",
  height:"10vh"
}


function PageOne() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Page One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <h1>Page One</h1>
        <IonNavLink routerDirection="forward" component={() => <PageTwo />}>
          <IonButton className='test' style={tempstyle}>Go to Page Two</IonButton>
        </IonNavLink>
      </IonContent>
    </>
  );
}

export default PageOne;