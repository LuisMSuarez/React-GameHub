import useGameScreenshots from "@/hooks/useGameScreenshots";
import GetOptimizedImage from "@/utils/GetOptimizedImage";
import { Box, Spinner, Text, Image } from "@chakra-ui/react";

interface Props {
  gameId: string;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, error, isLoading } = useGameScreenshots(gameId);
  return (
    <Box marginTop={5}>
      {isLoading && <Spinner />}
      {error && <Text>{error.message}</Text>}
      {data &&
        data.results &&
        data.results.length > 0 &&
        (() => {
          return <Image src={GetOptimizedImage(data.results[0].image)}></Image>;
        })()}
    </Box>
  );
};

export default GameScreenshots;
