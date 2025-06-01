import CriticScore from "@/components/CriticScore";
import DetailList from "@/components/DetailList";
import ExpandableText from "@/components/ExpandableText";
import useGameDetails from "@/hooks/useGameDetails";
import { GridItem, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
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
      <SimpleGrid columns={{ sm: 1, md: 2 }} gap={5} marginTop={5}>
        <GridItem>
          <DetailList heading="Platforms">
            {data.parent_platforms.map(({ platform }) => (
              <Text>{platform.name}</Text>
            ))}
          </DetailList>
        </GridItem>
        <GridItem>
          <DetailList heading="Genres">
            {data.genres.map((g) => (
              <Text>{g.name}</Text>
            ))}
          </DetailList>
        </GridItem>
        <GridItem>
          <DetailList heading="Critic score">
            {[<CriticScore game={data} />]}
          </DetailList>
        </GridItem>
        <GridItem>
          <DetailList heading="Publishers">
            {data.publishers.map((p) => (
              <Text>{p.name}</Text>
            ))}
          </DetailList>
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default GameDetailPage;
