import React, { Component } from "react";
import { connect } from "react-redux";
import UploadImg from "../images/undraw_going_up_comp.svg";

import { addImageBatch, addTestImages } from "../actions/index";

// components
import Flex from "./utils/Flex";

function mapDispatchToProps(dispatch) {
    return {
        addImageBatch: images => dispatch(addImageBatch(images)),
        addTestImages: images => dispatch(addTestImages(images))
    };
}

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            images: []
        };
    }

    onChange(input) {
        const files = Array.from(input.target.files);
        this.setState({ uploading: true });

        let imgs = [];
        files.forEach((file, i) => {
            imgs.push(URL.createObjectURL(file));
        });

        this.setState({ uploading: false, images: imgs });

        if (this.props.imagesFor === "training") {
            this.props.addImageBatch({
                label: this.props.title,
                images: imgs
            });
        }
        if(this.props.imagesFor === "validation") {
            this.props.addTestImages(imgs);
        }
    }
    render() {
        return (
            <>
                <Flex dir="colcenter">
                    {this.state.uploading ? (
                        <p>uploading...</p>
                    ) : this.state.images.length === 0 ? (
                        <>
                            <label htmlFor={"upload-" + this.props.title}>
                                <img
                                    src={UploadImg}
                                    style={{
                                        maxWidth: "250px",
                                        marginTop: "2.5rem",
                                        cursor: "pointer"
                                    }}
                                    alt={"Upload images of" + this.props.title}
                                />
                            </label>
                            <small>Click to upload images</small>
                            <input
                                type="file"
                                id={"upload-" + this.props.title}
                                multiple
                                accept="image/*"
                                onChange={input => this.onChange(input)}
                            />
                        </>
                    ) : (
                        <Flex>
                            {this.state.images.map((img, index) => (
                                <React.Fragment
                                    key={"img" + this.props.title + index}
                                >
                                    <div
                                        style={{
                                            flex: "1 0 100px",
                                            margin: "1rem"
                                        }}
                                    >
                                        <img
                                            src={img}
                                            // width="100%"
                                            style={{ maxHeight: "100px" }}
                                            alt=""
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                        </Flex>
                    )}
                </Flex>
            </>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Uploader);
