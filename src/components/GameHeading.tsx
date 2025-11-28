import useGameQueryStore from "@/store/gameQueryStore";
import { Heading } from "@chakra-ui/react";

const GameHeading = () => {
  const selectedGenre = useGameQueryStore((s) => s.gameQuery.genre);

  return (
    <Heading size="3xl" marginBottom={5}>
      {selectedGenre ? selectedGenre.name : "All"} Games
    </Heading>
  );
};

export default GameHeading;
