"use client";

import { Avatar, useDialog, Menu } from "@chakra-ui/react";
import { useUser } from "@/context/UserContext";
import { UserProfileModal } from "./UserProfileModal";

export const UserAvatar = () => {
  const { userInfo, logout } = useUser();
  const dialog = useDialog();

  const openDialog = () => dialog.setOpen(true);

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <Menu.Root>
        <Menu.Trigger cursor="pointer">
          <Avatar.Root>
            <Avatar.Fallback name={userInfo?.username} />
          </Avatar.Root>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="edit-profile" onSelect={openDialog}>
              Edit Profile
            </Menu.Item>
            <Menu.Item value="logout" onSelect={logout}>
              Logout
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
      <UserProfileModal dialog={dialog} />
    </>
  );
};
