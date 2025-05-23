import { Box, Container, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      as="footer"
      py={4}
      borderTop="1px"
      borderColor="gray.200"
      borderStyle="solid"
    >
      <Container maxW="container.xl">
        <Text textAlign="center" color="gray.600">
          Challenge Version v3.5
        </Text>
      </Container>
    </Box>
  );
};
