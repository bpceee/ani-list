"use client";
import { Media } from "@/gql/graphql";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Text,
  // Image,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  anime: Partial<Media>;
}

export const AnimeInfoModal = ({ anime, isOpen, setIsOpen }: Props) => {
  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {anime.title?.english || anime.title?.native}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box mb={4}>
                <Image
                  src={anime.coverImage?.large || ""}
                  alt={anime.title?.english || anime.title?.native || ""}
                  width="230"
                  height="320"
                />
              </Box>
              <Text mb={4}>{anime.description}</Text>
              <Text>
                <strong>Episodes:</strong> {anime.episodes}
              </Text>
              <Text>
                <strong>Status:</strong> {anime.status}
              </Text>
              <Text>
                <strong>Score:</strong> {anime.averageScore}%
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
