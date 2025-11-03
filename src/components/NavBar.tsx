import { HStack, Image, SimpleGrid } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import NavBack from "./NavBack";
import GameDiscovery from "./GameDiscovery";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" margin="10px" spaceX="0px">
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={1} placeItems="center">
        <Link to="/">
          <Image src={logo} boxSize="60px" borderRadius={6} />
        </Link>
        <NavBack />
      </SimpleGrid>
      <SearchBar />
      {process.env.NODE_ENV === "development" && <GameDiscovery />}
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
