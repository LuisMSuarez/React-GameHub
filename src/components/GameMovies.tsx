import useGameMovies from "@/hooks/useGameMovies";
import { Spinner, Text } from "@chakra-ui/react";

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

  if (!data) {
    return null;
  }

  console.log(data);
  if (data.results.length > 0) {
    return (
      <video width="640" height="360" controls>
        <source src={data.results[0].data["max"]} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return <div>Game Movies</div>;
};

export default GameMovies;
