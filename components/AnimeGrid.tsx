"use client";
import { AnimeCard } from "@/components/AnimeCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import {
  Center,
  Grid,
  Text,
  Skeleton,
  SkeletonText,
  Box,
  AspectRatio,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { graphql } from "../gql/gql";
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

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

export const AnimeGrid = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { loading, error, data } = useQuery(GET_ANIME_LIST, {
    variables: {
      page: currentPage,
      perPage: ITEMS_PER_PAGE,
    },
  });
  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
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
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </Grid>
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
  const totalItems = data?.Page?.pageInfo?.total ?? 0;
  return (
    <>
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
      <Center>
        <Pagination.Root
          count={totalItems}
          pageSize={ITEMS_PER_PAGE}
          page={currentPage}
          onPageChange={(e) => handlePageChange(e.page)}
        >
          <ButtonGroup variant="ghost" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <HiChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            {isSmallScreen ? (
              <Pagination.PageText />
            ) : (
              <Pagination.Items
                render={(page) => (
                  <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                    {page.value}
                  </IconButton>
                )}
              />
            )}

            <Pagination.NextTrigger asChild>
              <IconButton>
                <HiChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Center>
    </>
  );
};

const LoadingSkeleton = () => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
    <AspectRatio ratio={3 / 4}>
      <Skeleton height="100%" width="100%" />
    </AspectRatio>
    <Stack p={4} align="start">
      <SkeletonText noOfLines={1} width="80%" />
      <Skeleton height="20px" width="60px" />
    </Stack>
  </Box>
);
