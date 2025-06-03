import ExpandableText from "@/components/ExpandableText";
import GameAttributes from "@/components/GameAttributes";
import GameMovies from "@/components/GameMovies";
import useGameDetails from "@/hooks/useGameDetails";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const GameDetailPage = () => {
  const params = useParams();
  const { data, error, isLoading } = useGameDetails(params.id!);

  return (
    <Box margin={5}>
      {isLoading && <Spinner />}
      {error && <Text>{error.message}</Text>}
      {!isLoading && !error && data && (
        <>
          <Heading marginBottom={5}>{data.name}</Heading>
          <ExpandableText text={data.description_raw}></ExpandableText>
          <GameAttributes game={data} />
          <GameMovies gameId={params.id!} />
        </>
      )}
    </Box>
  );
};

export default GameDetailPage;
