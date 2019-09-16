import React from "react";
import styled from "styled-components";

const FlexRow = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
`;

const FlexCol = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
`;
export default function Flex(props) {
    if(props.dir === "col") {
        return <FlexCol>{props.children}</FlexCol>;
    }

    return <FlexRow>{props.children}</FlexRow>;
}
