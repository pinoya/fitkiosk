// src/components/FaceRecognition.tsx

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import ModalComponent from "./ModalComponent";
import Welcome from "../pages/welecome";
import { IonModal } from "@ionic/react";

const UNKNOWN_LABEL = "Unknown";
const UNKNOWN_THRESHOLD = 0.4;


interface FaceRecognitionProps {
  setisbtnOpen(arg0: boolean): unknown;
  isbtnopen : boolean;
  id : string | null;
  
}


const FaceRecognition: React.FC<FaceRecognitionProps> = (props) => {


  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRefSelfie = useRef<HTMLCanvasElement | null>(null);
  const webcamActive = useRef(false); // Ref to track webcam state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detectedLabel, setDetectedLabel] = useState<string | null>(null);
  const [isModalShownForLabel, setIsModalShownForLabel] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState(true);
  const [WebcamActive, setIsWebcamActive] = useState(false);
  const [selfieURL, setSelfieURL] = useState<string | null>(null);

  const [isbtnModalOpen, setIsBtnModalOpen] = useState(false);

  // console.log("face");
  // console.log(props.isbtnopen);
  // console.log(props.id);

  // console.log(props.id);
  // if(props.id?.length == 5){
  // }

  //지금 버튼 통제에서 값을 넘겨주는거지 모달 자체에서는 먼가 하는게 없음 받기만 하는중

  // 버튼을 통해서도 모달창을 이쪽을 먼저 열어서
  // 카메라를 정지시키고, 
  // 넘어가도록...

  //아니면 버튼을 클릭하면 카메라 멈추도록 -> 시도

  //숫자 받으면 모달창 열리도록 여기서도 통제하고 있어서 충돌 난듯

  // 지금 하고 싶은거 -> 숫자 받는 모달창이 켜졌을때도 카메라를 껐다가 모달창 닫으면 다시 켜고 싶음.
  // 숫자 5개 받고 출석 -> 모달창 제어 이런식임 지금은. 그래서 다른게 적용되지 않았던것 ;;
  //확인 눌렀을때 이쪽 플레그 제어로 일단 수정해서 무지성으로 창 띄워보기 시도

  // 일단 출석하면 캠이 꺼지게끔은 했음 -> O
  // 확인 누르면 다시 캠이 켜지게 시도!


  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsLoading(false);
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

  //셀피찍기
  const handleCaptureSelfie = () => {
    if (canvasRefSelfie.current && videoRef.current) {
      const canvas = canvasRefSelfie.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        //drawImage(image ,canvas_x, canvas_y,canvas_width,canvas_height)

        // 캔버스를 이미지로 저장하여 URL을 생성합니다.
        const selfieURL = canvas.toDataURL("image/png");
        console.log("셀피 URL:", selfieURL);
        setSelfieURL(selfieURL);
      }

    }
  };

  //셀피 지우기
  const deleteCaptureSelfie = () => {
    if (canvasRefSelfie.current && videoRef.current) {
      const canvas = canvasRefSelfie.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  useEffect(() => {
    const getLabeledFaceDescriptions = async () => {
      const gymLabel = "gym"; // 설정한 체육관이 사용하는 폴더명 받아오기
      const labels = ["Daegwon", "IU", "Jane", "jo", "Yeongseo"]; // 폴더 내에 있는 파일 이름

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

          results.forEach((result: any, i: number) => {
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

  const handleStartWebcam = () => {
    startWebcam();
  };

  const handleStopWebcam = () => {
    stopWebcam();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); //모달창 닫기
    setIsModalShownForLabel(true); //모달창 닫기 (shownLabel === detectedLabel 다고 지정해놓기)
    // Store the detected label in localStorage to prevent showing the modal again for the same label
    localStorage.setItem("shownLabel", detectedLabel ?? "");
    deleteCaptureSelfie(); //셀피 지우기
    startWebcam(); //캠 시작하기
  };

  
  const handleClosebtnModal = () => {
    // setIsModalOpen(); //모달창 닫기
    props.setisbtnOpen(false);
    deleteCaptureSelfie(); //셀피 지우기
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
      handleCaptureSelfie(); //셀피 찍기
      stopWebcam(); //캠 끄기
    }

  }, [detectedLabel]);


  useEffect(() => {

    if (props.isbtnopen) {
      stopWebcam();
    }
  }, [props.isbtnopen]);







  // let img;
  // if (isloading) img = <img style={{ width: "80%", height: "80%", position: "absolute" }} src={img1}></img>

  // else if (!WebcamActive) img =  <canvas ref={canvasRefSelfie} style={{ margin: "0 auto", position: "absolute" }} />

  //문제2 : 그래서 얼굴인식 canvas도 카메라가 꺼진 뒤에도 남아있음.
  // -> 이건 투명화화면 되긴함.



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


      {/* <button
        onClick={handleStartWebcam}
        style={{ position: "absolute", bottom: "20px", left: "30%", transform: "translateX(-50%)", padding: "10px" }}
      >
        Start Webcam
      </button>
      <button
         onClick={handleStopWebcam}
        style={{ position: "absolute", bottom: "20px", left: "70%", transform: "translateX(-50%)", padding: "10px" }}
      >
        Stop Webcam
      </button> */}

      <canvas className="Selfie" ref={canvasRefSelfie} style={{ margin: "0 auto", position: "absolute" }} />
      {/*카메라가 꺼졌을 때 찍힌 셀피를 보여줌.*/}

      {/* <button
        onClick={handleCaptureSelfie}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "45%",
          transform: "translateX(-50%)",
          padding: "10px",
        }}
      >
        Capture Selfie
      </button> */}

      <ModalComponent
        isOpen={isModalOpen && !isModalShownForLabel} // Show the modal only if it's open and not shown for the current detected label
        detectedLabel={detectedLabel}
        selfieURL={selfieURL} // Pass the selfie URL here
        onClose={handleCloseModal} />


  

      <IonModal isOpen={props.isbtnopen}>
        <Welcome
        handleClosebtnModal = {handleClosebtnModal}
        id={props.id}  
        />
      </IonModal>


    </>
  );
};



export default FaceRecognition;

