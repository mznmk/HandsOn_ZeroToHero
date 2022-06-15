import {
  FC,
  memo,
  useCallback,
  useEffect
} from "react";
import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";

import useAllUsers from "../../hooks/useAllUsers";
import useSelectUser from "../../hooks/useSelectUser";
import UserCard from "../organizms/user/UserCard";
import UserDetailModal from "../organizms/user/UserDetailModal";
import useLoginUser from "../../hooks/useLoginUser";

const UserManagement: FC = memo(() => {
  // [ state ]
  const { getUsers, loading, users } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginUser } = useLoginUser();
  
  // [ event ]
  useEffect(
    () => { getUsers(); },
    [getUsers]
  );
  
  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen]
  )
    
  // [ return component ]
  return (
    <>
      {loading ?
        (
          <Center
            h="100vh"
          >
            <Spinner />
          </Center>
        )
        :
        (
          <Wrap
            p={{ base: 4, md: 10 }}
            justify="space-around"
          >
            {users.map((user) => (
              <WrapItem
                key={user.id}
              >
                <UserCard
                  id={user.id}
                  imageUrl="https://source.unsplash.com/random"
                  userName={user.username}
                  fullName={user.name}
                  onClick={onClickUser}
                />
              </WrapItem>
            ))}
          </Wrap>
        )
      }
      <UserDetailModal
        user={selectedUser}
        isOpen={isOpen}
        isAdmin={loginUser?.isAdmin}
        onClose={onClose}
      />
    </>
  );
});

export default UserManagement;