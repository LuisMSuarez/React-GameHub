import ExpandableText from "@/components/ExpandableText";
import GameAttributes from "@/components/GameAttributes";
import GameMedia from "@/components/GameMedia";
import LanguageSelector from "@/components/LanguageSelector";
import LikeDislike from "@/components/LikeDislike";
import useGameDetails from "@/hooks/useGameDetails";
import {
  Box,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GameDetailPage = () => {
  const params = useParams();
  const { data, error, isLoading } = useGameDetails(params.id!);

  const navigate = useNavigate();

  // Redirect if slug and param mismatch
  // this happens in cases where Rawg api redirects a slug like watch-dogs-2 to watch_dogs-2
  // the redirect is necessary to ensure we load assets such as screenshots an movies from the correct slug
  useEffect(() => {
    if (data && data.slug !== params.id) {
      navigate(`/games/${data.slug}`, { replace: true });
    }
  }, [data, params.id, navigate]);

  // Scroll to the top of the page when data is loaded
  useEffect(() => {
    if (data) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [data]);

  return (
    <Box margin={5}>
      {isLoading && <Spinner />}
      {error && <Text>{error.message}</Text>}
      {!isLoading && !error && data && (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <GridItem>
            <HStack justify="space-between" align="top" marginBottom={5}>
              <Box>
                <Heading>{data.name}</Heading>
                <LikeDislike game={data} />
              </Box>
              <LanguageSelector />
            </HStack>
            <ExpandableText text={data.description_raw}></ExpandableText>
            <GameAttributes game={data} />
          </GridItem>
          <GridItem>
            <GameMedia gameId={params.id!} />
          </GridItem>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default GameDetailPage;
