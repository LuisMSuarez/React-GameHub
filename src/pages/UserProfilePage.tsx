import { Tooltip } from "@/components/ui/tooltip";
import {
  Avatar,
  Button,
  CloseButton,
  Drawer,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMsal } from "@azure/msal-react";

const UserProfile = () => {
  const { accounts } = useMsal();

  if (accounts.length === 0) {
    return null;
  }

  const handleExpireSession = () => {
    // Clear MSAL cache (depending on your cacheLocation config)
    sessionStorage.clear();
    localStorage.clear();

    // Reload the page so the app reinitializes without the user session
    window.location.reload();
  };

  const account = accounts[0];

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Avatar.Root>
          <Tooltip content={account.name}>
            <Avatar.Fallback name={account.name} />
          </Tooltip>
        </Avatar.Root>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>My Profile</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <VStack align="start" spaceY="5">
                <Text>Name: {account.name}</Text>
                <Button onClick={handleExpireSession}>Log out</Button>
              </VStack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="md" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default UserProfile;
