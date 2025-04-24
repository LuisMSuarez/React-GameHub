import { HStack, Image, Link } from "@chakra-ui/react";
import { Genre } from "@/hooks/useGenres";
import getOptimizedImage from "@/utils/GetOptimizedImage";

interface Props {
  genre: Genre;
  isSelected: boolean;
  onClick: (selectedGenre: Genre) => void;
}
const GenreItem = ({ genre, isSelected, onClick }: Props) => {
  const imageUri = getOptimizedImage(genre.image_background);
  return (
    <HStack justifyContent="left" width="80%" onClick={() => onClick(genre)}>
      {imageUri && (
        <Image
          boxSize="50px"
          borderRadius={5}
          overflow="hidden"
          src={imageUri}
        />
      )}
      <Link fontWeight={isSelected ? "bold" : "normal"}>{genre.name}</Link>
    </HStack>
  );
};

export default GenreItem;
