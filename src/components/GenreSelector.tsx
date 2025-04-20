import { Stack, Image, Text } from "@chakra-ui/react";
import { Genre } from "@/hooks/useGenres";

interface Props {
  genre: Genre;
  onClick: (selectedGenre: string) => void;
}
const GenreSelector = ({ genre, onClick }: Props) => {
  return (
    <Stack
      direction="row"
      justify="space-between"
      onClick={() => onClick(genre.slug)}
    >
      <Image width="50px" height="50px" src={genre.image_background} />
      <Text>{genre.name}</Text>
    </Stack>
  );
};

export default GenreSelector;
