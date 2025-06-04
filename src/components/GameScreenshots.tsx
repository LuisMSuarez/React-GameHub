import useGameScreenshots from "@/hooks/useGameScreenshots";
import { Box, Spinner, Text, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GetOptimizedImage from "@/utils/GetOptimizedImage";
import { useColorModeValue } from "@/components/ui/color-mode";

const settings = {
  dots: true,
  arrows: true,
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
  const { data, error, isLoading } = useGameScreenshots(gameId);

  // Use Chakra's color mode to set background and dot color
  const dotColor = useColorModeValue("#2D3748", "#EDF2F7"); // dark for light mode, light for dark mode

  // Custom styles for slick dots
  const slickStyles = `
    .slick-dots li button:before {
      color: gray !important;
      opacity: 1 !important;
    }
    .slick-dots li.slick-active button:before {
      color: ${dotColor} !important;
      opacity: 1 !important;
    }
    .slick-prev:before, .slick-next:before {
      color:gray !important;
    }
  `;

  return (
    <Box margin={5}>
      <style>{slickStyles}</style>
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
