import NavBar from "@/components/NavBar";
import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function Layout() {
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
      <Outlet />
    </Grid>
  );
}

export default Layout;
