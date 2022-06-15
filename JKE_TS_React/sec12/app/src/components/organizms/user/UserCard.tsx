import { FC, memo } from "react";
import { Box, Image, Stack, Text } from "@chakra-ui/react";

type Props = {
  id: number;
  imageUrl: string;
  userName: string;
  fullName: string;
  onClick: (id: number) => void;
};

const UserCard: FC<Props> = memo((props) => {
  // [ props ]
  const { id, imageUrl, userName, fullName, onClick } = props;

  // [ return component ]
  return (
    <>
      <Box
        w="260px"
        h="260px"
        p={4}
        bg="white"
        borderRadius="10px"
        shadow="md"
        _hover={{ cursor: "pointer", opacity: 0.7 }}
        onClick={() => onClick(id)}
      >
        <Stack
          textAlign="center"
        >
          <Image
            src={imageUrl}
            alt={userName}
            boxSize="160px"
            borderRadius="full"
            margin="auto"
          >
          </Image>
          <Text
            fontSize="lg"
            fontWeight="bold"
          >
            {userName}
          </Text>
          <Text
            fontSize="sm"
            color="gray"
          >
            {fullName}
          </Text>
        </Stack>
      </Box>
    </>
  );
});

export default UserCard;