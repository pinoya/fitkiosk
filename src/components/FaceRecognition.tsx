// src/components/FaceRecognition.tsx

import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const UNKNOWN_LABEL = "Unknown";
const UNKNOWN_THRESHOLD = 0.5;

const FaceRecognition: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
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
            const labels = ["Yeongseo", "jane", "Daegwon"]; // Add your labels here

            return Promise.all(
                labels.map(async (label) => {
                    const descriptions = [];
                    for (let i = 1; i <= 2; i++) {
                        const img = await faceapi.fetchImage(`./labels/${label}/${i}.jpg`);
                        const detections = await faceapi
                            .detectSingleFace(img)
                            .withFaceLandmarks()
                            .withFaceDescriptor();
                        descriptions.push(detections.descriptor);
                    }
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

            setInterval(async () => {
                if (!video!.paused && !video!.ended) {
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
                        context.font = "100px Arial";

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
                    });
                }
            }, 100);
        };

        Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        ]).then(() => startWebcam().then(setupFaceRecognition));
    }, []);

    return (
        <>
            <video
                ref={videoRef}
                id="video"
                width="720"
                height="560"
                autoPlay
                muted
                style={{ width: "100%", height: "100%", marginBottom: "20px" }}
            />
            <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
            />
        </>
    );
};

export default FaceRecognition;


