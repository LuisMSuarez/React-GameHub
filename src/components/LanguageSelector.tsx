import { Portal, Select, createListCollection } from "@chakra-ui/react";
import languages from "@/data/languages";
import useGameQueryStore from "@/store";

const LanguageSelector = () => {
  const setLanguage = useGameQueryStore((s) => s.setLanguage);

  const handleChange = (details: any) => {
    if (details.value.length === 0) {
      // user selected to clear the filter
      setLanguage("");
    }
    // 1 or more items are selected
    setLanguage(details.items[0].value);
  };

  return (
    <Select.Root
      collection={languageCollection}
      size="sm"
      onValueChange={handleChange}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Change language" />
        </Select.Trigger>
        <Select.IndicatorGroup>
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
  items: Object.entries(languages).map(([code, lang]) => ({
    label: lang.nativeName,
    value: code,
  })),
});

export default LanguageSelector;
