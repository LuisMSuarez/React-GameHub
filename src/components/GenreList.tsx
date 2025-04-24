import useGenres, { Genre } from "@/hooks/useGenres";
import { Text, VStack, Spinner } from "@chakra-ui/react";
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
    <>
      {error && <Text>{error}</Text>}
      <VStack>
        {isLoading && <Spinner size="xl" />}
        {genres.map((genre) => (
          <GenreItem
            key={genre.slug}
            genre={genre}
            isSelected={selectedGenre === genre}
            onClick={onGenreSelect}
          />
        ))}
      </VStack>
    </>
  );
};

export default GenreList;
