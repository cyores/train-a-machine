import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

// import { updateActiveSection } from "../actions/index";


const Number = styled.div`
    background: transparent;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.25);
    text-align: center;
    padding: 1.15rem;
    margin-right: 1rem;
    line-height: 1rem;
    display: inline-block;
`;

const mapStateToProps = state => {
    return { activeSection: state.sectionReducer.activeSection };
};

class Section extends Component {
    render() {
        return (
            <>
                <div>
                    {this.props.activeSection === this.props.name ? (
                        <div style={{ transition: "opacity 0.5s ease-in-out" }}>
                            <h3>
                                <Number>{this.props.number}</Number>
                                {this.props.title}
                            </h3>
                        </div>
                    ) : (
                        <div
                            style={{
                                transition: "opacity 0.5s ease-in-out",
                                opacity: "0.33"
                            }}
                        >
                            <h3>
                                <Number>{this.props.number}</Number>
                                {this.props.title}
                            </h3>
                        </div>
                    )}

                    {this.props.activeSection === this.props.name ? (
                        <div
                            style={{
                                height: "auto",
                                overflow: "hidden"
                            }}
                        >
                            {this.props.children}
                        </div>
                    ) : (
                        <div
                            style={{
                                height: "auto",
                                overflow: "hidden"
                            }}
                        >
                            {this.props.children}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default connect(mapStateToProps)(Section);
