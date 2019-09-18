import React from "react";
import styled from "styled-components";

const FlexRow = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    padding: 0;
    margin: 0;
`;

const FlexRowLeft = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
`;

const FlexRowRight = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    padding: 0;
    margin: 0;
`;

const FlexCol = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    padding: 0;
    margin: 0;
`;

const FlexColCenter = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    margin: 0;
`;

export default function Flex(props) {
    if(props.dir === "col") {
        return <FlexCol>{props.children}</FlexCol>;
    }
    else if(props.dir === "colcenter") {
        return <FlexColCenter>{props.children}</FlexColCenter>;
    }
    else if(props.dir === "rowleft") {
        return <FlexRowLeft>{props.children}</FlexRowLeft>
    }
    else if(props.dir === "rowright") {
        return <FlexRowRight>{props.children}</FlexRowRight>
    }
    return <FlexRow>{props.children}</FlexRow>;
}
