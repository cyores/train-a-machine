import React, { Component } from "react";
import { connect } from "react-redux";
import NoData from "../images/undraw_no_data_comp.svg";

import {
    addClass,
    deleteClass,
    updateClass,
    updateActiveSection
} from "../actions/index";

import Flex from "./utils/Flex";

const mapStateToProps = state => {
    return { classes: state.classReducer.classes };
};

function mapDispatchToProps(dispatch) {
    return {
        updateClass: (classID, newName) =>
            dispatch(updateClass(classID, newName)),
        deleteClass: classID => dispatch(deleteClass(classID)),
        addClass: newClass => dispatch(addClass(newClass)),
        updateActiveSection: activeSection =>
            dispatch(updateActiveSection(activeSection))
    };
}

class ClassList extends Component {
    render() {
        return (
            <>
                <div className="u-my2">
                    <Flex dir="colcenter">
                        {this.props.classes.length === 0 ? (
                            <>
                                <h6>Try adding some classes</h6>
                                <img
                                    src={NoData}
                                    width="125px"
                                    alt="No Classes Yet"
                                />
                            </>
                        ) : (
                            <div>
                                <h6>Your Classes</h6>
                            </div>
                        )}

                        {this.props.classes.map(c => (
                            <React.Fragment key={c.id}>
                                <div>
                                    <input
                                        className="input-with-btn"
                                        type="text"
                                        defaultValue={c.name}
                                        onKeyUp={input =>
                                            this.props.updateClass(
                                                c.id,
                                                input.target.value
                                            )
                                        }
                                    />
                                    <button
                                        className="btn-input-del"
                                        onClick={() =>
                                            this.props.deleteClass(c.id)
                                        }
                                    >
                                        &#10005;
                                    </button>
                                </div>
                            </React.Fragment>
                        ))}

                        <div className="u-m2">
                            <button
                                className="btn"
                                onClick={() => this.props.addClass("New Class")}
                            >
                                &#43; Add Class
                            </button>
                        </div>
                    </Flex>

                    {this.props.classes.length > 0 && (
                        <Flex dir="rowright">
                            <button
                                className="btn"
                                onClick={() =>
                                    this.props.updateActiveSection(
                                        "uploadImages"
                                    )
                                }
                            >
                                Next Section &rarr;
                            </button>
                        </Flex>
                    )}
                </div>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassList);
