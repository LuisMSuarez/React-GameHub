import { Game } from "@/hooks/useGames";
import { Badge } from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip";

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
    <Tooltip content="Metacritic score">
      <Badge colorPalette={color}>{game.metacritic}</Badge>
    </Tooltip>
  );
};

export default CriticScore;
