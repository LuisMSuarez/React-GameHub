import useGameQueryStore from "@/store";
import { Heading } from "@chakra-ui/react";

const GameHeading = () => {
  const { gameQuery } = useGameQueryStore();

  return (
    <Heading size="3xl" marginBottom={5}>
      {gameQuery.genre ? gameQuery.genre.name : "All"} Games
    </Heading>
  );
};

export default GameHeading;
