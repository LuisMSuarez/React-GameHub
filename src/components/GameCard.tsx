import { Game } from "@/entities/Game";
import { Card, Heading, HStack, Image } from "@chakra-ui/react";
import getGameBackgroundImage from "../utils/GetOptimizedImage";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import GameCardContainer from "./GameCardContainer";
import PlatformIconList from "./PlatformIconList";
import { Link } from "react-router-dom";

interface Props {
  game: Game;
}
const GameCard = ({ game }: Props) => {
  const imageUri = getGameBackgroundImage(game.background_image);
  return (
    <GameCardContainer>
      <Card.Root>
        {imageUri && (
          <Link to={`/games/${game.slug}`}>
            <Image src={imageUri} />
          </Link>
        )}
        <Card.Body>
          <HStack justify="space-between" marginBottom={3}>
            <PlatformIconList
              platforms={game.parent_platforms.map((p) => p.platform)}
            />
            <CriticScore game={game} />
          </HStack>
          <Heading fontSize="2xl">
            <Link to={`/games/${game.slug}`}>{game.name}</Link>
            <Emoji rating={game.rating_top} />
          </Heading>
        </Card.Body>
      </Card.Root>
    </GameCardContainer>
  );
};

export default GameCard;
