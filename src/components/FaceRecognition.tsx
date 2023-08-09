// src/components/FaceRecognition.tsx

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import ModalComponent from "./ModalComponent";
import Welcome from "../pages/welecome";
import { IonCol, IonImg, IonModal } from "@ionic/react";
import { CapacitorHttp } from "@capacitor/core";
import Password from "../pages/password";
import "./FaceRecognition.css";


import { UserPhoto, usePhotoGallery } from '../hooks/usePhotoGallery';


const UNKNOWN_LABEL = "Unknown";
const UNKNOWN_THRESHOLD = 0.3;


interface FaceRecognitionProps {
  setisbtnOpen(arg0: boolean): unknown;
  isbtnopen: boolean;
  id: string | null;
  typeid: boolean;
}

// interface LabelTime {
//   label: string;
//   time: string;
// }


//Unknown이 몇번 이상 떴을때만 화면에 텍스트 출력되도록 수정


const FaceRecognition: React.FC<FaceRecognitionProps> = (props) => {



  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRefSelfie = useRef<HTMLCanvasElement | null>(null);
  const webcamActive = useRef(false); // Ref to track webcam state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isidFail, setIsIdFail] = useState(false);
  const [detectedLabel, setDetectedLabel] = useState<string | null>(null);
  const [isModalShownForLabel, setIsModalShownForLabel] = useState<boolean>(false);
  const [isgetlabel, setIsGetLabel] = useState(false);

  const [isgetbtnlabel, setIsGetBtnLabel] = useState(false);

  const [WebcamActive, setIsWebcamActive] = useState(false);
  const [selfieURL, setSelfieURL] = useState<string | null>(null);
  const [isUnknown, setIsUnknown] = useState(false);
  const [jsondata, setjsondata] = useState([]);

  const [iscontrol, setIsControl] = useState(false);



  const [isbtnModalOpen, setIsBtnModalOpen] = useState(false);


  const [mid, setmid] = useState('');
  const [idd, setidd] = useState(''); //jsondata 이름
  const [tel, settel] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [mile, setmile] = useState('');
  const [come, setcome] = useState('');
  const [product, setproduct] = useState('');
  const [have, sethave] = useState('');
  const [locker, setlocker] = useState(''); //락커
  const [duclass, setduclass] = useState('');
  const [left, setleft] = useState('');
  const [inclass, setinclass] = useState('');






  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      webcamActive.current = true; // Set webcam state to active
      setIsWebcamActive(true);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopWebcam = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    videoRef.current!.srcObject = null;
    webcamActive.current = false; // Set webcam state to inactive
    setIsWebcamActive(false);
  };

  // //셀피찍기
  const handleCaptureSelfie = () => {
    if (canvasRefSelfie.current && videoRef.current) {
      const canvas = canvasRefSelfie.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        //drawImage(image ,canvas_x, canvas_y,canvas_width,canvas_height)

        // 캔버스를 이미지로 저장하여 URL을 생성합니다.
        const URL = canvas.toDataURL("image/png");

        console.log("셀피 URL:", URL);
        // setSelfieURL(selfieURL);

        // const image = canvasRefSelfie.current.toDataURL('image/png');
        // const link = document.createElement('a');
        // link.href = image;
        // link.download = 'sign_image.png';
        // link.click();


      }

    }
  };




  // const handleUploadSelfie = () => {

  // };

  //셀피 지우기
  // const deleteCaptureSelfie = () => {
  //   if (canvasRefSelfie.current && videoRef.current) {
  //     const canvas = canvasRefSelfie.current;
  //     const context = canvas.getContext("2d");
  //     if (context) {
  //       context.clearRect(0, 0, canvas.width, canvas.height);
  //     }
  //   }
  // };

  //새로운 사람이 등록 -> 
  //사진 등록 -> 분석 -> db 저장 
  //모든 사람 

  //

  const [labelSet, setLabelSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    const getLabeledFaceDescriptions = async () => {
      const gymLabel = "gym"; // 설정한 체육관이 사용하는 폴더명 받아오기
      //폴더명
      const labels = ["33333", "11111", "44444", "22222"]; // 폴더 내에 있는 파일 이름

      //11111 : 이재인

      return Promise.all(
        labels.map(async (label) => {
          const descriptions = [];
          const imgUrl = `./labels/${gymLabel}/${label}.jpg`;
          const img = await faceapi.fetchImage(imgUrl);
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
          descriptions.push(detections.descriptor);
          // console.log(detections.descriptor);
          return new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
      );
    };

    const setupFaceRecognition = async () => {
      const labeledFaceDescriptors = await getLabeledFaceDescriptions();
      const faceMatcher = new faceapi.FaceMatcher(
        labeledFaceDescriptors,
        UNKNOWN_THRESHOLD
      );

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const displaySize = { width: video!.width, height: video!.height };
      faceapi.matchDimensions(canvas!, displaySize);

      const intervalId = setInterval(async () => {
        if (webcamActive.current && !video!.paused && !video!.ended) {
          const detections = await faceapi
            .detectAllFaces(video!)
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          canvas!.getContext("2d")!.clearRect(0, 0, canvas!.width, canvas!.height);

          const results = resizedDetections.map((d: any) => {
            return faceMatcher.findBestMatch(d.descriptor);
          });


          results.forEach(async (result: any, i: number) => {
            const box = resizedDetections[i].detection.box;
            let label = result.toString();

            if (result.distance > UNKNOWN_THRESHOLD) {
              label = UNKNOWN_LABEL;
              setIsUnknown(true);

            }

            if (result.distance <= UNKNOWN_THRESHOLD) {
              // setDetectedLabel(label.split(" ")[0]); // Extract the label without confidence score
              // console.log(detectedLabel);
              const detectedLabel = label.split(" ")[0];

              setDetectedLabel(detectedLabel); // setDetectedLabel 함수는 사용자 정의되어 있다고 가정
              // addLabelWithDupCheck(detectedLabel);

              // if (!labelArray.some(item => item.label === detectedLabel)) {
              //   const currentTime = new Date().toLocaleTimeString(); // 현재 시간을 가져옴
              //   setLabelArray(prevArray => [...prevArray, { label: detectedLabel, time: currentTime }]);
              // }
              setIsModalOpen(true);
              // console.log(labelArray);
            }
            // else {
            //   label = UNKNOWN_LABEL;
            //   setIsUnknown(true);
            // }

            const context = canvas!.getContext("2d")!;
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.fillStyle = "red";
            // // context.strokeStyle = "transparent";
            // // context.fillStyle = "transparent";
            context.font = "20px Arial";

            const landmarks = resizedDetections[i].landmarks;
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();

            // 좌/우 눈 중앙을 기준으로 박스 위치 조정
            const boxCenterX = (leftEye[0].x + rightEye[3].x) / 2;
            const boxCenterY = (leftEye[0].y + rightEye[3].y) / 2;
            const textWidth = context.measureText(label).width;
            const textHeight = parseInt(context.font); // Assuming font size is in px

            const x = boxCenterX - textWidth / 2;
            const y = boxCenterY - box.height / 2 - textHeight; // Adjust the vertical position of the label above the face

            context.fillText(label, x, y + textHeight);
            context.strokeRect(box.x, box.y, box.width, box.height);

            // if (result.distance > UNKNOWN_THRESHOLD) {
            //   setIsUnknown(true);
            // }

          });
        }
      }, 1000);

      // Clean up interval when the component unmounts or webcam is stopped]
      //component unmonts(컴포넌트가 사라질때, 웹캠이 멈출때.)
      return () => clearInterval(intervalId);
    };

    // console.log(uniqueLabels);

    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    ]).then(() => startWebcam().then(setupFaceRecognition));

    //useEffect안에서 실행되었던 코드가 clean-up되고 새로 무언가를 다시 그리고 싶을때 return을 사용
    // Clean up webcam when the component unmounts
    return () => {
      if (webcamActive.current) {
        stopWebcam();
      }

    };
  }, []);

  const [labelArray, setLabelArray] = useState<{ label: string; time: string }[]>([]);

      // 라벨과 시간을 추가하는 함수
      const addLabelWithTime = (label: string): void => {
        const currentTime = new Date().toLocaleTimeString();
        setLabelArray(prevArray => [...prevArray, { label, time: currentTime }]);
      };

      // 라벨과 시간을 추가하고 중복 체크하는 함수
      const addLabelWithDupCheck = (detectedLabel: string): void => {
        if (!labelArray.some(item => item.label === detectedLabel)) {
          addLabelWithTime(detectedLabel);
          // console.log(labelArray);
        }
      };


//db 출석 플래그 제어

// 배열 타임스탬프 

// db에 시간

// 22222 -> db 검색 -> 출석 플래그 확인 
//                  -> 과거 나간 시간 - 현재 시간 > 5분 이상 - > 출석.

//이전에 탐색한 사람 그거를 뺀다고 치자.
//

//감지는 계속 되고 있는데, 
//이전에 인식한 라벨과 같은 경우가 아닌 경우에만 창 열리도록 했음.

// 인식 계속 되고 있음.

// 출석을 확인을 할려면 -> db 접속
// 인식 계속 되고 있으니까
// 계속 출석
// 출석 확인하면 연산들어갈거고 
// db 접속.

// 일단은.

//만약 출석 플래그를 먼저 가져오면,
// 출석 플래그를 가져오고, 계산을 하고 이런 과정이 무한 반복돼서 계속해서 db에 접근하게됨.

// 1. 해결책 -> 카메라를 5초 뒤에 켠다.  -> 그래도 연산은 피할 수 없음.

// 2. 해결책 -> 배열에 시간 값을 저장하고, 5분의 이상의 딜레이가 있을 경우에만 모달을 열고, 유저데이터를 가져온다.
// -> 데이터에 접근을 덜 할 수 있음.

// 22222 / 시간 

// 22222 / 시간 

// 5분 이상 

//유저 데이터

const resetDetectedLabel = () => {
  setTimeout(() => {
    // setDetectedLabel("리셋합니다.");
    // localStorage.setItem("shownLabel", "리셋합니다.");
    setDetectedLabel("특정값");
    setBeforeLabel("특정값");
    console.log("리셋했습니다.");
    const currentTime = new Date().toLocaleTimeString();
    console.log(currentTime);
  }, 30000); // 1000 = 1초 10000 =10초 30초로 지정해놓음.
}


//출석버튼 -> 출석 플래그 확인 -> 출석 하지 않았을 경우에만 비밀번호 창을 열어줌.
//비밀번호 성공 -> 출석(출석 플래그 올림 / 출석 시간(현재시간) db에 찍기)


// 얼굴인식 확인 창의 출석(출석플래그 올림/ 출석시간(현재시간) db에 찍기) -> 확인창.  
// 얼굴인식 확인 창의 퇴실(퇴실플래그 올림/ 퇴실시간(현재시간) db에 찍기) -> 확인창.  

// 출석 퇴실 확인할 필요가 사라짐. 30초 지났을때 다시 인식되면 퇴실시키면 됨 그냥.

//다른 사람 다시 인식될때

// 30초 뒤에 초기화
// 같은 사람 인식되게 


  //얼굴 인식 모달 끄기
  const handleCloseModal = () => {
    setIsModalOpen(false); //모달창 닫기
    setIsModalShownForLabel(true); //모달창 닫기 (shownLabel === detectedLabel 다고 지정해놓기)
    // Store the detected label in localStorage to prevent showing the modal again for the same label
    // localStorage.setItem("shownLabel", detectedLabel ?? "");
    setBeforeLabel(detectedLabel);
    // deleteCaptureSelfie(); //셀피 지우기
    setIsGetLabel(false); //라벨 플래그 초기화
    reset(); //얼굴인식 실패 횟수 리셋
    startWebcam(); //캠 시작하기
    const currentTime = new Date().toLocaleTimeString();
    console.log("모달이 닫혔습니다.");
    console.log(currentTime);
    resetDetectedLabel();
  };


  //버튼으로 들어간 모달 끄기
  const handleClosebtnModal = () => {
    // setIsModalOpen(); //모달창 닫기
    props.setisbtnOpen(false); //모달창 닫기
    // deleteUserInfo(); //유저정보 지우기
    setIsGetBtnLabel(false); //라벨 플래그 값 초기화
    // deleteCaptureSelfie(); //셀피 지우기
    reset(); //얼굴인식 실패 횟수 리셋
    startWebcam(); //캠 시작하기
  };

  const [BeforeLabel, setBeforeLabel] = useState<string | null>(null);

  useEffect(() => {
    // Check if the detectedLabel has already been shown in a previous session
    //제일 처음 창이 켜질 때 shownLable 값과 detectedLabel 값을 다르게 해주기
    if (detectedLabel == null) {
      setBeforeLabel(null);
    }

    // const shownLabel = localStorage.getItem("shownLabel");

    console.log(BeforeLabel);
    console.log(detectedLabel);

    if (BeforeLabel === detectedLabel) {
      setIsModalShownForLabel(true);
      console.log("이전 라벨값과 현재 라벨값이 같습니다.");
    } else { //이전에 감지한 내용과 다를때만 모달창이 열릴 수 있음.
      setIsModalShownForLabel(false); //모달창 열림.
      get_userinfo(); //정보와 라벨 얻기...
      // handleCaptureSelfie(); //셀피 찍기
      console.log("이전 라벨값과 현재 라벨값이 다릅니다. 실행합니다.");
      stopWebcam(); //캠 끄기
    }


  }, [detectedLabel]);


  //다시 킴
  // useEffect(() => {
  //   // Check if the detectedLabel has already been shown in a previous session
  //   //제일 처음 창이 켜질 때 shownLable 값과 detectedLabel 값을 다르게 해주기
  //   if (detectedLabel == null) {
  //     localStorage.setItem("shownLabel", "null");
  //   }

  //   const shownLabel = localStorage.getItem("shownLabel");
  //   //22222

  //   //감지된 이름 -> 리셋합니다. / 22222 

  //   // 로컬 저장 / 감지된 이름
  //   // 22222 / 리셋합니다.

  //   // 로컬 저장을 건들여도 감지된 이름이 같으니까 이쪽이 실행이 안됨.
  //   console.log(shownLabel);

  //   if (shownLabel === detectedLabel) {
  //     setIsModalShownForLabel(true);
  //     console.log("여기가 실행되어야 하는거 아냐?!!!!!!");
  //   } else { //이전에 감지한 내용과 다를때만 모달창이 열릴 수 있음.
  //     setIsModalShownForLabel(false); //모달창 열림.
  //     get_userinfo(); //정보와 라벨 얻기...
  //     // handleCaptureSelfie(); //셀피 찍기
  //     console.log("실행됩니다...");
  //     stopWebcam(); //캠 끄기
  //   }


  // }, [detectedLabel]);







  //얼굴인식 유저 정보 가져오는 함수.
  const get_userinfo = async () => {
    let url = 'http://dev.wisevill.com/kioskdb/get_data_from_db.php';
    console.log(detectedLabel);
    if (detectedLabel) {
      const options = {
        url: url,
        data: { id: detectedLabel },
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

      }
      const response = await CapacitorHttp.post(options);
      setjsondata(JSON.parse(response.data));

      for (let i = 0; i < JSON.parse(response.data).length; i++) {
        console.log(JSON.parse(response.data)[i].id);
        console.log(JSON.parse(response.data)[i].name);
        console.log(JSON.parse(response.data)[i].mile);
        setmid(JSON.parse(response.data)[i].id);
        setidd(JSON.parse(response.data)[i].name); //이름
        settel(JSON.parse(response.data)[i].tel);
        setProfileImg(JSON.parse(response.data)[i].profile_img);
        setmile(JSON.parse(response.data)[i].mile); //마일리지
        setcome(JSON.parse(response.data)[i].comeinm); //출석횟수
        setproduct(JSON.parse(response.data)[i].duetoproduct); //회원권 만료일
        sethave(JSON.parse(response.data)[i].haveproduct); //회원권 상품명
        setlocker(JSON.parse(response.data)[i].indivlockerinfo);
        setduclass(JSON.parse(response.data)[i].duetoclass);
        setleft(JSON.parse(response.data)[i].leftclasstime);
        setinclass(JSON.parse(response.data)[i].inclass);
      }
    }
    setIsGetLabel(true);
  }

  //버튼일때 유저 정보 가져오는  함수
  useEffect(() => {

    if (props.isbtnopen) {
      stopWebcam();
      get_btn_userinfo(); //버튼일때 유저 정보 가져오기
    }
  }, [props.isbtnopen]);
  
  const get_btn_userinfo = async () => {
    let url = 'http://dev.wisevill.com/kioskdb/get_data_from_db.php';

    console.log(mid);
    if (props.id) {
      if (!props.typeid) { //회원번호
        const options = {
          url: url,
          data: { id: props.id },
          // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }

        const response = await CapacitorHttp.post(options);
        // console.log(JSON.parse(response.data));

        for (let i = 0; i < JSON.parse(response.data).length; i++) {

          console.log(JSON.parse(response.data)[i].id);
          console.log(JSON.parse(response.data)[i].name);
          console.log(JSON.parse(response.data)[i].mile);
          setmid(JSON.parse(response.data)[i].id); //회원 아이디
          console.log(mid);
          setidd(JSON.parse(response.data)[i].name); //이름
          settel(JSON.parse(response.data)[i].tel);
          setProfileImg(JSON.parse(response.data)[i].profile_img);
          setmile(JSON.parse(response.data)[i].mile); //마일리지
          setcome(JSON.parse(response.data)[i].comeinm); //출석횟수
          setproduct(JSON.parse(response.data)[i].duetoproduct); //회원권 만료일
          sethave(JSON.parse(response.data)[i].haveproduct); //회원권 상품명
          setlocker(JSON.parse(response.data)[i].indivlockerinfo);
          setduclass(JSON.parse(response.data)[i].duetoclass);
          setleft(JSON.parse(response.data)[i].leftclasstime);
          setinclass(JSON.parse(response.data)[i].inclass);
        }
        // checkId();

        // console.log(props.id);
        // console.log(mid);

        // if (props.id == mid) {
        //   setIsGetBtnLabel(true);
        // } 
        // console.log(mid);
        // if(mid !== null && props.id == mid){
        //   setIsGetBtnLabel(true);
        // }else {
        //   setIsIdFail(true);
        // }

      }
      else if (props.typeid) {
        const options = {
          url: url,
          data: { tel: props.id },
          // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        const response = await CapacitorHttp.post(options);
        console.log(JSON.parse(response.data));

        for (let i = 0; i < JSON.parse(response.data).length; i++) {

          console.log(JSON.parse(response.data)[i].id);
          console.log(JSON.parse(response.data)[i].name);
          console.log(JSON.parse(response.data)[i].mile);
          setmid(JSON.parse(response.data)[i].id); //회원 아이디
          settel(JSON.parse(response.data)[i].tel);
          setidd(JSON.parse(response.data)[i].name); //이름
          console.log(tel);
          setProfileImg(JSON.parse(response.data)[i].profile_img);
          setmile(JSON.parse(response.data)[i].mile); //마일리지
          setcome(JSON.parse(response.data)[i].comeinm); //출석횟수
          setproduct(JSON.parse(response.data)[i].duetoproduct); //회원권 만료일
          sethave(JSON.parse(response.data)[i].haveproduct); //회원권 상품명
          setlocker(JSON.parse(response.data)[i].indivlockerinfo);
          setduclass(JSON.parse(response.data)[i].duetoclass);
          setleft(JSON.parse(response.data)[i].leftclasstime);
          setinclass(JSON.parse(response.data)[i].inclass);
        }
      } //전화번호
      setIsGetBtnLabel(true);
    }

  }




  // checkId();
  const checkId = () => {
    console.log(props.id);
    console.log(mid);
    // if (props.id == mid) {
    //   setIsGetBtnLabel(true);
    // } else {
    //   setIsIdFail(true);
    // }
  }

  const deleteUserInfo = () => {
    setmid(''); //회원 아이디
    settel('');
    setidd(''); //이름
    setProfileImg('');
    setmile(''); //마일리지
    setcome(''); //출석횟수
    setproduct(''); //회원권 만료일
    sethave(''); //회원권 상품명
    setlocker('');
    setduclass('');
    setleft('');
    setinclass('');
    console.log(mid);
  }



  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    console.log(count);
    if (isUnknown) {
      // 텍스트를 5초 동안 보여준 후에 숨김
      timer = setTimeout(() => {
        setIsUnknown(false);
        handleCount();
      }, 5000);
    }


    // 컴포넌트가 unmount되거나 showText 값이 false로 변경되면 타이머를 클리어
    return () => clearTimeout(timer);
  }, [isUnknown]);



  const [count, setCount] = useState(0); //실패횟수 카운팅
  const [failCount] = useState(5); //실패 횟수 

  const handleCount = () => {
    if (count < failCount) {
      setCount(count + 1);
    } else if (count >= failCount) {
      setCount(0);
    }
  }

  const increase = () => {
    setCount(count + 1);

  }

  const reset = () => {
    setCount(0);
  }

  let fail;

  if (isUnknown && count < failCount) {
    fail = <h1 style={{ margin: "0 auto", position: "absolute" }} > 다시 시도해주세요.</h1>
  }
  else if (isUnknown && count == failCount) {
    fail = <h1 style={{ margin: "0 auto", position: "absolute" }} > 얼굴인식 실패. 회원번호나 휴대폰 번호를 이용해주십시오.</h1>
  }


  const handleIdFail = () => {
    props.setisbtnOpen(false);
    setIsIdFail(false);
    startWebcam();
  }


  // //버튼으로 들어간 모달 끄기
  // const handleClosebtnModal = () => {
  //   // setIsModalOpen(); //모달창 닫기
  //   props.setisbtnOpen(false); //모달창 닫기
  //   setIsGetBtnLabel(false); //라벨 플래그 값 초기화
  //   // deleteCaptureSelfie(); //셀피 지우기
  //   reset(); //얼굴인식 실패 횟수 리셋
  //   startWebcam(); //캠 시작하기
  // };

  // <IonModal isOpen={
  //   props.isbtnopen && isgetbtnlabel} backdropDismiss={false} >
  // {idEntry}

  // </IonModal>
  let idEntry;
  if (mid == props.id || tel == props.id) {
    idEntry = <IonModal className="baseModal" isOpen={
      props.isbtnopen && isgetbtnlabel} backdropDismiss={false} > <Password
        id={props.id}
        idd={idd}
        selfieURL={profileImg}
        mid={mid}
        tel={tel}

        mile={mile}
        come={come}
        product={product}
        have={have}
        locker={locker}
        duclass={duclass}
        left={left}
        inclass={inclass}
        //userpwd={userpwd}
        onClose={handleClosebtnModal} userpwd={null} />
    </IonModal>
  }
  else {
    idEntry = <IonModal className="failId" isOpen={props.isbtnopen && isgetbtnlabel} backdropDismiss={false} >
      <p>다시 입력해주세요.</p>
      <button onClick={handleClosebtnModal}>닫기</button>
    </IonModal>
    // <div >
    // <button onClick={handleClosebtnModal}>무조건 눌러...</button>
    // <p>모달창 겹치는거랑 크기만 어떻게 하면....</p>
    // </div>
    // style={{ background : "white", width: "100%",heigh : "100%" }}
  }

  const [nowTime, setNowTime] = useState(Date.now())
  const Time = () => {
    setNowTime(Date.now())
    console.log(nowTime);
  }

  // const Control = () =>{
  //   setIsControl(true);
  //   console.log("클릭됐어요");

  // }

  return (
    <>
      <video
        ref={videoRef}
        id="video"
        width="720"
        height="560"
        autoPlay
        muted
        style={{ margin: "0 auto", position: "absolute" }}
      />

      <canvas ref={canvasRef} style={{ margin: "0 auto", position: "absolute" }} />


      {fail}

{/*  
      <button onClick={Time} style={{ margin: "0 auto", position: "absolute" }}>ㅋㅋ</button>*/}

      <div>{count}</div>

      {/* <button onClick={handleCaptureSelfie} style={{ margin: "0 auto", position: "absolute" }}>찰칵</button> */}

      {/* <canvas className="Selfie" ref={canvasRefSelfie} style={{ margin: "0 auto", position: "absolute" }} /> */}


      {/*카메라가 꺼졌을 때 찍힌 셀피를 보여줌.*/}


      {/* <IonModal className = "baseModal" isOpen={isModalOpen && !isModalShownForLabel && isgetlabel} backdropDismiss={false}> */}
      <IonModal className = "baseModal" isOpen={isModalOpen && !isModalShownForLabel && isgetlabel} backdropDismiss={false}>
        <ModalComponent
          detectedName={idd} //회원 id
          selfieURL={profileImg} // Pass the selfie URL here // Show the modal only if it's open and not shown for the current detected label
          mid={mid}
          tel={tel}
          mile={mile}
          come={come}
          product={product}
          have={have}
          locker={locker}
          duclass={duclass}
          left={left}
          inclass={inclass}
          onClose={handleCloseModal} />
      </IonModal>
      {/* 
      <IonModal isOpen={isidFail} backdropDismiss={false} >
        <p>다시 입력해주세요.</p>
        <button onClick={handleIdFail}>닫기</button>
      </IonModal> */}
      {idEntry}

      {/* <IonModal isOpen={props.isbtnopen && isgetbtnlabel}> */}
      {/* <IonModal isOpen={
        props.isbtnopen && isgetbtnlabel} backdropDismiss={false} >
      {idEntry}

      </IonModal> */}



    </>
  );
};



export default FaceRecognition;




