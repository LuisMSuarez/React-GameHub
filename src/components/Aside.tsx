import useGenres from "@/hooks/useGenres";
import { Image, Text, HStack, VStack } from "@chakra-ui/react";

const Aside = () => {
  const { genres, error, isLoading } = useGenres();
  return (
    <>
      {error && <Text>{error}</Text>}
      <VStack>
        {genres.map((genre) => (
          <HStack>
            <Image width="50px" height="50px" src={genre.image_background} />
            <Text>{genre.name}</Text>
          </HStack>
        ))}
      </VStack>
    </>
  );
};

export default Aside;
