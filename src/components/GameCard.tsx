import { Game } from "@/hooks/useGames";
import PlatformIconList from "./PlatformIconList";
import { Card, Heading, Image, Stack } from "@chakra-ui/react";
import CriticScore from "./CriticScore";

interface Props {
  game: Game;
}
const GameCard = ({ game }: Props) => {
  return (
    <Card.Root borderRadius={10} overflow="hidden">
      <Image src={game.background_image}></Image>
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
  );
};

export default GameCard;
