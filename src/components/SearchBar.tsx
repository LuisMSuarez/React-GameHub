import { CloseButton, Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { MdSearch } from "react-icons/md";

interface Props {
  searchString: string;
  onSearch: (query: string) => void;
}

const SearchBar = ({ searchString, onSearch }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const clearSearchButton = searchString ? (
    <CloseButton
      size="xs"
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
          onSearch("");
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
          onSearch(inputRef.current.value);
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
