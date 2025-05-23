import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";

export const Header = () => {
  return (
    <Box as="header" bg="blue.500" color="white" py={4}>
      <Container>
        <Flex justify="space-between" align="center">
          <Link href="/">
            <Text fontSize="2xl" fontWeight="bold">
              Anime List
            </Text>
          </Link>
          {/* If change avatar size, make sure header heigh won't change after client side render to prevent jumping */}
          <UserAvatar />
        </Flex>
      </Container>
    </Box>
  );
};
