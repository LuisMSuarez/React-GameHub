import usePlatforms from "@/hooks/usePlatforms";
import {
  createListCollection,
  Portal,
  Select,
  SelectValueChangeDetails,
  Spinner,
} from "@chakra-ui/react";

interface Props {
  selectedPlatformId: string;
  onPlatformSelect: (platform: string) => void;
}

const PlatformSelector = ({ selectedPlatformId, onPlatformSelect }: Props) => {
  const { data: platforms, error, isLoading } = usePlatforms();

  if (error) {
    return null;
  }
  const platformsListCollection = createListCollection({
    items: platforms.map((p) => ({ label: p.name, value: p.id })),
  });

  if (isLoading) {
    return <Spinner size="md" padding="20px" />;
  }

  const handleChange = (details: SelectValueChangeDetails) => {
    if (details.value.length === 1) {
      // only 1 item should be selected
      onPlatformSelect(details.value[0]);
    }
    if (details.value.length === 0) {
      // user selected to clear the filter
      onPlatformSelect("");
    }
  };

  return (
    <>
      <Select.Root
        collection={platformsListCollection}
        size="sm"
        width="300px"
        padding="20px"
        onValueChange={handleChange}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Platform" />
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
