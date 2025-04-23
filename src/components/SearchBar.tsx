import { CloseButton, Input, InputGroup } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const clearSearchButton = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  return (
    <InputGroup
      startElement={<MdSearch size={20} />}
      endElement={clearSearchButton}
    >
      <Input
        ref={inputRef}
        placeholder="Search games"
        value={value}
        borderRadius={10}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </InputGroup>
  );
};

export default SearchBar;
