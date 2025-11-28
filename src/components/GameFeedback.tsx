import { Game } from "@/entities/Game";
import { Accordion, Icon, Stack, Image, Text, Box } from "@chakra-ui/react";
import { FaHeart, FaHeartbeat, FaHeartBroken } from "react-icons/fa";
import { Link } from "react-router-dom";
import getGameBackgroundImage from "../utils/GetOptimizedImage";
import { useEffect, useState } from "react";

interface Props {
  likedGames: Game[];
  dislikedGames: Game[];
  recommended: Game[];
}

const GameFeedback = ({ likedGames, dislikedGames, recommended }: Props) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Automatically expand the accordion section for changed data
  useEffect(() => {
    if (recommended.length > 0) {
      setExpandedSections(["recommendations"]);
    }
  }, [recommended]);

  const items = [
    {
      value: "liked",
      icon: <FaHeart />,
      title: "Your favorites",
      content: likedGames,
    },
    {
      value: "disliked",
      icon: <FaHeartBroken />,
      title: "Not for you",
      content: dislikedGames,
    },
    {
      value: "recommendations",
      icon: <FaHeartbeat />,
      title: "Recommended",
      content: recommended,
    },
  ];

  const renderGames = (games: Game[]) => {
    if (games.length === 0) {
      return <Text>Start tagging to build your list!</Text>;
    }

    return games.map((game) => (
      <Box marginBottom={5} key={game.id}>
        <Link key={game.id} to={`/games/${game.slug}`}>
          <Image
            boxSize="50%"
            src={getGameBackgroundImage(game.background_image)}
          />
          {game.name}
        </Link>
      </Box>
    ));
  };

  return (
    <Stack width="full" maxW="400px">
      <Accordion.Root
        collapsible
        value={expandedSections}
        onValueChange={(details) => {
          const value = (details as { value?: string | string[] }).value;
          setExpandedSections(
            Array.isArray(value) ? value : value ? [value] : []
          );
        }}
      >
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.ItemTrigger>
              <Icon fontSize="lg" color="fg.subtle">
                {item.icon}
              </Icon>
              {item.title}
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                {renderGames(item.content)}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Stack>
  );
};

export default GameFeedback;
