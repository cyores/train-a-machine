import React, { Component } from "react";
import headerImg from "./images/undraw_Artificial_intelligence_comp.svg";
import "./App.css";
import { connect } from "react-redux";

import { updateActiveSection, startMachine } from "./actions/index";

// components
import Flex from "./components/utils/Flex";
import Section from "./components/Section";
import ClassList from "./components/ClassList";
import Train from "./components/Train";
import TestMachine from "./components/TestMachine";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadMachine from "./components/UploadMachine";

function mapDispatchToProps(dispatch) {
    return {
        updateActiveSection: section => dispatch(updateActiveSection(section)),
        startMachine: () => dispatch(startMachine())
    };
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: "train" // train, uploadMachine
        };
        this.props.startMachine();
    }
    render() {
        return (
            <>
                <Header />

                <div className="container">
                    <Flex dir="row">
                        <div style={{ width: "350px" }}>
                            <img
                                src={headerImg}
                                width="100%"
                                alt="Machine Learning"
                            />
                        </div>
                        <div style={{ width: "700px" }}>
                            <h1>Teach a Machine</h1>
                            <p>
                                This tool allows you to teach a machine to
                                classify images. Create at least one class of
                                image, then upload example images of the object
                                you want to classify, then train the machine.
                                Now you can upload new images and the machine
                                will tell you what they are.
                            </p>
                            <Flex dir="rowleft">
                                <button
                                    className="btn"
                                    onClick={() => {
                                        this.props.updateActiveSection(
                                            "createClasses"
                                        );
                                        this.setState({ show: "train" });
                                    }}
                                >
                                    Start Teaching
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        this.props.updateActiveSection(
                                            "uploadMachine"
                                        );
                                        this.setState({
                                            show: "uploadMachine"
                                        });
                                    }}
                                >
                                    Upload Machine
                                </button>
                            </Flex>
                        </div>
                    </Flex>
                    <hr></hr>
                    <Flex dir="col">
                        <div
                            style={
                                this.state.show === "train"
                                    ? { display: "block" }
                                    : { display: "none" }
                            }
                        >
                            <Section
                                name="createClasses"
                                title="Create Classes"
                                number="1"
                            >
                                <p>
                                    These are all the different objects you
                                    wanted to classify. For example, if you want
                                    to teach the machine to identify different
                                    species of trees, you would create one class
                                    for each species of tree you wanted to
                                    identify. Or if you wanted to just teach the
                                    machine to identify cats, you would create
                                    just one class: "cats".
                                </p>

                                <ClassList />
                            </Section>

                            <Section
                                name="uploadImages"
                                title="Upload Training Images"
                                number="2"
                            >
                                <p>
                                    Upload sample images of each class to train
                                    the machine on. Click the orange upload
                                    button to upload images. The more sample
                                    images the better!
                                </p>

                                <Train />
                            </Section>

                            <Section
                                name="testMachine1"
                                title="Test the Machine"
                                number="3"
                            >
                                <TestMachine id="tm1" />
                            </Section>
                        </div>

                        <div
                            style={
                                this.state.show === "uploadMachine"
                                    ? { display: "block" }
                                    : { display: "none" }
                            }
                        >
                            <Section
                                name="uploadMachine"
                                title="Upload Existing Machine"
                                number="1"
                            >
                                <p>
                                    Upload a machine that you (or someone else)
                                    previously trained.
                                </p>

                                <UploadMachine />
                            </Section>

                            <Section
                                name="testMachine2"
                                title="Test the Machine"
                                number="2"
                            >
                                <TestMachine id="tm2" />
                            </Section>
                        </div>

                    </Flex>
                </div>

                <Footer />
            </>
        );
    }
}

// export default App;
export default connect(
    null,
    mapDispatchToProps
)(App);
