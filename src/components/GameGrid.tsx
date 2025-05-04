import useGames from "@/hooks/useGames";
import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import { GameQuery } from "@/App";
import GamePagination from "./GamePagination";

interface Props {
  gameQuery: GameQuery;
  onPageChange: (page: number) => void;
}

const GameGrid = ({ gameQuery, onPageChange }: Props) => {
  const { data: games, count, error, isLoading } = useGames(gameQuery);
  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]; // rawg page size is 20

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} gap={5} margin={5}>
        {isLoading &&
          skeletons.map((skeleton) => <GameCardSkeleton key={skeleton} />)}
        {!isLoading &&
          games.map((game) => <GameCard key={game.id} game={game} />)}
      </SimpleGrid>
      <GamePagination
        gameQuery={gameQuery}
        gameCount={count}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default GameGrid;
