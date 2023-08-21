import './allinone.css';
import Logo from './logo';

import Announcement from './announcement';

import { CapacitorHttp } from '@capacitor/core';

import Input_Box from '../components/inputNum';
import { IonButton, IonCol, IonContent, IonGrid, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import FaceRecognition from "../components/FaceRecognition";
import Buttons from '../components/inputBtn';
import Welcome from './welecome';
import Test from './test';
import React, { useEffect, useRef, useState } from 'react';
import Upload_image from "../components/upload_image";


function Kiosk() {
    const inmodal = useRef();
    const outmodal = useRef();

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
    const [isbtnOpen, setisbtnOpen] = useState(false);
    const [isbtnClose, setisbtnClose] = useState(false);
    const [isbtnoutOpen, setisBtnoutOpen] = useState(false);
    const [id, setid] = useState("");
    const [typeid, settypeid] = useState(false);
    const [pw, setpw] = useState('pw');
    const [face, isface] = useState(false);
    const [jsondata, setjsondata] = useState([]);
    const [code, setcode] = useState("");

    const [isJoinModalOpen, setisJoinModalOpen] = useState(false);

    const [isNewMember, setisNewMember] = useState(false);



console.log("메인");
console.log(code);


    return (
        <>
            <IonContent>

            {code &&<Upload_image code = {code} isJoinModalOpen = {isJoinModalOpen} setisJoinModalOpen = {setisJoinModalOpen}isNewMember = {isNewMember} setisNewMember = {setisNewMember}></Upload_image>}
            
                <div className='background-image-init' />
                <div className='background-image-img' />
                <div className='background-image-gradient' />

                <div className='content'>
                    <IonGrid class="window">
                        <IonRow class="title">
                            <IonCol>
                                <Logo code = {code} setcode = {setcode} isJoinModalOpen = {isJoinModalOpen} setisJoinModalOpen = {setisJoinModalOpen}  isNewMember = {isNewMember} setisNewMember = {setisNewMember}/>
                            </IonCol>
                        </IonRow>
                        {window.innerWidth <= window.innerHeight ? (
                            <IonRow class="announcement">
                                <IonCol class="announcement">
                                    {code && (<Announcement/>)}
                                </IonCol>
                            </IonRow>) : (
                            <div />
                        )}
                        <IonRow class="bottom_side">
                            <IonCol size="8" class="main_input_box">
                                <div className='main_input_box'>
                                    <Input_Box AlertFunc={setid} settypeid={settypeid} isbtnOpen={isbtnOpen} isbtnoutOpen={isbtnoutOpen}/>
                                </div>
                            </IonCol>
                            <IonCol size="4" class="btn_and_face">
                                <IonGrid class="btn_and_face">
                                    <IonRow>
                                        <IonCol class="face">
                                        {code && (<FaceRecognition isbtnopen={isbtnOpen} setisbtnOpen={setisbtnOpen} isbtnoutOpen={isbtnoutOpen} setisbtnoutOpen={setisBtnoutOpen} isJoinModalOpen = {isJoinModalOpen} setisJoinModalOpen = {setisJoinModalOpen}
                                        isNewMember = {isNewMember} setisNewMember = {setisNewMember}
                                                id={id} typeid={typeid} code = {code} />)}
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol class="btn">
                                            {/* <Buttons id={id} pw={pw} face={face} setisinOpen={setisinOpen} setisoutOpen={setisoutOpen} typeid={typeid} /> */}
                                            <Buttons id={id} pw={pw} face={face}
                                                setisbtnOpen={setisbtnOpen} setisbtnoutOpen={setisBtnoutOpen} typeid={typeid} />
                                        </IonCol>



                                    </IonRow>
                                </IonGrid>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
                {/* <IonButton onClick={get_userinfo}></IonButton>
                <IonButton onClick={print_jsondata}></IonButton> */}
            </IonContent>
        </>
    );
}

export default Kiosk;