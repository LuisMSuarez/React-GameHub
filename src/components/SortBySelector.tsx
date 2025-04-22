import {
  createListCollection,
  Portal,
  Select,
  SelectValueChangeDetails,
} from "@chakra-ui/react";

interface Props {}

const SortBySelector = () => {
  const orderByCollection = createListCollection({
    items: [
      { value: "name", label: "Name" },
      { value: "released", label: "Date released" },
      { value: "added", label: "Date added" },
      { value: "created", label: "Date created" },
      { value: "updated", label: "Date updated" },
      { value: "rating", label: "Rating" },
      { value: "metacritic", label: "Metacritic score" },
    ],
  });

  const handleChange = (details: SelectValueChangeDetails) => {
    if (details.value.length === 0) {
      // user selected to clear the filter
      console.log(details.value);
    }
    // 1 or more items are selected
    console.log(details.value);
  };

  return (
    <>
      <Select.Root
        collection={orderByCollection}
        size="sm"
        width="200px"
        onValueChange={handleChange}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Sort by" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.ClearTrigger />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {orderByCollection.items.map((p) => (
                <Select.Item item={p} key={p.value}>
                  {p.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </>
  );
};

export default SortBySelector;
