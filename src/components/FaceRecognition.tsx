// FaceRecognition.tsx
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import ModalComponent from "./ModalComponent"; // Update the import path to the correct location

const UNKNOWN_LABEL = "Unknown";
const UNKNOWN_THRESHOLD = 0.4;
const MAX_FACES = 1; // Maximum number of faces to detect (1 for only one face)

const FaceRecognition: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detectedLabel, setDetectedLabel] = useState<string | null>(null);

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
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
        const labels = ["Daegwon", "Jane", "Yeongseo"]; // 폴더 내에 있는 파일 이름

        return Promise.all(
            labels.map(async (label) => {
                const descriptions = [];
                const imgUrl = `./labels/${gymLabel}/${label}.jpg`;
                const img = await faceapi.fetchImage(imgUrl);
                const detections = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                descriptions.push(detections.descriptor);

                return new faceapi.LabeledFaceDescriptors(label, descriptions);
            })
        );
    };

    const startFaceRecognition = async () => {
        const labeledFaceDescriptors = await getLabeledFaceDescriptions();
        const faceMatcher = new faceapi.FaceMatcher(
            labeledFaceDescriptors,
            UNKNOWN_THRESHOLD
        );

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const displaySize = { width: video!.width, height: video!.height };
        faceapi.matchDimensions(canvas!, displaySize);

        setInterval(async () => {
            if (!video!.paused && !video!.ended) {
                const detections = await faceapi
                    .detectAllFaces(video!, new faceapi.SsdMobilenetv1Options({ maxResults: MAX_FACES }))
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

                    // Update the detected label and open the modal if the label is not unknown
                    if (result.distance <= UNKNOWN_THRESHOLD) {
                        setDetectedLabel(label.split(" ")[0]); // Extract the label without confidence score
                        setIsModalOpen(true);
                    }
                });
            }
        }, 1000);
    };

    useEffect(() => {
        Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        ]).then(() => {
            startWebcam().then(startFaceRecognition);
        });
    }, []);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setDetectedLabel(null); // Clear the previously detected label
        setTimeout(() => {
            startFaceRecognition();
        }, 10000); // Start face recognition again after a 10-second delay
    };

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
            <canvas
                ref={canvasRef}
                style={{ margin: "0 auto", position: "absolute" }}
            />
            <h2 style={{ margin: "0 auto", position: "absolute" }}>{`환영합니다, ${detectedLabel}님!`}</h2>

            {/* <ModalComponent
                isOpen={isModalOpen}
                detectedLabel={detectedLabel}
                onClose={handleCloseModal}
            /> */}
        </>
    );
};

export default FaceRecognition;







