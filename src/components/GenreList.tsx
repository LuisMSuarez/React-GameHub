import useGenres, { Genre } from "@/hooks/useGenres";
import { VStack, Spinner, Heading } from "@chakra-ui/react";
import GenreItem from "./GenreItem";

interface Props {
  selectedGenre: Genre | null;
  onGenreSelect: (selectedGenre: Genre) => void;
}

const GenreList = ({ selectedGenre, onGenreSelect }: Props) => {
  const { data: genres, error, isLoading } = useGenres();

  if (error) {
    return null;
  }

  return (
    <VStack align="start" margin={3}>
      {isLoading && <Spinner size="xl" />}
      <Heading marginBottom={3}>Genres</Heading>
      {genres.map((genre) => (
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
