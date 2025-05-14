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

  let skeletons: number[] = [];
  for (let i = 1; i <= gameQuery.pageSize; i++) {
    skeletons.push(i);
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} gap={5} margin={5}>
        {isLoading &&
          skeletons.map((skeleton) => <GameCardSkeleton key={skeleton} />)}
        {!isLoading &&
          games?.map((game) => <GameCard key={game.id} game={game} />)}
      </SimpleGrid>
      <GamePagination
        gameQuery={gameQuery}
        gameCount={count ?? 0}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default GameGrid;
