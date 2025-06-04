import useGameScreenshots from "@/hooks/useGameScreenshots";
import {
  Box,
  Spinner,
  Text,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import GetOptimizedImage from "@/utils/GetOptimizedImage";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
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
  const [slider, setSlider] = useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });
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
            <Box
              position="relative"
              height="300px"
              width="full"
              overflow="hidden"
            >
              {/* Left Icon */}
              <IconButton
                aria-label="left-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                left={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={() => slider?.slickPrev()}
              >
                <BiLeftArrowAlt />
              </IconButton>
              {/* Right Icon */}
              <IconButton
                aria-label="right-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                right={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={() => slider?.slickNext()}
              >
                <BiRightArrowAlt />
              </IconButton>
              {/* Slider */}
              <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {cards.map((url, index) => (
                  <Box
                    key={index}
                    height={"2xl"}
                    position="relative"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="cover"
                    backgroundImage={`url(${url})`}
                  />
                ))}
              </Slider>
            </Box>
          );
        })()}
    </Box>
  );
};

export default GameScreenshots;
