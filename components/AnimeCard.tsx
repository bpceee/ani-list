"use client";

import { Box } from "@chakra-ui/react";

type AnimeCardProps = {
  anime: any;
};

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return <Box>{anime.id}</Box>;
};
