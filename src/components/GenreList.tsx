import useGenres, { Genre } from "@/hooks/useGenres";
import { VStack, Spinner, Heading, HStack } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import GenreItem from "./GenreItem";
import { MdClose } from "react-icons/md";

interface Props {
  selectedGenre: Genre | null;
  onGenreSelect: (selectedGenre: Genre | null) => void;
}

const GenreList = ({ selectedGenre, onGenreSelect }: Props) => {
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
            <MdClose onClick={() => onGenreSelect(null)} />
          </Tooltip>
        )}
      </HStack>
      {genres?.map((genre) => (
        <GenreItem
          key={genre.slug}
          genre={genre}
          isSelected={selectedGenre === genre}
          onClick={onGenreSelect}
        />
      ))}
    </VStack>
  );
};

export default GenreList;
