import { GridItem, SimpleGrid } from "@chakra-ui/react";
import GameMovies from "./GameMovies";
import GameScreenshots from "./GameScreenshots";

interface Props {
  gameId: string;
}

const GameMedia = ({ gameId }: Props) => {
  return (
    <SimpleGrid as="dl" columns={{ base: 1, lg: 2 }} gap={5} marginTop={5}>
      <GridItem>
        <GameMovies gameId={gameId} />
      </GridItem>
      <GridItem>
        <GameScreenshots gameId={gameId} />
      </GridItem>
    </SimpleGrid>
  );
};

export default GameMedia;
