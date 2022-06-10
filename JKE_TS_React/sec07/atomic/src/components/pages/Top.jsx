import { useHistory } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../../providers/UserProvider";
import { useSetRecoilState } from "recoil";
import { userState } from "../../store/userState";
import SecondaryButton from "../atoms/button/SecondaryButton";
import styled from "styled-components";

const Top = () => {
  const history = useHistory();

  // const { setUserInfo } = useContext(UserContext);
  const setUserInfo = useSetRecoilState(userState);

  // [ event ]
  const onClickAdmin = () => {
    setUserInfo({ isAdmin: true });
    history.push("/users");
  };
  const onClickGeneral = () => {
    setUserInfo({ isAdmin: false });
    history.push("/users");
  };

  // [ return component ]
  return (
    <>
      <SContainer>
        <h2>トップページ</h2>
        <SecondaryButton onClick={onClickAdmin}>管理者ユーザー</SecondaryButton><br /><br />
        <SecondaryButton onClick={onClickGeneral}>一般ユーザー</SecondaryButton><br />
      </SContainer>
    </>
  );
};

// [ style ]
const SContainer = styled.div`
  text-align: center;
`;

export default Top;