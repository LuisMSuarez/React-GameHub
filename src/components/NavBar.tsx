import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" margin="10px" spaceX="0px">
      <Image src={logo} boxSize="60px" borderRadius={6} />
      <SearchBar />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
