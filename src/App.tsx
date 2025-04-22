import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";

interface GameQuery {
  genre: string;
  platforms: string[];
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({
    genre: "",
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
        base: `"nav " "main"`,
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
        <GenreList
          selectedGenre={gameQuery.genre}
          onGenreSelect={(genre) =>
            setGameQuery({ ...gameQuery, genre: genre })
          }
        />
      </GridItem>
      <GridItem area="main">
        <PlatformSelector
          selectedPlatformIds={gameQuery.platforms}
          onPlatformSelect={(platforms) =>
            setGameQuery({ ...gameQuery, platforms: platforms })
          }
        />
        <GameGrid
          selectedGenre={gameQuery.genre}
          selectedPlatforms={gameQuery.platforms}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
