import './allinone.css';
import MainImg from './testimg.jpg';
import Logo from './logo';
import Announcement from './announcement';
import Input_Box from '../components/inputNum';
import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import FaceRecognition from "../components/FaceRecognition";
import Buttons from '../components/inputBtn';

import React, { useEffect, useState } from 'react';

function Kiosk() {
    const [width, setWidth] = useState(window.innerWidth);
    const [Height, setHeight] = useState(window.innerHeight);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <IonContent>
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
                            <div/>
                        )}
                        <IonRow class="bottom_side">
                            <IonCol size="8" class="main_input_box">
                                <div className='main_input_box'><Input_Box /></div>
                            </IonCol>
                            <IonCol size="4" class="btn_and_face">
                                <IonGrid>
                                    <IonRow>
                                        <IonCol class="face">
                                            {/* <FaceRecognition /> */}
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol class="btn">
                                            <Buttons />
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