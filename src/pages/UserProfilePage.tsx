import { Tooltip } from "@/components/ui/tooltip";
import { Avatar, CloseButton, Drawer, Portal, Text } from "@chakra-ui/react";
import { useMsal } from "@azure/msal-react";

const UserProfile = () => {
  const { accounts } = useMsal();

  if (accounts.length === 0) {
    return null;
  }

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
              <Text>Name: {account.name}</Text>
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
