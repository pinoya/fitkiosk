import './allinone.css';
import Logo from './logo';
<<<<<<< HEAD

import Announcement from './announcement';

import Buttons from '../components/inputBtn'


=======
import Announcement from './announcement';
>>>>>>> 85c92eddcd54b2b13d27227c1115336ed9ba33cc
import Input_Box from '../components/inputNum';
import { IonButton, IonCol, IonContent, IonGrid, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import FaceRecognition from "../components/FaceRecognition";
import Buttons from '../components/inputBtn';
import Modal from '../components/tempmodal';

import React, { useEffect, useRef, useState } from 'react';


function Kiosk() {
    const modal = useRef();
    async function dismiss() {
        modal.current?.dismiss();
        setisOpen(false);
    }

    const [isOpen, setisOpen] = useState(false);
    const [id, setid] = useState('123');
    const [typeid, settypeid] = useState(false);
    const [pw, setpw] = useState('pw');
    const [face, isface] = useState(false);

    return (
        <>
            <IonContent>
                <IonModal backdropDismiss={false} isOpen={isOpen} id="modaltest" ref={modal}>
                    <Modal id={id} pw={pw} dismiss={dismiss}/>
                </IonModal>
                <div className='background-image-init' />
                <div className='background-image-img' />
                <div className='background-image-gradient' />

                <div className='content'>
                    <IonGrid class="window">
                        <IonRow class="title">
                            <IonCol>
                                <Logo />
                            </IonCol>
                        </IonRow>
                        {window.innerWidth <= window.innerHeight ? (
                            <IonRow class="announcement">
                                <IonCol class="announcement">
                                    <Announcement />
                                </IonCol>
                            </IonRow>) : (
                            <div />
                        )}
                        <IonRow class="bottom_side">
                            <IonCol size="8" class="main_input_box">
                                <div className='main_input_box'>
                                    <Input_Box AlertFunc={setid} settypeid={settypeid}/>
                                </div>
                            </IonCol>
                            <IonCol size="4" class="btn_and_face">
                                <IonGrid>
                                    <IonRow>
                                        <IonCol class="face">
                                            {id}<br></br>{pw}<br />{face}
                                            {/* <FaceRecognition /> */}
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol class="btn">
                                            <Buttons id={id} pw={pw} face={face} setisOpen={setisOpen} typeid={typeid}/>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </>
    );
}

export default Kiosk;