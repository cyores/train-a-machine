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

const FlexColCenter = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    align-items: center;
`;

export default function Flex(props) {
    if(props.dir === "col") {
        return <FlexCol>{props.children}</FlexCol>;
    }
    else if(props.dir === "colcenter") {
        return <FlexColCenter>{props.children}</FlexColCenter>;
    }

    return <FlexRow>{props.children}</FlexRow>;
}
