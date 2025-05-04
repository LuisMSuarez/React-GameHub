import useGames from "@/hooks/useGames";
import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import { GameQuery } from "@/App";
import { useEffect } from "react";

interface Props {
  gameQuery: GameQuery;
  onGameCount: (count: number) => void;
}

const GameGrid = ({ gameQuery, onGameCount }: Props) => {
  const { data: games, count, error, isLoading } = useGames(gameQuery);
  useEffect(() => {
    if (!isLoading) {
      onGameCount(count); // Invoke callback when data is available
    }
  }, [isLoading]); // Runs again when `data` updates

  const skeletons = [
    1,
    2,
    3,
    ,
    ,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
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
    </>
  );
};

export default GameGrid;
