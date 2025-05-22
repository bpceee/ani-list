"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  Portal,
  Field,
  Input,
  Stack,
  UseDialogReturn,
} from "@chakra-ui/react";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

interface Props {
  dialog: UseDialogReturn;
}

export const UserProfileModal = ({ dialog }: Props) => {
  const { userInfo, setUserInfo } = useUser();
  const [username, setUsername] = useState(userInfo?.username || "");
  const [jobTitle, setJobTitle] = useState(userInfo?.jobTitle || "");

  const isLoggingIn = !userInfo;

  const handleSubmit = () => {
    if (username && jobTitle) {
      setUserInfo({ username, jobTitle });
      dialog.setOpen(false);
    }
  };

  return (
    <Dialog.RootProvider value={dialog}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <DialogContent>
            <DialogHeader fontSize="lg" fontWeight="bold">
              {isLoggingIn ? "Welcome!" : "Edit Profile"}
            </DialogHeader>
            <Dialog.Body pb="4">
              {/* TODO: use fieldset */}
              {/* {isLogin && (
              <Stack>
                <Field.HelperText>
                  Please provide your details below to gain access.
                </Field.HelperText>
              </Stack>
            )} */}

              <Stack gap="4">
                {/* TODO: Add required error after touched */}
                <Field.Root>
                  <Field.Label>Username</Field.Label>
                  <Input
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Job Title</Field.Label>
                  <Input
                    value={jobTitle}
                    required
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Enter your job title"
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              {!isLoggingIn && (
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
              )}
              <Button onClick={handleSubmit} disabled={!username || !jobTitle}>
                Save
              </Button>
            </Dialog.Footer>
          </DialogContent>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
};
