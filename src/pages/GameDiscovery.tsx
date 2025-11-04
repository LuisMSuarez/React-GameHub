import { useEffect, useState } from "react";
import { Sentiment } from "@/entities/Sentiment";
import { useFeedbackStore } from "@/feedbackStore";
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Portal,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FaHeartbeat } from "react-icons/fa";
import "./GameDiscovery.css"; // Add this for animation styles

const GameDiscovery = () => {
  const feedback = useFeedbackStore((s) => s.feedback);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timeout = setTimeout(() => setPulse(false), 600); // match animation duration
    return () => clearTimeout(timeout);
  }, [feedback]);

  if (import.meta.env.VITE_GAME_DISCOVERY !== "enabled") return null;

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="plain" size="md" borderRadius="full">
          <FaHeartbeat className={pulse ? "pulse" : ""} color="red" />
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
              <VStack align="start">
                {Object.entries(feedback)
                  .filter(([_, entry]) => entry.sentiment !== Sentiment.Neutral)
                  .map(([gameId, entry]) => (
                    <Box key={gameId} p={2}>
                      {entry.game?.name && (
                        <Text fontWeight="bold">Name: {entry.game.name}</Text>
                      )}
                      <Text>Game ID: {gameId}</Text>
                      <Text>Sentiment: {entry.sentiment}</Text>
                    </Box>
                  ))}
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

export default GameDiscovery;
