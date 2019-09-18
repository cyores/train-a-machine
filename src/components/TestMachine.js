import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import LoadingImg from "../images/loading.svg";

// components
import Flex from "./utils/Flex";
import Uploader from "./Uploader";

const Area = styled.div`
    min-height: 375px;
    margin: var(--space-xxxs);
    margin-bottom: var(--space-sm);
    background: #eee;
    border-radius: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    color: var(--color-text-dark);
    flex: 1 0 350px;
    & > h5 {
        margin: 1rem;
    }
`;

const mapStateToProps = state => {
    return {
        machine: state.machineReducer.machine,
        testImages: state.imageReducer.testImages
    };
};

class TestMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classifying: false,
            done: false,
            results: []
        };
    }
    async testMachine() {
        this.setState({ classifying: true });
        setTimeout(async () => {
            let promiseArray = this.props.machine.classify(
                this.props.testImages
            );
            Promise.all(promiseArray).then(results => {
                console.log("all results", results);
                this.setState({
                    done: true,
                    classifying: false,
                    results: results
                });
            });
        });
    }
    render() {
        return (
            <>
                <Flex>
                    <Area>
                        <Uploader
                            title="Upload Test Image(s)"
                            imagesFor="validation"
                        />
                    </Area>
                </Flex>
                {this.props.testImages.length > 0 &&
                !this.state.classifying &&
                !this.state.done ? (
                    <button className="btn" onClick={() => this.testMachine()}>
                        Test Machine
                    </button>
                ) : null}

                {this.state.classifying ? (
                    <>
                        <img src={LoadingImg} alt="loading" />
                        <h5>Classifying Images . . . </h5>
                    </>
                ) : null}

                {this.state.done ? (
                    <>
                        <h3>Results:</h3>
                        {this.state.results.map((result, index) => (
                            <Flex key={`result-${index}`}>
                                <div style={{ flex: "1 0 40%" }}>
                                    <img
                                    style={{maxHeight: "250px", textAlign: "center"}}
                                        src={this.props.testImages[index]}
                                        alt="results"
                                    />
                                </div>
                                <div style={{ flex: "1 0 40%" }}>
                                    <Flex dir="col">
                                        {result.map((value, i) => (
                                            <p key={`label-conf-${i}`}>
                                                {value.label}{" "}
                                                {(
                                                    value.confidence * 100
                                                ).toFixed(2) + "%"}
                                            </p>
                                        ))}
                                    </Flex>
                                </div>
                            </Flex>
                        ))}
                    </>
                ) : null}
            </>
        );
    }
}

export default connect(mapStateToProps)(TestMachine);
