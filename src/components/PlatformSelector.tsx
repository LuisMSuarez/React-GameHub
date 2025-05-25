import usePlatforms, { Platform } from "@/hooks/usePlatforms";
import useGameQueryStore from "@/store";
import {
  createListCollection,
  Portal,
  Select,
  SelectValueChangeDetails,
  Spinner,
} from "@chakra-ui/react";

const PlatformSelector = () => {
  const setPlatforms = useGameQueryStore((s) => s.setPlatforms);
  const { data: platforms, error, isLoading } = usePlatforms();

  if (error) {
    return null;
  }
  const platformsListCollection = createListCollection({
    items: platforms.map((p) => ({ ...p, label: p.name, value: p.id })),
  });

  if (isLoading) {
    return <Spinner size="md" padding="20px" />;
  }

  const handleChange = (details: SelectValueChangeDetails<Platform>) => {
    if (details.value.length === 0) {
      // user selected to clear the filter
      setPlatforms([]);
    }
    // 1 or more items are selected
    setPlatforms(details.items);
  };

  return (
    <>
      <Select.Root
        multiple
        collection={platformsListCollection}
        size="sm"
        onValueChange={handleChange}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Platforms" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.ClearTrigger />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {platformsListCollection.items.map((p) => (
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

export default PlatformSelector;
