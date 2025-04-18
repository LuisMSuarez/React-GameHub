import { Game } from "@/hooks/useGames";
import { Image, useBreakpointValue } from "@chakra-ui/react";

interface Props {
  game: Game;
}

const GameBackgroundImage = ({ game }: Props) => {
  const baseUri = game.background_image;
  const rootIndex = baseUri.indexOf("/games/");
  const rootUri = baseUri.substring(0, rootIndex);
  const suffix = baseUri.substring(rootIndex, baseUri.length);
  const optimizedUri = rootUri + "/crop/600/400" + suffix;
  const imageUrl = useBreakpointValue({
    base: optimizedUri, // Small screens
    md: optimizedUri, // Medium screens, example: https://media.rawg.io/media/crop/600/400/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg
    lg: baseUri, // Large screens, example: https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg
  });

  return <Image src={imageUrl} alt="Background Image" />;
};

export default GameBackgroundImage;
