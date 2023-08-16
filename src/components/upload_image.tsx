import React, { useRef, useState } from 'react';
import { IonButton, IonContent, IonInput, IonItem, IonList } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const Image = () => {
  const [id, setid] = useState<String | null>(null);
  const [tel, settel] = useState<String | null>(null);
  const [pw, setpw] = useState<String | null>(null);
  const [name, setname] = useState<String | null>(null);
  const [code, setcode] = useState<String | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0];
  //   if (selectedFile) {
  //     //   upload(selectedFile);
  //   }
  // };

  function idChange(e: any) {
    setid(e.target.value);
  }

  function telChange(e: any) {
    settel(e.target.value);
  }

  function pwChange(e: any) {
    setpw(e.target.value);
  }

  function nameChange(e: any) {
    setname(e.target.value);
  }

  function codeChange(e: any) {
    setcode(e.target.value);
  }

  const upload = async () => {
    // if(id!.length)
    const formData = new FormData();
    const photo = await takePhoto();
    console.log(photo);
    // formData.append('file', photo);

    // const reader = new FileReader();

    const base64ImageData = photo; // Base64 데이터 부분
    // reader.onload = async (event) => {
    //   const imageData = event.target!.result; // 이미지 데이터


    try {
      const response = await fetch('http://dev.wisevill.com/media/upload_image.php', {
        method: 'POST',
        body: JSON.stringify({ image: base64ImageData, id: id, tel: tel, pw: pw, name: name, code: code }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // const responseData = await response.json();
        console.log('Upload successful:', response);
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


  return (
    <>
      <IonList>
        <IonItem>
          <input placeholder='회원번호 : 5자리' onChange={idChange}></input>
        </IonItem>
        <IonItem>
          <input placeholder='전화번호' onChange={telChange}></input>
        </IonItem>
        <IonItem>
          <input placeholder='PW : 6자리' onChange={pwChange}></input>
        </IonItem>
        <IonItem>
          <input placeholder='이름' onChange={nameChange}></input>
        </IonItem>
        <IonItem>
          <input placeholder='체육관 코드(AAAAAA)' onChange={codeChange}></input>
        </IonItem>
        {/* <IonItem>
          <input type="file" ref={fileInputRef} onChange={onFileChange} />
        </IonItem> */}
        <IonItem>
          <IonButton onClick={upload} />
        </IonItem>
      </IonList>
    </>
  );
};

export default Image;

{/* <IonModal isOpen={isinOpen} onWillDismiss={() => setisinOpen(false)} >
                    <Upload />
                </IonModal>
                <IonButton onClick={() => setisinOpen(true)}/> */}