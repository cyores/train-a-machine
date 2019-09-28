import React, { Component } from "react";
import { connect } from "react-redux";

import { updateMachine, updateActiveSection } from "../actions/index";

// components
import Flex from "./utils/Flex";
import Progress from "./Progress";
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

class Train extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainingImages: [],
            training: false,
            currLoss: 0,
            firstLoss: 0,
            doneTraining: false
        };
        this.receiveImages = this.receiveImages.bind(this);
    }
    trainMachine() {
        this.setState({ training: true });
        this.props.machine.initialize(this.props.classes.length);
        // setTimeout to allow UI to update before training.
        // training could take some time and give the UI the feel of freezing
        // the "Start Training" button would take a second to actually go away
        setTimeout(() => {
            let first = true;
            let machine = this.props.machine;
            machine.train(this.state.trainingImages, loss => {
                if (!first && loss === null) {
                    this.setState({ doneTraining: true });
                    this.props.updateMachine(machine);
                }
                if (first) {
                    this.setState({ firstLoss: loss });
                    first = false;
                } else this.setState({ currLoss: loss });
            });
        });
    }
    receiveImages(files, className) {
        let labeledImgs = {
            label: className,
            images: files
        };
        let trainingImages = this.state.trainingImages;
        trainingImages.push(labeledImgs);
        this.setState({ trainingImages: trainingImages });
    }
    render() {
        return (
            <>
                <div className="u-my2">
                    <Flex>
                        {this.props.classes.map(c => (
                            <Uploader
                                key={`upload-${c.id}`}
                                id={`upload-${c.id}`}
                                title={c.name}
                                helperText="Click here to upload training images"
                                multiple={true}
                                fileType="image/*"
                                onChange={files =>
                                    this.receiveImages(files, c.name)
                                }
                            />
                        ))}
                    </Flex>

                    {this.state.trainingImages.length === 0 ? null : (
                        <Flex>
                            {this.state.training ? (
                                <Progress
                                    firstLoss={this.state.firstLoss}
                                    currLoss={this.state.currLoss}
                                ></Progress>
                            ) : (
                                <button
                                    className="btn"
                                    onClick={() => this.trainMachine()}
                                >
                                    Train the Machine
                                </button>
                            )}
                        </Flex>
                    )}

                    {this.state.doneTraining && (
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
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Train);
