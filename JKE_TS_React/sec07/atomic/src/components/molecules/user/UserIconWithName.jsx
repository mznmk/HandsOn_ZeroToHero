// import { useContext } from "react";
// import { UserContext } from "../../../providers/UserProvider";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../../../store/userState";

const UserIconWithName = (props) => {
  console.log("UserIconWithName");

  // [ props ]
  const { image, name } = props;

  // [ context ]
  // const { userInfo } = useContext(UserContext);
  const userInfo = useRecoilValue(userState);
  const isAdmin = userInfo ? userInfo.isAdmin : false;

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
        {isAdmin && <SEdit>編集</SEdit>}
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
const SEdit = styled.span`
  text-decoration: underline;
  color: #aaa;
  cursor: pointer;
`;

export default UserIconWithName;