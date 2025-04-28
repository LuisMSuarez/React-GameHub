import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBar from "./SearchBar";

interface Props {
  searchString: string;
  onSearch: (query: string) => void;
}

const NavBar = ({ searchString, onSearch }: Props) => {
  return (
    <HStack justifyContent="space-between" padding="10px" spaceX="20px">
      <Image src={logo} boxSize="60px" borderRadius={6} />
      <SearchBar searchString={searchString} onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
