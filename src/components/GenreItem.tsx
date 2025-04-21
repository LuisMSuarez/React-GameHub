import { HStack, Image, Link } from "@chakra-ui/react";
import { Genre } from "@/hooks/useGenres";
import getOptimizedImage from "@/utils/GetOptimizedImage";

interface Props {
  genre: Genre;
  onClick: (selectedGenre: string) => void;
}
const GenreItem = ({ genre, onClick }: Props) => {
  return (
    <HStack
      justify="flex-start"
      align="center"
      width="80%" // Ensure enough width for spacing
      onClick={() => onClick(genre.slug)}
    >
      <Image
        boxSize="50px"
        borderRadius={5}
        overflow="hidden"
        src={getOptimizedImage(genre.image_background)}
      />
      <Link>{genre.name}</Link>
    </HStack>
  );
};

export default GenreItem;
