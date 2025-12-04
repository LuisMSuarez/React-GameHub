import { HStack, Icon, Switch } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack>
      <Switch.Root
        colorPalette="blue"
        size="lg"
        checked={colorMode === "dark"}
        onCheckedChange={toggleColorMode}
      >
        <Switch.HiddenInput />
        <Tooltip content="Switch color mode">
          <Switch.Control>
            <Switch.Thumb />
            <Switch.Indicator fallback={<Icon as={FaMoon} color="gray.400" />}>
              <Icon as={FaSun} color="yellow.400" />
            </Switch.Indicator>
          </Switch.Control>
        </Tooltip>
      </Switch.Root>
    </HStack>
  );
};

export default ColorModeSwitch;
