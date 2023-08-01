// src/App.tsx
import React from "react";
import FaceRecognition from "../components/FaceRecognition";
import Test from "../components/test";
const Home: React.FC = () => {
    return (
        <div>
            <h1>Face Recognition App</h1>
            <Test></Test>
        </div>
    );
};

export default Home;