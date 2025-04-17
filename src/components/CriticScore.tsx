import { Game } from "@/hooks/useGames";
import { Badge } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

interface Props {
  game: Game;
}

const CriticScore = ({ game }: Props) => {
  return (
    <Tooltip content="Metacritic score">
      <Badge>{game.metacritic}</Badge>
    </Tooltip>
  );
};

export default CriticScore;
