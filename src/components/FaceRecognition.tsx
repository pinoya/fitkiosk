// src/components/FaceRecognition.tsx

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import ModalComponent from "./ModalComponent";
import Welcome from "../pages/welecome";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonImg, IonModal } from "@ionic/react";
import { CapacitorHttp } from "@capacitor/core";
import Password from "../pages/password";
import "./FaceRecognition.css";


import { UserPhoto, usePhotoGallery } from '../hooks/usePhotoGallery';


const UNKNOWN_LABEL = "Unknown";
const UNKNOWN_THRESHOLD = 0.5;


interface FaceRecognitionProps {
  isbtnopen: boolean;
  setisbtnOpen(arg0: boolean): unknown;
  isbtnoutOpen: boolean;
  setisbtnoutOpen(arg0: boolean): unknown;
  id: string | null;
  typeid: boolean;
  code: string | null;
}

// interface LabelTime {
//   label: string;
//   time: string;
// }



const FaceRecognition: React.FC<FaceRecognitionProps> = (props) => {



  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRefSelfie = useRef<HTMLCanvasElement | null>(null);
  const webcamActive = useRef(false); // Ref to track webcam state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detectedLabel, setDetectedLabel] = useState<string | null>(null);
  const [isModalShownForLabel, setIsModalShownForLabel] = useState<boolean>(false);
  const [isgetlabel, setIsGetLabel] = useState(false);

  const [isgetbtnlabel, setIsGetBtnLabel] = useState(false);

  const [WebcamActive, setIsWebcamActive] = useState(false);
  const [selfieURL, setSelfieURL] = useState<string | null>(null);
  const [isUnknown, setIsUnknown] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);

  const [BeforeLabel, setBeforeLabel] = useState<string | null>(null);


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
  const [recentTime, setrecentTime] = useState('');
  const [userpassword, setuserpassword] = useState('');
  const [flag, setflag] = useState('');

  const gymLabel = props.code;

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


  // const deleteCaptureSelfie = () => {
  //   if (canvasRefSelfie.current && videoRef.current) {
  //     const canvas = canvasRefSelfie.current;
  //     const context = canvas.getContext("2d");
  //     if (context) {
  //       context.clearRect(0, 0, canvas.width, canvas.height);
  //     }
  //   }
  // };
  // useEffect(() => {




  // }, []);

  const get_memberid = async (): Promise<number[]> => {
    // const gymLabel2 = props.code;
    // props.code;
    console.log(props.code);

    let url = 'http://dev.wisevill.com/kioskdb/take_user_image.php';
    console.log(gymLabel);
    if (gymLabel) {
      const options = {
        url: url,
        data: { code: gymLabel},
        headers: { 'Content-Type': 'application/json' }
      }
      const response = await CapacitorHttp.post(options);
      console.log(response);
      const responseData = JSON.parse(response.data);

      const idArray = responseData.map((item: { id: number; }) => item.id);

      console.log(idArray);

      return idArray;
      // for (let i = 0; i < JSON.parse(response.data).length; i++) {
      //   console.log(JSON.parse(response.data)[i].id);
      // }
    }
    throw new Error("No data available");
  }




  const [repeatedLabelCount, setRepeatedLabelCount] = useState(0);

  useEffect(() => {
    const getLabeledFaceDescriptions = async () => {
      // const gymLabel = "AAAAAA"; // 설정한 체육관이 사용하는 폴더명 받아오기
      // const gymLabel = props.code;
      // console.log(props.code);
      const idArray = await get_memberid();
      //폴더명
      // const labels = ["33333", "11111", "44444", "22222"]; // 폴더 내에 있는 파일 이름

      return Promise.all(
        idArray.map(async (label) => {
          const descriptions = [];
          // const imgUrl = `./labels/${gymLabel}/${label}.jpg`;

          const imgUrl = `http://dev.wisevill.com/media/labels/${gymLabel}/${label}.jpg`;
          console.log(imgUrl);
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
              const DetectedLabel = label.split(" ")[0];
              setDetectedLabel(DetectedLabel);
              if (BeforeLabel == null || DetectedLabel === BeforeLabel) {
                handleRepeatCount();
                console.log("카운트 +1");
              }

              // else {
              //   ResetRepeatCount();
              // }

              setIsModalOpen(true);
            }


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
      }, 5000);

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

  useEffect(() => {
    console.log("현재 카운트");
    console.log(repeatedLabelCount);
    if (repeatedLabelCount == 5) {
      setDetectedLabel("특정값");
      setBeforeLabel("특정값");
      setrecentTime("특정시간");
      console.log("리셋했습니다.");

      const currentTime = new Date().toLocaleTimeString();
      console.log(currentTime);
      setRepeatedLabelCount(0);
    }
  }, [repeatedLabelCount]);


  const handleRepeatCount = () => {
    if (repeatedLabelCount < 5) {
      setRepeatedLabelCount(prevCount => prevCount + 1);
    } else {
      setRepeatedLabelCount(0);
    }
  }

  const ResetRepeatCount = () => {
    console.log("값이 다르므로 카운트를 리셋합니다.");
    setRepeatedLabelCount(0);
  }






  useEffect(() => {
    // Check if the detectedLabel has already been shown in a previous session
    //제일 처음 창이 켜질 때 shownLable 값과 detectedLabel 값을 다르게 해주기
    if (detectedLabel == null) {
      setBeforeLabel(null);
    }

    //detectedLabel = 회원번호
    //
    console.log(detectedLabel);

    console.log(BeforeLabel);
    console.log(detectedLabel);

    if (BeforeLabel === detectedLabel) {
      setIsModalShownForLabel(true);
      console.log("이전 라벨값과 현재 라벨값이 같습니다.");
    } else { //이전에 감지한 내용과 다를때만 모달창이 열릴 수 있음.
      setIsModalShownForLabel(false); //모달창 열림.
      setIsTimeout(false);
      get_userinfo(); //정보와 라벨 얻기...
      console.log("이전 라벨값과 현재 라벨값이 다릅니다. 실행합니다.");
    }




  }, [detectedLabel]);




  const resetLabelAndTime = () => {

    setTimeout(() => {
      if (BeforeLabel == null || BeforeLabel == detectedLabel) {
        setDetectedLabel("특정값");
        setBeforeLabel("특정값");
        console.log("리셋했습니다.");

        // setrecentTime("초기화"); 
        // console.log("인식시간을 초기화했습니다.");//일단 인식 시간 초기화
        const currentTime = new Date().toLocaleTimeString();
        console.log(currentTime);
      }
    }, 10000);
    // 1000 = 1초 10000 =10초 60초로 지정해놓음.
  }

  // 1 1 

  // 얼굴인식이 안됐거나, 얼굴인식 등록을 안한 사람 
  //출석버튼 -> 출석 플래그 확인(0) -> 출석 하지 않았을 경우에만 비밀번호 창을 열어줌.
  //비밀번호 성공 -> 출석(출석 플래그 올림 / 출석 시간(현재시간) db에 찍기)

  //퇴실버튼 -> 출석 플래그 확인(1) -> 출석 하지 않았을 경우에만 비밀번호 창을 열어줌.
  //비밀번호 성공 -> 출석(출석 플래그 올림 / 출석 시간(현재시간) db에 찍기)

  // 얼굴인식 확인 창의 출석(출석플래그 올림/ 출석시간(현재시간) db에 찍기) -> 확인창.  
  // 얼굴인식 확인 창의 퇴실(퇴실플래그 올림/ 퇴실시간(현재시간) db에 찍기) -> 확인창.  

  // 출석 퇴실 확인할 필요가 사라짐. 30초 지났을때 다시 인식되면 퇴실시키면 됨 그냥.

  //다른 사람 다시 인식될때

  // 30초 뒤에 초기화
  // 같은 사람 인식되게 


  const handleCloseModal = () => {
    setIsModalOpen(false); //모달창 닫기
    setIsModalShownForLabel(true); //모달창 닫기 (shownLabel === detectedLabel 다고 지정해놓기)
    setBeforeLabel(detectedLabel);
    setIsTimeout(false);
    setIsGetLabel(false); //라벨 플래그 초기화
    reset(); //얼굴인식 실패 횟수 리셋
    startWebcam(); //캠 시작하기
    const currentTime = new Date().toLocaleTimeString();
    console.log("모달이 닫혔습니다.");
    console.log(currentTime);
  };




  //버튼으로 들어간 모달 끄기
  const handleClosebtnModal = () => {
    props.setisbtnOpen(false); //모달창 닫기
    props.setisbtnoutOpen(false); //모달창 닫기
    setIsGetBtnLabel(false); //라벨 플래그 값 초기화
    reset(); //얼굴인식 실패 횟수 리셋
    startWebcam(); //캠 시작하기
  };


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


  //얼굴인식 유저 정보 가져오는 함수.
  const get_userinfo = async () => {
    let url = 'http://dev.wisevill.com/kioskdb/get_data_from_db.php';
    console.log(detectedLabel);
    if (detectedLabel) {
      const options = {
        url: url,
        data: { id: detectedLabel, code: gymLabel },
        headers: { 'Content-Type': 'application/json' }
      }
      const response = await CapacitorHttp.post(options);

      for (let i = 0; i < JSON.parse(response.data).length; i++) {
        console.log(JSON.parse(response.data)[i].id);
        console.log(JSON.parse(response.data)[i].name);
        console.log(JSON.parse(response.data)[i].mile);
        console.log(JSON.parse(response.data)[i].recentTime);
        console.log(JSON.parse(response.data)[i].pw);
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
        setrecentTime(JSON.parse(response.data)[i].recentTime);
        setuserpassword(JSON.parse(response.data)[i].pw);
        setflag(JSON.parse(response.data)[i].flag);

      }
    }

    setIsGetLabel(true);
    // countTime();
  }


  useEffect(() => {
    countTime();
  }, [recentTime]);




  const countTime = () => {


    if (recentTime != "특정시간") {
      console.log(recentTime);
      const now: Date = new Date();
      console.log("현재시각");
      console.log(now);

      const initialDate = new Date(recentTime);
      console.log(initialDate);
      console.log("가져온 시간");
      console.log(initialDate);

      const timeDifference = now.getTime() - initialDate.getTime();
      const timeDifferenceInSeconds = Math.floor(timeDifference / 1000); // 밀리초를 초로 변환
      const diffMinutes = Math.floor(timeDifferenceInSeconds / 60); // 초를 분으로 변환
      const remainingSeconds = timeDifferenceInSeconds % 60; // 초 단위에서 남은 초 계산

      console.log(`시간 차이: ${diffMinutes} 분 ${remainingSeconds} 초`);

      console.log(timeDifference);

      if (diffMinutes >= 1) {
        setIsTimeout(true);
        stopWebcam(); //캠 끄기
        //시간 계산하는 함수 // 5분 이상일 경우
        // 플래그 true 
        //stopwebcam();
      } else if (diffMinutes < 1) {
        setIsModalOpen(false); //모달창 닫기
        setIsModalShownForLabel(true); //모달창 닫기 (shownLabel === detectedLabel 다고 지정해놓기)
        setBeforeLabel(detectedLabel);
        setIsTimeout(false);
        setIsGetLabel(false); //라벨 플래그 초기화
        const currentTime = new Date().toLocaleTimeString();
        console.log("정해놓은 시간 이전입니다....");
        console.log(currentTime);
      }
    }
  }


  let faceEntry;

  faceEntry = <IonModal className="baseModal" isOpen={isModalOpen && !isModalShownForLabel && isgetlabel && isTimeout} backdropDismiss={false}>
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
      recentTime={recentTime}
      flag={flag}
      gymcode ={gymLabel}
      onClose={handleCloseModal} />
  </IonModal>

  //버튼일때 유저 정보 가져오는  함수
  useEffect(() => {

    if (props.isbtnopen) {
      stopWebcam();
      get_btn_userinfo(); //버튼일때 유저 정보 가져오기
    }
    if (props.isbtnoutOpen) {
      stopWebcam();
      get_btn_userinfo();
    }
  }, [props.isbtnopen, props.isbtnoutOpen]);


  //일단 모달로 해서 닫기하면 일단은 문제없음.

  const get_btn_userinfo = async () => {
    let url = 'http://dev.wisevill.com/kioskdb/get_data_from_db.php';

    console.log(mid);
    if (props.id) {
      if (!props.typeid) { //회원번호
        const options = {
          url: url,
          data: { id: props.id, code: gymLabel },
          headers: { 'Content-Type': 'application/json' }
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
          setrecentTime(JSON.parse(response.data)[i].recentTime);
          setuserpassword(JSON.parse(response.data)[i].pw);
          setflag(JSON.parse(response.data)[i].flag);
        }
      }
      else if (props.typeid) {
        const options = {
          url: url,
          data: { tel: props.id, code: gymLabel},
          headers: { 'Content-Type': 'application/json' }
        }
        const response = await CapacitorHttp.post(options);
        console.log(JSON.parse(response.data));

        for (let i = 0; i < JSON.parse(response.data).length; i++) {

          console.log(JSON.parse(response.data)[i].id);
          console.log(JSON.parse(response.data)[i].name);
          console.log(JSON.parse(response.data)[i].mile);
          setmid(JSON.parse(response.data)[i].id);
          setidd(JSON.parse(response.data)[i].name); //이름
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
          setrecentTime(JSON.parse(response.data)[i].recentTime);
          console.log(recentTime);
          setuserpassword(JSON.parse(response.data)[i].pw);
          setflag(JSON.parse(response.data)[i].flag);
        }
      } //전화번호
      setIsGetBtnLabel(true);
    }
  }


  let idEntry;

  if (props.isbtnopen) {
    //출석 안 된 상태
    if ((mid == props.id && flag == '0' || tel == props.id && flag == '0')) {
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
          userpassword={userpassword}
          recentTime={recentTime}
          flag={flag}
          gymcode ={gymLabel}
          //userpwd={userpwd}
          onClose={handleClosebtnModal} />
      </IonModal>
      //출석 된 상태
    }
    else if ((mid == props.id && flag == '1' || tel == props.id && flag == '1')) {
      idEntry = <IonModal className="failId" isOpen={props.isbtnopen && isgetbtnlabel} backdropDismiss={false} >
        <p>이미 입장 하셨습니다.</p>
        <button onClick={handleClosebtnModal}>닫기</button>
      </IonModal>
    }
    else {
      // -> 실패 -> 다시 입력해주세요. 일단 좀 더 생각
      idEntry = <IonModal className="failId" isOpen={props.isbtnopen && isgetbtnlabel} backdropDismiss={false} >
        <p>다시 입력해주세요.</p>
        <button onClick={handleClosebtnModal}>닫기</button>
      </IonModal>
    }
  }



  // let idExit;

  if (props.isbtnoutOpen) {
    //출석 안 된 상태
    if ((mid == props.id && flag == '1' || tel == props.id && flag == '1')) {
      idEntry = <IonModal className="baseModal" isOpen={
        props.isbtnoutOpen && isgetbtnlabel} backdropDismiss={false} > <Password
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
          userpassword={userpassword}
          recentTime={recentTime}
          flag={flag}
          gymcode ={gymLabel}
          //userpwd={userpwd}
          onClose={handleClosebtnModal} />
      </IonModal>
      //출석 된 상태
    }
    else if ((mid == props.id && flag == '0' || tel == props.id && flag == '0')) {
      idEntry = <IonModal className="failId" isOpen={props.isbtnoutOpen && isgetbtnlabel} backdropDismiss={false} >
        <p>이미 퇴실 하셨습니다.</p>
        <button onClick={handleClosebtnModal}>닫기</button>
      </IonModal>
    }
    else {
      // -> 실패 -> 다시 입력해주세요. 일단 좀 더 생각
      idEntry = <IonModal className="failId" isOpen={props.isbtnoutOpen && isgetbtnlabel} backdropDismiss={false} >
        <p>다시 입력해주세요.</p>
        <button onClick={handleClosebtnModal}>닫기</button>
      </IonModal>
    }
  }

  let fail;


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



  if (isUnknown && count < failCount) {
    fail =
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>다시 시도해주세요.</IonCardTitle>
        </IonCardHeader>
      </IonCard>
  }
  else if (isUnknown && count == failCount) {
    fail =
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>얼굴인식 실패. <br></br>회원번호나 휴대폰 번호를 이용해주십시오.</IonCardTitle>
        </IonCardHeader>
      </IonCard>
  }




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

      {faceEntry}

      {/* <IonModal className = "baseModal" isOpen={isModalOpen && !isModalShownForLabel && isgetlabel} backdropDismiss={false}> */}

      {/* <IonModal className="baseModal" isOpen={isModalOpen && !isModalShownForLabel && isgetlabel} backdropDismiss={false}>
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
          recentTime={recentTime}
          onClose={handleCloseModal} />
      </IonModal> */}

      {/* 
      <IonModal isOpen={isidFail} backdropDismiss={false} >
        <p>다시 입력해주세요.</p>
        <button onClick={handleIdFail}>닫기</button>
      </IonModal> */}
      {idEntry}



      {/* <IonModal isOpen={
        props.isbtnopen && isgetbtnlabel} backdropDismiss={false} >
      {idEntry}

      </IonModal> */}



    </>
  );
};



export default FaceRecognition;




