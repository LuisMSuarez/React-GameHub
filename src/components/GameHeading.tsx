import { GameQuery } from "@/App";
import { Heading } from "@chakra-ui/react";

interface Props {
  gameQuery: GameQuery;
}
const GameHeading = ({ gameQuery }: Props) => {
  return (
    <Heading size="3xl" marginBottom={5}>
      {gameQuery.genre ? gameQuery.genre.name : "All"} Games
    </Heading>
  );
};

export default GameHeading;
