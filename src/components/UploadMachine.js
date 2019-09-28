import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingImg from "../images/loading.svg";

import { updateMachine, updateActiveSection } from "../actions/index";

// components
import Flex from "./utils/Flex";
import Uploader2 from "./utils/Uploader2";

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
                        <Uploader2
                            id="upload-modeljson"
                            title={"Upload Model"}
                            helperText="Upload the model.json file here"
                            multiple={false}
                            fileType=".json"
                            onChange={this.receiveModel}
                        ></Uploader2>

                        <Uploader2
                            id="upload-modelweights"
                            title={"Upload Weights"}
                            helperText="Upload the model.weights.bin file here"
                            multiple={false}
                            fileType=".bin"
                            onChange={this.receiveWeights}
                        ></Uploader2>
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
                        <button
                            className="btn u-float-right"
                            onClick={() =>
                                this.props.updateActiveSection("testMachine")
                            }
                        >
                            Next Section &rarr;
                        </button>
                    )}
                </div>

                <br></br>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadMachine);
