import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { updateMachine, updateActiveSection } from "../actions/index";

// components
import Flex from "./utils/Flex";
import Uploader from "./Uploader";
import Progress from "./Progress";

const Area = styled.div`
    min-height: 375px;
    margin: var(--space-xxxs);
    margin-bottom: var(--space-sm);
    background: #eee;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    color: var(--color-text-dark);
    flex: 1 0 350px;
    & > h5 {
        margin: 1rem;
    }
`;

const mapStateToProps = state => {
    return {
        classes: state.classReducer.classes,
        trainingImages: state.imageReducer.trainingImages,
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
            training: false,
            currLoss: 0,
            firstLoss: 0,
            doneTraining: false
        };
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
            machine.train(this.props.trainingImages, loss => {
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
    render() {
        return (
            <>
                <div className="u-my2">
                    <Flex>
                        {this.props.classes.map(c => (
                            <Area key={`area-${c.id}`}>
                                <h5>{c.name}</h5>
                                <Uploader
                                    title={c.name}
                                    imagesFor="training"
                                    helperText="Click here to upload training images"
                                />
                            </Area>
                        ))}
                    </Flex>

                    {this.props.trainingImages.length === 0 ? null : (
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
                </div>
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
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Train);
