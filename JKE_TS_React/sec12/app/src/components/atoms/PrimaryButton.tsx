import { FC, memo, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

const PrimaryButton: FC<Props> = memo((props) => {
  // [ props ]
  const {
    children,
    disabled = false,
    loading = false,
    onClick
  } = props;
  
  // [ return component ]
  return (
    <>
      <Button
        bg="teal.400"
        color="white"
        _hover={{ opacity: 0.7 }}
        disabled={disabled || loading}
        isLoading={loading}
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
});

export default PrimaryButton;