// src/components/FaceRecognition.tsx

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import ModalComponent from "./ModalComponent";
import img1 from './face2.jpg';
import img2 from './cat.jpg';
import img3 from './load.png';
import { IonSpinner } from "@ionic/react";

const UNKNOWN_LABEL = "Unknown";
const UNKNOWN_THRESHOLD = 0.4;

const FaceRecognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null); // Ref to store the captured image
  const webcamActive = useRef(false); // Ref to track webcam state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detectedLabel, setDetectedLabel] = useState<string | null>(null);
  const [isModalShownForLabel, setIsModalShownForLabel] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState(true);
  const [WebcamActive, setIsWebcamActive] = useState(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null); // State to store the captured image URL

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

  const takePhoto = () => {
    if (videoRef.current) {
      // 비디오의 크기를 캔버스에 설정
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;
      canvasRef.current?.setAttribute("width", String(videoWidth));
      canvasRef.current?.setAttribute("height", String(videoHeight));

      // 웹캠으로부터 현재 프레임 캡처
      const canvas = canvasRef.current;
      canvas?.getContext("2d")?.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

      // 캡처된 이미지 데이터를 URL로 변환
      const photoUrl = canvas?.toDataURL();

      // 캡처된 이미지를 화면에 표시
      setCapturedImageUrl(photoUrl);
    }
  };

  useEffect(() => {
    const loadModelsAndStartWebcam = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

      startWebcam();
    };

    loadModelsAndStartWebcam();
  }, []);

  return (
    <div>
      {isloading ? (
        <IonSpinner name="lines" />
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline muted />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <button onClick={takePhoto}>Take Photo</button>
          {/* 캡처된 이미지를 띄워주는 부분 */}
          {capturedImageUrl && (
            <img
              ref={imageRef}
              src={capturedImageUrl}
              alt="Captured"
              style={{ maxWidth: "100%", maxHeight: "300px", marginTop: "20px" }}
            />
          )}
        </>
      )}
      {/* ... (이전 코드) */}
    </div>
  );
};

export default FaceRecognition;
