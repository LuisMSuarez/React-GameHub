import { Grid, GridItem, HStack, Link, VStack, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import PlatformSelector from "./components/PlatformSelector";
import SortBySelector from "./components/SortBySelector";
import GameHeading from "./components/GameHeading";
import useGameQueryStore from "./store";

function App() {
  const { setPlatforms, setOrdering } = useGameQueryStore();

  /* In Chakra UI v3, the 'none' value for the display property is used to
    completely hide an element. In Chakra UI v3, the block value for the
    display property is used to make an element behave as a block-level
    element. This means the element will take up the full width available and
    stack vertically with other elements.
  */
  return (
    <Grid
      templateAreas={{
        base: `"nav " "main"`, // imagine each string in double quotes stacked ontop of eachother
        lg: `"nav nav" "aside main"`, // 1024px or more
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="aside" display={{ base: "none", lg: "block" }}>
        <GenreList />
      </GridItem>
      <GridItem area="main">
        <VStack align="start" margin="5">
          <GameHeading />
          <HStack width="100%">
            <PlatformSelector
              onPlatformSelect={(platforms) => setPlatforms(platforms)}
            />
            <SortBySelector
              onOrderBySelect={(orderBy) => setOrdering(orderBy)}
            />
          </HStack>
        </VStack>
        <GameGrid />
        <Text margin="5">
          Results powered by{" "}
          <Link href="https://rawg.io" target="_blank">
            RAWG Api
          </Link>
        </Text>
      </GridItem>
    </Grid>
  );
}

export default App;
