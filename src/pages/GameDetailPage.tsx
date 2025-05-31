import CriticScore from "@/components/CriticScore";
import DetailList from "@/components/DetailList";
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
      <DetailList
        heading="Platforms"
        items={data.parent_platforms.map((p) => (
          <Text>{p.platform.name}</Text>
        ))}
      />
      <DetailList
        heading="Genres"
        items={data.genres.map((g) => (
          <Text>{g.name}</Text>
        ))}
      />
      <DetailList
        heading="Critic score"
        items={[<CriticScore game={data} />]}
      />
      <DetailList
        heading="Publishers"
        items={data.publishers.map((p) => (
          <Text>{p.name}</Text>
        ))}
      />
    </>
  );
};

export default GameDetailPage;
