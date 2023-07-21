// import './ExploreContainer.css';

// interface ContainerProps { }

// const ExploreContainer: React.FC<ContainerProps> = () => {
//   return (
//     <div id="container">
//       <button>hi</button>
//       <strong>Ready to create an app?</strong>
//       <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
//     </div>
//   );
// };

// export default ExploreContainer;


import './ExploreContainer.css';
import React from 'react';
import { IonButton } from '@ionic/react';
interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
     <div id="container">
       <div className="block">
          <IonButton size="large">Default</IonButton>
          <IonButton size="large">Default</IonButton>
          </div>
          <IonButton>Default</IonButton>
        </div>
  );
};

export default ExploreContainer;
