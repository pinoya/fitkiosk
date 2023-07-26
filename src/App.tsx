import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonNav } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Entrance from './pages/entrance';
import Exit from './pages/exit';
import InputNum from './components/inputNum';

import Input_Tel from './page/Input_Tel';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>

    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <IonNav root={() => <Home />}></IonNav>;
        </Route>

        <Route exact path="/Exit">
          <Exit />
        </Route>

        <Route exact path="/Entrance">
          <Entrance />
        </Route>

        <Route exact path="/InputNum">
          <InputNum />
        </Route>

        <Route exact path="/Input_Tel">
          <Input_Tel />
        </Route>

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <Redirect exact from="/" to="/home" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
