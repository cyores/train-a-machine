import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingImg from "../images/loading.svg";

import { updateMachine, updateActiveSection } from "../actions/index";

// components
import Flex from "./utils/Flex";
import Uploader from "./utils/Uploader";

const mapStateToProps = state => {
    return {
        classes: state.classReducer.classes,
        machine: state.machineReducer.machine
    };
};

function mapDispatchToProps(dispatch) {
    return {
        updateMachine: machine => dispatch(updateMachine(machine)),
        updateActiveSection: activeSection =>
            dispatch(updateActiveSection(activeSection))
    };
}

class UploadMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: "",
            weights: "",
            loading: false,
            modelLoaded: false
        };
        this.receiveModel = this.receiveModel.bind(this);
        this.receiveWeights = this.receiveWeights.bind(this);
        this.loadModel = this.loadModel.bind(this);
    }

    receiveModel(files) {
        this.setState({ model: files[0] }, () => this.loadModel());
    }

    receiveWeights(files) {
        this.setState({ weights: files[0] }, () => this.loadModel());
    }

    loadModel() {
        if (this.state.model && this.state.weights) {
            this.setState({ loading: true });
            setTimeout(() => {
                this.props.machine.load(
                    this.state.model,
                    this.state.weights,
                    () => {
                        console.log("model loaded");
                        this.setState({ modelLoaded: true, loading: false });
                    }
                );
            });
        }
    }

    render() {
        return (
            <>
                <div className="u-my2">
                    <Flex>
                        <Uploader
                            id="upload-modeljson"
                            title={"Upload Model"}
                            helperText="Upload the model.json file here"
                            multiple={false}
                            fileType=".json"
                            onChange={this.receiveModel}
                        />

                        <Uploader
                            id="upload-modelweights"
                            title={"Upload Weights"}
                            helperText="Upload the model.weights.bin file here"
                            multiple={false}
                            fileType=".bin"
                            onChange={this.receiveWeights}
                        />
                    </Flex>
                    {this.state.loading && !this.state.modelLoaded && (
                        <>
                            <div
                                className="u-my3"
                                style={{
                                    textAlign: "center",
                                    minHeight: "150px"
                                }}
                            >
                                <img src={LoadingImg} alt="loading" />
                                <h5>Loading model . . . </h5>
                            </div>
                        </>
                    )}
                    {this.state.modelLoaded && (
                        <Flex dir="rowright">
                            <button
                                className="btn"
                                onClick={() =>
                                    this.props.updateActiveSection(
                                        "testMachine2"
                                    )
                                }
                            >
                                Next Section &rarr;
                            </button>
                        </Flex>
                    )}
                </div>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadMachine);
