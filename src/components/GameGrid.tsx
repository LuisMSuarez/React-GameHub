import { GameQuery } from "@/App";
import useGames from "@/hooks/useGames";
import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const {
    data: games,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGames(gameQuery);

  let skeletons: number[] = [];
  for (let i = 1; i <= gameQuery.pageSize; i++) {
    skeletons.push(i);
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={games.length}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Spinner size="lg" margin={5} />}
      >
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} gap={5} margin={5}>
          {isLoading &&
            skeletons.map((skeleton) => <GameCardSkeleton key={skeleton} />)}
          {!isLoading &&
            games?.map((game) => <GameCard key={game.id} game={game} />)}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
};

export default GameGrid;
