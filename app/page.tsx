import { AnimeGrid } from "@/components/AnimeGrid";
import { Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container py={8}>
      <AnimeGrid />
    </Container>
  );
}
