import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import LoadingImg from "../images/loading.svg";

// components
import Flex from "./utils/Flex";

import Uploader from "./utils/Uploader";

const Card = styled.div`
    flex: 0 0 300px;
    border-radius: 1rem;
    margin: var(--space-xxxs);
    margin-bottom: var(--space-lg);
    background: #eee;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    color: var(--color-text-dark);
`;

const mapStateToProps = state => {
    return {
        machine: state.machineReducer.machine
    };
};

class TestMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesToTest: [],
            classifying: false,
            done: false,
            results: []
        };
        this.receiveTestingImage = this.receiveTestingImage.bind(this);
    }
    testMachine() {
        this.setState({ classifying: true });
        setTimeout(() => {
            let promiseArray = this.props.machine.classify(
                this.state.imagesToTest
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
    save() {
        this.props.machine.save();
    }
    receiveTestingImage(fileData) {
        this.setState({ imagesToTest: fileData });
    }
    render() {
        return (
            <>
                <Flex>
                    <Uploader
                        id={`upload-testingImages-${this.props.id}`}
                        title={"Upload testing images"}
                        helperText="Click here to upload testing images"
                        multiple={true}
                        fileType="image/*"
                        onChange={this.receiveTestingImage}
                    />
                </Flex>

                <Flex dir="rowleft">
                    {this.state.imagesToTest.length > 0 &&
                    !this.state.classifying &&
                    !this.state.done ? (
                        <button
                            className="btn"
                            onClick={() => this.testMachine()}
                        >
                            Test Machine
                        </button>
                    ) : null}

                    <button className="btn" onClick={() => this.save()}>
                        Save Machine
                    </button>
                </Flex>

                {this.state.classifying ? (
                    <Flex dir="colcenter">
                        <img src={LoadingImg} alt="loading" />
                        <h5>Classifying Images . . . </h5>
                    </Flex>
                ) : null}

                {this.state.done ? (
                    <>
                        <h3>Results:</h3>
                        <Flex>
                            {this.state.results.map((result, index) => (
                                <Card key={`result-${index}`}>
                                    <Flex dir="colcenter">
                                        <img
                                            style={{
                                                height: "200px",
                                                width: "100%",
                                                textAlign: "center",
                                                borderRadius: "1rem 1rem 0 0"
                                            }}
                                            src={this.state.imagesToTest[index]}
                                            alt="results"
                                        />
                                        {result.map((value, i) => (
                                            <p
                                                key={`label-conf-${i}`}
                                                style={
                                                    i === 0
                                                        ? { fontWeight: 600 }
                                                        : null
                                                }
                                            >
                                                {value.label}:{" "}
                                                {(
                                                    value.confidence * 100
                                                ).toFixed(2) + "%"}
                                            </p>
                                        ))}
                                    </Flex>
                                </Card>
                            ))}
                        </Flex>
                    </>
                ) : null}
            </>
        );
    }
}

export default connect(mapStateToProps)(TestMachine);
