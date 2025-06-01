import { Badge, Box } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Game } from "@/entities/Game";

interface Props {
  game: Game;
}

const CriticScore = ({ game }: Props) => {
  if (game.metacritic === null) {
    return null;
  }
  const color =
    game.metacritic > 75 ? "green" : game.metacritic > 60 ? "yellow" : "";
  return (
    <Box>
      <Tooltip content="Metacritic score">
        <Badge colorPalette={color}>{game.metacritic}</Badge>
      </Tooltip>
    </Box>
  );
};

export default CriticScore;
