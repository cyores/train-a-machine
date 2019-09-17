import React, { Component } from "react";
import headerImg from "./images/undraw_Artificial_intelligence_comp.svg";
import "./App.css";
import { connect } from "react-redux";

import { updateActiveSection } from "./actions/index";

// components
import Flex from "./components/utils/Flex";
import Section from "./components/Section";
import ClassList from "./components/ClassList";
import UploadImages from "./components/UploadImages";

function mapDispatchToProps(dispatch) {
    return {
        updateActiveSection: section => dispatch(updateActiveSection(section))
    };
}

class App extends Component {
    constructor(props) {
        super(props);

        // SECTION ONE
        this.setSecOneRef = element => {
            this.secOne = element;
        };

        this.scrollToSecOne = () => {
            if (this.secOne) {
                window.scrollTo(0, this.secOne.offsetTop);
                this.props.updateActiveSection("createClasses");
            }
        };

        // SECTION TWO
        this.setSecTwoRef = element => {
            this.secTwo = element;
        };

        this.scrollToSecTwo = () => {
            if (this.secTwo) {
                window.scrollTo(0, this.secTwo.offsetTop);
                this.props.updateActiveSection("uploadImages");
            }
        };

        // SECTION THREE
        this.setSecThreeRef = element => {
            this.secThree = element;
        };

        this.scrollToSecThree = () => {
            if (this.secThree) {
                window.scrollTo(0, this.secThree.offsetTop);
                this.props.updateActiveSection("testModel");
            }
        };
    }

    render() {
        return (
            <>
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
                            <button
                                className="btn"
                                onClick={this.scrollToSecOne}
                            >
                                Start Teaching
                            </button>
                        </div>
                    </Flex>
                    <hr></hr>
                    <Flex dir="col">
                        <span ref={this.setSecOneRef}></span>
                        <Section
                            name="createClasses"
                            title="Create Classes"
                            number="1"
                        >
                            <p>
                                These are all the different objects you wanted
                                to classify. For example, if you want to teach
                                the machine to identify different species of
                                trees, you would create one class for each
                                species of tree you wanted to identify. Or if
                                you wanted to just teach the machine to identify
                                cats, you would create just one class: "cats".
                            </p>

                            <ClassList />

                            <br></br>

                            <button
                                className="btn u-float-right"
                                onClick={this.scrollToSecTwo}
                            >
                                Next Section
                            </button>
                        </Section>

                        <span
                            style={{ padding: "1rem" }}
                            ref={this.setSecTwoRef}
                        ></span>
                        <Section
                            name="uploadImages"
                            title="Upload Training Images"
                            number="2"
                        >
                            <p>
                                Upload sample images of each class to train the
                                machine on. Click the orange upload button to
                                upload images. The more sample images the better!
                            </p>

                            <UploadImages />

                            <button
                                className="btn u-float-right"
                                onClick={this.scrollToSecThree}
                            >
                                Next Section
                            </button>
                        </Section>

                        <span
                            style={{ padding: "1rem" }}
                            ref={this.setSecThreeRef}
                        ></span>
                        <Section
                            name="testModel"
                            title="Test Your Model"
                            number="3"
                        ></Section>
                    </Flex>
                </div>
            </>
        );
    }
}

// export default App;
export default connect(
    null,
    mapDispatchToProps
)(App);
