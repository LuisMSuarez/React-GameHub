import useGameScreenshots from "@/hooks/useGameScreenshots";
import { Box, Spinner, Text, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GetOptimizedImage from "@/utils/GetOptimizedImage";

// Settings for the slider
const settings = {
  dots: true,
  arrows: true,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface Props {
  gameId: string;
}

const GameScreenshots = ({ gameId }: Props) => {
  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const { data, error, isLoading } = useGameScreenshots(gameId);
  return (
    <Box marginTop={5}>
      {isLoading && <Spinner />}
      {error && <Text>{error.message}</Text>}
      {data &&
        data.results &&
        data.results.length > 0 &&
        (() => {
          const cards = data.results.map((r) => GetOptimizedImage(r.image));
          return (
            <Box width="90%">
              <Slider {...settings}>
                {cards.map((url, index) => (
                  <Image src={url} key={index} />
                ))}
              </Slider>
            </Box>
          );
        })()}
    </Box>
  );
};

export default GameScreenshots;
