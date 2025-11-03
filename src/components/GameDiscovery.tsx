import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { FaHeartbeat } from "react-icons/fa";

const GameDiscovery = () => {
  if (import.meta.env.VITE_GAME_DISCOVERY !== "enabled") return null;
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="plain" size="md" borderRadius="full">
          <FaHeartbeat color="red" />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Game Discovery</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
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

export default GameDiscovery;
