import { Stack, Image, Link } from "@chakra-ui/react";
import { Genre } from "@/hooks/useGenres";

interface Props {
  genre: Genre;
  onClick: (selectedGenre: string) => void;
}
const GenreSelector = ({ genre, onClick }: Props) => {
  return (
    <Stack
      direction="row"
      justify="flex-start"
      align="center"
      width="80%" // Ensure enough width for spacing
      onClick={() => onClick(genre.slug)}
    >
      <Image
        width="50px"
        height="50px"
        borderRadius={5}
        overflow="hidden"
        src={genre.image_background}
      />
      <Link>{genre.name}</Link>
    </Stack>
  );
};

export default GenreSelector;
