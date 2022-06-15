import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error";
};

const useMessage = () => {
  // [ state ]
  const toast = useToast();

  // [ custom hook ]
  const showMessage = useCallback(
    (props: Props) => {
      const { title, status } = props;

      toast({
        title,
        status,
        position: "top",
        duration: 2000,
        isClosable: true
      })
    },
    [toast]
  );

  // [ return hooks ]
  return { showMessage };
};

export default useMessage;