import { Grid, GridItem, HStack, VStack } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import SortBySelector from "./components/SortBySelector";
import GameHeading from "./components/GameHeading";
import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/usePlatforms";

export interface GameQuery {
  genre: Genre | null;
  ordering: string;
  search: string;
  platforms: Platform[];
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({
    genre: null,
    ordering: "",
    search: "",
    platforms: [],
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
        <VStack align="start" padding="5">
          <GameHeading gameQuery={gameQuery} />
          <HStack>
            <PlatformSelector
              selectedPlatforms={gameQuery.platforms}
              onPlatformSelect={(platforms) =>
                setGameQuery({ ...gameQuery, platforms: platforms })
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
      </GridItem>
    </Grid>
  );
}

export default App;
