"use client";
import { AnimeCard } from "@/components/AnimeCard";
import { GET_ANIME_LIST } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { Center, Grid, Spinner, Text } from "@chakra-ui/react";

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const { loading, error, data } = useQuery(GET_ANIME_LIST, {
    variables: {
      page: 1,
      perPage: ITEMS_PER_PAGE,
    },
  });

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text>Error loading anime data. Please try again later.</Text>
      </Center>
    );
  }

  const { Page } = data;

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={6}
      mb={8}
    >
      {Page.media.map((anime: any) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </Grid>
  );
}
