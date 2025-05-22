"use client";

import { Box } from "@chakra-ui/react";

type AnimeCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  anime: any;
};

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return <Box>{anime.id}</Box>;
};
