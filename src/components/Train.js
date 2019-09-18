import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Machine from "../utils/Machine";

// components
import Flex from "./utils/Flex";
import Uploader from "./Uploader";
import Progress from "./Progress";

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
        classes: state.classReducer.classes,
        trainingImages: state.imageReducer.trainingImages
    };
};

class Train extends Component {
    constructor(props) {
        super(props);
        this.machine = new Machine();
        this.machine.initialize();
        this.state = {
            training: false,
            currLoss: 0,
            firstLoss: 0,
            doneTraining: false
        };
    }
    trainMachine() {
        this.setState({ training: true });
        // setTimeout to allow UI to update before training
        // training could take some time and give the UI the feel of freezing
        // the "Start Training" button would take a second to actually go away
        setTimeout(() => {
            let first = true;
            this.machine.train(this.props.trainingImages, loss => {
                if (first) {
                    this.setState({ firstLoss: loss });
                    first = false;
                } else this.setState({ currLoss: loss });
            });
        });
    }
    render() {
        return (
            <div className="u-my2">
                <Flex>
                    {this.props.classes.map(c => (
                        <Area key={`area-${c.id}`}>
                            <h5>{c.name}</h5>
                            <Uploader title={c.name} imagesFor="training" />
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
        );
    }
}

export default connect(mapStateToProps)(Train);
