import React, { Component } from "react";
import styled from "styled-components";
import UploadImg from "../../images/undraw_going_up_comp.svg";

// components
import Flex from "./Flex";

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

class Uploader2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gotFiles: false
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(files) {
        this.setState({ gotFiles: true });
        this.props.onChange(files);
    }
    render() {
        return (
            <>
                <Area>
                    <Flex dir="colcenter">
                        {this.state.gotFiles ? (
                            <><h5>Upload complete!</h5></>
                        ) : (
                            <>
                                <h5>{this.props.title}</h5>
                                <label htmlFor={"upload-" + this.props.id}>
                                    <img
                                        src={UploadImg}
                                        style={{
                                            maxWidth: "250px",
                                            marginTop: "2.5rem",
                                            cursor: "pointer"
                                        }}
                                        alt={"Upload files"}
                                    />
                                </label>
                                <small>{this.props.helperText}</small>
                                <input
                                    type="file"
                                    id={"upload-" + this.props.id}
                                    multiple={this.props.mulitple}
                                    accept={this.props.fileType}
                                    onChange={input =>
                                        this.onChange(input.target.files)
                                    }
                                />
                            </>
                        )}
                    </Flex>
                </Area>
            </>
        );
    }
}

export default Uploader2;
