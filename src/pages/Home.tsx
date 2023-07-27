// src/App.tsx
import React from "react";
import FaceRecognition from "../components/FaceRecognition";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Face Recognition App</h1>
            <FaceRecognition />
        </div>
    );
};

export default Home;