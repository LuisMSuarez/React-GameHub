import { Grid, GridItem, HStack, Link, VStack, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import SortBySelector from "./components/SortBySelector";
import GameHeading from "./components/GameHeading";
import { GameQuery } from "./store";

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({
    genre: null,
    ordering: "",
    search: "",
    platforms: [],
    pageSize: 20,
  });

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
        <NavBar
          searchString={gameQuery.search}
          onSearch={(query) => setGameQuery({ ...gameQuery, search: query })}
        />
      </GridItem>
      <GridItem area="aside" display={{ base: "none", lg: "block" }}>
        <GenreList
          selectedGenre={gameQuery.genre}
          onGenreSelect={(genre) =>
            setGameQuery({ ...gameQuery, genre: genre })
          }
        />
      </GridItem>
      <GridItem area="main">
        <VStack align="start" margin="5">
          <GameHeading gameQuery={gameQuery} />
          <HStack width="100%">
            <PlatformSelector
              onPlatformSelect={(platforms) =>
                setGameQuery({
                  ...gameQuery,
                  platforms: platforms,
                })
              }
            />
            <SortBySelector
              onOrderBySelect={(orderBy) =>
                setGameQuery({ ...gameQuery, ordering: orderBy })
              }
            />
          </HStack>
        </VStack>
        <GameGrid gameQuery={gameQuery} />
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
