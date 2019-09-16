import React from "react";
import headerImg from "./images/undraw_Artificial_intelligence_comp.svg";
import "./App.css";

// components
import Flex from "./components/utils/Flex";

function App() {
    return (
        <>
            <div className="container">
                <Flex dir="row">
                    <div style={{ width: "350px" }}>
                        <img src={headerImg} width="100%" alt="Machine Learning"/>
                    </div>
                    <div style={{ width: "700px" }}>
                        <h1>Teach a Machine</h1>
                        <p>
                            This tool allows you to teach a machine to classify
                            images. Create at least one class of image, then
                            upload example images of the object you want to
                            classify, then train the machine. Now you can upload
                            new images and the machine will tell you what they
                            are.
                        </p>
                        <button>Start Teaching</button>
                    </div>
                </Flex>
                <hr></hr>
            </div>
        </>
    );
}

export default App;
