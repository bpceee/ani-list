import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { UserAvatar } from "./UserAvatar";

export function Header() {
  return (
    <Box as="header" bg="blue.500" color="white" py={4}>
      <Container>
        <Flex justify="space-between" align="center">
          <Text fontSize="2xl" fontWeight="bold">
            Information page
          </Text>
          <UserAvatar />
        </Flex>
      </Container>
    </Box>
  );
}
