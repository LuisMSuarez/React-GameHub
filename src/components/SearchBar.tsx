import useGameQueryStore from "@/store";
import { CloseButton, Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const currentSearch = useGameQueryStore((s) => s.gameQuery.search);
  const setSearch = useGameQueryStore((s) => s.setSearch);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const clearSearchButton = currentSearch ? (
    <CloseButton
      size="xs"
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
          setSearch("");
          navigate("/");
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      }}
      me="-2"
    />
  ) : undefined;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (inputRef.current) {
          setSearch(inputRef.current.value);
          navigate("/");
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      }}
    >
      <InputGroup
        startElement={<MdSearch size={20} />}
        endElement={clearSearchButton}
      >
        <Input ref={inputRef} placeholder="Search games" borderRadius={10} />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
