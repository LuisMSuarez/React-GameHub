import { useEffect, useState } from "react";
import { Sentiment } from "@/entities/Sentiment";
import { useFeedbackStore } from "@/feedbackStore";
import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  VStack,
  Image,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FaHeart, FaHeartbeat, FaHeartBroken } from "react-icons/fa";
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

  const renderGamesBySentiment = (sentiment: Sentiment) => {
    const filteredGames = Object.entries(feedback).filter(
      ([_, entry]) => entry.sentiment === sentiment
    );

    if (filteredGames.length === 0) {
      return <Text>Start tagging to build your list!</Text>;
    }

    return filteredGames.map(([_, entry]) => (
      <Link key={entry.game.id} to={`/games/${entry.game.slug}`}>
        <Image
          boxSize="50%"
          src={getGameBackgroundImage(entry.game.background_image)}
        />
        {entry.game.name}
      </Link>
    ));
  };

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
              <VStack align="start" spaceY={5}>
                <Heading size="lg" alignSelf="start">
                  <HStack>
                    Liked games
                    <FaHeart />
                  </HStack>
                </Heading>
                {renderGamesBySentiment(Sentiment.Like)}
                <Heading size="lg" alignSelf="start">
                  <HStack>
                    Disliked games
                    <FaHeartBroken />
                  </HStack>
                </Heading>
                {renderGamesBySentiment(Sentiment.Dislike)}

                <Button
                  size="md"
                  borderRadius="full"
                  onClick={() => recommendationMutation.mutate()}
                  disabled={
                    recommendationMutation.isPending ||
                    !feedback ||
                    Object.keys(feedback).length < 1
                  }
                >
                  <HiSparkles />
                  Discover new titles!
                </Button>
                {recommendationMutation.isSuccess && (
                  <VStack spaceY="15px">
                    <Heading size="lg" alignSelf="start">
                      <HStack>
                        Recommendations
                        <FaHeartbeat />
                      </HStack>
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
