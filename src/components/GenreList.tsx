import useGenres from "@/hooks/useGenres";
import { Text, VStack } from "@chakra-ui/react";
import GenreSelector from "./GenreSelector";

interface Props {
  onGenreSelect: (selectedGenre: string) => void;
}

const GenreList = ({ onGenreSelect }: Props) => {
  const { data: genres, error, isLoading } = useGenres();
  return (
    <>
      {error && <Text>{error}</Text>}
      <VStack>
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
