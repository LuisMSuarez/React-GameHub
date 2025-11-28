import { Portal, Select, createListCollection } from "@chakra-ui/react";
import languages from "@/data/languages";
import useGameQueryStore from "@/store/gameQueryStore";

const LanguageSelector = () => {
  const setLanguage = useGameQueryStore((s) => s.setLanguage);
  const selectedLanguage = useGameQueryStore((s) => s.gameQuery.language);

  const handleChange = (details: any) => {
    if (details.value.length === 0) {
      // user selected to clear the filter
      setLanguage("");
      return;
    }
    // 1 or more items are selected
    setLanguage(details.items[0].value);
  };

  return (
    <Select.Root
      collection={languageCollection}
      size="sm"
      width="150px"
      onValueChange={handleChange}
      value={[selectedLanguage ?? ""]}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select language" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {selectedLanguage && <Select.ClearTrigger />}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {languageCollection.items.map((language) => (
              <Select.Item item={language} key={language.value}>
                {language.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

// Convert the languages object to an array suitable for createListCollection
const languageCollection = createListCollection({
  items: Object.entries(languages)
    .map(([code, lang]) => ({
      label: lang.nativeName,
      value: code,
    }))
    .sort((a, b) => a.label.localeCompare(b.label)),
});

export default LanguageSelector;
