import styled from "styled-components";
import BaseButton from "./BaseButton";

const SecondaryButton = (props) => {
  // [ props ]
  const { children } = props;

  // [ return component ]
  return (
    <>
      <SButton>{ children }</SButton>
    </>
  );
}

// [ style ]
const SButton = styled(BaseButton)`
  background-color: #11999e;
`;

export default SecondaryButton;