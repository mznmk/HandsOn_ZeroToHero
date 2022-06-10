import styled from "styled-components";

const Input = (props) => {
  // [ props ]
  const { placeholder = "" } = props;

  // [ return component ]
  return (
    <>
      <SInput type="text" placeholder={placeholder}/>
    </>
  );
};

// [ style ]
const SInput = styled.input`
  padding: 8px 16px;
  border: solid #ddd 1px;
  border-radius: 9999px;
  outline: none;
`;

export default Input;