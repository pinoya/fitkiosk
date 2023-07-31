// src/App.tsx
import React from "react";
import FaceRecognition from "../components/FaceRecognition";
import ImageList from "../components/ImageList"

const Home: React.FC = () => {
    return (
        <div>
            <h1>Face Recognition App</h1>
            <ImageList />
        </div>
    );
};

export default Home;