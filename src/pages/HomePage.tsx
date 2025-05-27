import GameGrid from "@/components/GameGrid";
import GameHeading from "@/components/GameHeading";
import GenreList from "@/components/GenreList";
import PlatformSelector from "@/components/PlatformSelector";
import SortBySelector from "@/components/SortBySelector";
import { GridItem, HStack, Link, VStack, Text } from "@chakra-ui/react";

function HomePage() {
  /* In Chakra UI v3, the 'none' value for the display property is used to
    completely hide an element. In Chakra UI v3, the block value for the
    display property is used to make an element behave as a block-level
    element. This means the element will take up the full width available and
    stack vertically with other elements.
  */
  return (
    <>
      <GridItem area="aside" display={{ base: "none", lg: "block" }}>
        <GenreList />
      </GridItem>
      <GridItem area="main">
        <VStack align="start" margin="5">
          <GameHeading />
          <HStack width="100%">
            <PlatformSelector />
            <SortBySelector />
          </HStack>
        </VStack>
        <GameGrid />
        <Text margin="5">
          at layout! Results powered by{" "}
          <Link href="https://rawg.io" target="_blank">
            RAWG Api
          </Link>
        </Text>
      </GridItem>
    </>
  );
}

export default HomePage;
