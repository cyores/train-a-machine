import React, { Component } from "react";
import styled from "styled-components";
import Flex from "./utils/Flex";
import logo from "../images/logo_smaller.svg";

const Wrapper = styled.div`
    background: var(--color-bg);
    width: 100%;
    box-shadow: inset 0 0 0 100vh rgba(0, 0, 0, 0.33);
    margin: 0;
    padding: 0;
`;

const NavLink = styled.div`
    padding: var(--space-xxs);
    margin: 0 var(--space-md);
    cursor: pointer;
    border-radius: 1rem;
    align-self: center;
    &:hover {
        background: rgba(255, 255, 255, 0.15);
    }
    @media (max-width: 400px) {
        flex: 1 0;
    }
`;

const Group = styled.div`
    flex: 1 0;
    @media (max-width: 767px) {
        flex: 1 0 100vw;
    }
`;

class Header extends Component {
    state = {};
    render() {
        return (
            <Wrapper>
                <Flex dir="rowleft">
                    <Group>
                        <Flex dir="rowleft">
                            <div>
                                <img
                                    src={logo}
                                    alt="logo"
                                    style={{
                                        maxHeight: "var(--space-xl)",
                                        margin: "0 var(--space-md)",
                                        paddingTop: "0.5em"
                                    }}
                                />
                            </div>
                            <div>
                                <p style={{ fontSize: "var(--text-lg)" }}>
                                    Teach a Machine
                                </p>
                            </div>
                        </Flex>
                    </Group>
                    {/* <Group>
                        <Flex dir="rowright">
                            <NavLink>
                                <p>Classifier</p>
                            </NavLink>
                            <NavLink>
                                <p>Style Transfer</p>
                            </NavLink>
                            <NavLink>
                                <p>DCGAN</p>
                            </NavLink>
                        </Flex>
                    </Group> */}
                </Flex>
            </Wrapper>
        );
    }
}

export default Header;
