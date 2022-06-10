import { memo } from "react";
import Card from "../../atoms/card/Card";
import UserIconWithName from "../../molecules/user/UserIconWithName";
import styled from "styled-components";

const UserCard = memo((props) => {
  console.log("UserCard");

  // [ props ]
  const { user, isAdmin } = props;

  // [ return component ]
  return (
    <>
      <Card>
        <UserIconWithName image={user.image} name={user.name} isAdmin={isAdmin} />
        <SDl>
          <dt>メール</dt>
          <dd>{user.email}</dd>
          <dt>TEL</dt>
          <dd>{user.phone}</dd>
          <dt>会社</dt>
          <dd>{user.company.name}</dd>
          <dt>Web</dt>
          <dd>{user.website}</dd>
        </SDl>
      </Card>
    </>
  );
});

// [ style ]
const SDl = styled.dl`
  text-align: left;
  margin-bottom: 0px;
  dt {
    float: left;
  }
  dd {
    padding-left: 32px;
    padding-bottom: 8px;
    overflow-wrap: break-word;
  }
`;

export default UserCard;