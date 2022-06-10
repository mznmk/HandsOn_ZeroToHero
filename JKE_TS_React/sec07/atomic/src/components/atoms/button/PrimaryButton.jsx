import styled from "styled-components";
import BaseButton from "./BaseButton";

const PrimaryButton = (props) => {
  // [ props ]
  const { children } = props;

  // [ return component ]
  return (
    <>
      <SButton>{ children }</SButton>
    </>
  );
};

// [ style ]
const SButton = styled(BaseButton)`
  background-color: #40514e;
`;

export default PrimaryButton;