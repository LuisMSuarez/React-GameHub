import useGenres from "@/hooks/useGenres";
import { VStack, Spinner, Heading, HStack } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import GenreItem from "./GenreItem";
import { IoMdCloseCircle } from "react-icons/io";
import useGameQueryStore from "@/store/gameQueryStore";

const GenreList = () => {
  const selectedGenre = useGameQueryStore((s) => s.gameQuery.genre);
  const setGenre = useGameQueryStore((s) => s.setGenre);
  const { data: genres, error, isLoading } = useGenres();

  if (error) {
    return null;
  }

  return (
    <VStack align="start" margin={3}>
      {isLoading && <Spinner size="xl" />}
      <HStack marginBottom={3}>
        <Heading>Genres</Heading>
        {selectedGenre && (
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
          isSelected={selectedGenre === genre}
          onClick={setGenre}
        />
      ))}
    </VStack>
  );
};

export default GenreList;
