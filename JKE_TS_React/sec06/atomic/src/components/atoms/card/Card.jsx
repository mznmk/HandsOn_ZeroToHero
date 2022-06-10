import styled from "styled-components";

const Card = (props) => {
  // [ props ]
  const { children } = props;

  // [ return component ]
  return (
    <>
      <SCard>
        {children}
      </SCard>
    </>
  );
};

// [ style ]
const SCard = styled.div`
  background-color: #fff;
  box-shadow: #ddd 0px 0px 4px 2px;
  border-radius: 8px;
  padding: 16px;
`;

export default Card;