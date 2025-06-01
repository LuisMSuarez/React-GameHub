import { GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import DetailList from "./DetailList";
import { Game } from "@/entities/Game";
import CriticScore from "./CriticScore";

interface Props {
  game: Game;
}

const GameAttributes = ({ game }: Props) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2 }} gap={5} marginTop={5}>
      <GridItem>
        <DetailList heading="Platforms">
          {game.parent_platforms?.map(({ platform }) => (
            <Text>{platform.name}</Text>
          ))}
        </DetailList>
      </GridItem>
      <GridItem>
        <DetailList heading="Genres">
          {game.genres?.map((g) => (
            <Text>{g.name}</Text>
          ))}
        </DetailList>
      </GridItem>
      <GridItem>
        <DetailList heading="Critic score">
          {[<CriticScore game={game} />]}
        </DetailList>
      </GridItem>
      <GridItem>
        <DetailList heading="Publishers">
          {game.publishers?.map((p) => (
            <Text>{p.name}</Text>
          ))}
        </DetailList>
      </GridItem>
    </SimpleGrid>
  );
};

export default GameAttributes;
