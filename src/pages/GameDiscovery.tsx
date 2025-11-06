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
  Image,
  Heading,
} from "@chakra-ui/react";
import { FaHeartbeat } from "react-icons/fa";
import styles from "./GameDiscovery.module.css";
import { HiSparkles } from "react-icons/hi";
import { GetGameRecommendationService } from "@/services/gamesService";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import getGameBackgroundImage from "../utils/GetOptimizedImage";

const GameDiscovery = () => {
  const feedback = useFeedbackStore((s) => s.feedback);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timeout = setTimeout(() => setPulse(false), 600); // match animation duration
    return () => clearTimeout(timeout);
  }, [feedback]);

  const fetchRecommendations = async () => {
    const likedGames = Object.entries(feedback)
      .filter(([_, entry]) => entry.sentiment === Sentiment.Like)
      .map(([_, entry]) => entry.game);
    const dislikedGames = Object.entries(feedback)
      .filter(([_, entry]) => entry.sentiment === Sentiment.Dislike)
      .map(([_, entry]) => entry.game);

    return await GetGameRecommendationService.post({
      dislikedGames,
      likedGames,
    });
  };

  const recommendationMutation = useMutation({
    mutationFn: fetchRecommendations,
    onSuccess: (data) => {
      console.log("Success:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  if (import.meta.env.VITE_GAME_DISCOVERY !== "enabled") return null;

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="plain" size="md" borderRadius="full">
          <FaHeartbeat className={pulse ? styles.pulse : ""} color="red" />
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

                <Button
                  size="md"
                  mb="20px"
                  borderRadius="full"
                  onClick={() => recommendationMutation.mutate()}
                  disabled={recommendationMutation.isPending}
                >
                  <HiSparkles />
                  Discover new titles!
                </Button>
                {recommendationMutation.isSuccess && (
                  <VStack spaceY="15px">
                    <Heading size="lg" alignSelf="start">
                      Recommendations
                    </Heading>
                    {recommendationMutation.data.results.map((game) => (
                      <Link key={game.id} to={`/games/${game.slug}`}>
                        <Image
                          boxSize="50%"
                          src={getGameBackgroundImage(game.background_image)}
                        />
                        {game.name}
                      </Link>
                    ))}
                  </VStack>
                )}
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
