import styled from "styled-components";
import SearchInput from "../molecules/SearchInput";
import UserCard from "../organism/user/UserCard";

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
  // [ return component ]
  return (
    <>
      <SContainer>
        <h2>ユーザー一覧</h2>
        <SearchInput />
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