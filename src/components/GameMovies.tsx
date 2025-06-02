import useGameMovies from "@/hooks/useGameMovies";
import { Box, Spinner, Text } from "@chakra-ui/react";

interface Props {
  gameId: string;
}
const GameMovies = ({ gameId }: Props) => {
  const { data, error, isLoading } = useGameMovies(gameId);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (
    data &&
    data.results &&
    data.results.length > 0 &&
    Object.keys(data.results[0].data).length > 0
  ) {
    const firstResolution = Object.keys(data.results[0].data)[0];
    return (
      <Box marginTop={5}>
        <video controls>
          <source src={data.results[0].data[firstResolution]} />
          Your browser does not support the video tag.
        </video>
      </Box>
    );
  }

  return null;
};

export default GameMovies;
