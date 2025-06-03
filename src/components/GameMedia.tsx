import { GridItem, SimpleGrid } from "@chakra-ui/react";
import GameMovies from "./GameMovies";

interface Props {
  gameId: string;
}

const GameMedia = ({ gameId }: Props) => {
  return (
    <SimpleGrid as="dl" columns={{ sm: 1, lg: 2 }} gap={5} marginTop={5}>
      <GridItem>
        <GameMovies gameId={gameId} />
      </GridItem>
      <GridItem></GridItem>
    </SimpleGrid>
  );
};

export default GameMedia;
