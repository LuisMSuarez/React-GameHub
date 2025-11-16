import { HStack, Image, SimpleGrid } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import NavBack from "./NavBack";
import GameDiscovery from "../pages/GameDiscovery";
import { LoginButton } from "./LoginButton";
import { AdminPage } from "@/pages/AdminPage";

const NavBar = () => {
  return (
    <HStack
      justifyContent="space-between"
      margin="10px"
      marginTop="0px"
      spaceX="0px"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={1} placeItems="center">
        <Link to="/">
          <Image src={logo} boxSize="60px" borderRadius={6} />
        </Link>
        <NavBack />
      </SimpleGrid>
      <SearchBar />
      <HStack>
        <GameDiscovery />
        <ColorModeSwitch />
        <LoginButton />
        <AdminPage />
      </HStack>
    </HStack>
  );
};

export default NavBar;
