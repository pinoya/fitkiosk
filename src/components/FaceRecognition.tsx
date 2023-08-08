// src/components/FaceRecognition.tsx

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import ModalComponent from "./ModalComponent";
import Welcome from "../pages/welecome";
import { IonModal } from "@ionic/react";
import { CapacitorHttp } from "@capacitor/core";
import Password from "../pages/password";



const UNKNOWN_LABEL = "Unknown";
const UNKNOWN_THRESHOLD = 0.3;


interface FaceRecognitionProps {
  setisbtnOpen(arg0: boolean): unknown;
  isbtnopen: boolean;
  id: string | null;
  typeid: boolean;
}


//Unknown이 몇번 이상 떴을때만 화면에 텍스트 출력되도록 수정


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
  const [jsondata, setjsondata] = useState([]);
  

  const [isbtnModalOpen, setIsBtnModalOpen] = useState(false);

  const [count, setCount] = useState(0);

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
  // const handleCaptureSelfie = () => {
  //   if (canvasRefSelfie.current && videoRef.current) {
  //     const canvas = canvasRefSelfie.current;
  //     const context = canvas.getContext("2d");
  //     if (context) {
  //       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  //       //drawImage(image ,canvas_x, canvas_y,canvas_width,canvas_height)

  //       // 캔버스를 이미지로 저장하여 URL을 생성합니다.
  //       const selfieURL = canvas.toDataURL("image/png");
  //       // console.log("셀피 URL:", selfieURL);
  //       setSelfieURL(selfieURL);
  //     }

  //   }
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
            }

            const context = canvas!.getContext("2d")!;
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.fillStyle = "red";
            // context.strokeStyle = "transparent";
            // context.fillStyle = "transparent";
            context.font = "20px Arial";

            // const landmarks = resizedDetections[i].landmarks;
            // const leftEye = landmarks.getLeftEye();
            // const rightEye = landmarks.getRightEye();

            // // 좌/우 눈 중앙을 기준으로 박스 위치 조정
            // const boxCenterX = (leftEye[0].x + rightEye[3].x) / 2;
            // const boxCenterY = (leftEye[0].y + rightEye[3].y) / 2;
            // const textWidth = context.measureText(label).width;
            // const textHeight = parseInt(context.font); // Assuming font size is in px

            // const x = boxCenterX - textWidth / 2;
            // const y = boxCenterY - box.height / 2 - textHeight; // Adjust the vertical position of the label above the face

            // context.fillText(label, x, y + textHeight);
            // context.strokeRect(box.x, box.y, box.width, box.height);

            if (result.distance > UNKNOWN_THRESHOLD) {
              setCount((prevCount) => prevCount + 1);
              
              setIsUnknown(true);
            }

            if (result.distance <= UNKNOWN_THRESHOLD) {
              setDetectedLabel(label.split(" ")[0]); // Extract the label without confidence score
              setIsModalOpen(true);

            }
          });
        }
      }, 1000);

      // Clean up interval when the component unmounts or webcam is stopped]
      //component unmonts(컴포넌트가 사라질때, 웹캠이 멈출때.)
      return () => clearInterval(intervalId);
    };

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
    let timer: string | number | NodeJS.Timeout | undefined;

    if (isUnknown) {
      // 텍스트를 3초 동안 보여준 후에 숨김
      timer = setTimeout(() => {
        setIsUnknown(false);
      }, 3000);
    }

    // 컴포넌트가 unmount되거나 showText 값이 false로 변경되면 타이머를 클리어
    return () => clearTimeout(timer);
  }, [isUnknown]);



  const handleCloseModal = () => {
    setIsModalOpen(false); //모달창 닫기
    setIsModalShownForLabel(true); //모달창 닫기 (shownLabel === detectedLabel 다고 지정해놓기)
    // Store the detected label in localStorage to prevent showing the modal again for the same label
    localStorage.setItem("shownLabel", detectedLabel ?? "");
    // deleteCaptureSelfie(); //셀피 지우기
    setIsGetLabel(false); //라벨 플래그 초기화
    startWebcam(); //캠 시작하기
  };


  const handleClosebtnModal = () => {
    // setIsModalOpen(); //모달창 닫기
    props.setisbtnOpen(false); //모달창 닫기
    setIsGetBtnLabel(false); //라벨 플래그 값 초기화
    // deleteCaptureSelfie(); //셀피 지우기
    startWebcam(); //캠 시작하기
  };



  useEffect(() => {
    // Check if the detectedLabel has already been shown in a previous session
    //제일 처음 창이 켜질 때 shownLable 값과 detectedLabel 값을 다르게 해주기
    if (detectedLabel == null) {
      localStorage.setItem("shownLabel", "null");
    }


    const shownLabel = localStorage.getItem("shownLabel");
    if (shownLabel === detectedLabel) {
      setIsModalShownForLabel(true);
    } else { //이전에 감지한 내용과 다를때만 모달창이 열릴 수 있음.
      setIsModalShownForLabel(false); //모달창 열림.
      getLabel(); //정보와 라벨 얻기...
      // handleCaptureSelfie(); //셀피 찍기
      stopWebcam(); //캠 끄기
    }

  }, [detectedLabel]);




  useEffect(() => {

    if (props.isbtnopen) {
      stopWebcam();
      get_btn_userinfo(); //버튼일때 유저 정보 가져오기
    }
  }, [props.isbtnopen]);


  const getLabel = () => {
    if (detectedLabel) {
      console.log(detectedLabel);
    }
    get_userinfo();
    setIsGetLabel(true);
  }

  const get_userinfo = async () => {
    let url = 'http://dev.wisevill.com/ur03/get_page_from_db.php';
    console.log(detectedLabel);
    if (detectedLabel) {
      const options = {
        url: url,
        params: { id: detectedLabel },
        data: {}
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
  }

  //인식 -> 라벨 (회원번호) -> db -> 보내줘서 띄우기.(인증완료창 -> 출석완료창)
  // 아이디 -> 아이디 (회원번호) -> db -> 보내줘서 띄우기(출석완료창)

  //출석 / 퇴소 

  //얼굴인식 -> 
  // 얼굴인식 (이전에 인식한 사람이랑 같지 않을 때 인식)
  // 헬스장 장사 X
  // ...?
  //출석 ->

  //출석 플래그 -> 라벨 업데이트
  //출석 X && 라벨값다른 사람 -> 출석O
  //출석 o 
  //-> 여기까지...

  //전화번호 연결 


  // 출석 o 퇴실 x -> 퇴실 O -> 퇴실

  // 출석 o 퇴실 o

  // 24시간마다 초기화...

  //

  //인식 계속 되고있는데,
  //
  //라벨값.
  //

  // 모르는 사람 -> 10초 -> 얼굴 인식실패했습니다. 




  const get_btn_userinfo = async () => {
    let url = 'http://dev.wisevill.com/ur03/testget_page_from_db.php';


    if (props.id) {
      if (!props.typeid) { //회원번호
        const options = {
          url: url,
          params: { id: props.id },
          data: {}
        }
        const response = await CapacitorHttp.post(options);
        console.log(JSON.parse(response.data));

        for (let i = 0; i < JSON.parse(response.data).length; i++) {

          console.log(JSON.parse(response.data)[i].id);
          console.log(JSON.parse(response.data)[i].name);
          console.log(JSON.parse(response.data)[i].mile);
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
      else if (props.typeid) {
        const options = {
          url: url,
          params: { tel: props.id },
          data: {}
        }
        const response = await CapacitorHttp.post(options);
        console.log(JSON.parse(response.data));

        for (let i = 0; i < JSON.parse(response.data).length; i++) {

          console.log(JSON.parse(response.data)[i].id);
          console.log(JSON.parse(response.data)[i].name);
          console.log(JSON.parse(response.data)[i].mile);
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

      } //전화번호
    }
    setIsGetBtnLabel(true);
  }


  // let img;
  // if (isloading) img = <img style={{ width: "80%", height: "80%", position: "absolute" }} src={img1}></img>

  // else if (!WebcamActive) img =  <canvas ref={canvasRefSelfie} style={{ margin: "0 auto", position: "absolute" }} />

  //문제2 : 그래서 얼굴인식 canvas도 카메라가 꺼진 뒤에도 남아있음.
  // -> 이건 투명화화면 되긴함.

  //unknown이 어느 기준 이상 뜨면
  //얼굴인식 실패. 회원번호나 휴대폰번호를 이용해주십시오.
  // 그러나 이 사람이 그냥 로그인을 포기하고 가버릴 수도 있으니까
  // 저 말을 한 5초 정도 띄우고 알아서 내려가게 하는게 나음.

  // let unknown;
  // if(isUnknown){
  //   unknown = <h1>얼굴 인식 실패. 회원번호나 휴대폰번호를 이용해주십시오.</h1>
  // }

  //url 
  // 사진 이미지 db 로 바꾸기 -> 제가


  // 얼굴인식 실패 뜨는거 

  //분리 
  //비디오를 1초마다 돌려도 똑같이 끊김

  // 비디오를 0.1초마다 돌려도
  //-> 효율...

  //출석 미뤄두고
 
  // 가로 세로 -> 제인
  // 확인 버튼 눌렀을 때 값 초기화 
  // 54321
 
  // 출석 ->

  //전화 번호 ****


  //모달창마다 backdropDismiss = {false} 속성 해주기... 

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

      <div>
        {isUnknown && <h1>얼굴 인식 실패. 회원번호나 휴대폰번호를 이용해주십시오.</h1>}
      </div>






      {/* <canvas className="Selfie" ref={canvasRefSelfie} style={{ margin: "0 auto", position: "absolute" }} /> */}


      {/*카메라가 꺼졌을 때 찍힌 셀피를 보여줌.*/}

      <IonModal isOpen={isModalOpen && !isModalShownForLabel && isgetlabel} backdropDismiss = {false}>
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



      {/* <IonModal isOpen={props.isbtnopen && isgetbtnlabel}> */}
      <IonModal isOpen={props.isbtnopen} >
     
      <Password 
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
          onClose={handleClosebtnModal}/> 
          
          </IonModal>



    
    </>
  );
};



export default FaceRecognition;




