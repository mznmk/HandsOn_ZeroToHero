import styled from "styled-components";

const Top = () => {
  // [ return component ]
  return (
    <>
      <SContainer>
        <h2>トップページ</h2>
      </SContainer>
    </>
  );
};

// [ style ]
const SContainer = styled.div`
  text-align: center;
`;

export default Top;