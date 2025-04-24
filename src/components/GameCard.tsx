import { Game } from "@/hooks/useGames";
import PlatformIconList from "./PlatformIconList";
import { Image, Card, Heading, HStack } from "@chakra-ui/react";
import CriticScore from "./CriticScore";
import getGameBackgroundImage from "../utils/GetOptimizedImage";
import GameCardContainer from "./GameCardContainer";
import Emoji from "./Emoji";

interface Props {
  game: Game;
}
const GameCard = ({ game }: Props) => {
  const imageUri = getGameBackgroundImage(game.background_image);
  return (
    <GameCardContainer>
      <Card.Root>
        {imageUri && <Image src={imageUri} />}
        <Card.Body>
          <HStack justify="space-between" marginBottom={3}>
            <PlatformIconList
              platforms={game.parent_platforms.map((p) => p.platform)}
            />
            <CriticScore game={game} />
          </HStack>
          <Heading fontSize="2xl">
            {game.name}
            <Emoji rating={game.rating_top} />
          </Heading>
        </Card.Body>
      </Card.Root>
    </GameCardContainer>
  );
};

export default GameCard;
