"use client";

import { useDialog } from "@chakra-ui/react";
import { useEffect } from "react";
import { UserProfileModal } from "./UserProfileModal";

export const AuthModal = () => {
  const dialog = useDialog({
    closeOnEscape: false,
    closeOnInteractOutside: false,
    // Somehow defaultOpen to true does not work, need to set open manually in the useEffect
    // defaultOpen: true,
  });

  useEffect(() => {
    dialog.setOpen(true);
  }, [dialog]);

  return <UserProfileModal dialog={dialog} />;
};
