import useGameScreenshots from "@/hooks/useGameScreenshots";
import { Box, Spinner, Text, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GetOptimizedImage from "@/utils/GetOptimizedImage";
import { useColorModeValue } from "@/components/ui/color-mode";

interface Props {
  gameId: string;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, error, isLoading } = useGameScreenshots(gameId);

  // Use Chakra's color mode to set background and dot color
  const dotColor = useColorModeValue(
    "#2D3748", // light mode color
    "#EDF2F7" // dark mode color
  );

  // Custom styles for slick dots
  const slickStyles = `
    /* style for the dots that represent images currently not displayed */
    .slick-dots li button:before {
      color: gray !important;
      opacity: 1 !important;
    }
    /* style for the dot that represents the currently displayed image */
    .slick-dots li.slick-active button:before {
      color: ${dotColor} !important;
      opacity: 1 !important;
    }
    /* style for arrows to scroll through the slider */
    .slick-prev:before, .slick-next:before {
      color:gray !important;
      opacity: 1 !important;
      font-size: 25px;
    }
  `;

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box margin={5}>
      <style>{slickStyles}</style>
      {isLoading && <Spinner />}
      {error && <Text>{error.message}</Text>}
      {data && data.results && data.results.length > 0 && (
        <Box width="90%">
          <Slider {...sliderSettings}>
            {data.results
              .filter((r) => !r.is_deleted)
              .map((r, index) => (
                <Image
                  src={GetOptimizedImage(r.image)}
                  key={index}
                  padding={1}
                />
              ))}
          </Slider>
        </Box>
      )}
    </Box>
  );
};

export default GameScreenshots;
