import {
  useCallback,
  useState
} from "react";

import User from "../types/api/user";

type Props = {
  id: number;
  users: User[];
  onOpen: () => void;
};

const useSelectUser = () => {
    // [ state ]
  const [ selectedUser, setSelectdUser ] = useState<User | null>(null);
  
  // [ custom hook ]
  const onSelectUser = useCallback(
    (props: Props) => {
      // < props >
      const { id, users, onOpen } = props;

      // < find selected user >
      const targetUser = users.find((user) => user.id === id);
      setSelectdUser(targetUser ?? null);

      // < open Modal >
      onOpen();
    },
    []
  );

  // [ return hooks ]
  return { onSelectUser, selectedUser };
};

export default useSelectUser;