import { Media, MediaStatus } from "@/gql/graphql";
import { AspectRatio, Box, Stack, Text, Badge, Dialog } from "@chakra-ui/react";
import Image from "next/image";
import { AnimeInfoModal } from "./AnimeInfoModal";

const statusColorMap: Record<MediaStatus, string> = {
  [MediaStatus.Cancelled]: "gray",
  [MediaStatus.Finished]: "green",
  [MediaStatus.Hiatus]: "red",
  [MediaStatus.NotYetReleased]: "yellow",
  [MediaStatus.Releasing]: "orange",
};

type AnimeCardProps = {
  anime: Partial<Media>;
};

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <Dialog.Root scrollBehavior="inside">
      <Dialog.Trigger asChild>
        <Box
          as="button"
          cursor="pointer"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.02)" }}
          // onClick={() => setIsOpen(true)}
        >
          <AspectRatio ratio={3 / 4}>
            <Image
              src={anime.coverImage?.large || ""}
              alt={anime.title?.english || anime.title?.native || ""}
              // Based on the grid layout in the app/page.tsx
              sizes="(max-width: 48em) 100vw, (max-width: 62em) 50vw, (max-width: 80em) 33vw, 25vw"
              fill={true}
            />
          </AspectRatio>
          <Stack p={4} align="start">
            <Text fontWeight="bold">
              {anime.title?.english || anime.title?.native}
            </Text>
            <Badge
              colorPalette={
                anime?.status ? statusColorMap[anime.status] : undefined
              }
            >
              {anime.status}
            </Badge>
          </Stack>
        </Box>
      </Dialog.Trigger>
      <AnimeInfoModal anime={anime} />
    </Dialog.Root>
  );
};
