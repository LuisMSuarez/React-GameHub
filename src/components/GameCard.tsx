import { Game } from "@/hooks/useGames";
import PlatformIconList from "./PlatformIconList";
import { Image, Card, Heading, Stack } from "@chakra-ui/react";
import CriticScore from "./CriticScore";
import getGameBackgroundImage from "../utils/GameBackgroundImage";
import GameCardContainer from "./GameCardContainer";

interface Props {
  game: Game;
}
const GameCard = ({ game }: Props) => {
  return (
    <GameCardContainer>
      <Card.Root width="300px" borderRadius={10} overflow="hidden">
        <Image src={getGameBackgroundImage({ game })} />
        <Card.Body>
          <Heading fontSize="2xl">{game.name}</Heading>
          <Stack direction="row" justify="space-between">
            <PlatformIconList
              platforms={game.parent_platforms.map((p) => p.platform)}
            />
            <CriticScore game={game} />
          </Stack>
        </Card.Body>
      </Card.Root>
    </GameCardContainer>
  );
};

export default GameCard;
