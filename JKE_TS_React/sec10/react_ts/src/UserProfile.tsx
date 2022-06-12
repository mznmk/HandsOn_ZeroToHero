import { FC } from "react";
import { User } from "./types/user";

type Props = {
  user: User;
};

const UserProfile: FC<Props> = (props) => {
  // [ props ]
  const { user } = props;

  // [ return component ]
  return (
    <>
      <dl>
        <dt>名前</dt>
        <dd>{user.name}</dd>
        <dt>趣味</dt>
        <dd>{user.hobbies?.join(" / ")}</dd>
      </dl>
    </>
  );
};

export default UserProfile;