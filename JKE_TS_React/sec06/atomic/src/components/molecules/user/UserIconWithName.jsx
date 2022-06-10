import styled from "styled-components";

const UserIconWithName = (props) => {
  // [ props ]
  const { image, name } = props;

  // [ return component ]
  return (
    <>
      <SContainer>
        <SImg
          height={160}
          width={160}
          src={image}
          alt="プロフィール"
        />
        <SName>{name}</SName>
      </SContainer>
    </>
  );
};

// [ style ]
const SContainer = styled.div`
  text-align: center;
`;
const SImg = styled.img`
  border-radius: 50%;
`;
const SName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #40514e;
`;

export default UserIconWithName;