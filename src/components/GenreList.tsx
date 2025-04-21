import useGenres from "@/hooks/useGenres";
import { Text, VStack, Spinner } from "@chakra-ui/react";
import GenreSelector from "./GenreItem";

interface Props {
  onGenreSelect: (selectedGenre: string) => void;
}

const GenreList = ({ onGenreSelect }: Props) => {
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
          <GenreSelector
            key={genre.slug}
            genre={genre}
            onClick={onGenreSelect}
          />
        ))}
      </VStack>
    </>
  );
};

export default GenreList;
