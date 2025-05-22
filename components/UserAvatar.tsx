"use client";

import { Avatar, useDialog } from "@chakra-ui/react";
import { useUser } from "@/context/UserContext";
import { UserProfileModal } from "./UserProfileModal";

export const UserAvatar = () => {
  const { userInfo } = useUser();
  const dialog = useDialog();

  const openDialog = () => dialog.setOpen(true);

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <Avatar.Root onClick={openDialog}>
        <Avatar.Fallback name={userInfo?.username} />
      </Avatar.Root>
      <UserProfileModal dialog={dialog} />
    </>
  );
};
