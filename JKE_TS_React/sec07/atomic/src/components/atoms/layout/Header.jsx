import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  // [ return component ]
  return (
    <>
      <SHeader>
        <Link to="/">HOME</Link>
        <SLink to="/users">USERS</SLink>
      </SHeader>
    </>
  );
};

const SHeader = styled.header`
  background-color: #11999e;
  color: #fff;
  text-align: center;
  padding: 8px 0;
`;
const SLink = styled(Link)`
  margin: 0 8px;
`;

export default Header;