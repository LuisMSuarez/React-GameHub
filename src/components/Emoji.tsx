import bullsEye from "../assets/bulls-eye.webp";
import thumbsUp from "../assets/thumbs-up.webp";
import meh from "../assets/meh.webp";
import { Image, ImageProps } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: meh, alt: "Meh", boxSize: "25px" },
    4: { src: thumbsUp, alt: "Recommended", boxSize: "20px" },
    5: { src: bullsEye, alt: "Exceptional", boxSize: "23px" },
  };

  if (!rating || rating < 3 || rating > 5) return null;
  return (
    <Tooltip content={emojiMap[rating].alt}>
      <Image {...emojiMap[rating]} marginTop={1} />
    </Tooltip>
  );
};

export default Emoji;
