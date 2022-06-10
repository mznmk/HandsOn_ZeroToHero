// import { useContext } from "react";
// import { UserContext } from "../../providers/UserProvider";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import SearchInput from "../molecules/SearchInput";
import SecondaryButton from "../atoms/button/SecondaryButton";
import UserCard from "../organism/user/UserCard";
import styled from "styled-components";

const users = [...Array(100).keys()].map((val) => {
  return {
    id: val,
    name: `ブラック花子 V${val+1}` ,
    image: "https://source.unsplash.com/HedBdEbtUn4",
    email: `hanako-black-v${val+1}@black-compary.com`,
    phone: "0990-9696-0875",
    company: {
      name: "ブラック企業"
    },
    website: "http://black-compary.com"
  };
});

const Users = () => {
  // [ context ]
  // const { userInfo, setUserInfo } = useContext(UserContext);
  const [userInfo, setUserInfo] = useRecoilState(userState);

  // [ event ]
  const onClickSwitch = () => {
    const isAdmin = userInfo ? !userInfo.isAdmin : false;
    setUserInfo({ isAdmin: isAdmin });
  };

  // [ return component ]
  return (
    <>
      <SContainer>
        <h2>ユーザー一覧</h2>
        <SearchInput />
        <SecondaryButton onClick={onClickSwitch}>切り替え</SecondaryButton>
        <SUserArea>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </SUserArea>
      </SContainer>
    </>
  );
};

// [ style ]
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;
const SUserArea = styled.div`
  padding-top: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;

export default Users;