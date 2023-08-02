import './allinone.css';
import Logo from './logo';

import Announcement from './announcement';

import { CapacitorHttp } from '@capacitor/core';

import Input_Box from '../components/inputNum';
import { IonButton, IonCol, IonContent, IonGrid, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import FaceRecognition from "../components/FaceRecognition";
import Buttons from '../components/inputBtn';
import Welcome from './welecome';
import Test from '../components/test';
import React, { useEffect, useRef, useState } from 'react';

function Kiosk() {
    const inmodal = useRef();
    const outmodal = useRef();
    async function dismiss() {
        setisinOpen(false);
        setisoutOpen(false);
        inmodal.current?.dismiss();
        outmodal.current?.dismiss();
    }

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

    const [isinOpen, setisinOpen] = useState(false);
    const [isoutOpen, setisoutOpen] = useState(false);
    const [id, setid] = useState('123');
    const [typeid, settypeid] = useState(false);
    const [pw, setpw] = useState('pw');
    const [face, isface] = useState(false);
    const [jsondata, setjsondata] = useState([]);

    const get_userinfo = async () => {
        let url = 'http://dev.wisevill.com/ur03/test.php';
        const options = {
            url: url,
            params: {},
            data: {}
        }
        const response = await CapacitorHttp.post(options);
        setjsondata(JSON.parse(response.data));
        return 0;
    }

    function print_jsondata() {
        if (jsondata == undefined) return 0;
        else {
            jsondata.forEach(element => {
                console.log(element);
            });
        }
    }

    return (
        <>
            <IonContent>
                <IonModal backdropDismiss={false} isOpen={isinOpen} ref={inmodal}>
                    <Welcome id={id} dismiss={dismiss}/>
                </IonModal>

                <IonModal backdropDismiss={false} isOpen={isoutOpen} ref={outmodal}>
                    <Test dismiss={dismiss} id={id} />
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
                                    <Input_Box AlertFunc={setid} settypeid={settypeid} />
                                </div>
                            </IonCol>
                            <IonCol size="4" class="btn_and_face">
                                <IonGrid class="btn_and_face">
                                    <IonRow>
                                        <IonCol class="face">
                                            <FaceRecognition />
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol class="btn">
                                            <Buttons id={id} pw={pw} face={face} setisinOpen={setisinOpen} setisoutOpen={setisoutOpen} typeid={typeid} />
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