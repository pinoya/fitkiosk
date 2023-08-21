// src/App.tsx
import React from "react";
import FaceRecognition from "../components/FaceRecognition";
import Test from "./test";
import Test2 from "../components/test2";
import Test3 from "./test3";
import Upload_image from "../components/upload_image";
const Home: React.FC = () => {
    return (
        <div>
            <h1>Face Recognition App</h1>
            {/* <Test></Test> */}
            {/* <Test3></Test3> */}
            <Upload_image></Upload_image>
        </div>
    );
};

export default Home;