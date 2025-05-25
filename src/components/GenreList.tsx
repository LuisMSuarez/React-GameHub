import useGenres from "@/hooks/useGenres";
import { VStack, Spinner, Heading, HStack } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import GenreItem from "./GenreItem";
import { IoMdCloseCircle } from "react-icons/io";
import useGameQueryStore from "@/store";

const GenreList = () => {
  const { gameQuery, setGenre } = useGameQueryStore();
  const { data: genres, error, isLoading } = useGenres();

  if (error) {
    return null;
  }

  return (
    <VStack align="start" margin={3}>
      {isLoading && <Spinner size="xl" />}
      <HStack marginBottom={3}>
        <Heading>Genres</Heading>
        {gameQuery.genre && (
          <Tooltip content="Clear genre filter">
            <IoMdCloseCircle
              className="clickable-icon"
              size={20}
              onClick={() => setGenre(null)}
            />
          </Tooltip>
        )}
      </HStack>
      {genres?.map((genre) => (
        <GenreItem
          key={genre.slug}
          genre={genre}
          isSelected={gameQuery.genre === genre}
          onClick={setGenre}
        />
      ))}
    </VStack>
  );
};

export default GenreList;
