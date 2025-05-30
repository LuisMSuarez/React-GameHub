import ExpandableText from "@/components/ExpandableText";
import useGameDetails from "@/hooks/useGameDetails";
import { Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const GameDetailPage = () => {
  const params = useParams();

  const { data, error, isLoading } = useGameDetails(params.id!);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Heading marginBottom={5}>{data.name}</Heading>
      <ExpandableText text={data.description_raw}></ExpandableText>
    </>
  );
};

export default GameDetailPage;
