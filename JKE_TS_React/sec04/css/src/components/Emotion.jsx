/** @jsx jsx */
/** @jsxRuntime classic */
import React from "react";
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled"

const Emotion = () => {
  // [ style ]
  const containerStyle = css`
    border: solid 2px #392eff;
    border-radius: 20px;
    padding: 8px;
    margin: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `;
  const titleStyle = css ({
    margin: "0",
    color: "#3d84a8"
  });
  
  // [ return component ]
  return (
    <>
      <div css={containerStyle}>
        <p css={titleStyle}>- Emotion -</p>
        <Button>Fight!</Button>
      </div>
    </>
  );
};

// [ style ]
const Button = styled.button`
  background-color: #abedd8;
  border: none;
  padding: 8px;
  border-radius: 8px;
  &:hover {
    background-color: #46cdcf;
    color: #fff;
    cursor: pointer;
`;

export default Emotion;