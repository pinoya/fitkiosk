// FaceRecognition.tsx
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import ModalComponent from "./ModalComponent"; // Update the import path to the correct location

const UNKNOWN_LABEL = "Unknown";
const UNKNOWN_THRESHOLD = 0.4;

const FaceRecognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detectedLabel, setDetectedLabel] = useState<string | null>(null);
  const [isModalShownForLabel, setIsModalShownForLabel] = useState<boolean>(false);
  const [isFaceNotDetected, setIsFaceNotDetected] = useState<boolean>(true);

  

  //UseEffect(function, deps)
  //function : 수행하고자 하는 작업
  //deps : 배열 형태이며, 배열 안에는 검사하고자 하는 특정 값 or 빈 배열
  useEffect(() => {
    const startWebcam = async () => {
      try {
        // stream: getUserMedia 호출로부터 해결된 MediaStream 객체로, 사용자의 웹캠에서 나오는 미디어 스트림을 나타냅니다.
        const stream = await navigator.mediaDevices.getUserMedia({
          //navigator.mediaDevices.getUserMedia
          //웹캠이나 마이크와 같은 미디어 장치에 대한 접근을 요청하는 웹 API 메서드
          //이 메서드는 사용자의 웹캠에서 나오는 미디어 스트림을 나타내는 MediaStream 객체를 반환
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

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
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, UNKNOWN_THRESHOLD);

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const displaySize = { width: video!.width, height: video!.height };
      faceapi.matchDimensions(canvas!, displaySize);


      //setInterval : 지정된 시간 간격마다 지정된 기능을 반복하고자 할 때 사용
      setInterval(async () => {
        if (!video!.paused && !video!.ended && isFaceNotDetected) { //일시정지 되지 않았을 때니까 //얼굴인식이 안됐을때만 실행
          const detections = await faceapi.detectAllFaces(video!).withFaceLandmarks().withFaceDescriptors();
          console.log(isFaceNotDetected);
          setIsFaceNotDetected(false);
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

            //캔버스 그리는 내용
            const context = canvas!.getContext("2d")!;
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.fillStyle = "red";
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
            //여기까지
            // Update the detected label and open the modal if the label is not unknown
            if (result.distance <= UNKNOWN_THRESHOLD) {
              setDetectedLabel(label.split(" ")[0]); // Extract the label without confidence score
              setIsFaceNotDetected(false);
              setIsModalOpen(true); 
            }
          });
        }
      }, 1000); //아 이제야 1초임 이전에는 0.1초였음 ;;  1000 = 1초 
    };

    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    ]).then(() => startWebcam().then(setupFaceRecognition));
  }, []);


  const handleCloseModal = () => {
    console.log(isModalOpen);
    setIsModalOpen(false); //모달창 닫기
    console.log(isModalOpen);
    setIsModalShownForLabel(true); //모달창 닫기 (shownLabel === detectedLabel 다고 지정해놓기)
    setIsFaceNotDetected(true); //얼굴인식 true로 고침.
    // Store the detected label in localStorage to prevent showing the modal again for the same label
    localStorage.setItem("shownLabel", detectedLabel ?? "");
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
    } else {
      setIsModalShownForLabel(false);//이때만 모달창이 열릴 수 있음.
    }

  }, [detectedLabel]);

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
      <h2 style={{ margin: "0 auto", position: "absolute" }}>{`환영합니다, ${detectedLabel}님!`}</h2>

      <ModalComponent
        isOpen={isModalOpen && !isModalShownForLabel} // Show the modal only if it's open and not shown for the current detected label
        detectedLabel={detectedLabel}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default FaceRecognition;

