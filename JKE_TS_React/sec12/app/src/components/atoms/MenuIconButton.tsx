import { FC, memo } from "react";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

type Props = {
  onOpen: () => void;
};

const MenuIconButton: FC<Props> = memo((props) => {
  // [ props ]
  const { onOpen } = props;

  // [ return component ]
  return (
    <>
      <IconButton
        aria-label="メニューボタン"
        icon={<HamburgerIcon />}
        size="sm"
        variant="unstyled"
        display={{ base: "block", md: "none"}}
        onClick={onOpen}
      />
    </>
  );
});

export default MenuIconButton;