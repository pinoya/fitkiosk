import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonList, IonModal, IonRow } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// import Keyboard from './keyboard';


import './NumPad.css';
import { add, camera } from 'ionicons/icons';

import Input_Box from '../components/inputNum';
import { Preferences } from '@capacitor/preferences';
import Logo from './logo.svg';


const Image = (props: any) => {
  const [id, setid] = useState<String | null>(null);

  const [name, setname] = useState<String>("회원");
  const [gymcode, setgymcode] = useState<String | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isJoinModalOpen, setisJoinModalOpen] = useState(true);

  const [idCount, setidCount] = useState("00001");



  // setgymcode(props.code);
  // console.log(props.code);
  // console.log(props.code);


  const upload = async () => {



    // if(id!.length)

    setgymcode(props.code);
    console.log(idCount);

    const formData = new FormData();
    const photo = await takePhoto();
    console.log(photo);


    const base64ImageData = photo; // Base64 데이터 부분
    // reader.onload = async (event) => {
    //   const imageData = event.target!.result; // 이미지 데이터


    try {
      const response = await fetch('http://dev.wisevill.com/media/upload_image.php', {
        method: 'POST',
        body: JSON.stringify({ image: base64ImageData, id: idCount, tel: tel, pw: pw, name: name, code: gymcode }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // const responseData = await response.json();
        console.log('Upload successful:', response);
        // handleRepeatCount();
        props.setisNewMember(true);
        props.setisJoinModalOpen(false);
      } else {
        console.error('Upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    // };

    // reader.readAsDataURL(file); // 파일을 Data URL 형식으로 읽기
  };


  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    });
    return photo.base64String;
  }

  const CloseJoinModal = () => {
    props.setisJoinModalOpen(false);
    console.log("눌립니다");
    console.log(props.isJoinModalOpen);
    settel('전화번호를 입력하세요.');
    setpw('비밀번호를 입력하세요. (6자리)');
  }




  console.log(name);
  console.log(gymcode);





  // const [tel, settel] = useState<String | null>(null);
  // const [pw, setpw] = useState<String | null>(null);

  const [tel, settel] = useState('전화번호를 입력하세요.');
  const [pw, setpw] = useState('비밀번호를 입력하세요. (6자리)');
  const [selectedInput, setSelectedInput] = useState('tel'); // Keep track of the selected input



  const addtext = (value: any) => {
    if (selectedInput === 'tel') {
      if (tel === '전화번호를 입력하세요.') {
        settel(value); // 첫번째 수로 바뀜
      }
      else {
        if (tel.length == 3 || tel.length == 8) {
          settel(prevInput => prevInput + "-" + value);
        }
        else if (tel.length < 13) {
          settel(prevInput => prevInput + value);
        }
        else {
          setSelectedInput('pw');
        }
      }
    }
    else if (selectedInput === 'pw') {
      if (pw === '비밀번호를 입력하세요. (6자리)') {
        setpw(value);
      }
      else if (pw.length < 6) {
        setpw(prevInput => prevInput + value);
      }
    }
  };

  const resetText = () => {
    if (selectedInput === 'tel') {
      settel('');
    } else if (selectedInput === 'pw') {
      setpw('');
    }
  };

  const deleteText = () => {
    if (selectedInput === 'tel' && tel.length > 0) {
      settel(prevInput => prevInput.slice(0, -1));
    } else if (selectedInput === 'pw' && pw.length > 0) {
      setpw(prevInput => prevInput.slice(0, -1));
    }
  };

  console.log(tel);
  console.log(pw);

  // useEffect(() => {
  //   checkCode();

  // }, []);

  // onTextChange(input);


  return (
    <>
      <IonModal className="joinModal" isOpen={props.isJoinModalOpen} backdropDismiss={false}>

        {/* <p className="addBox">회원번호 {idCount}</p> */}
        {/* <div className='logobox'><img src={Logo} alt="Logo" /></div>
           */}

        <div className='join'>회원가입</div>
        <div className='borderBox'>
          <p className="addBox" onClick={() => setSelectedInput('tel')}>
            {tel}
          </p>
        </div>

        <div className='borderBox'>
          <p onClick={() => setSelectedInput('pw')} className="addBox">{pw}</p>
        </div>
        <IonGrid>

          <IonRow className="Numkey_pad">
            <IonCol className="input_boxx">
              <IonRow className="Numkey_row">
                <IonCol>
                  <IonButton className="Numkey" onClick={() => addtext("1")}>1</IonButton>
                  <IonButton className="Numkey" onClick={() => addtext("2")}>2</IonButton>
                  <IonButton className="Numkey" onClick={() => addtext("3")}>3</IonButton>
                </IonCol>
              </IonRow>
              <IonRow className="Numkey_row">
                <IonCol>
                  <IonButton className="Numkey" onClick={() => addtext("4")}>4</IonButton>
                  <IonButton className="Numkey" onClick={() => addtext("5")}>5</IonButton>
                  <IonButton className="Numkey" onClick={() => addtext("6")}>6</IonButton>
                </IonCol>
              </IonRow>
              <IonRow className="Numkey_row">
                <IonCol>
                  <IonButton className="Numkey" onClick={() => addtext("7")}>7</IonButton>
                  <IonButton className="Numkey" onClick={() => addtext("8")}>8</IonButton>
                  <IonButton className="Numkey" onClick={() => addtext("9")}>9</IonButton>
                </IonCol>
              </IonRow>
              <IonRow className="Numkey_row">
                <IonCol>
                  <IonButton className="Numkey" style={{ fontSize: '26px' }} onClick={resetText}>취소</IonButton>
                  <IonButton className="Numkey" onClick={() => addtext("0")}>0</IonButton>
                  <IonButton className="Numkey" onClick={deleteText}>X</IonButton>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className='btn_last'>
          <div className='cameraBtn_div'>
            <button className="cameraBtn" onClick={() => upload()}>
              <IonIcon className="hi" icon={camera}></IonIcon>
            </button>
          </div>

          <div className='joinCancelBtn_div'>
            <button className="joinCancelBtn" onClick={() => { CloseJoinModal() }}>취소</button>
          </div>
        </div>






      </IonModal>



    </>
  );
};

export default Image;

