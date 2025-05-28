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
      <Heading marginBottom={5}>{data?.name}</Heading>
      <Text>{data?.description_raw}</Text>
    </Box>
  );
};

export default GameDetailPage;
