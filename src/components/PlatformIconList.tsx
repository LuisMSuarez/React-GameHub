import { Tooltip } from "@/components/ui/tooltip";
import { Platform } from "@/entities/Platform";
import { HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsGlobe } from "react-icons/bs"; // for "web" games
import {
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { MdOutlineDeviceUnknown, MdPhoneIphone } from "react-icons/md";
import { SiAtari, SiCommodore, SiNintendo, SiSega } from "react-icons/si";
import { TbSquareRoundedLetterNFilled } from "react-icons/tb";

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
    sega: SiSega,
    atari: SiAtari,
    "neo-geo": TbSquareRoundedLetterNFilled,
    "commodore-amiga": SiCommodore,
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
