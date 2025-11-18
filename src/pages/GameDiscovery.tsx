import { useEffect, useState } from "react";
import { Sentiment } from "@/entities/Sentiment";
import { useFeedbackStore } from "@/feedbackStore";
import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { FaHeartbeat } from "react-icons/fa";
import styles from "./GameDiscovery.module.css";
import { HiSparkles } from "react-icons/hi";
import { GetGameRecommendationService } from "@/services/gamesService";
import { useMutation } from "@tanstack/react-query";
import GameFeedback from "@/components/GameFeedback";

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

  const likedGames = Object.entries(feedback)
    .filter(([_, entry]) => entry.sentiment === Sentiment.Like)
    .map(([_, entry]) => entry.game);

  const dislikedGames = Object.entries(feedback)
    .filter(([_, entry]) => entry.sentiment === Sentiment.Dislike)
    .map(([_, entry]) => entry.game);

  const recommended =
    recommendationMutation.isSuccess && recommendationMutation?.data?.results
      ? recommendationMutation?.data?.results
      : [];

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="plain" size="md" borderRadius="full" padding={1}>
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
              <VStack>
                <GameFeedback
                  likedGames={likedGames}
                  dislikedGames={dislikedGames}
                  recommended={recommended}
                />
                {recommendationMutation.isPending && (
                  <Spinner size="md" alignSelf="center" />
                )}
                <Button
                  size="md"
                  borderRadius="full"
                  marginTop={5}
                  alignSelf="start"
                  onClick={() => recommendationMutation.mutate()}
                  disabled={
                    recommendationMutation.isPending ||
                    !feedback ||
                    Object.keys(feedback).length < 1
                  }
                >
                  <HiSparkles />
                  Recommend games!
                </Button>
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
