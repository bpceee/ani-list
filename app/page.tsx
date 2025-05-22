"use client";
import { AnimeCard } from "@/components/AnimeCard";
import { useQuery } from "@apollo/client";
import { Center, Grid, Spinner, Text } from "@chakra-ui/react";
import { graphql } from "../gql/gql";

const ITEMS_PER_PAGE = 12;
const GET_ANIME_LIST = graphql(`
  query GetAnimeList($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          english
          native
        }
        coverImage {
          large
        }
        description
        episodes
        status
        averageScore
      }
    }
  }
`);

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

  const items = (data?.Page?.media ?? []).filter(
    (item): item is NonNullable<typeof item> => !!item
  );
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
      {items.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </Grid>
  );
}
