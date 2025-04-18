import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone, MdOutlineDeviceUnknown } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs"; // for "web" games
import { Platform } from "@/hooks/useGames";
import { HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Tooltip } from "@/components/ui/tooltip";

interface Props {
  platforms: Platform[];
}
const PlatformIconList = ({ platforms }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    ios: MdPhoneIphone,
    web: BsGlobe,
    android: FaAndroid,
  };

  return (
    <HStack marginY={1}>
      {platforms.map((platform) => (
        <Tooltip content={platform.name} key={platform.slug}>
          <Icon
            as={
              iconMap[platform.slug] !== undefined
                ? iconMap[platform.slug]
                : MdOutlineDeviceUnknown
            }
            color="gray.500"
            aria-label={platform.name}
          />
        </Tooltip>
      ))}
    </HStack>
  );
};

export default PlatformIconList;
