import {
  ChangeEvent,
  FC,
  memo,
  useEffect,
  useState
} from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack
} from "@chakra-ui/react";

import User from "../../../types/api/user";
import PrimaryButton from "../../atoms/PrimaryButton";

type Props = {
  user: User | null;
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
};

const UserDetailModal: FC<Props> = memo((props) => {
  // [ props ]
  const { user, isOpen, isAdmin, onClose } = props;

  // [ state ]
  const [ userName, setUserName ] = useState("");
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phone, setPhone ] = useState("");

  // [ event ]
  useEffect(
    () => {
      setUserName(user?.username ?? "");
      setName(user?.name ?? "");
      setEmail(user?.email ?? "");
      setPhone(user?.phone ?? "");
    },
    [user]
  );

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const onClickUpdate = () => {

  };

  // [ return component ]
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
          <ModalContent
            pb={3}
          >
            <ModalHeader>
              ユーザー詳細
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              mx={4}
            >
              <Stack
                spacing={4}
              >
                <FormControl>
                  <FormLabel>
                    名前
                  </FormLabel>
                  <Input
                    value={userName}
                    isReadOnly={!isAdmin}
                    onChange={onChangeUserName}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    フルネーム
                  </FormLabel>
                  <Input
                    value={name}
                    isReadOnly={!isAdmin}
                    onChange={onChangeName}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    MAIL
                  </FormLabel>
                  <Input
                    value={email}
                    isReadOnly={!isAdmin}
                    onChange={onChangeEmail}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    TEL
                  </FormLabel>
                  <Input
                    value={phone}
                    isReadOnly={!isAdmin}
                    onChange={onChangePhone}
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            {isAdmin && (
              <ModalFooter>
                <PrimaryButton
                  onClick={onClickUpdate}
                >
                  更新
                </PrimaryButton>
              </ModalFooter>
            )}
          </ModalContent>
      </Modal>

    </>
  );
});


export default UserDetailModal;