import React, { Component } from "react";
import LoadingImg from "../images/loading.svg";

export default class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sawFirstLoss: false
        };
    }
    componentDidUpdate() {
        let { firstLoss } = this.props;

        if (firstLoss > 0 && !this.state.sawFirstLoss) {
            this.setState({ sawFirstLoss: true });
        }
    }
    render() {
        return (
            <div
                className="u-my3"
                style={{ textAlign: "center", minHeight: "150px" }}
            >
                {!this.state.sawFirstLoss ? (
                    <h5>Preparing training course</h5>
                ) : this.props.currLoss === null ? (
                    <h5>Training finished! Now you can test the Machine.</h5>
                ) : (
                    <>
                        <img src={LoadingImg} alt="loading" />
                        <h5>Training...</h5>
                    </>
                )}
            </div>
        );
    }
}
