// src/components/FaceRecognition.tsx

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import ModalComponent from "./ModalComponent";
import Welcome from "../pages/welecome";
import { IonModal } from "@ionic/react";
import { CapacitorHttp } from "@capacitor/core";


const UNKNOWN_LABEL = "Unknown";
const UNKNOWN_THRESHOLD = 0.4;


interface FaceRecognitionProps {
  setisbtnOpen(arg0: boolean): unknown;
  isbtnopen: boolean;
  id: string | null;
}





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

  const [jsondata, setjsondata] = useState([]);

  const [isbtnModalOpen, setIsBtnModalOpen] = useState(false);


  const [idd, setidd] = useState(''); //jsondata 이름
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
        // console.log("셀피 URL:", selfieURL);
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
      //폴더명
      const labels = ["33333", "11111", "44444", "22222"]; // 폴더 내에 있는 파일 이름

      //11111 : 이재인
      //
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


  const handleCloseModal = () => {
    setIsModalOpen(false); //모달창 닫기
    setIsModalShownForLabel(true); //모달창 닫기 (shownLabel === detectedLabel 다고 지정해놓기)
    // Store the detected label in localStorage to prevent showing the modal again for the same label
    localStorage.setItem("shownLabel", detectedLabel ?? "");
    deleteCaptureSelfie(); //셀피 지우기
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
      handleCaptureSelfie(); //셀피 찍기
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
        setidd(JSON.parse(response.data)[i].name); //이름
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



  const get_btn_userinfo = async () => {
    let url = 'http://dev.wisevill.com/ur03/get_page_from_db.php';
    if (props.id) {
      const options = {
        url: url,
        params: { id: props.id },
        data: {}
      }
      const response = await CapacitorHttp.post(options);
      setjsondata(JSON.parse(response.data));
      console.log(JSON.parse(response.data));

      for (let i = 0; i < JSON.parse(response.data).length; i++) {

        console.log(JSON.parse(response.data)[i].id);
        console.log(JSON.parse(response.data)[i].name);
        console.log(JSON.parse(response.data)[i].mile);
        setidd(JSON.parse(response.data)[i].name); //이름
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

    setIsGetBtnLabel(true);
  }


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


      <canvas className="Selfie" ref={canvasRefSelfie} style={{ margin: "0 auto", position: "absolute" }} />
      {/*카메라가 꺼졌을 때 찍힌 셀피를 보여줌.*/}

      <IonModal isOpen={isModalOpen && !isModalShownForLabel && isgetlabel}>
      <ModalComponent
        detectedName={idd} //회원 id
        selfieURL={selfieURL} // Pass the selfie URL here // Show the modal only if it's open and not shown for the current detected label
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



      <IonModal isOpen={props.isbtnopen && isgetbtnlabel}>
        <Welcome
          handleClosebtnModal={handleClosebtnModal}
          id={props.id}
          idd={idd}
          mile={mile}
          come={come}
          product={product}
          have={have}
          locker={locker}
          duclass={duclass}
          left={left}
          inclass={inclass}
        />
      </IonModal>



    </>
  );
};



export default FaceRecognition;



