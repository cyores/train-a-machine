import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { updateActiveSection } from "../actions/index";

const Number = styled.div`
    background: transparent;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.25);
    text-align: center;
    padding: 1.15rem;
    height: 1.15rem;
    width: 1.15rem;
    text-align: center;
    margin-right: 1rem;
    line-height: 1rem;
    display: inline-block;
`;

const mapStateToProps = state => {
    return { activeSection: state.sectionReducer.activeSection };
};

function mapDispatchToProps(dispatch) {
    return {
        updateActiveSection: activeSection =>
            dispatch(updateActiveSection(activeSection))
    };
}

class Section extends Component {
    constructor(props) {
        super(props);
        this.scrollHere = React.createRef();
        this.state = {
            started: false,
            complete: false
        };
    }
    componentDidUpdate() {
        if (this.props.activeSection === this.props.name) {
            if (!this.state.started) this.setState({ started: true });
            window.scrollTo(0, this.scrollHere.current.offsetTop);
        } else {
            if (this.state.started && !this.state.complete) {
                this.setState({ complete: true });
            }
        }
    }
    render() {
        return (
            <>
                <div ref={this.scrollHere}>
                    <div
                        style={
                            this.props.activeSection === this.props.name
                                ? {
                                      opacity: 1,
                                      transition: "opacity 0.5s ease-in-out"
                                  }
                                : {
                                      opacity: 0.33,
                                      transition: "opacity 0.5s ease-in-out"
                                  }
                        }
                    >
                        <h3>
                            {this.state.complete ? (
                                <Number
                                    style={{ borderColor: "rgb(0,200,20)" }}
                                >
                                    <span
                                        style={{
                                            color: "rgb(0,200,20)",
                                            marginLeft: "-0.2rem"
                                        }}
                                    >
                                        &#10004;
                                    </span>
                                </Number>
                            ) : (
                                <Number>
                                    <span>{this.props.number}</span>
                                </Number>
                            )}

                            {this.props.title}
                        </h3>
                        <div
                            style={
                                this.props.activeSection === this.props.name
                                    ? {
                                          height: "auto"
                                      }
                                    : {
                                          height: 0,
                                          overflow: "hidden"
                                      }
                            }
                        >
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Section);
