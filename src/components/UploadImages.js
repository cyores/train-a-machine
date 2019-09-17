import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Flex from "./utils/Flex";
import Uploader from "./Uploader";

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
    return { classes: state.classReducer.classes };
};

class UploadImages extends Component {
    render() {
        return (
            <div className="u-my2">
                <Flex>
                    {this.props.classes.map(c => (
                        <Area key={`area-${c.id}`}>
                            <h5>{c.name}</h5>
                            <Uploader/>
                        </Area>
                    ))}
                </Flex>
            </div>
        );
    }
}

export default connect(mapStateToProps)(UploadImages);
