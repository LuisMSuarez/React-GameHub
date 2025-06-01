import { GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import DetailList from "./DetailList";
import { Game } from "@/entities/Game";
import CriticScore from "./CriticScore";

interface Props {
  game: Game;
}

const GameAttributes = ({ game }: Props) => {
  return (
    <SimpleGrid as="dl" columns={{ sm: 1, md: 2 }} gap={5} marginTop={5}>
      <GridItem>
        <DetailList heading="Platforms">
          {game.parent_platforms?.map(({ platform }) => (
            <Text key={platform.id}>{platform.name}</Text>
          ))}
        </DetailList>
      </GridItem>
      <GridItem>
        <DetailList heading="Genres">
          {game.genres?.map((g) => (
            <Text key={g.id}>{g.name}</Text>
          ))}
        </DetailList>
      </GridItem>
      <GridItem>
        <DetailList heading="Critic score">
          {[<CriticScore key={game.id} game={game} />]}
        </DetailList>
      </GridItem>
      <GridItem>
        <DetailList heading="Publishers">
          {game.publishers?.map((p) => (
            <Text key={p.id}>{p.name}</Text>
          ))}
        </DetailList>
      </GridItem>
    </SimpleGrid>
  );
};

export default GameAttributes;
