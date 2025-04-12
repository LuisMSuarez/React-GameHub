import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  /* In Chakra UI v3, the none value for the display property is used to
    completely hide an element. In Chakra UI v3, the block value for the
    display property is used to make an element behave as a block-level
    element. This means the element will take up the full width available and
    stack vertically with other elements.
  */
  return (
    <Grid
      templateAreas={{
        base: `"nav " "main"`,
        lg: `"nav nav " "aside main"`, // 1024px or more
      }}
    >
      <GridItem area="nav" bg="coral">
        Nav
      </GridItem>
      <GridItem area="aside" bg="gold" display={{ base: "none", lg: "block" }}>
        Aside
      </GridItem>
      <GridItem area="main" bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
