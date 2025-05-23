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
  Text,
  UseDialogReturn,
  Fieldset,
} from "@chakra-ui/react";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

interface Fields {
  username: boolean;
  jobTitle: boolean;
}

interface FormErrors {
  username?: string;
  jobTitle?: string;
}
interface Props {
  dialog: UseDialogReturn;
}

export const UserProfileModal = ({ dialog }: Props) => {
  const { userInfo, setUserInfo } = useUser();
  const [username, setUsername] = useState(userInfo?.username || "");
  const [jobTitle, setJobTitle] = useState(userInfo?.jobTitle || "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Fields>({
    username: false,
    jobTitle: false,
  });

  // Should consider using a library like React Hook Form or Formik for better form handling
  // and validation, especially for larger forms.
  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      return `${name} is required`;
    }
    if (value.length < 3) {
      return `${name} must be at least 3 characters`;
    }
    return undefined;
  };

  const handleBlur = (field: keyof Fields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = field === "username" ? username : jobTitle;
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    const error = validateField("username", e.target.value);
    setErrors((prev) => ({ ...prev, username: error }));
  };

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
    const error = validateField("jobTitle", e.target.value);
    setErrors((prev) => ({ ...prev, jobTitle: error }));
  };

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
              <Fieldset.Root>
                {isLoggingIn && (
                  <Fieldset.HelperText>
                    Please provide your details below to gain access.
                  </Fieldset.HelperText>
                )}
                <Fieldset.Content>
                  <Stack gap="4">
                    <Field.Root invalid={!!errors.username && touched.username}>
                      <Field.Label>Username</Field.Label>
                      <Input
                        value={username}
                        required
                        onChange={handleUserNameChange}
                        onBlur={() => handleBlur("username")}
                        placeholder="Enter your username"
                      />
                      {touched.username && errors.username && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.username}
                        </Text>
                      )}
                    </Field.Root>

                    <Field.Root invalid={!!errors.jobTitle && touched.jobTitle}>
                      <Field.Label>Job Title</Field.Label>
                      <Input
                        value={jobTitle}
                        required
                        onChange={handleJobTitleChange}
                        onBlur={() => handleBlur("jobTitle")}
                        placeholder="Enter your job title"
                      />
                      {touched.jobTitle && errors.jobTitle && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.jobTitle}
                        </Text>
                      )}
                    </Field.Root>
                  </Stack>
                </Fieldset.Content>
              </Fieldset.Root>
            </Dialog.Body>
            <Dialog.Footer>
              {!isLoggingIn && (
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
              )}
              <Button
                onClick={handleSubmit}
                disabled={!!errors.username || !!errors.jobTitle}
              >
                Save
              </Button>
            </Dialog.Footer>
          </DialogContent>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
};
