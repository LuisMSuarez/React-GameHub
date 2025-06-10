import useGameQueryStore from "@/store";
import {
  createListCollection,
  Portal,
  Select,
  SelectValueChangeDetails,
} from "@chakra-ui/react";

const SortBySelector = () => {
  const setOrdering = useGameQueryStore((s) => s.setOrdering);
  const orderByCollection = createListCollection({
    items: [
      { value: "name", label: "Name" },
      { value: "-released", label: "Date released" },
      { value: "-added", label: "Date added" },
      //{ value: "-created", label: "Date created" },
      //{ value: "-updated", label: "Date updated" },
      { value: "-rating", label: "User rating" },
      { value: "-metacritic", label: "Metacritic score" },
    ],
  });

  const handleChange = (details: SelectValueChangeDetails) => {
    if (details.value.length === 0) {
      // user selected to clear the filter
      setOrdering("");
    } else if (details.value.length === 1) {
      setOrdering(details.value[0]);
    }
    // multiselect for this field is not supported
  };

  return (
    <>
      <Select.Root
        collection={orderByCollection}
        size="sm"
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
