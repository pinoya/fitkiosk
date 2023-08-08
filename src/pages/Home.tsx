// src/App.tsx
import React from "react";
import FaceRecognition from "../components/FaceRecognition";
import Test from "./test";
import Test2 from "../components/test2";
import Test3 from "./test3";
const Home: React.FC = () => {
    return (
        <div>
            <h1>Face Recognition App</h1>
            {/* <Test2></Test2> */}
            {/* <Test3></Test3> */}
            <Test></Test>
        </div>
    );
};

export default Home;