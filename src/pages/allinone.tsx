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
    const [isbtnOpen, setisbtnOpen] = useState(false);
    const [isbtnClose, setisbtnClose] = useState(false);
    const [isoutOpen, setisoutOpen] = useState(false);
    const [id, setid] = useState('123');
    const [typeid, settypeid] = useState(false);
    const [pw, setpw] = useState('pw');
    const [face, isface] = useState(false);
    const [jsondata, setjsondata] = useState([]);

    //db
    const [idd, setidd] = useState(''); //jsondata 이름
    const [mile, setmile] = useState('');
    const [come, setcome] = useState('');
    const [product, setproduct] = useState('');
    const [have, sethave] = useState('');
    const [locker, setlocker] = useState(''); //락커
    const [duclass, setduclass] = useState('');
    const [left, setleft] = useState('');
    const [inclass, setinclass] = useState('');

    //데이터 가져오는 함수
    // const get_userinfo = async () => {
    //     let url = 'http://dev.wisevill.com/ur03/get_page_from_db.php';
    //     const options = {
    //         url: url,
    //         params: { id: id },
    //         data: {}
    //     }
    //     const response = await CapacitorHttp.post(options);
    //     setjsondata(JSON.parse(response.data));
    //     return 0;
    // }

    // function print_jsondata() {
    //     if (jsondata == undefined) return 0;
    //     else {
    //         jsondata.forEach(element => {
    //             console.log(element);
    //         });
    //         for (let i = 0; i < jsondata.length; i++) {
    //             console.log(jsondata[i].id);
    //             console.log(jsondata[i].name);
    //             setidd(jsondata[i].name); //이름
    //             setmile(jsondata[i].mile); //마일리지
    //             setcome(jsondata[i].comeinm); //출석횟수
    //             setproduct(jsondata[i].duetoproduct); //회원권 만료일
    //             sethave(jsondata[i].haveproduct); //회원권 상품명
    //             setlocker(jsondata[i].indivlockerinfo);
    //             setduclass(jsondata[i].duetoclass);
    //             setleft(jsondata[i].leftclasstime);
    //             setinclass(jsondata[i].inclass);
    //         }
    //     }
    // }

    return (
        <>
            <IonContent>
                {/* <IonModal backdropDismiss={false} isOpen={isinOpen} ref={inmodal}>
                    <Welcome idd={idd} mile={mile} come={come}
                        product={product} have={have} locker={locker}
                        duclass={duclass} left={left} inclass={inclass}
                        id={id} dismiss={dismiss} />
                </IonModal> */}

                {/* <IonModal backdropDismiss={false} isOpen={isbtnOpen} ref={inmodal}>
                    <Welcome id={id} dismiss={dismiss} />
                </IonModal> */}

                {/* <IonModal backdropDismiss={false} isOpen={isoutOpen} ref={outmodal}>
                    <Test dismiss={dismiss} id={id} />
                </IonModal> */}

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
                                            <FaceRecognition isbtnopen={isbtnOpen} setisbtnOpen={setisbtnOpen} 
                                                id={id} />
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol class="btn">
                                            {/* <Buttons id={id} pw={pw} face={face} setisinOpen={setisinOpen} setisoutOpen={setisoutOpen} typeid={typeid} /> */}
                                            <Buttons id={id} pw={pw} face={face}
                                                setisbtnOpen={setisbtnOpen} setisoutOpen={setisoutOpen} typeid={typeid} />
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