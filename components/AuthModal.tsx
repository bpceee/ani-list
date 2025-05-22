"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  Portal,
  Field,
  Fieldset,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

export const AuthModal = () => {
  const { userInfo, setUserInfo } = useUser();
  const [username, setUsername] = useState(userInfo?.username || "");
  const [jobTitle, setJobTitle] = useState(userInfo?.jobTitle || "");

  const handleSubmit = () => {
    if (username && jobTitle) {
      setUserInfo({ username, jobTitle });
      setOpen(false);
    }
  };

  const [open, setOpen] = useState(true);

  return (
    // TODO: Forbid open change on init
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <DialogContent>
          <DialogHeader fontSize="lg" fontWeight="bold">
            Welcome!
          </DialogHeader>
          <Dialog.Body>
            <Fieldset.Root size="lg" maxW="md">
              <Stack>
                <Fieldset.HelperText>
                  Please provide your details below to gain access.
                </Fieldset.HelperText>
              </Stack>
              <Fieldset.Content>
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
              </Fieldset.Content>

              <Button
                type="submit"
                alignSelf="flex-end"
                onClick={handleSubmit}
                disabled={!username || !jobTitle}
              >
                Submit
              </Button>
            </Fieldset.Root>
          </Dialog.Body>
        </DialogContent>
      </Portal>
    </Dialog.Root>
  );
};
