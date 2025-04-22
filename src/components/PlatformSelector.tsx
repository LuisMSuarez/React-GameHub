import usePlatforms from "@/hooks/usePlatforms";
import {
  createListCollection,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";

const PlatformSelector = () => {
  const { data: platforms, error, isLoading } = usePlatforms();

  if (error) {
    return null;
  }
  const platformsListCollection = createListCollection({
    items: platforms.map((p) => ({ label: p.name, value: p.slug })),
  });

  if (isLoading) {
    return <Spinner size="md" padding="20px" />;
  }
  return (
    <>
      <Select.Root
        collection={platformsListCollection}
        size="sm"
        width="300px"
        padding="20px"
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select platform" />
          </Select.Trigger>
          <Select.IndicatorGroup>
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
