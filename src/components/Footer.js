import React, { Component } from "react";
import styled from "styled-components";
import Flex from "./utils/Flex";
import githubLogo from "../images/icons/github-icon-lt-32.png";

const Wrapper = styled.div`
    background: var(--color-bg);
    width: 100%;
    min-height: 25vh;
    box-shadow: inset 0 0 0 100vh rgba(0, 0, 0, 0.33);
    margin: 0;
    padding: var(--space-xl) 0;
    margin-top: var(--space-xxxxl);
`;

class Footer extends Component {
    state = {};
    render() {
        return (
            <Wrapper>
                <Flex dir="colcenter">
                    <h2>Teach a Machine</h2>
                    <a href="https://github.com/cyores/train-a-machine" target="new">
                        <img src={githubLogo} alt="GitHub Logo" />
                    </a>
                    <p>
                        <small>
                            <em>made by christian yores</em>
                        </small>
                    </p>
                    <p>
                        Teach a Machine is made with React and the wonderful{" "}
                        <a href="https://ml5js.org" target="new">
                            ML5.js
                        </a>{" "}
                        library.
                    </p>
                </Flex>
            </Wrapper>
        );
    }
}

export default Footer;
