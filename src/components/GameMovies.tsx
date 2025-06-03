import useGameMovies from "@/hooks/useGameMovies";
import { Box, Spinner, Text } from "@chakra-ui/react";

interface Props {
  gameId: string;
}

const GameMovies = ({ gameId }: Props) => {
  const { data, error, isLoading } = useGameMovies(gameId);

  return (
    <Box marginTop={5}>
      {isLoading && <Spinner />}
      {error && <Text>{error.message}</Text>}
      {data &&
        data.results &&
        data.results.length > 0 &&
        Object.keys(data.results[0].data).length > 0 &&
        (() => {
          const firstMovie = data.results[0];
          const firstResolution = Object.keys(firstMovie.data)[0];
          return (
            <Box id="video-container">
              <video id="gameMovie" controls poster={firstMovie.preview}>
                <source src={firstMovie.data[firstResolution]} />
                Your browser does not support the video tag.
              </video>
            </Box>
          );
        })()}
    </Box>
  );
};

export default GameMovies;
